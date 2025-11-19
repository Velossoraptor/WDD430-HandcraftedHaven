'use client'; 

import DashboardLayout from '@/app/layout/DashboardLayout';
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, Package } from 'lucide-react';
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Placeholder for form submission logic
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would gather formData and send it to your API:
    // const formData = new FormData(event.currentTarget);
    // const response = await fetch('/api/products/create', { method: 'POST', body: formData });
    
    console.log("Submitting new product...");

    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Product listing saved successfully! (Mock submission)");
      // Redirect to the listings page after success
      // router.push('/dashboard/products');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 space-y-8 bg-gray-50">
        
        {/* Header */}
        <header className="pb-4 border-b">
          <h1 className="text-3xl font-extrabold text-amber-900 flex items-center">
             <PlusCircle className="w-8 h-8 mr-3 text-amber-600" aria-hidden="true" />
             Create New Product Listing
          </h1>
          <p className="text-gray-600 mt-1">Fill out the details below to add a new handcrafted item to your shop.</p>
        </header>

        {/* --- Product Form --- */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
              <Tag className="w-5 h-5 mr-3 text-gray-400" /> Basic Details
            </h2>
            
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="e.g., Hand-Knitted Alpaca Wool Scarf"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows={4} 
                required 
                placeholder="Describe your product's craftsmanship, materials, and unique features."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Pricing and Inventory */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
              <DollarSign className="w-5 h-5 mr-3 text-gray-400" /> Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (USD)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    required 
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    className="block w-full pl-7 pr-3 border border-gray-300 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input 
                  type="number" 
                  id="stock" 
                  name="stock" 
                  required 
                  min="0"
                  placeholder="10"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500 bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="pottery">Pottery</option>
                  <option value="woodwork">Woodwork</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="textiles">Textiles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Product Images */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
              <ImageIcon className="w-5 h-5 mr-3 text-gray-400" /> Product Images
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition duration-150">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500 mx-auto"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (Max 5 images)</p>
            </div>
          </div>

          {/* Submission and Action Buttons */}
          <div className="pt-8 border-t border-gray-100 flex justify-end space-x-4">
            {/* 🟢 FIX: Updated Link usage (Removed passHref and legacyBehavior, removed <a> tag) */}
            <Link 
                href="/dashboard/products"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-150"
            >
                Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center font-semibold py-2 px-4 rounded-lg shadow transition duration-150 
                ${isSubmitting ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white'}
              `}
            >
              <Package className="w-5 h-5 mr-2" aria-hidden="true" />
              {isSubmitting ? 'Saving...' : 'Create Listing'}
            </button>
          </div>

        </form>

      </div>
    </DashboardLayout>
  );
}