// src/components/pricebook/pricebook_2.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign,
    X,
    FileText,
    ScrollText,
    BarChart3,
    File,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import { ChevronDown } from 'lucide-react';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/fade.css'; // Ensure this path is correct

const PriceBook = () => {
    // State for modal and selected item
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    // Example data; note that 'price' is stored as a string (with a '$' sign)
    const [items, setItems] = useState([
        {
            id: 33,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'FNWX410CH',
            description: '1 1/4" Ball Valve IP 1-1/2',
            price: '$52.10',
            status: 'Pending',
        },
        {
            id: 20,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'BR1701DVXR',
            description: 'ABS-1/2x3/8x3/8 dual angle stop brass',
            price: '$64.03',
            status: 'Pending',
        },
        {
            id: 17,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'IBRLF4D',
            description: '1/2" Brass 45',
            price: '$6.99',
            status: 'Pending',
        },
        // Additional sample items for pagination
        {
            id: 18,
            invoiceNumber: '1234567890',
            vendor: 'Mitsubushi',
            partNumber: 'PX123456',
            description: 'Example Product 1',
            price: '$10.00',
            status: 'Pending',
        },
        {
            id: 19,
            invoiceNumber: '0987654321',
            vendor: 'Andrew Sheret',
            partNumber: 'PY987654',
            description: 'Example Product 2',
            price: '$20.00',
            status: 'Pending',
        },
        {
            id: 21,
            invoiceNumber: '1111111111',
            vendor: 'RSL',
            partNumber: 'PZ111111',
            description: 'Example Product 3',
            price: '$30.00',
            status: 'Pending',
        },
    ]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Search/filter state
    const [searchTerm, setSearchTerm] = useState('');

    // Sorting state: sortConfig.key can be one of the column keys and direction is either 'ascending' or 'descending'
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Handler for sorting when a header is clicked
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        toast.info(`Sorted by ${key} (${direction})`);
    };

    // Helper to return an arrow icon if the column is active for sorting
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

    // Compute the filtered and sorted items using useMemo
    const filteredSortedItems = useMemo(() => {
        let filtered = items;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter((item) =>
                item.invoiceNumber.toLowerCase().includes(lowerSearch) ||
                item.vendor.toLowerCase().includes(lowerSearch) ||
                item.partNumber.toLowerCase().includes(lowerSearch) ||
                item.description.toLowerCase().includes(lowerSearch)
            );
        }
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aVal, bVal;
                // For price, remove the '$' sign and convert to number
                if (sortConfig.key === 'price') {
                    aVal = parseFloat(a.price.replace('$', ''));
                    bVal = parseFloat(b.price.replace('$', ''));
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

    // Pagination calculations based on the filtered/sorted items
    const totalPages = Math.ceil(filteredSortedItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSortedItems.slice(indexOfFirstItem, indexOfLastItem);

    // "Approve" action: open modal to configure item
    const handleApproveClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // "Deny" action: remove item (with fade-out transition)
    const handleDenyClick = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.warn('Item dismissed and removed');
    };

    // New handler for approving an item from the modal.
    // When clicked, the selected item is removed from the list and the modal is closed.
    const handleModalApprove = () => {
        if (selectedItem) {
            setItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
            toast.success('Item approved and removed');
            setShowModal(false);
            setSelectedItem(null);
        }
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
                    <div>Subscription Pages Left: 177</div>
                </div>
                {/* User Login Dropdown Section */}
                <div className="relative p-4 border-t border-[#1F2F3D] text-xs">
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    >
                        <span className="font-semibold">Demo User</span>
                        <ChevronDown size={16} className="ml-2" />
                    </div>
                    {userDropdownOpen && (
                        <div className="absolute left-0 bottom-full mb-2 w-full bg-white text-gray-700 rounded shadow-lg">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help Center</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500">
                        <span>Home</span>
                        <span className="mx-2">/</span>
                        <span>Price Book</span>
                    </div>
                    {/* Search Input */}
                    <div className="mt-2 sm:mt-0">
                        <input
                            type="text"
                            placeholder="Search by invoice, vendor, part or description..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-6">Price Book Builder</h1>

                {/* Buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => toast.info('Refreshing list...')}
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                    >
                        Refresh List
                    </button>
                </div>

                {/* Table Container with Fixed Sizing and Fade Transitions */}
                <div
                    className="bg-white border rounded shadow p-4 overflow-x-auto"
                    style={{ minWidth: '1000px' }}
                >
                    <table
                        className="w-full text-left border-collapse"
                        style={{ tableLayout: 'fixed' }}
                    >
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-10">#</th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '150px' }}
                                    onClick={() => handleSort('invoiceNumber')}
                                >
                                    Invoice Number {getSortIcon('invoiceNumber')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '150px' }}
                                    onClick={() => handleSort('vendor')}
                                >
                                    Vendor {getSortIcon('vendor')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '150px' }}
                                    onClick={() => handleSort('partNumber')}
                                >
                                    Part Number {getSortIcon('partNumber')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '250px' }}
                                    onClick={() => handleSort('description')}
                                >
                                    Description {getSortIcon('description')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '150px' }}
                                    onClick={() => handleSort('price')}
                                >
                                    Price {getSortIcon('price')}
                                </th>
                                <th
                                    className="py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer"
                                    style={{ width: '150px' }}
                                    onClick={() => handleSort('status')}
                                >
                                    Status {getSortIcon('status')}
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600" style={{ width: '200px' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {currentItems.map((item) => (
                                <CSSTransition key={item.id} timeout={500} classNames="fade">
                                    <tr className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.id}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.invoiceNumber}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.vendor}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.partNumber}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.description}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.price}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{item.status}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <button
                                                onClick={() => handleApproveClick(item)}
                                                className="bg-[#4A69BD] text-white px-3 py-1 rounded hover:bg-[#3E5BA9] mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDenyClick(item.id)}
                                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                            >
                                                Deny
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

            {/* Modal for Item Configuration */}
            {showModal && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Item Configuration Form</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        {/* Form fields */}
                        <div className="space-y-4">
                            {/* Code / Part Number */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Code</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.partNumber}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                                <div className="text-xs text-gray-300 mt-1">(0/31 Characters)</div>
                            </div>
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Name</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.partNumber}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Description</label>
                                <textarea
                                    defaultValue={selectedItem.description}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                    rows="3"
                                />
                            </div>
                            {/* Price Information */}
                            <h3 className="text-lg font-semibold mt-4 text-gray-200">Price Information</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Member Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Add On Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Add On Member Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">
                                    Material or Equipment?
                                </label>
                                <select className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none">
                                    <option value="material">Material</option>
                                    <option value="equipment">Equipment</option>
                                </select>
                            </div>

                            {/* Hours */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Hours</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none"
                                />
                            </div>
                            {/* Options */}
                            <h3 className="text-lg font-semibold mt-4">Options</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-black" />
                                    <span className="ml-2">Taxable</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-black" />
                                    <span className="ml-2">Deduct as job cost</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-black" />
                                    <span className="ml-2">Allow Membership Discounts</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-black" />
                                    <span className="ml-2">
                                        Automatically replenish this item as it is used on invoices
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-black" />
                                    <span className="ml-2">Exclude from Pricebook Wizard</span>
                                </label>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-400 rounded text-white hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                {/* Updated Approve Button in Modal */}
                                <button
                                    onClick={handleModalApprove}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Toast Notifications Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default PriceBook;
