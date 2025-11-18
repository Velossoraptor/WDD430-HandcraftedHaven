// src/app/seller/[username]/page.tsx
import { useParams } from 'next/navigation';
import { Shirt, Star, Package, MapPin } from 'lucide-react';
import Link from 'next/link';

// Mock function to simulate fetching a seller's public profile data
const fetchSellerProfile = (username: string) => {
    if (username === 'handcraftedhaven') {
        return {
            name: 'Handcrafted Haven',
            artisan: 'Jane Doe',
            bio: 'Dedicated to creating timeless, sustainable wooden bowls and unique ceramic pieces since 2018.',
            location: 'Artisan City, CA',
            productsCount: 24,
            averageRating: 4.8,
        };
    }
    return null;
};

export default function PublicSellerProfilePage() {
    const params = useParams();
    const username = Array.isArray(params.username) ? params.username[0] : params.username;
    
    const profile = fetchSellerProfile(username || '');

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Seller Not Found</h1>
                <p className="text-gray-600">The profile for {username} does not exist.</p>
                <Link href="/" className="mt-6 text-amber-600 hover:text-amber-800 underline">
                    Go to Homepage
                </Link>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {profile.name}
                    </h1>
                    <Link href="/products" className="text-amber-600 hover:text-amber-800 font-medium flex items-center">
                        <Package className="w-5 h-5 mr-2" /> View All Products
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                    
                    {/* Sidebar/Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">About the Artisan</h2>
                            <p className="text-sm text-gray-500 flex items-center mb-2"><MapPin className="w-4 h-4 mr-2" /> {profile.location}</p>
                            <p className="text-sm text-gray-500 flex items-center"><Star className="w-4 h-4 mr-2" /> {profile.averageRating} Avg Rating</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">Shop Statistics</h2>
                            <div className="space-y-2">
                                <p className="text-gray-700 flex justify-between">
                                    <span className="font-medium">Total Listings:</span> 
                                    <span className="font-bold text-amber-700">{profile.productsCount}</span>
                                </p>
                                <p className="text-gray-700 flex justify-between">
                                    <span className="font-medium">Categories:</span> 
                                    <span className="font-bold">Pottery, Woodwork</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 mt-6 lg:mt-0 space-y-6">
                        
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-3">Our Story</h2>
                            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <Shirt className="w-6 h-6 mr-2 text-amber-600" /> Featured Products
                            </h2>
                            <p className="text-gray-500 italic">... [Product grid goes here] ...</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}