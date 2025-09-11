import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Phone, Users, Package, X, Check, TestTube, LogOut, History, Clock, User, MessageSquare } from "lucide-react";
import { BASE_URL, CALL_AGENT_URL } from "@/lib/constants";
import { useWebSocket } from "@/hooks/use-websocket";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  keyDetails: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type CallHistoryEntry = {
  id: string;
  phoneNumber: string;
  productName: string;
  callId: string;
  roomName: string;
  status: string;
  timestamp: string;
  duration?: number;
  transcript?: Array<{ role: "user" | "assistant"; content: string }>;
  customerInterested?: boolean;
  notes?: string;
};

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

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callNotes, setCallNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [testSelectedProduct, setTestSelectedProduct] = useState("");
  const [lastCallId, setLastCallId] = useState<string>("-");
  const [callStatus, setCallStatus] = useState<string>("-");
  const [currentRoomName, setCurrentRoomName] = useState<string>("");
  const [useMockData, setUseMockData] = useState(false);
  const [callHistory, setCallHistory] = useState<CallHistoryEntry[]>([]);
  const [showCallHistory, setShowCallHistory] = useState(false);
  const { isConnected, liveStatus, lastMessage, transcript, send, resetTranscript } = useWebSocket();

  // Call Agent API Base URL is now imported from constants

  // Load call history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('callHistory');
    if (savedHistory) {
      try {
        setCallHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse call history:', error);
      }
    }
  }, []);

  // Save call history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('callHistory', JSON.stringify(callHistory));
  }, [callHistory]);

  // Add call to history
  const addToCallHistory = (entry: Omit<CallHistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: CallHistoryEntry = {
      ...entry,
      id: `call-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setCallHistory(prev => [newEntry, ...prev]);
  };

  // Update call history entry
  const updateCallHistory = (callId: string, updates: Partial<CallHistoryEntry>) => {
    setCallHistory(prev => 
      prev.map(entry => 
        entry.callId === callId 
          ? { ...entry, ...updates }
          : entry
      )
    );
  };

  // Fetch customers and products
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch customers
      const customersRes = await fetch(`${BASE_URL}/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Fetch products
      const productsRes = await fetch(`${BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (customersRes.ok) {
        const customersData = await customersRes.json();
        setCustomers(customersData);
      } else {
        setCustomers(MOCK_CUSTOMERS);
        setUseMockData(true);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      } else {
        setProducts(MOCK_PRODUCTS);
        setUseMockData(true);
      }
    } catch (error) {
      console.log("API error, using mock data:", error);
      setCustomers(MOCK_CUSTOMERS);
      setProducts(MOCK_PRODUCTS);
      setUseMockData(true);
      toast.info("Using demo data for testing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Map websocket live data into local display fields and update call history
  useEffect(() => {
    if (lastMessage?.id) {
      setLastCallId(String(lastMessage.id));
      
      // Update call history with transcript and customer interest
      if (lastMessage.conversation) {
        updateCallHistory(String(lastMessage.id), {
          transcript: lastMessage.conversation,
          customerInterested: lastMessage.customer_interested,
          status: lastMessage.status
        });
      }
    }
    if (liveStatus) {
      setCallStatus(String(liveStatus));
    }
  }, [lastMessage, liveStatus]);

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectedCustomersList = customers.filter((c) =>
    selectedCustomers.includes(c.id)
  );
  const selectedProductData = products.find((p) => p.id === selectedProduct);

  const handleCall = () => {
    if (selectedCustomers.length === 0) {
      toast.error("Please select at least one customer");
      return;
    }
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    setIsCallModalOpen(true);
  };

  const makeCall = async () => {
    try {
      // Get the first selected customer and product details
      const firstCustomer = customers.find(c => c.id === selectedCustomers[0]);
      const selectedProductInfo = products.find(p => p.id === selectedProduct);

      if (!firstCustomer || !selectedProductInfo) {
        toast.error("Customer or product data not found");
        return;
      }

      // Send only first customer's phone and product description
      const callData = {
        phone_number: firstCustomer.phone,
        custom_instructions: selectedProductInfo.description
      };

      const response = await fetch(`${CALL_AGENT_URL}/make-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(callData)
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentRoomName(result.room_name || "");
        setLastCallId(result.call_id || "");
        
        // Add to call history
        addToCallHistory({
          phoneNumber: firstCustomer.phone,
          productName: selectedProductInfo.name,
          callId: result.call_id || "",
          roomName: result.room_name || "",
          status: "initiated",
          notes: callNotes
        });

        toast.success(
          `📞 Calling ${firstCustomer.name} (${firstCustomer.phone}) about ${selectedProductInfo.name}`
        );
      } else {
        throw new Error("Call initiation failed");
      }

      setIsCallModalOpen(false);
      setCallNotes("");
      // Reset selections after call
      setSelectedCustomers([]);
      setSelectedProduct("");
    } catch (error) {
      toast.error("Failed to initiate calls");
      console.error("Call error:", error);
    }
  };

  const makeTestCall = async () => {
    try {
      if (!testPhoneNumber.trim()) {
        toast.error("Please enter a phone number");
        return;
      }
      if (!testSelectedProduct) {
        toast.error("Please select a product");
        return;
      }

      const selectedProductInfo = products.find(p => p.id === testSelectedProduct);
      if (!selectedProductInfo) {
        toast.error("Product data not found");
        return;
      }

      // Call the call agent API directly
      const callData = {
        phone_number: testPhoneNumber.trim(),
        custom_instructions: selectedProductInfo.description
      };

      const response = await fetch(`${CALL_AGENT_URL}/make-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(callData)
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentRoomName(result.room_name || "");
        setLastCallId(result.call_id || "");
        
        // Add to call history
        addToCallHistory({
          phoneNumber: testPhoneNumber.trim(),
          productName: selectedProductInfo.name,
          callId: result.call_id || "",
          roomName: result.room_name || "",
          status: "initiated"
        });

        toast.success(`📞 Test call initiated to ${testPhoneNumber} about ${selectedProductInfo.name}`);
        setTestPhoneNumber("");
        setTestSelectedProduct("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Call initiation failed");
      }
    } catch (error) {
      toast.error(`Failed to initiate test call: ${error.message}`);
      console.error("Test call error:", error);
    }
  };

  const getCallStatus = async () => {
    if (!currentRoomName) {
      toast.error("No active call to check status");
      return;
    }

    try {
      console.log(`Getting status for room: ${currentRoomName}`);
      const response = await fetch(`${CALL_AGENT_URL}/call-status/${currentRoomName}`, {
        method: "GET",
        headers: {
          "accept": "application/json",
        },
      });
      
      if (response.ok) {
        const status = await response.json();
        setCallStatus(JSON.stringify(status, null, 2));
        toast.success("Call status updated");
        console.log("Call status response:", status);
      } else {
        const errorText = await response.text();
        console.error("Status API error:", response.status, errorText);
        throw new Error(`Failed to get call status: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Failed to get call status: ${error.message}`);
      console.error("Status error:", error);
    }
  };

  const endCall = async () => {
    if (!currentRoomName) {
      toast.error("No active call to end");
      return;
    }

    try {
      console.log(`Attempting to end call for room: ${currentRoomName}`);
      const response = await fetch(`${CALL_AGENT_URL}/end-call/${currentRoomName}`, {
        method: "DELETE",
        headers: {
          "accept": "application/json",
        },
      });
      
      if (response.ok) {
        // Update call history
        updateCallHistory(lastCallId, { status: "ended" });
        
        toast.success("Call ended successfully");
        setCurrentRoomName("");
        setLastCallId("-");
        setCallStatus("-");
        console.log("Call ended successfully");
      } else {
        const errorText = await response.text();
        console.error("End call API error:", response.status, errorText);
        
        // Parse the error response to check if it's a "room not found" error
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.detail && errorData.detail.includes("room does not exist")) {
            // Room doesn't exist - call might have already ended naturally
            toast.info("Call has already ended or room expired");
            updateCallHistory(lastCallId, { status: "ended" });
            setCurrentRoomName("");
            setLastCallId("-");
            setCallStatus("-");
            return;
          }
        } catch (parseError) {
          // If we can't parse the error, show the generic error
        }
        
        // If it's not a "room not found" error, show the error
        toast.error(`Failed to end call: ${response.status} ${errorText}`);
        return;
      }
    } catch (error) {
      // Check if it's a network error or other issue
      console.error("End call error:", error);
      toast.error(`Failed to end call: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Group call history by phone number
  const groupedCallHistory = callHistory.reduce((acc, call) => {
    if (!acc[call.phoneNumber]) {
      acc[call.phoneNumber] = [];
    }
    acc[call.phoneNumber].push(call);
    return acc;
  }, {} as Record<string, CallHistoryEntry[]>);

  // Sort calls within each group by timestamp (newest first)
  Object.keys(groupedCallHistory).forEach(phoneNumber => {
    groupedCallHistory[phoneNumber].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-2">
          {useMockData && (
            <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Demo Mode
            </div>
          )}
          <Button
            onClick={() => setShowCallHistory(!showCallHistory)}
            variant="outline"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <History className="h-4 w-4 mr-2" />
            {showCallHistory ? "Hide History" : "Call History"}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Call History Section */}
      {showCallHistory && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700 text-lg font-semibold">
              <History className="h-5 w-5" />
              Call History ({callHistory.length} calls)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {callHistory.length === 0 ? (
              <div className="text-center py-8">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No call history yet</p>
                <p className="text-sm text-gray-400">Make your first call to see history here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedCallHistory).map(([phoneNumber, calls]) => (
                  <div key={phoneNumber} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{phoneNumber}</h3>
                      <span className="text-sm text-gray-500">({calls.length} calls)</span>
                    </div>
                    <div className="space-y-3">
                      {calls.map((call) => (
                        <div key={call.id} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Package className="h-3 w-3 text-green-600" />
                              <span className="text-sm font-medium text-gray-700">{call.productName}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                call.status === 'successful' ? 'bg-green-100 text-green-700' :
                                call.status === 'failed' ? 'bg-red-100 text-red-700' :
                                call.status === 'ended' ? 'bg-gray-100 text-gray-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {call.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {new Date(call.timestamp).toLocaleString()}
                            </div>
                          </div>
                          
                          {call.customerInterested !== undefined && (
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-3 w-3 text-purple-600" />
                              <span className="text-xs text-gray-600">Customer Interest:</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                call.customerInterested ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {call.customerInterested ? 'Interested' : 'Not Interested'}
                              </span>
                            </div>
                          )}

                          {call.transcript && call.transcript.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center gap-2 mb-1">
                                <MessageSquare className="h-3 w-3 text-blue-600" />
                                <span className="text-xs font-medium text-gray-600">Transcript:</span>
                              </div>
                              <div className="max-h-32 overflow-y-auto space-y-1">
                                {call.transcript.slice(0, 3).map((msg, idx) => (
                                  <div key={idx} className={`text-xs p-2 rounded ${
                                    msg.role === 'assistant' ? 'bg-blue-50' : 'bg-gray-50'
                                  }`}>
                                    <span className="font-medium capitalize">{msg.role}:</span> {msg.content}
                                  </div>
                                ))}
                                {call.transcript.length > 3 && (
                                  <div className="text-xs text-gray-500 italic">
                                    ... and {call.transcript.length - 3} more messages
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {call.notes && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-600">Notes:</span>
                              <p className="text-xs text-gray-600 mt-1">{call.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-gray-600">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{callHistory.length}</p>
                <p className="text-gray-600">Total Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Calling Section */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
            <TestTube className="h-5 w-5" />
            Test Calling
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Live Call Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white border rounded-lg">
              <p className="text-sm text-gray-600">Call ID</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="last-call-id">
                {lastCallId || "-"}
              </p>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <p className="text-sm text-gray-600">Room Name</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="call-status">
                {currentRoomName || "-"}
              </p>
            </div>
          </div>

          {/* Controls: Get Status / End Call */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={!currentRoomName}
              onClick={getCallStatus}
            >
              Get Status
            </Button>
            <Button
              variant="outline"
              disabled={!currentRoomName}
              onClick={endCall}
            >
              End Call
            </Button>
            <div className={`ml-auto text-xs px-2 py-1 rounded ${isConnected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {isConnected ? "WebSocket: Connected" : "WebSocket: Disconnected"}
            </div>
          </div>
          {/* Inputs Grid - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Input */}
            <div className="space-y-2 col-span-1">
              <Label htmlFor="testPhone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="testPhone"
                type="tel"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="h-11"
              />
              <div>
                <Button
                  onClick={makeTestCall}
                  disabled={!testPhoneNumber.trim() || !testSelectedProduct}
                  className=" h-11 bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Make Test Call
                </Button>
              </div>

            </div>

            {/* Product Select */}
            <div className="space-y-2 w-full">
              <Label className="text-sm font-medium text-gray-700">
                Select Product
              </Label>
              <div className="max-h-36 overflow-y-auto w-full border rounded-lg divide-y bg-white">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className={`p-3 cursor-pointer transition-colors ${testSelectedProduct === product.id
                        ? "bg-blue-100 text-blue-900"
                        : "hover:bg-gray-50"
                        }`}
                      onClick={() => setTestSelectedProduct(product.id)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 space-y-0.5">
                          <p className="font-medium text-sm">{product.name}</p>
                        </div>
                        {testSelectedProduct === product.id && (
                          <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No products available
                  </div>
                )}
              </div>

            </div>
            {/* Selected Product Info */}
            {testSelectedProduct && (
              <div className="p-4 bg-white border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Selected Product:{" "}
                  {products.find((p) => p.id === testSelectedProduct)?.name}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {products.find((p) => p.id === testSelectedProduct)?.description}
                </p>
              </div>
            )}
          </div>


          {/* Transcript and Interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white border rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Transcript</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {transcript && transcript.length > 0 ? (
                  transcript.map((t, idx) => (
                    <div key={idx} className={`p-2 rounded ${t.role === "assistant" ? "bg-blue-50" : "bg-gray-50"}`}>
                      <span className="text-xs font-semibold mr-2 capitalize">{t.role}:</span>
                      <span className="text-sm text-gray-800">{t.content}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No transcript yet</div>
                )}
              </div>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <p className="text-sm text-gray-600">Customer Interested</p>
              <div className="mt-1">
                {lastMessage?.customer_interested === true && (
                  <span className="inline-flex items-center text-green-700 bg-green-100 px-2 py-1 rounded text-sm">Yes</span>
                )}
                {lastMessage?.customer_interested === false && (
                  <span className="inline-flex items-center text-red-700 bg-red-100 px-2 py-1 rounded text-sm">No</span>
                )}
                {typeof lastMessage?.customer_interested === "undefined" && (
                  <span className="inline-flex items-center text-gray-700 bg-gray-100 px-2 py-1 rounded text-sm">Unknown</span>
                )}
              </div>
            </div>
          </div>


        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;