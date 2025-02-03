//src//utils//DocConverter.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // <-- Make sure to import Link
import {
    Building2,
    FileText,
    ScrollText,
    BarChart3,
    Image as ImageIcon,
    File
} from 'lucide-react';

const DocConverter = () => {
    // Sidebar items:
    // - Some are anchors (href="#") if they don't link anywhere yet.
    // - One item uses <Link> to "/pricebook" for the Pricebook Builder.
    const sideNavItems = [
        {
            icon: <Building2 size={20} />,
            label: 'Pricebook Update',
            path: '/PricebookUpdate',
            isLink: true
        },
        {
            icon: <FileText size={20} />,
            label: 'Invoices & Receipts',
            path: '#',
            isLink: false
        },
        {
            icon: <ScrollText size={20} />,
            label: 'Tax Forms',
            path: '#',
            isLink: false
        },
        {
            icon: <BarChart3 size={20} />,
            label: 'Pricebook Builder',
            path: '/pricebook', // route to your PriceBook page
            isLink: true        // indicates we use a <Link>
        },
        {
            icon: <ImageIcon size={20} />,
            label: 'Check Images',
            path: '#',
            isLink: false
        },
        {
            icon: <File size={20} />,
            label: 'Other Documents',
            path: '#',
            isLink: false
        }
    ];

    return (
        <div className="flex min-h-screen bg-white">
            {/* --- Sidebar --- */}
            <aside className="w-64 bg-[#2C3E50] text-white flex flex-col">
                <div className="px-4 py-5 border-b border-[#1F2F3D]">
                    {/* Put your brand/logo text here if you want */}
                    <h1 className="text-xl font-semibold">DocuClipper</h1>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sideNavItems.map((item, i) => {
                        // If it's the Pricebook Builder, we use Link
                        if (item.isLink) {
                            return (
                                <Link
                                    key={i}
                                    to={item.path}
                                    className="flex items-center text-sm p-2 hover:bg-[#34495E] rounded transition-colors"
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            );
                        }

                        // Otherwise, a normal anchor link
                        return (
                            <a
                                key={i}
                                href={item.path}
                                className="flex items-center text-sm p-2 hover:bg-[#34495E] rounded transition-colors"
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </a>
                        );
                    })}

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

                {/* Optional Footer or subscription info */}
                <div className="p-4 border-t border-[#1F2F3D] text-xs">
                    DocuClipper Business Trial
                    <div>200 pages / month</div>
                    <div>Subscription Pages Left: 177</div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-8">
                {/* Breadcrumb or header */}
                <div className="mb-4 text-sm text-gray-500">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>Convert Documents</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">Convert PDF Documents</h1>

                {/* Two-column layout: Left is PDF conversions, Right is CSV import */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Left column: PDF Documents */}
                    <div>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: <Building2 size={24} />,
                                    title: 'Bank & Credit Card Statements'
                                },
                                {
                                    icon: <FileText size={24} />,
                                    title: 'Invoices & Receipts'
                                },
                                {
                                    icon: <ScrollText size={24} />,
                                    title: 'Tax Forms'
                                },
                                {
                                    icon: <BarChart3 size={24} />,
                                    title: 'Brokerage Statements'
                                },
                                {
                                    icon: <ImageIcon size={24} />,
                                    title: 'Check Images'
                                },
                                {
                                    icon: <File size={24} />,
                                    title: 'Other documents'
                                }
                            ].map((doc, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center text-gray-700">
                                        <span className="text-gray-600 mr-3">{doc.icon}</span>
                                        <span className="font-medium">{doc.title}</span>
                                    </div>
                                    <button className="px-4 py-2 bg-[#4A69BD] text-white rounded hover:bg-[#3E5BA9] transition-colors">
                                        Convert
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column: CSV Import */}
                    <div>
                        <div className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-700">
                                    <FileText size={20} className="text-gray-600 mr-3" />
                                    <span className="font-medium">CSV file</span>
                                </div>
                                <button className="px-4 py-2 bg-[#4A69BD] text-white rounded hover:bg-[#3E5BA9] transition-colors">
                                    Import
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DocConverter;
