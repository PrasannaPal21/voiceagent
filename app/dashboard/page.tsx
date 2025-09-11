"use client";
import React, { useState } from "react";
import CustomersPage from "@/components/customers-page";
import ProductsPage from "@/components/products-page";
import Dashboard from "@/components/dashboard-page";

const TabsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "customers" | "products"
  >("dashboard");

  return (
    <div className="w-full p-6">
      <div className="flex gap-4 border-b pb-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === "dashboard"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === "customers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setActiveTab("customers")}
        >
          Manage Customers
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === "products"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setActiveTab("products")}
        >
          Manage Products
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 border rounded-lg shadow-md min-h-[300px]">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "customers" && <CustomersPage />}
        {activeTab === "products" && <ProductsPage />}
      </div>
    </div>
  );
};

export default TabsPage;
