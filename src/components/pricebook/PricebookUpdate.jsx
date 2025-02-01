// PricebookUpdate.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import {
    Building2,
    FileText,
    ScrollText,
    BarChart3,
    Image as ImageIcon,
    File
} from 'lucide-react';

function PricebookUpdate() {
    // Example data
    const [items, setItems] = useState([
        {
            id: 1,
            itemCode: 'BR1701DVXR',
            description: 'ABS-1/2x3/8x3/8 dual angle stop brass',
            invoicePrice: 64.03,
            pricebookPrice: 59.44
        },
        {
            id: 2,
            itemCode: 'FNWX410CH',
            description: '1 1/4" Ball Valve IP 1-1/2',
            invoicePrice: 52.10,
            pricebookPrice: 39.37
        },
        {
            id: 2,
            itemCode: 'IBRLF4D',
            description: '1/2" Brass 45',
            invoicePrice: 6.99,
            pricebookPrice: 7.59
        }
    ]);

    // Track which rows are selected
    const [selectedIds, setSelectedIds] = useState([]);

    // Toggle a row’s checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    // Approve / Dismiss (per-row)
    const handleApprove = (id) => {
        console.log(`Approved item: ${id}`);
        // Add your logic here (e.g., remove item or open a modal)
    };

    const handleDismiss = (id) => {
        console.log(`Dismissed item: ${id}`);
        // Add your logic here
    };

    // Approve / Dismiss selected
    const handleApproveSelected = () => {
        console.log('Approve selected:', selectedIds);
        // Add your logic here
    };

    const handleDismissSelected = () => {
        console.log('Dismiss selected:', selectedIds);
        // Add your logic here
    };

    // Format difference in green if positive, red if negative
    function formatDifference(invoice, pricebook) {
        const diff = invoice - pricebook;
        const absDiff = Math.abs(diff).toFixed(2);

        if (diff > 0) {
            return <span className="text-green-600 font-semibold">+${absDiff}</span>;
        } else if (diff < 0) {
            return <span className="text-red-500 font-semibold">-${absDiff}</span>;
        }
        return <span>$0.00</span>;
    };

    // Sidebar items (Links to your three pages)
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
                    <div>Subscription Pages Left: 197</div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-8">
                {/* Header / Title */}
                <h1 className="text-2xl font-bold mb-4 text-gray-700">Pricing Discrepancies</h1>

                {/* Approve / Dismiss Buttons */}
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

                {/* Table container */}
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
                        <tbody>
                            {items.map((item) => {
                                const isSelected = selectedIds.includes(item.id);
                                return (
                                    <tr
                                        key={item.id}
                                        className={`border-t ${isSelected ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-gray-50`}
                                    >
                                        {/* Checkbox */}
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default PricebookUpdate;
