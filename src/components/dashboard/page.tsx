import DashboardLayout from '@/app/layout/DashboardLayout';
import SellerStats from '@/components/dashboard/SellerStats';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentOrders from '@/components/dashboard/RecentOrders';
import ProfileSummary from '@/components/dashboard/ProfileSummary';

// Mock data (Replace with actual data fetched from your Node.js backend)
const mockSellerData = {
  activeListings: 24,
  pendingOrders: 3,
  totalSales: 850.75,
  averageRating: 4.8,
};

export default function SellerDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        
        <header>
          <h1 className="text-3xl font-extrabold text-amber-900 mb-2">
            Artisan Workshop Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your shop, view performance, and connect with customers.
          </p>
        </header>

        {/* 🏆 Section 1: Key Metrics and Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seller Performance Metrics */}
            <div className="lg:col-span-2">
                <SellerStats data={mockSellerData} />
            </div>

            {/* Quick Actions (Add Product, View Profile) */}
            <div className="lg:col-span-1">
                <QuickActions />
            </div>
        </div>

        {/* 🛠️ Section 2: Management & Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 📦 Recent Orders (Needs immediate attention) */}
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>

          {/* 👤 Profile/Reviews Summary (Seller Profile & Ratings) */}
          <div className="lg:col-span-1">
            <ProfileSummary />
          </div>
          
        </div>
        
      </div>
    </DashboardLayout>
  );
}