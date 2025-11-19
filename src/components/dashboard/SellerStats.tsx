import { Package, Truck, Star, DollarSign } from 'lucide-react'; // Example icons

interface SellerStatsProps {
  data: {
    activeListings: number;
    pendingOrders: number;
    totalSales: number;
    averageRating: number;
  };
}

// Data structure for easy mapping
const statCards = (data: SellerStatsProps['data']) => [
  {
    title: 'Active Listings',
    value: data.activeListings.toLocaleString(),
    icon: Package,
    color: 'bg-blue-100 text-blue-700',
    description: 'Items currently for sale.',
  },
  {
    title: 'Pending Orders',
    value: data.pendingOrders.toLocaleString(),
    icon: Truck,
    color: 'bg-red-100 text-red-700',
    description: 'Orders waiting to be shipped.',
  },
  {
    title: 'Average Rating',
    value: data.averageRating.toFixed(1),
    icon: Star,
    color: 'bg-amber-100 text-amber-700',
    description: 'Customer satisfaction score.',
  },
  {
    title: 'Total Sales (MoM)',
    value: `$${data.totalSales.toFixed(2).toLocaleString()}`,
    icon: DollarSign,
    color: 'bg-green-100 text-green-700',
    description: 'Revenue this month.',
  },
];

export default function SellerStats({ data }: SellerStatsProps) {
  const cards = statCards(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4"
          // WCAG: Added role for better screen reader context
          role="region" 
          aria-label={`${card.title} summary`} 
        >
          {/* Icon */}
          <div className={`p-3 rounded-xl ${card.color} shrink-0`}>
            <card.icon className="h-6 w-6" aria-hidden="true" />
          </div>
          
          {/* Details */}
          <div>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {card.value}
            </p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              {card.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}