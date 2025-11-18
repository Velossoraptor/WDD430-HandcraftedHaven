// src/app/dashboard/orders/page.tsx
import DashboardLayout from '@/app/layout/DashboardLayout';
import Link from 'next/link';
import { Package, ArrowRight, User } from 'lucide-react';

// --- Mock Data ---
interface Order {
  id: string;
  customerName: string;
  items: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

const mockOrders: Order[] = [
  { id: 'HH1005', customerName: 'Liam R.', items: 2, total: 45.99, status: 'Pending', date: '2025-11-19' },
  { id: 'HH1004', customerName: 'Olivia M.', items: 1, total: 120.00, status: 'Processing', date: '2025-11-18' },
  { id: 'HH1003', customerName: 'Noah P.', items: 3, total: 88.50, status: 'Shipped', date: '2025-11-17' },
  { id: 'HH1002', customerName: 'Emma T.', items: 1, total: 32.75, status: 'Delivered', date: '2025-11-16' },
  { id: 'HH1001', customerName: 'Chris B.', items: 4, total: 155.00, status: 'Delivered', date: '2025-11-15' },
];

const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'Pending':
      return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">Pending</span>;
    case 'Processing':
      return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Processing</span>;
    case 'Shipped':
      return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">Shipped</span>;
    case 'Delivered':
      return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">Delivered</span>;
  }
};

export default function OrderListingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        
        {/* Header */}
        <header className="pb-4 border-b">
          <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
             <Package className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
             Order Fulfillment
          </h1>
          <p className="text-gray-600 mt-1">Manage and track all customer orders from your shop.</p>
        </header>

        {/* --- Order Table --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {order.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/dashboard/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                      >
                        View
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer/Pagination Placeholder */}
          <div className="p-4 border-t text-sm text-gray-600 flex justify-end">
            Showing 1 to {mockOrders.length} of {mockOrders.length} results.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}