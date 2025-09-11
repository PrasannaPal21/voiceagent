import { BASE_URL } from "@/lib/constants";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  id: string;
  name: string;
  description: string;
  keyDetails: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface ProductCardProps {
  product: Product;
  onProductUpdated?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    description: product.description,
    keyDetails: product.keyDetails,
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    // Validation
    if (!editData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!editData.description.trim() || editData.description.length < 5) {
      toast.error("Description must be at least 5 characters");
      return;
    }
    if (!editData.keyDetails.trim()) {
      toast.error("Key details are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        toast.success("✅ Product updated successfully!");
        setIsEditing(false);
        onProductUpdated?.(); // Refresh the product list
      } else {
        const errorData = await res.json();
        toast.error(
          `❌ Failed to update: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("❌ Failed to update product");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // Confirmation dialog
    if (
      !window.confirm(
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/products/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        toast.success("✅ Product deleted successfully!");
        onProductUpdated?.(); // Refresh the product list
      } else {
        const errorData = await res.json();
        toast.error(
          `❌ Failed to delete: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("❌ Failed to delete product");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: product.name,
      description: product.description,
      keyDetails: product.keyDetails,
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
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <Input
                value={editData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Product name"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                value={editData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Product description"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Key Details
              </label>
              <Input
                value={editData.keyDetails}
                onChange={(e) =>
                  handleInputChange("keyDetails", e.target.value)
                }
                placeholder="Key details/features"
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
            <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1">
              {product.name}
            </h2>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="pt-1">
                <span className="text-xs font-medium text-gray-500">
                  Key Details:
                </span>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {product.keyDetails}
                </p>
              </div>

              <p className="text-gray-500 text-xs pt-1">
                <span className="font-medium">Created:</span>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
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

export default ProductCard;
