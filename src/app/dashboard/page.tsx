import DashboardLayout from '@/app/layout/DashboardLayout';
import SellerStats from '@/components/dashboard/SellerStats';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentOrders from '@/components/dashboard/RecentOrders';
import ProfileSummary from '@/components/dashboard/ProfileSummary';


const mockSellerData = {
  activeListings: 24,
  pendingOrders: 3,
  totalSales: 850.75,
  averageRating: 4.8,
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        
        <header>
          <h1 className="text-3xl font-extrabold text-amber-900 mb-2">
            Artisan Workshop Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here is a summary of your cart performance.
          </p>
        </header>

        {/* 🏆 Section 1: Key Metrics and Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seller Performance Metrics (Takes 2/3 width) */}
            <div className="lg:col-span-2">
                <SellerStats data={mockSellerData} />
            </div>

            {/* Quick Actions (Takes 1/3 width) */}
            <div className="lg:col-span-1">
                <QuickActions />
            </div>
        </div>

        {/* 🛠️ Section 2: Management & Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 📦 Recent Orders (Takes 2/3 width) */}
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>

          {/* 👤 Profile/Reviews Summary (Takes 1/3 width) */}
          <div className="lg:col-span-1">
            <ProfileSummary />
          </div>
          
        </div>
        
      </div>
    </DashboardLayout>
  );
}