'use client';

import DashboardLayout from '@/app/layout/DashboardLayout';
import { User, Settings, Camera } from 'lucide-react';
import React, { useState } from 'react';

export default function SellerProfilePage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        console.log("Saving profile and settings...");
        
        setTimeout(() => {
            setIsSaving(false);
            alert("Profile settings updated successfully!");
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="p-6 md:p-10 space-y-8 bg-gray-50">
                
                {/* Header */}
                <header className="pb-4 border-b">
                    <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
                        <User className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
                        Seller Profile & Settings
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your public bio, shop story, and account preferences.</p>
                </header>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-10">
                    
                    {/* Section 1: Public Profile */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Public Profile (Your Story)</h2>
                        
                        {/* Profile Image Upload */}
                        <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                                {/* Placeholder for current profile picture */}
                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Logo/Avatar</label>
                                <input type="file" className="text-sm" />
                            </div>
                        </div>

                        {/* Public Shop Name */}
                        <div>
                            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">Public Shop Name</label>
                            <input type="text" id="shopName" name="shopName" defaultValue="Artisan User Shop" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500" />
                        </div>

                        {/* Artisan Story/Bio */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Artisan Story/Bio</label>
                            <textarea id="bio" name="bio" rows={5} defaultValue="I have been crafting ceramic pottery since 2010..." placeholder="Tell your customers about your passion and craft." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500" />
                        </div>
                    </div>

                    {/* Section 2: Account Settings */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <Settings className="w-5 h-5 mr-3 text-gray-400" /> Account Preferences
                        </h2>
                        
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" defaultValue="artisan@handcraftedhaven.com" readOnly className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm p-3 text-gray-500 cursor-not-allowed" />
                            <p className="mt-1 text-xs text-gray-500">Contact admin to change email.</p>
                        </div>
                        
                        {/* Notification Toggles */}
                        <div>
                            <span className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</span>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
                                    <span className="ml-3 text-sm text-gray-700">New Order Notifications</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
                                    <span className="ml-3 text-sm text-gray-700">New Review Alerts</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* Submission Button */}
                    <div className="pt-8 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`flex items-center font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 
                            ${isSaving ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white'}
                            `}
                        >
                            {isSaving ? 'Saving Changes...' : 'Save Profile & Settings'}
                        </button>
                    </div>
                </form>

            </div>
        </DashboardLayout>
    );
}