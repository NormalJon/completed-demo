// src/components/pricebook/PricebookUpdate.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, FileText, ScrollText, BarChart3 } from 'lucide-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../styles/fade.css'; // Adjusted import path for fade.css

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
        {
            id: 4,
            itemCode: 'EXAMPLE1',
            description: 'Example Item 1',
            invoicePrice: 10.00,
            pricebookPrice: 9.50,
        },
        {
            id: 5,
            itemCode: 'EXAMPLE2',
            description: 'Example Item 2',
            invoicePrice: 20.00,
            pricebookPrice: 18.50,
        },
        {
            id: 6,
            itemCode: 'EXAMPLE3',
            description: 'Example Item 3',
            invoicePrice: 30.00,
            pricebookPrice: 25.00,
        },
        // Add more items if needed...
    ]);

    // Track selected row IDs for bulk actions
    const [selectedIds, setSelectedIds] = useState([]);

    // Pagination state: current page and items per page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate indexes for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Toggle a row’s checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    // Approve (update) an individual item: animate and then remove it from the list
    const handleApprove = (id) => {
        // (Optional: Insert API call or update logic here)
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSelectedIds((prevSelected) =>
            prevSelected.filter((itemId) => itemId !== id)
        );
    };

    // Dismiss an individual item
    const handleDismiss = (id) => {
        // (Optional: Insert dismiss logic here)
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSelectedIds((prevSelected) =>
            prevSelected.filter((itemId) => itemId !== id)
        );
    };

    // Bulk update (approve) all selected items
    const handleApproveSelected = () => {
        setItems((prevItems) =>
            prevItems.filter((item) => !selectedIds.includes(item.id))
        );
        setSelectedIds([]);
    };

    // Bulk dismiss all selected items
    const handleDismissSelected = () => {
        setItems((prevItems) =>
            prevItems.filter((item) => !selectedIds.includes(item.id))
        );
        setSelectedIds([]);
    };

    // Format the price difference with color coding
    function formatDifference(invoice, pricebook) {
        const diff = invoice - pricebook;
        const absDiff = Math.abs(diff).toFixed(2);

        if (diff > 0) {
            return <span className="text-green-600 font-semibold">+${absDiff}</span>;
        } else if (diff < 0) {
            return <span className="text-red-500 font-semibold">-${absDiff}</span>;
        }
        return <span>$0.00</span>;
    }

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
                <div className="mb-4 text-sm text-gray-500">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>PriceBook Updates</span>
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
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Item Code
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Description
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Invoice Price
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Pricebook Cost
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Difference
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {currentItems.map((item) => {
                                const isSelected = selectedIds.includes(item.id);
                                return (
                                    <CSSTransition key={item.id} timeout={500} classNames="fade">
                                        <tr
                                            className={`border-t ${isSelected ? 'bg-gray-50' : 'bg-white'
                                                } hover:bg-gray-50`}
                                        >
                                            <td className="py-3 px-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
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
                                );
                            })}
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
        </div>
    );
}

export default PricebookUpdate;
