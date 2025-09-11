import { BASE_URL } from "@/lib/constants";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface CustomerCardProps {
  customer: Customer;
  onCustomerUpdated?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onCustomerUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    // Validation
    if (!editData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!editData.email.trim() || !editData.email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }
    if (!editData.phone.trim() || editData.phone.length < 10) {
      toast.error("Valid phone number is required (min 10 digits)");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/customers/${customer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        toast.success("✅ Customer updated successfully!");
        setIsEditing(false);
        onCustomerUpdated?.(); // Refresh the customer list
      } else {
        const errorData = await res.json();
        toast.error(
          `❌ Failed to update: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("❌ Failed to update customer");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // Confirmation dialog
    if (
      !window.confirm(
        `Are you sure you want to delete ${customer.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/customers/${customer.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        toast.success("✅ Customer deleted successfully!");
        onCustomerUpdated?.(); // Refresh the customer list
      } else {
        const errorData = await res.json();
        toast.error(
          `❌ Failed to delete: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("❌ Failed to delete customer");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardContent className="p-4">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input
                value={editData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Customer name"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                value={editData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email address"
                type="email"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <Input
                value={editData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone number"
                className="mt-1"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleEdit}
                disabled={loading}
                className="flex-1"
                size="sm"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={loading}
                className="flex-1"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // View Mode
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {customer.name}
            </h2>
            <div className="space-y-1 mb-4">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Phone:</span> {customer.phone}
              </p>
              <p className="text-gray-500 text-xs">
                <span className="font-medium">Created:</span>{" "}
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                disabled={loading}
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
