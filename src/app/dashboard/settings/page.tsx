"use client";

import { Settings, User, Lock, Bell, Mail, Key } from 'lucide-react';
import { useState } from 'react';

// Define the type for the section keys
type SectionKey = 'general' | 'security' | 'notifications';

// --- Components (Mock form elements) ---

const GeneralSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
      <User className="w-5 h-5 mr-2 text-amber-500" /> General Preferences
    </h3>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-medium text-lg text-gray-700 mb-4 border-b pb-2">Shop Details</h4>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Shop Name</span>
          <input
            type="text"
            defaultValue="Handcrafted Haven"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-amber-500 focus:border-amber-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Default Currency</span>
          <select 
            defaultValue="USD"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-amber-500 focus:border-amber-500"
          >
            <option>USD - United States Dollar</option>
            <option>EUR - Euro</option>
            <option>GBP - British Pound</option>
          </select>
        </label>
      </div>
    </div>
    
    <div className="mt-8">
      <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150">
        Save Changes
      </button>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
      <Lock className="w-5 h-5 mr-2 text-red-500" /> Security & Access
    </h3>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-medium text-lg text-gray-700 mb-4 border-b pb-2">Password Update</h4>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Current Password</span>
          <input
            type="password"
            placeholder="********"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-amber-500 focus:border-amber-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">New Password</span>
          <input
            type="password"
            placeholder="Enter new password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-amber-500 focus:border-amber-500"
          />
        </label>
      </div>
      <div className="mt-6">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150">
          Update Password
        </button>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-medium text-lg text-gray-700 mb-4 border-b pb-2 flex items-center">
        <Key className="w-4 h-4 mr-2" /> Two-Factor Authentication
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        Add an extra layer of security to your account.
      </p>
      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150 text-sm">
        Enable 2FA
      </button>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
      <Bell className="w-5 h-5 mr-2 text-blue-500" /> Notifications
    </h3>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-medium text-lg text-gray-700 mb-4 border-b pb-2 flex items-center">
        <Mail className="w-4 h-4 mr-2" /> Email Preferences
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-dashed">
          <span className="text-sm text-gray-700">New Order Alerts</span>
          <input type="checkbox" defaultChecked className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
        </div>
        <div className="flex justify-between items-center py-2 border-b border-dashed">
          <span className="text-sm text-gray-700">Listing Expiring Soon</span>
          <input type="checkbox" defaultChecked={false} className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-700">Marketing & Promotional Emails</span>
          <input type="checkbox" defaultChecked={false} className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
        </div>
      </div>
    </div>
    
    <div className="mt-8">
      <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150">
        Update Notifications
      </button>
    </div>
  </div>
);


// Use Record utility type for sectionMap to explicitly link SectionKey to its value shape
const sectionMap: Record<SectionKey, { icon: React.FC<React.SVGProps<SVGSVGElement>>, component: React.FC }> = {
  general: { icon: User, component: GeneralSettings },
  security: { icon: Lock, component: SecuritySettings },
  notifications: { icon: Bell, component: NotificationSettings },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('general'); // Use SectionKey type here
  const ActiveComponent = sectionMap[activeSection].component;

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gray-50 min-h-full">
      
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-amber-900 flex items-center mb-2">
            <Settings className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
            Account Settings
        </h1>
        <p className="text-gray-600">
          Manage your shop preferences, security credentials, and communication settings.
        </p>
      </header>

      {/* --- Settings Content (Sidebar + Main) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Settings Navigation Sidebar (1/4 width on large screens) */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg border border-gray-200 h-fit">
          <nav className="flex flex-col space-y-2">
            {(Object.keys(sectionMap) as SectionKey[]).map((key) => { // Use SectionKey[] assertion here
              const { icon: Icon } = sectionMap[key]; 
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)} // Removed 'as any'
                  className={`flex items-center p-3 rounded-lg font-medium transition duration-150 ease-in-out w-full justify-start capitalize ${
                    isActive 
                      ? "bg-amber-500 text-white shadow-md" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-amber-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {key} Settings
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Main Content Area (3/4 width on large screens) */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}