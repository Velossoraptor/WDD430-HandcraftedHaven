import React, { useState } from 'react';
import { 
    ArrowLeft, Send, CheckCircle, Package, User, 
    LayoutDashboard, List, Settings, LogOut, CreditCard, Star, DollarSign, Zap
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

// --- Sidebar Component (Consolidated Navigation) ---
const DashboardSidebar = ({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) => {
    
    // Consolidated nav items matching the user's desired structure
    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, view: 'overview' },
        { name: 'Products', icon: Package, view: 'products' },
        { name: 'Orders', icon: List, view: 'orders' },
        { name: 'Reviews', icon: Star, view: 'reviews' },
        { name: 'Profile', icon: User, view: 'profile' },
        { name: 'Billing', icon: CreditCard, view: 'billing' },
        { name: 'Settings', icon: Settings, view: 'settings' },
    ];

    return (
        <nav className="bg-gray-800 text-white w-64 flex-col justify-between hidden md:flex min-h-screen fixed">
            <div className="p-6 space-y-8">
                {/* Logo/Title */}
                <div className="text-2xl font-extrabold text-amber-400 border-b pb-4 border-gray-700">
                    Handcrafted Haven
                </div>

                {/* Navigation Links */}
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        // Highlight 'Orders' if we are on the 'details' page
                        const isActive = item.view === currentView || (currentView === 'details' && item.view === 'orders');
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => onViewChange(item.view)}
                                    className={`w-full flex items-center p-3 rounded-lg transition duration-150 ${
                                        isActive 
                                        ? 'bg-amber-600 text-white shadow-md' 
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            {/* User/Logout */}
            <div className="p-6 border-t border-gray-700">
                 <button className="w-full flex items-center p-3 text-red-400 hover:bg-gray-700 rounded-lg transition duration-150">
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Sign out</span>
                </button>
            </div>
        </nav>
    );
};

// --- Dashboard Layout Component ---
const DashboardLayout = ({ children, title, currentView, onViewChange }: { 
    children: React.ReactNode, 
    title: string,
    currentView: string,
    onViewChange: (view: string) => void
}) => (
    <div className="min-h-screen bg-gray-100 font-sans flex">
        
        {/* Sidebar - The one and only navigation bar */}
        <DashboardSidebar currentView={currentView} onViewChange={onViewChange} />
        
        {/* Main Content Area */}
        <div className="flex-1 md:ml-64 flex flex-col">
            
            {/* Top Header */}
            <header className="bg-white shadow-sm p-4 sticky top-0 z-10 border-b">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <User className="w-6 h-6" />
                        <span className="text-sm font-medium hidden sm:block">Admin</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="p-4 text-center text-xs text-gray-500 border-t mt-auto">
                Handcrafted Haven Dashboard System
            </footer>
        </div>
    </div>
);

// --- Dashboard 1: Order List Component (Fulfillment View) ---
const OrderList = ({ onViewDetails }: { onViewDetails: (id: string) => void }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Recent Orders Overview</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-amber-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-800">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => onViewDetails(order.id)}
                                        className="text-blue-600 hover:text-blue-900 font-medium"
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
    );
};

// --- Dashboard 2: Order Details Component ---
const OrderDetailsPage = ({ orderId, onBack }: { orderId: string, onBack: () => void }) => {
    
    // Simulate data fetching
    const initialOrder = fetchOrderDetails(orderId);
    
    // State to manage status and UI changes
    const [order, setOrder] = useState<OrderDetail | null>(initialOrder);
    const [currentStatus, setCurrentStatus] = useState(initialOrder?.status || 'Pending');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!order) {
        return (
            <div className="p-6 md:p-10 text-center bg-white rounded-xl shadow-lg">
                <h1 className="text-2xl text-red-600 font-bold">Order #{orderId || 'Unknown'} not found.</h1>
                <button onClick={onBack} className="mt-4 text-amber-700 hover:underline flex items-center justify-center mx-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                </button>
            </div>
        );
    }

    const handleUpdateStatus = (newStatus: OrderDetail['status']) => {
        setIsUpdating(true);
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        
        setTimeout(() => {
            setCurrentStatus(newStatus);
            setOrder(prev => prev ? ({ ...prev, status: newStatus }) : null);
            setIsUpdating(false);
        }, 1000);
    };

    return (
        <div className="space-y-8 bg-white p-6 rounded-xl shadow-lg">
            
            {/* Header and Back Button */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold text-amber-900 flex items-center mb-4 sm:mb-0">
                    Order Details: #{orderId}
                </h1>
                <button onClick={onBack} className="text-amber-700 hover:text-amber-900 flex items-center transition font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Order Status Card */}
                    <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Status & Actions</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300">
                            <span className="text-lg font-bold mb-2 sm:mb-0">Current Status:</span>
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
                                    className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 disabled:opacity-50"
                                >
                                    <DollarSign className="w-5 h-5 mr-2" />
                                    {isUpdating ? 'Updating...' : 'Start Processing'}
                                </button>
                            )}
                            {currentStatus === 'Processing' && (
                                <button 
                                    onClick={() => handleUpdateStatus('Shipped')}
                                    disabled={isUpdating}
                                    className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 disabled:opacity-50"
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
                    <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Items ({order.items.length})</h2>
                        <div className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3">
                                    <span className="font-medium text-gray-900 w-1/2">{item.name}</span>
                                    <span className="text-gray-600 w-1/4 text-center">{item.quantity} x ${item.price.toFixed(2)}</span>
                                    <span className="font-bold text-gray-800 w-1/4 text-right">${(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 mt-4 border-t border-dashed border-gray-200 space-y-2">
                            <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span>${order.subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm text-gray-600"><span>Shipping:</span><span>${order.shippingCost.toFixed(2)}</span></div>
                            <div className="flex justify-between text-lg font-extrabold text-amber-900 pt-2"><span>Total:</span><span>${order.total.toFixed(2)}</span></div>
                        </div>
                    </div>

                </div>
                
                {/* Column 3: Shipping & Customer Info */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Shipping Card */}
                    <div className="bg-amber-50 p-6 rounded-xl shadow-inner border border-amber-200">
                        <h2 className="text-xl font-semibold mb-4 text-amber-800">Shipping Details</h2>
                        <p className="font-medium text-gray-900 mb-2">{order.customerName}</p>
                        <address className="text-gray-700 not-italic leading-relaxed">
                            {order.shippingAddress.split(', ').map((line, i) => <span key={i} className="block">{line}</span>)}
                            <span className="block mt-2 font-mono text-sm text-amber-700">Tracking #: ABC123XYZ</span>
                        </address>
                    </div>
                    
                    {/* Customer Card */}
                    <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Contact</h2>
                        <p className="text-gray-700 truncate">Email: <a href={`mailto:${order.customerEmail}`} className="text-blue-600 hover:text-blue-800">{order.customerEmail}</a></p>
                        <button className="mt-3 text-sm text-blue-600 hover:underline">Message Customer</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

// --- Main Application Component (Handles Routing/State) ---
export default function App() {
    // currentView: 'orders' (Order Dashboard), 'details' (Order Detail Page), 'overview', 'products', 'reviews', 'profile', 'billing', 'settings'
    const [currentView, setCurrentView] = useState('overview'); // Start on overview now
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleViewDetails = (id: string) => {
        setSelectedOrderId(id);
        setCurrentView('details');
    };

    const handleBack = () => {
        setSelectedOrderId(null);
        setCurrentView('orders');
    };
    
    // Function to handle main navigation from the sidebar
    const handleViewChange = (view: string) => {
        setCurrentView(view);
        setSelectedOrderId(null); // Clear selected order if navigating away from details
    }
    
    // Helper function for placeholder content - GUARANTEED NOT TO RENDER A LIST
    const placeholderContent = (title: string, description: string) => (
        <div className="text-center p-12 bg-white rounded-2xl shadow-2xl border-4 border-amber-400/50 transition transform hover:scale-[1.01]">
            <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h2>
            <p className="mt-4 text-lg text-gray-700 font-medium">
                {description}
            </p>
            <p className="mt-8 text-md text-amber-700 font-semibold flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 mr-3"/> 
                Action Required: Please use the dark sidebar on the left for all navigation. No duplicate lists exist in this content area.
            </p>
        </div>
    );

    const renderContent = () => {
        switch (currentView) {
            case 'orders':
                return <OrderList onViewDetails={handleViewDetails} />;
            case 'details':
                if (selectedOrderId) {
                    return <OrderDetailsPage orderId={selectedOrderId} onBack={handleBack} />;
                }
                return <OrderList onViewDetails={handleViewDetails} />;
            case 'overview':
                return placeholderContent("Dashboard Overview", "A summary of key metrics and key performance indicators will be displayed here.");
            case 'products':
                return placeholderContent("Product Listings", "Manage your current inventory, add new artisanal products, and update stock levels here.");
            case 'reviews':
                return placeholderContent("Reviews & Ratings", "View and moderate customer feedback and ratings for your products.");
            case 'profile':
                return placeholderContent("User Profile", "Manage your personal account details, contact information, and security preferences.");
            case 'billing':
                return placeholderContent("Billing & Payments", "View your subscription details, payment history, and manage invoicing information.");
            case 'settings':
                return placeholderContent("System Settings", "Configure application preferences, integrations, and default fulfillment options.");
            default:
                return placeholderContent("Welcome!", "Select an option from the sidebar to begin managing your Handcrafted Haven.");
        }
    };

    const getTitle = () => {
        switch (currentView) {
            case 'orders':
            case 'details':
                return 'Orders & Fulfillment';
            case 'overview':
                return 'System Overview';
            case 'products':
                return 'Product Listings';
            case 'reviews':
                return 'Reviews & Ratings';
            case 'profile':
                return 'User Profile';
            case 'billing':
                return 'Billing & Payments';
            case 'settings':
                return 'User Settings';
            default:
                return 'Dashboard';
        }
    }

    return (
        <DashboardLayout 
            title={getTitle()} 
            currentView={currentView} 
            onViewChange={handleViewChange}
        >
            {renderContent()}
        </DashboardLayout>
    );
}