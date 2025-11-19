// This file is located at: src/app/dashboard/orders/[id]/page.tsx
'use client';

// Package and useRouter removed to resolve TS6133 warnings
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'; 
import DashboardLayout from '@/app/layout/DashboardLayout';
import { useParams } from 'next/navigation'; 
import React, { useState } from 'react';
import Link from 'next/link';

// --- Mock Data ---
interface OrderDetail {
    id: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
    items: { name: string; quantity: number; price: number; }[];
    subtotal: number;
    shippingCost: number;
    total: number;
}

// Mock function to fetch order details based on ID
const fetchOrderDetails = (id: string): OrderDetail | null => {
    // In a real app, this would be an API call
    if (id === 'HH1003') {
        return {
            id: 'HH1003',
            customerName: 'Olivia M.',
            customerEmail: 'olivia.m@example.com',
            shippingAddress: '123 Craftsman Way, Artisan City, CA 90210',
            status: 'Processing',
            items: [
                { name: 'Rustic Wooden Bowl (Large)', quantity: 1, price: 120.00 },
                { name: 'Spoon Carving Kit', quantity: 1, price: 35.00 },
            ],
            subtotal: 155.00,
            shippingCost: 15.00,
            total: 170.00,
        };
    }
    return null; 
};

export default function OrderDetailsPage() {
    const params = useParams();
    
    // Safety check for dynamic route parameter resolution
    const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    // 🛑 FIX for TS2345: Initialize and conditionally fetch
    let order: OrderDetail | null = null;
    if (orderId && typeof orderId === 'string') {
        order = fetchOrderDetails(orderId);
    }
    
    const [currentStatus, setCurrentStatus] = useState(order?.status || 'Pending');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!order) {
        return (
            <DashboardLayout>
                <div className="p-6 md:p-10 text-center">
                    <h1 className="text-2xl text-red-600">Order #{orderId || 'Unknown'} not found.</h1>
                    <Link href="/dashboard/orders" className="mt-4 text-amber-700 hover:underline flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const handleUpdateStatus = (newStatus: OrderDetail['status']) => {
        setIsUpdating(true);
        // Simulate API call to update status
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        
        setTimeout(() => {
            setCurrentStatus(newStatus);
            setIsUpdating(false);
        }, 1000);
    };

    const getStatusStyle = (status: string) => {
        if (status === 'Shipped') return 'text-green-600 bg-green-50';
        if (status === 'Processing') return 'text-blue-600 bg-blue-50';
        if (status === 'Pending') return 'text-red-600 bg-red-50';
        if (status === 'Delivered') return 'text-gray-600 bg-gray-50';
        return 'text-gray-500';
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-10 space-y-8 bg-gray-50">
                
                {/* Header and Back Button */}
                <header className="flex justify-between items-center pb-4 border-b">
                    <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
                        Order Details: #{orderId}
                    </h1>
                    <Link href="/dashboard/orders" className="text-amber-700 hover:text-amber-900 flex items-center transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Column 1 & 2: Order Items and Status */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Order Status Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Status & Actions</h2>
                            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300">
                                <span className="text-lg font-bold">Current Status:</span>
                                <span className={`text-lg font-bold px-4 py-2 rounded-full ${getStatusStyle(currentStatus)}`}>
                                    {currentStatus}
                                </span>
                            </div>

                            {/* Status Update Buttons */}
                            <div className="mt-6 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row">
                                {currentStatus === 'Pending' && (
                                    <button 
                                        onClick={() => handleUpdateStatus('Processing')}
                                        disabled={isUpdating}
                                        className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
                                    >
                                        {isUpdating ? 'Updating...' : 'Start Processing'}
                                    </button>
                                )}
                                {currentStatus === 'Processing' && (
                                    <button 
                                        onClick={() => handleUpdateStatus('Shipped')}
                                        disabled={isUpdating}
                                        className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {isUpdating ? 'Updating...' : 'Mark as Shipped'}
                                    </button>
                                )}
                                {currentStatus === 'Shipped' && (
                                    <span className="text-gray-500 font-medium py-2 px-4">Awaiting customer delivery confirmation.</span>
                                )}
                                {currentStatus === 'Delivered' && (
                                    <span className="text-green-700 font-medium py-2 px-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2" /> Order Completed.
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Order Items Table */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Items ({order.items.length})</h2>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-3">
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                        <span className="text-gray-600">{item.quantity} x ${item.price.toFixed(2)}</span>
                                        <span className="font-bold text-gray-800">${(item.quantity * item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 mt-4 border-t border-dashed border-gray-200 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span>${order.subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-sm text-gray-600"><span>Shipping:</span><span>${order.shippingCost.toFixed(2)}</span></div>
                                <div className="flex justify-between text-lg font-bold text-gray-900"><span>Total:</span><span>${order.total.toFixed(2)}</span></div>
                            </div>
                        </div>

                    </div>
                    
                    {/* Column 3: Shipping & Customer Info */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        {/* Shipping Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Details</h2>
                            <p className="font-medium text-gray-900 mb-2">{order.customerName}</p>
                            <address className="text-gray-700 not-italic leading-relaxed">
                                {order.shippingAddress.split(', ').map((line, i) => <span key={i} className="block">{line}</span>)}
                                <span className="block mt-2 font-mono text-sm">Tracking #: ABC123XYZ</span>
                            </address>
                        </div>
                        
                        {/* Customer Card */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Contact</h2>
                            <p className="text-gray-700">Email: {order.customerEmail}</p>
                            <button className="mt-3 text-sm text-blue-600 hover:underline">Message Customer</button>
                        </div>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}