import { Package, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link'; // Make sure this is imported

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
  { id: 'HH1004', customerName: 'Liam R.', items: 2, total: 45.99, status: 'Pending', date: '2025-11-18' },
  { id: 'HH1003', customerName: 'Olivia M.', items: 1, total: 120.00, status: 'Processing', date: '2025-11-17' },
  { id: 'HH1002', customerName: 'Noah P.', items: 3, total: 88.50, status: 'Shipped', date: '2025-11-16' },
  { id: 'HH1001', customerName: 'Emma T.', items: 1, total: 32.75, status: 'Delivered', date: '2025-11-15' },
];

// Helper function to determine badge style based on status
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

export default function RecentOrders() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Package className="w-5 h-5 text-amber-700 mr-2" aria-hidden="true" />
          Recent Orders
        </h2>
        {/* 🟢 FIX 1: Updated Link usage for "View All" */}
        <Link 
          href="/dashboard/orders" 
          className="text-sm font-medium text-amber-700 hover:text-amber-900 flex items-center transition duration-150"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>
      </div>

      {/* 📋 Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-amber-50 transition duration-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {order.status !== 'Delivered' && (
                    /* 🟢 FIX 2: Updated Link usage for "Details" */
                    <Link 
                      href={`/dashboard/orders/${order.id}`} 
                      className="text-blue-600 hover:text-blue-900 transition duration-150 flex items-center justify-end"
                    >
                      Details
                      <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                    </Link>
                  )}
                  {order.status === 'Delivered' && (
                    <span className="text-gray-400 flex items-center justify-end">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" aria-hidden="true" />
                        Complete
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 💡 Accessibility Note */}
      <p className="sr-only" aria-live="polite">
        Displaying the last four recent orders, sorted by date descending.
      </p>

    </div>
  );
}