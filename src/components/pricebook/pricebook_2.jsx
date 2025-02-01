// pricebook_2.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    X,
    Building2,
    FileText,
    ScrollText,
    BarChart3,
    Image as ImageIcon,
    File,
    DollarSign
} from 'lucide-react';

const PriceBook = () => {
    // Whether the item config modal is open
    const [showModal, setShowModal] = useState(false);

    // Which item is selected (for the modal)
    const [selectedItem, setSelectedItem] = useState(null);

    // Table data
    const [items, setItems] = useState([
        {
            id: 1,
            invoiceNumber: 'INV1001',
            vendor: 'Vendor A',
            partNumber: 'P001',
            description: 'Product A Description',
            price: '$0.00',
            status: 'Pending'
        },
        {
            id: 2,
            invoiceNumber: 'INV1001',
            vendor: 'Vendor A',
            partNumber: 'P002',
            description: 'Product B Description',
            price: '$0.00',
            status: 'Pending'
        },
        {
            id: 3,
            invoiceNumber: 'INV1002',
            vendor: 'Vendor B',
            partNumber: 'P003',
            description: 'Product C Description',
            price: '$0.00',
            status: 'Pending'
        },
        {
            id: 4,
            invoiceNumber: 'INV1003',
            vendor: 'Vendor C',
            partNumber: 'P004',
            description: 'Product D Description',
            price: '$0.00',
            status: 'Pending'
        },
        {
            id: 5,
            invoiceNumber: 'INV-001',
            vendor: 'Vendor A',
            partNumber: 'P001',
            description: 'Product A from Invoice',
            price: '$200.00',
            status: 'Pending'
        },
        {
            id: 6,
            invoiceNumber: 'INV-002',
            vendor: 'Vendor B',
            partNumber: 'P002',
            description: 'Product B from Invoice',
            price: '$140.00',
            status: 'Pending'
        }
    ]);

    const sideNavItems = [
        {
            label: 'Pricebook Builder',
            icon: <FileText size={20} />,
            path: '/pricebook'
        },
        {
            label: 'Pricebook Update',
            icon: <ScrollText size={20} />,
            path: '/pricebookupdate'
        },
        {
            label: 'History',
            icon: <BarChart3 size={20} />,
            path: '#'
        },
        {
            label: 'Refer & Earn',
            icon: <DollarSign size={20} />,
            path: '#'
        },
    ];

    // "Approve" opens the modal
    const handleApproveClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // "Deny" removes the item (demo behavior)
    const handleDenyClick = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* --- Sidebar --- */}
            <aside className="w-64 bg-[#2C3E50] text-white flex flex-col">
                <div className="px-4 py-5 border-b border-[#1F2F3D]">
                    {/* You could put your brand logo or text here */}
                    <h1 className="text-xl font-semibold">DocuClipper</h1>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sideNavItems.map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="flex items-center text-sm p-2 hover:bg-[#34495E] rounded transition-colors"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </a>
                    ))}

                    {/* Download section */}
                    <div className="mt-6">
                        <h2 className="text-sm font-semibold mb-2 uppercase">Download</h2>
                        <a
                            href="#"
                            className="flex items-center text-sm p-2 hover:bg-[#34495E] rounded transition-colors"
                        >
                            <FileText size={20} />
                            <span className="ml-2">Converted Files</span>
                        </a>
                    </div>
                </nav>

                {/* (Optional) Footer or subscription info at bottom */}
                <div className="p-4 border-t border-[#1F2F3D] text-xs">
                    DocuClipper Business Trial
                    <div>200 pages / month</div>
                    <div>Subscription Pages Left: 177</div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-8">
                {/* Page header (breadcrumb, etc.) */}
                <div className="mb-4 text-sm text-gray-500">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>Price Book</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">Price Book Builder</h1>

                {/* Action buttons */}
                <div className="flex gap-2 mb-4">
                    <button className="bg-[#4A69BD] text-white py-2 px-4 rounded hover:bg-[#3E5BA9]">
                        Approve Selected
                    </button>
                    <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                        Deny Selected
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                        Refresh List
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">#</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Invoice Number</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Vendor</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Part Number</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Description</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Price</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b last:border-b-0">
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.id}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.invoiceNumber}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.vendor}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.partNumber}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.description}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.price}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">{item.status}</td>
                                    <td className="py-2 px-3 text-sm text-gray-700">
                                        <button
                                            onClick={() => handleApproveClick(item)}
                                            className="bg-[#4A69BD] text-white px-3 py-1 rounded hover:bg-[#3E5BA9] mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleDenyClick(item.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom buttons */}
                <div className="flex justify-end mt-4 space-x-2">
                    <button className="bg-[#4A69BD] text-white py-2 px-4 rounded hover:bg-[#3E5BA9]">
                        Submit All Approvals
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                        Cancel
                    </button>
                </div>
            </main>

            {/* --- Modal (Item Configuration Form) --- */}
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

                        {/* The form fields */}
                        <div className="space-y-4">
                            {/* Code */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Code</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.partNumber}
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                                <div className="text-xs text-gray-300 mt-1">(0/31 Characters)</div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                    rows="3"
                                ></textarea>
                            </div>

                            {/* Price Info */}
                            <h3 className="text-lg font-semibold mt-4">Price Information</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Member Price</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Add On Price</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Member Add On Price
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hours</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-black border rounded focus:outline-none"
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

                            {/* Modal Action Buttons */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-400 rounded text-white hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceBook;
