'use client'
import React, { useState } from 'react';
import { 
    ArrowLeft, Send, CheckCircle, Package, Star
    // User icon removed as the generic header/footer is gone
} from 'lucide-react';

// --- Mock Data & Types ---
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

const mockOrders: OrderDetail[] = [
    {
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
    },
    {
        id: 'HH1002',
        customerName: 'Ethan T.',
        customerEmail: 'ethan.t@example.com',
        shippingAddress: '45 Pine Lane, Woodville, OR 97204',
        status: 'Delivered',
        items: [{ name: 'Leather Apron', quantity: 1, price: 75.00 }],
        subtotal: 75.00,
        shippingCost: 10.00,
        total: 85.00,
    },
    {
        id: 'HH1001',
        customerName: 'Sophia R.',
        customerEmail: 'sophia.r@example.com',
        shippingAddress: '70 Willow St, Brooklyn, NY 11201',
        status: 'Pending',
        items: [{ name: 'Ceramic Mug Set (4)', quantity: 1, price: 50.00 }],
        subtotal: 50.00,
        shippingCost: 8.00,
        total: 58.00,
    },
];

const fetchOrderDetails = (id: string): OrderDetail | null => {
    return mockOrders.find(order => order.id === id) || null;
};

// Helper function for status styling
const getStatusStyle = (status: string) => {
    if (status === 'Shipped') return 'text-green-600 bg-green-100';
    if (status === 'Processing') return 'text-blue-600 bg-blue-100';
    if (status === 'Pending') return 'text-red-600 bg-red-100';
    if (status === 'Delivered') return 'text-gray-600 bg-gray-100';
    return 'text-gray-500';
};

// --- Order List Component ---
const OrderList = ({ onViewDetails }: { onViewDetails: (id: string) => void }) => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 border-gray-300">
                    Order Management Dashboard
                </h1>
                
                <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-amber-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => onViewDetails(order.id)}
                                            className="text-amber-600 hover:text-amber-800 font-medium transition duration-150"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Order Details Component ---
const OrderDetailsPage = ({ orderId, onBack }: { orderId: string, onBack: () => void }) => {
    
    // Simulate data fetching
    const initialOrder = fetchOrderDetails(orderId);
    
    // State to manage status and UI changes
    const [order, setOrder] = useState<OrderDetail | null>(initialOrder);
    const [currentStatus, setCurrentStatus] = useState(initialOrder?.status || 'Pending');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8 flex justify-center items-start">
                <div className="max-w-4xl w-full p-6 md:p-10 text-center bg-white rounded-xl shadow-lg mt-10">
                    <h1 className="text-2xl text-red-600 font-bold">Order #{orderId || 'Unknown'} not found.</h1>
                    <button onClick={onBack} className="mt-4 text-amber-700 hover:underline flex items-center justify-center mx-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const handleUpdateStatus = (newStatus: OrderDetail['status']) => {
        setIsUpdating(true);
        // Simulate API call to update status
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        
        setTimeout(() => {
            setCurrentStatus(newStatus);
            setOrder(prev => prev ? ({ ...prev, status: newStatus }) : null);
            setIsUpdating(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow-2xl">
                    
                    {/* Header and Back Button */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
                        <h1 className="text-3xl font-extrabold text-amber-900 flex items-center mb-4 sm:mb-0">
                            Order Details: <span className="text-amber-600 ml-2">#{orderId}</span>
                        </h1>
                        <button onClick={onBack} className="text-gray-500 hover:text-amber-700 flex items-center transition font-medium text-sm">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                        </button>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Column 1 & 2: Order Items and Status */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Order Status Card */}
                            <div className="p-6 rounded-xl border-2 border-amber-100 bg-amber-50">
                                <h2 className="text-xl font-bold mb-4 text-amber-800">Order Status & Actions</h2>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border-2 border-dashed border-amber-300 bg-white">
                                    <span className="text-lg font-bold mb-2 sm:mb-0 text-gray-700">Current Status:</span>
                                    <span className={`text-lg font-extrabold px-4 py-2 rounded-full shadow-md ${getStatusStyle(currentStatus)}`}>
                                        {currentStatus}
                                    </span>
                                </div>

                                {/* Status Update Buttons */}
                                <div className="mt-6 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row">
                                    {currentStatus === 'Pending' && (
                                        <button 
                                            onClick={() => handleUpdateStatus('Processing')}
                                            disabled={isUpdating}
                                            className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-150 shadow-md hover:shadow-lg disabled:opacity-50"
                                        >
                                            <Package className="w-5 h-5 mr-2" />
                                            {isUpdating ? 'Processing...' : 'Start Processing'}
                                        </button>
                                    )}
                                    {currentStatus === 'Processing' && (
                                        <button 
                                            onClick={() => handleUpdateStatus('Shipped')}
                                            disabled={isUpdating}
                                            className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-150 shadow-md hover:shadow-lg disabled:opacity-50"
                                        >
                                            <Send className="w-5 h-5 mr-2" />
                                            {isUpdating ? 'Shipping...' : 'Mark as Shipped'}
                                        </button>
                                    )}
                                    {currentStatus === 'Shipped' && (
                                        <span className="text-gray-500 font-medium py-2 px-4 flex items-center">
                                            <Star className="w-5 h-5 mr-2 text-yellow-500" /> Awaiting delivery confirmation.
                                        </span>
                                    )}
                                    {currentStatus === 'Delivered' && (
                                        <span className="text-green-700 font-bold py-2 px-4 flex items-center">
                                            <CheckCircle className="w-5 h-5 mr-2" /> Order Completed.
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Order Items Table */}
                            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Items ({order.items.length})</h2>
                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-3">
                                            <span className="font-medium text-gray-900 w-1/2">{item.name}</span>
                                            <span className="text-gray-600 w-1/4 text-center font-mono text-sm">{item.quantity} x ${item.price.toFixed(2)}</span>
                                            <span className="font-bold text-gray-800 w-1/4 text-right font-mono">${(item.quantity * item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 mt-4 border-t border-dashed border-gray-200 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span className="font-mono">${order.subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-sm text-gray-600"><span>Shipping:</span><span className="font-mono">${order.shippingCost.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-xl font-extrabold text-amber-900 pt-3"><span>TOTAL:</span><span className="font-mono">${order.total.toFixed(2)}</span></div>
                                </div>
                            </div>

                        </div>
                        
                        {/* Column 3: Shipping & Customer Info */}
                        <div className="lg:col-span-1 space-y-8">
                            
                            {/* Shipping Card */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Details</h2>
                                <p className="font-bold text-gray-900 mb-2">{order.customerName}</p>
                                <address className="text-gray-700 not-italic leading-relaxed text-sm">
                                    {order.shippingAddress.split(', ').map((line, i) => <span key={i} className="block">{line}</span>)}
                                    <span className="block mt-3 font-mono text-sm text-amber-700 font-semibold border-t pt-2">Tracking #: ABC123XYZ</span>
                                </address>
                            </div>
                            
                            {/* Customer Card */}
                            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Contact</h2>
                                <p className="text-gray-700 truncate text-sm">Email: <a href={`mailto:${order.customerEmail}`} className="text-blue-600 hover:text-blue-800 font-medium">{order.customerEmail}</a></p>
                                <button className="mt-3 text-sm text-blue-600 hover:underline border border-blue-200 px-3 py-1 rounded transition duration-150">
                                    Message Customer
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Application Component (Handles Routing/State) ---
export default function App() {
    // currentView: 'list' (OrderList) or 'details' (OrderDetailsPage)
    const [currentView, setCurrentView] = useState('list');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleViewDetails = (id: string) => {
        setSelectedOrderId(id);
        setCurrentView('details');
    };

    const handleBack = () => {
        setSelectedOrderId(null);
        setCurrentView('list');
    };

    if (currentView === 'details' && selectedOrderId) {
        // Renders the details page
        return <OrderDetailsPage orderId={selectedOrderId} onBack={handleBack} />;
    }

    // Default to list view
    return <OrderList onViewDetails={handleViewDetails} />;
}