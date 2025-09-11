"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
  keyDetails: z.string().min(5, "Key details are required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      keyDetails: "",
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const res = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("✅ Product added successfully!");
      form.reset();
    } catch (err) {
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} placeholder="Product name" />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Input
              {...form.register("description")}
              placeholder="Description"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label>Key Details</Label>
            <Input type="number" {...form.register("keyDetails")} />
            {form.formState.errors.keyDetails && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.keyDetails.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
