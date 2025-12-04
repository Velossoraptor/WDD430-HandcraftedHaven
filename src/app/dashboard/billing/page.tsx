"use client";

import Link from 'next/link';
import { CreditCard, DollarSign, FileText, CheckCircle, ArrowRight } from 'lucide-react';

// --- Mock Data ---
const mockBillingInfo = {
  currentPlan: {
    name: 'Artisan Pro',
    price: 19.99,
    features: ['Unlimited Listings', 'Priority Support', 'Custom Shop URL'],
    nextBillingDate: '2025-01-15',
  },
  paymentMethod: {
    type: 'Visa',
    lastFour: '4242',
    expiry: '12/26',
    billingName: 'Jane E. Doe',
  },
  invoices: [
    { id: 'INV-1004', date: '2024-11-15', amount: 19.99, status: 'Paid' },
    { id: 'INV-1003', date: '2024-10-15', amount: 19.99, status: 'Paid' },
    { id: 'INV-1002', date: '2024-09-15', amount: 19.99, status: 'Paid' },
    { id: 'INV-1001', date: '2024-08-15', amount: 0.00, status: 'Free Trial' },
  ],
};

export default function BillingPage() {
  
  const handleDownload = (invoiceId: string) => {
    console.log(`Placeholder: Downloading invoice ${invoiceId}`);
    // In a real app, this would trigger an API call to download the PDF
  };

  return (
    // The main content container, already wrapped by the DashboardLayout in the Canvas
    <div className="p-6 md:p-10 space-y-10 bg-gray-50 min-h-full">
      
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-amber-900 flex items-center mb-2">
            <DollarSign className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
            Billing & Subscriptions
        </h1>
        <p className="text-gray-600">
          Manage your subscription plan, payment methods, and view your invoice history.
        </p>
      </header>

      {/* --- Main Billing Grid (Responsive Layout) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Plan Card (Span 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-amber-100 space-y-6">
          <h2 className="text-2xl font-semibold text-amber-800 border-b pb-3 mb-4">
            Current Subscription: {mockBillingInfo.currentPlan.name}
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                ${mockBillingInfo.currentPlan.price.toFixed(2)} / month
              </p>
              <p className="text-sm text-gray-500">
                Next billing date: <span className="font-medium text-gray-700">{mockBillingInfo.currentPlan.nextBillingDate}</span>
              </p>
            </div>

            <Link 
              href="/dashboard/plans"
              className="mt-4 md:mt-0 flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
            >
              Upgrade/Change Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Plan Includes:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
              {mockBillingInfo.currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Method Card (Span 1 column on large screens) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
              Payment Method
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Card Type:</p>
              <p className="text-lg font-bold text-gray-900">{mockBillingInfo.paymentMethod.type}</p>
              
              <p className="text-sm text-gray-500 pt-2">Card Number:</p>
              <p className="text-lg font-mono tracking-wider text-gray-900">•••• •••• •••• {mockBillingInfo.paymentMethod.lastFour}</p>
              
              <p className="text-sm text-gray-500 pt-2">Expires:</p>
              <p className="text-lg font-medium text-gray-900">{mockBillingInfo.paymentMethod.expiry}</p>
            </div>
          </div>
          <button className="mt-6 w-full text-center text-blue-600 hover:text-blue-800 font-medium transition duration-150 text-sm">
            Update Payment Details
          </button>
        </div>

      </div>

      {/* --- Invoice History --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b flex items-center">
            <FileText className="w-6 h-6 mr-2 text-gray-500" />
            Invoice History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mockBillingInfo.invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition duration-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {invoice.status === 'Paid' && (
                        <button 
                            onClick={() => handleDownload(invoice.id)}
                            className="text-amber-600 hover:text-amber-800 transition duration-150 font-medium"
                        >
                            Download PDF
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}