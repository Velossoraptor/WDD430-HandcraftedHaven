"use client";

import { User as UserIcon, Settings, Camera, CheckCircle, X } from 'lucide-react';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';


interface ProfileSettings {
  shopName: string;
  bio: string;
  emailNewOrder: boolean;
  emailNewReview: boolean;
  profileImageUrl?: string;
}

const defaultProfile: ProfileSettings = {
  shopName: "My Artisan Shop",
  bio: "I craft unique pieces with passion and dedication.",
  emailNewOrder: true,
  emailNewReview: false,
  profileImageUrl: undefined,
};

export default function SellerProfilePage() {
  const [profileData, setProfileData] = useState<ProfileSettings>(defaultProfile);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sellerProfile');
      if (saved) {
        const parsed: ProfileSettings = JSON.parse(saved);
        setProfileData(parsed);
        setPreviewUrl(parsed.profileImageUrl);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to load profile");
    }
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  // Save profile (frontend only)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const updatedProfile: ProfileSettings = {
        ...profileData,
        profileImageUrl: previewUrl,
      };
      localStorage.setItem('sellerProfile', JSON.stringify(updatedProfile));
      setProfileData(updatedProfile);
      setImageFile(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen font-sans">
      {showSuccess && (
        <div className="fixed top-2 right-2 z-50 bg-green-500 text-white p-4 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-3" /> Profile saved!
        </div>
      )}
      {error && (
        <div className="fixed top-2 right-2 z-50 bg-red-600 text-white p-4 rounded-lg flex items-center">
          <X className="w-5 h-5 mr-3" /> {error}
        </div>
      )}

      <header className="pb-4 border-b">
        <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
          <UserIcon className="w-8 h-8 mr-3 text-amber-600" /> Seller Profile
        </h1>
        <p className="text-gray-600 mt-1">Manage your public bio and account preferences.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-10">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Public Profile</h2>

          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-amber-300 overflow-hidden">
              {previewUrl ? (  <Image
                    src={previewUrl}
                    alt="Avatar"
                    width={80}       // match your container size
                    height={80}
                    className="rounded-full object-cover"
                    unoptimized={true} // optional, for external/local URLs
                />
) : (
  <Camera className="w-8 h-8 text-gray-500" />
)}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Logo/Avatar</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="file:py-2 file:px-4 file:rounded-full file:bg-amber-50 file:text-amber-700" />
              {imageFile && <p className="text-xs text-amber-600 mt-1">Selected: {imageFile.name}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input type="text" id="shopName" name="shopName" value={profileData.shopName} onChange={handleChange} required className="mt-1 block w-full border rounded-md p-3" />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea id="bio" name="bio" rows={5} value={profileData.bio} onChange={handleChange} className="mt-1 block w-full border rounded-md p-3" />
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-semibold border-b pb-2 flex items-center">
            <Settings className="w-5 h-5 mr-3 text-gray-400" /> Account Preferences
          </h2>

          <label className="flex items-center">
            <input type="checkbox" name="emailNewOrder" checked={profileData.emailNewOrder} onChange={handleChange} className="h-4 w-4" />
            <span className="ml-3 text-sm">New Order Notifications</span>
          </label>

          <label className="flex items-center">
            <input type="checkbox" name="emailNewReview" checked={profileData.emailNewReview} onChange={handleChange} className="h-4 w-4" />
            <span className="ml-3 text-sm">New Review Alerts</span>
          </label>
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={isSaving} className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg">
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
