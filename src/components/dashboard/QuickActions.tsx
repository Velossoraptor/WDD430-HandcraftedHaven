import { PlusCircle, User, LayoutGrid } from 'lucide-react'; 
import Link from 'next/link'; // Use next/link for client-side navigation

export default function QuickActions() {
  const actions = [
    { name: 'Add New Product', href: '/dashboard/products/new', icon: PlusCircle, description: 'Create a new listing.' },
    { name: 'Manage Listings', href: '/dashboard/products', icon: LayoutGrid, description: 'Edit or remove existing items.' },
    { name: 'View My Public Profile', href: '/seller/username', icon: User, description: 'See how customers view your shop.' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
      <div className="space-y-4">
        {actions.map((action) => (
          <Link 
            key={action.name}
            href={action.href}
            className="flex items-center p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition duration-150 group"
            // WCAG: Making the whole block a clickable link with proper focus
          >
            <action.icon className="w-5 h-5 text-amber-700 mr-3 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900 group-hover:text-amber-800">
                {action.name}
              </p>
              <p className="text-xs text-gray-500">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}