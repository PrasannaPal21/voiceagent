import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ProductCard from "./cards/productCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/constants";

type Product = {
  id: string;
  name: string;
  description: string;
  keyDetails: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  keyDetails: z.string().min(2, "Key details are required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

// Mock products for testing when API fails
const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-1",
    name: "Roofing Services",
    description: "Professional roofing inspection and repair services. We offer free inspections and competitive pricing for all roofing needs.",
    keyDetails: "Free inspection, Licensed contractors, 10-year warranty",
    userId: "mock-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-2", 
    name: "Solar Panel Installation",
    description: "Complete solar panel installation service with financing options. Reduce your energy bills and increase home value.",
    keyDetails: "0% financing available, 25-year warranty, Free consultation",
    userId: "mock-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    name: "Home Security System",
    description: "Smart home security system with 24/7 monitoring. Protect your family with the latest technology.",
    keyDetails: "24/7 monitoring, Mobile app control, Professional installation",
    userId: "mock-user", 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      keyDetails: "",
    },
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        setUseMockData(false);
      } else {
        console.log("API failed, using mock data");
        setProducts(MOCK_PRODUCTS);
        setUseMockData(true);
        toast.info("Using demo products for testing");
      }
    } catch (error) {
      console.log("API error, using mock data:", error);
      setProducts(MOCK_PRODUCTS);
      setUseMockData(true);
      toast.info("Using demo products for testing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (values: ProductFormValues) => {
    if (useMockData) {
      // For mock data, just add locally
      const newProduct: Product = {
        id: `mock-${Date.now()}`,
        ...values,
        userId: "mock-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success("✅ Product added successfully! (Demo mode)");
      form.reset();
      setShowAddForm(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      toast.success("✅ Product added successfully!");
      form.reset();
      setShowAddForm(false);

      // Refresh the product list
      fetchProducts();
    } catch (err: any) {
      toast.error(`❌ Failed to add product: ${err.message}`);
      console.error("Add product error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Product Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          {useMockData && (
            <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Demo Mode
            </div>
          )}
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant={showAddForm ? "outline" : "default"}
          >
            {showAddForm ? "Cancel" : "Add Product"}
          </Button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  {...form.register("name")}
                  placeholder="Enter product name"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  {...form.register("description")}
                  placeholder="Enter product description"
                  rows={3}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Key Details</Label>
                <Input
                  {...form.register("keyDetails")}
                  placeholder="Enter key details/features"
                />
                {form.formState.errors.keyDetails && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.keyDetails.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Adding Product..."
                  : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onProductUpdated={fetchProducts} // Pass refresh function
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No products found.</p>
              {!showAddForm && (
                <Button onClick={() => setShowAddForm(true)} className="mt-4">
                  Add Your First Product
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;