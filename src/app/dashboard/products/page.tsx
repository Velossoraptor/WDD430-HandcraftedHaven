"use client";

import React, { useState, ReactElement } from 'react';

// --- Type Definitions for strict TypeScript compliance ---
type ProductStatus = "Active" | "Draft" | "Low Stock";
type IconName = "PlusCircle" | "Edit" | "Trash2" | "Package";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
}

// --- Icon SVGs (Inline to avoid lucide-react dependency issues) ---
const Icon = ({ name, className = "w-5 h-5" }: { name: IconName, className?: string }) => {
    // Using ReactElement type explicitly to resolve JSX namespace issue
    const icons: Record<IconName, ReactElement> = { 
        PlusCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>,
        Edit: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L14.7 17.3 10 22l-5-5 5.3-5.3L17 3z"/></svg>,
        Trash2: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
        Package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="m21 12-9 5.15L3 12"/><path d="M3.29 7.37 12 12.5l8.71-5.13"/><path d="M12 22V12.5"/></svg>
    };
    return <span className={className}>{icons[name]}</span>;
};

// --- Mock Data ---
const initialProducts: Product[] = [
    {
        id: "P001",
        name: "Hand-Painted Ceramic Mug",
        category: "Pottery",
        price: 25.5,
        stock: 15,
        status: "Active",
    },
    {
        id: "P002",
        name: "Rustic Oak Cutting Board",
        category: "Woodwork",
        price: 55.0,
        stock: 3,
        status: "Low Stock",
    },
    {
        id: "P003",
        name: "Beaded Leather Bracelet",
        category: "Jewelry",
        price: 18.0,
        stock: 0,
        status: "Draft",
    },
    {
        id: "P004",
        name: "Lavender Scented Soap Bar",
        category: "Bath & Body",
        price: 7.99,
        stock: 40,
        status: "Active",
    },
];

// Helper Component for Status Badges
const StatusBadge = ({ status }: { status: ProductStatus }) => {
    let classes = "text-xs font-medium px-2 py-0.5 rounded-full ";
    const text = status;

    switch (status) {
        case "Active":
            classes += "bg-green-100 text-green-800";
            break;
        case "Draft":
            classes += "bg-gray-200 text-gray-700";
            break;
        case "Low Stock":
            classes += "bg-red-100 text-red-800";
            break;
        default:
            classes += "bg-gray-100 text-gray-600";
    }

    return <span className={classes}>{text}</span>;
};

// --- New Component to Isolate the Table Body ---
interface ProductTableBodyProps {
    products: Product[];
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
}

function ProductTableBody({ products, handleEdit, handleDelete }: ProductTableBodyProps) {
    return (
        <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product) => (
                <React.Fragment key={product.id}>
                    <tr className="hover:bg-amber-50 transition duration-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                            ${product.price.toFixed(2)}
                        </td>
                        <td 
                            className="px-6 py-4 whitespace-nowrap text-sm font-bold" 
                            style={{ color: product.stock <= 5 && product.stock > 0 ? '#cc3300' : 'inherit' }}
                        >
                            {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={product.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            {/* Edit Button */}
                            <button 
                                onClick={() => handleEdit(product.id)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`Edit ${product.name}`}
                            >
                                <Icon name="Edit" />
                            </button>
                            
                            {/* Delete Button */}
                            <button 
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label={`Delete ${product.name}`}
                            >
                                <Icon name="Trash2" />
                            </button>
                        </td>
                    </tr>
                </React.Fragment>
            ))}
        </tbody>
    );
}


// Main App Component
export default function App() {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // Placeholder actions
    const handleEdit = (id: string) => { 
        console.log(`Editing product: ${id}`); 
        // In a real app, this would open a modal or navigate to an edit form
    };
    
    const handleDelete = (id: string) => { 
        // Filter out the deleted item from the mock data
        setProducts(products.filter(p => p.id !== id));
        console.log(`Product with ID ${id} deleted.`);
    };

    const handleNewListing = () => {
        console.log('Navigating to new product form.');
        // In a real app, this would navigate to the creation view
    };

    return (
        <div className="p-4 md:p-8 space-y-6 bg-gray-50 min-h-screen font-sans">
            
            {/* Header and Actions */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-amber-100">
                <h1 className="text-2xl md:text-3xl font-extrabold text-amber-900 flex items-center mb-4 sm:mb-0">
                    <Icon name="Package" className="w-7 h-7 md:w-8 md:h-8 mr-3 text-amber-600" />
                    My Product Listings
                </h1>
                
                {/* Create New Product Button */}
                <button 
                    onClick={handleNewListing}
                    className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                >
                    <Icon name="PlusCircle" className="w-5 h-5 mr-2" />
                    New Listing
                </button>
            </header>

            {/* --- Product Table --- */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {/* Calling the new component */}
                        <ProductTableBody 
                            products={products} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    </table>
                </div>
                
                {/* Footer/Pagination Placeholder */}
                <div className="p-4 border-t text-sm text-gray-600 flex justify-between items-center bg-white">
                    <p>Total Products: {products.length}</p>
                    <p>Showing 1 to {products.length} results.</p>
                </div>
            </div>
        </div>
    );
}