// src/components/pricebook/PricebookUpdate.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign,
    FileText,
    ScrollText,
    BarChart3,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/fade.css'; // Adjust path if needed

function PricebookUpdate() {
    // Initial example data for the pricebook
    const [items, setItems] = useState([
        {
            id: 1,
            itemCode: 'BR1701DVXR',
            description: 'ABS-1/2x3/8x3/8 dual angle stop brass',
            invoicePrice: 64.03,
            pricebookPrice: 59.44,
        },
        {
            id: 2,
            itemCode: 'FNWX410CH',
            description: '1 1/4" Ball Valve IP 1-1/2',
            invoicePrice: 52.10,
            pricebookPrice: 39.37,
        },
        {
            id: 3,
            itemCode: 'IBRLF4D',
            description: '1/2" Brass 45',
            invoicePrice: 6.99,
            pricebookPrice: 7.59,
        },
        // Add more items as needed for demo purposes
    ]);

    // State for bulk selection, pagination, search and sorting
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    // sortConfig.key can be one of: 'itemCode', 'description', 'invoicePrice', 'pricebookPrice', or 'difference'
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Update sort configuration when a header is clicked
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        toast.info(`Sorted by ${key} (${direction})`);
    };

    // Compute filtered and sorted items. Note: For the 'difference' sort key we compute the difference.
    const filteredSortedItems = useMemo(() => {
        let filtered = items;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter((item) =>
                item.itemCode.toLowerCase().includes(lowerSearch) ||
                item.description.toLowerCase().includes(lowerSearch)
            );
        }
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aVal, bVal;
                if (sortConfig.key === 'difference') {
                    aVal = a.invoicePrice - a.pricebookPrice;
                    bVal = b.invoicePrice - b.pricebookPrice;
                } else {
                    aVal = a[sortConfig.key];
                    bVal = b[sortConfig.key];
                    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                }
                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [items, searchTerm, sortConfig]);

    // Pagination calculations based on the filtered & sorted items
    const totalPages = Math.ceil(filteredSortedItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSortedItems.slice(indexOfFirstItem, indexOfLastItem);

    // Handler for toggling a row’s checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    // Handlers for approving (updating) or dismissing an individual item
    const handleApprove = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSelectedIds((prevSelected) =>
            prevSelected.filter((itemId) => itemId !== id)
        );
        toast.success('ServiceTitan Item Updated');
    };

    const handleDismiss = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSelectedIds((prevSelected) =>
            prevSelected.filter((itemId) => itemId !== id)
        );
        toast.warn('Item dismissed');
    };

    // Handlers for bulk actions
    const handleApproveSelected = () => {
        setItems((prevItems) =>
            prevItems.filter((item) => !selectedIds.includes(item.id))
        );
        setSelectedIds([]);
        toast.success('Selected items updated');
    };

    const handleDismissSelected = () => {
        setItems((prevItems) =>
            prevItems.filter((item) => !selectedIds.includes(item.id))
        );
        setSelectedIds([]);
        toast.warn('Selected items dismissed');
    };

    // A helper function to format the difference between invoice and pricebook prices
    const formatDifference = (invoice, pricebook) => {
        const diff = invoice - pricebook;
        const absDiff = Math.abs(diff).toFixed(2);
        if (diff > 0) {
            return <span className="text-green-600 font-semibold">+${absDiff}</span>;
        } else if (diff < 0) {
            return <span className="text-red-500 font-semibold">-${absDiff}</span>;
        }
        return <span>$0.00</span>;
    };

    // Helper function to return sort arrow icon if a column is active
    const getSortIcon = (columnKey) => {
        if (sortConfig.key === columnKey) {
            return sortConfig.direction === 'ascending' ? (
                <ChevronUp size={16} className="inline ml-1" />
            ) : (
                <ChevronDown size={16} className="inline ml-1" />
            );
        }
        return null;
    };

    // Sidebar navigation items
    const sideNavItems = [
        {
            label: 'Pricebook Builder',
            icon: <FileText size={20} />,
            path: '/pricebook',
        },
        {
            label: 'Pricebook Update',
            icon: <ScrollText size={20} />,
            path: '/pricebookupdate',
        },
        {
            label: 'History',
            icon: <BarChart3 size={20} />,
            path: '#',
        },
        {
            label: 'Refer & Earn',
            icon: <DollarSign size={20} />,
            path: '#',
        },
    ];

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#2C3E50] text-white flex flex-col">
                <div className="px-4 py-5 border-b border-[#1F2F3D]">
                    <h1 className="text-xl font-semibold">ToolboxTechs</h1>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sideNavItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className="flex items-center text-sm p-2 hover:bg-[#34495E] rounded transition-colors"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-[#1F2F3D] text-xs">
                    ToolboxTechs Business Trial
                    <div>200 pages / month</div>
                    <div>Subscription Pages Left: 197</div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500">
                        <span>Home</span>
                        <span className="mx-2">/</span>
                        <span>PriceBook Updates</span>
                    </div>
                    {/* Search Input */}
                    <div className="mt-2 sm:mt-0">
                        <input
                            type="text"
                            placeholder="Search by code or description..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                {/* Bulk Action Buttons */}
                <div className="flex items-center space-x-2 mb-4">
                    <button
                        onClick={handleApproveSelected}
                        className="bg-[#4A69BD] text-white px-4 py-2 rounded hover:bg-[#3E5BA9]"
                    >
                        Update Selected
                    </button>
                    <button
                        onClick={handleDismissSelected}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Dismiss Selected
                    </button>
                </div>

                {/* Pricebook Table */}
                <div className="bg-white border rounded shadow p-4">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-10"></th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    onClick={() => handleSort('itemCode')}
                                >
                                    Item Code {getSortIcon('itemCode')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    onClick={() => handleSort('description')}
                                >
                                    Description {getSortIcon('description')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    onClick={() => handleSort('invoicePrice')}
                                >
                                    Invoice Price {getSortIcon('invoicePrice')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    onClick={() => handleSort('pricebookPrice')}
                                >
                                    Pricebook Cost {getSortIcon('pricebookPrice')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    onClick={() => handleSort('difference')}
                                >
                                    Difference {getSortIcon('difference')}
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {currentItems.map((item) => (
                                <CSSTransition key={item.id} timeout={500} classNames="fade">
                                    <tr className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="form-checkbox text-blue-600"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700 font-medium">
                                            {item.itemCode}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            {item.description}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            ${item.invoicePrice.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            ${item.pricebookPrice.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700 font-semibold">
                                            {formatDifference(item.invoicePrice, item.pricebookPrice)}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <button
                                                onClick={() => handleApprove(item.id)}
                                                className="bg-[#4A69BD] text-white px-3 py-1 rounded hover:bg-[#3E5BA9] mr-2"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDismiss(item.id)}
                                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                            >
                                                Dismiss
                                            </button>
                                        </td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`mx-1 px-3 py-1 border rounded ${currentPage === pageNumber
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
            </main>
            {/* Toast Notifications Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default PricebookUpdate;
