// src/PriceBook.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import {
    X,
    Building2,
    FileText,
    ScrollText,
    BarChart3,
    Image as ImageIcon,
    File
} from 'lucide-react';

const PriceBook = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Example data
    const [items, setItems] = useState([
        {
            id: 33,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'FNWX410CH',
            description: '1 1/4" Ball Valve IP 1-1/2',
            price: '$52.10',
            status: 'Pending'
        },
        {
            id: 20,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'BR1701DVXR',
            description: 'ABS-1/2x3/8x3/8 dual angle stop brass',
            price: '$64.03',
            status: 'Pending'
        },
        {
            id: 17,
            invoiceNumber: '89848124528',
            vendor: 'Emco',
            partNumber: 'IBRLF4D',
            description: '1/2" Brass 45',
            price: '$6.99',
            status: 'Pending'
        }
    ]);

    // "Approve" -> open modal
    const handleApproveClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // "Deny" -> remove row (demo only)
    const handleDenyClick = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // The sidebar items you mentioned:
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
        }
    ];

    return (
        <div className="flex min-h-screen bg-white">
            {/* --- Sidebar --- */}
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
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-8">
                <div className="mb-4 text-sm text-gray-500">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>Price Book</span>
                </div>
                <h1 className="text-2xl font-bold mb-6">Price Book Builder</h1>

                {/* Buttons */}
                <div className="flex gap-2 mb-4">
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                        Refresh List
                    </button>
                </div>

                {/* --- Updated Table Container --- */}
                <div className="bg-white border rounded shadow p-4">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Invoice Number
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Vendor
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Part Number
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Description
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Price
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50"
                                >
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
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
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                                <div className="text-xs text-gray-300 mt-1">(0/31 Characters)</div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Name</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.partNumber}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Description</label>
                                <textarea
                                    defaultValue={selectedItem.description}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                    rows="3"
                                />
                            </div>

                            {/* Price Info */}
                            <h3 className="text-lg font-semibold mt-4 text-gray-200">Price Information</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Member Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Add On Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Add On Member Price</label>
                                <input
                                    type="text"
                                    defaultValue={selectedItem.price}
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
                                />
                            </div>

                            {/* Hours */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-200">Hours</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 
                       bg-gray-700 text-gray-100 
                       border border-gray-600 rounded 
                       focus:outline-none"
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
