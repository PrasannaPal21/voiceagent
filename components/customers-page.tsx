import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CustomerCard from "./cards/customerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/constants";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

// Mock customers for testing when API fails
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "mock-customer-1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1234567890",
    userId: "mock-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-customer-2",
    name: "Sarah Johnson", 
    email: "sarah.johnson@email.com",
    phone: "+1987654321",
    userId: "mock-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-customer-3",
    name: "Mike Wilson",
    email: "mike.wilson@email.com", 
    phone: "+1555123456",
    userId: "mock-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
        setUseMockData(false);
      } else {
        console.log("API failed, using mock data");
        setCustomers(MOCK_CUSTOMERS);
        setUseMockData(true);
        toast.info("Using demo customers for testing");
      }
    } catch (error) {
      console.log("API error, using mock data:", error);
      setCustomers(MOCK_CUSTOMERS);
      setUseMockData(true);
      toast.info("Using demo customers for testing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onSubmit = async (values: CustomerFormValues) => {
    if (useMockData) {
      // For mock data, just add locally
      const newCustomer: Customer = {
        id: `mock-customer-${Date.now()}`,
        ...values,
        userId: "mock-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCustomers(prev => [...prev, newCustomer]);
      toast.success("✅ Customer added successfully! (Demo mode)");
      form.reset();
      setShowAddForm(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to add customer");

      toast.success("✅ Customer added successfully!");
      form.reset();
      setShowAddForm(false);

      // Refresh the customer list
      fetchCustomers();
    } catch (err) {
      toast.error("❌ Failed to add customer");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Customer Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
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
            {showAddForm ? "Cancel" : "Add Customer"}
          </Button>
        </div>
      </div>

      {/* Add Customer Form */}
      {showAddForm && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Add New Customer</CardTitle>
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
                <Input
                  {...form.register("email")}
                  placeholder="Email address"
                />
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

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Adding..." : "Add Customer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Customers Grid */}
      {loading ? (
        <div className="text-center">Loading customers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.length > 0 ? (
            customers.map((c) => (
              <CustomerCard
                key={c.id}
                customer={c}
                onCustomerUpdated={fetchCustomers} // Pass refresh function if needed
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No customers found.</p>
              {!showAddForm && (
                <Button onClick={() => setShowAddForm(true)} className="mt-4">
                  Add Your First Customer
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;