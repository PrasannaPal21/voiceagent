"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

export default function AddCustomerForm() {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      const res = await fetch("http://localhost:4000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to add customer");

      toast.success("✅ Customer added successfully!");
      form.reset();
    } catch (err) {
      toast.error("❌ Failed to add customer");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} placeholder="Customer name" />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label>Email</Label>
            <Input {...form.register("email")} placeholder="Email address" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label>Phone</Label>
            <Input {...form.register("phone")} placeholder="Phone number" />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Add Customer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
