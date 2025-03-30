
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileText, CreditCard, AlertCircle, Bell, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface User {
  name: string;
  email: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface Application {
  id: number;
  type: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface Payment {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Property Tax Due",
      message: "Your annual property tax payment is due in 7 days.",
      date: "2023-06-15",
      read: false
    },
    {
      id: 2,
      title: "Application Approved",
      message: "Your birth certificate application has been approved.",
      date: "2023-06-10",
      read: true
    },
    {
      id: 3,
      title: "New Service Available",
      message: "Online vehicle registration is now available.",
      date: "2023-06-05",
      read: true
    }
  ]);
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      type: "Birth Certificate",
      status: "approved",
      date: "2023-05-15"
    },
    {
      id: 2,
      type: "Driving License Renewal",
      status: "pending",
      date: "2023-06-01"
    },
    {
      id: 3,
      type: "Marriage Certificate",
      status: "pending", 
      date: "2023-06-10"
    }
  ]);
  
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      type: "Property Tax",
      amount: 1250.00,
      date: "2023-04-10",
      status: "completed"
    },
    {
      id: 2,
      type: "Water Bill",
      amount: 45.75,
      date: "2023-05-05",
      status: "completed"
    },
    {
      id: 3,
      type: "Electricity Bill",
      amount: 78.25,
      date: "2023-06-01",
      status: "completed"
    }
  ]);
  
  const [duePayments, setDuePayments] = useState<Payment[]>([
    {
      id: 4,
      type: "Property Tax (Current Year)",
      amount: 1300.00,
      date: "2023-07-31",
      status: "pending"
    },
    {
      id: 5,
      type: "Water Bill (June)",
      amount: 42.50,
      date: "2023-06-25",
      status: "pending"
    }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    
    setTimeout(() => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to access the dashboard",
        });
        navigate("/auth/login");
      }
      setIsLoading(false);
    }, 1000);
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-xl">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 md:mt-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Applications</CardTitle>
                <CardDescription>Your service applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{applications.length}</div>
                <p className="text-sm text-gray-500">
                  {applications.filter(a => a.status === "pending").length} pending
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Payments</CardTitle>
                <CardDescription>Your transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{payments.length}</div>
                <p className="text-sm text-gray-500">
                  {duePayments.length} upcoming
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Notifications</CardTitle>
                <CardDescription>Your alerts and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{notifications.length}</div>
                <p className="text-sm text-gray-500">
                  {notifications.filter(n => !n.read).length} unread
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="applications">
                <FileText className="h-4 w-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="duepayments">
                <Clock className="h-4 w-4 mr-2" />
                Due Payments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="space-y-4">
              {notifications.map(notification => (
                <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : "bg-blue-100"} mr-4`}>
                        <Bell className={`h-5 w-5 ${notification.read ? "text-gray-500" : "text-blue-500"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-sm text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="applications" className="space-y-4">
              {applications.map(application => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-gray-100 mr-4">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{application.type}</h3>
                          <span className="text-sm text-gray-500">{application.date}</span>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${application.status === 'approved' ? 'bg-green-100 text-green-800' :
                              application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              {payments.map(payment => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-gray-100 mr-4">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{payment.type}</h3>
                          <span className="text-sm text-gray-500">{payment.date}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-medium">${payment.amount.toFixed(2)}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'failed' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="duepayments" className="space-y-4">
              {duePayments.length > 0 ? (
                duePayments.map(payment => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-red-100 mr-4">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{payment.type}</h3>
                            <span className="text-sm text-gray-500">Due: {payment.date}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="font-medium">${payment.amount.toFixed(2)}</span>
                            <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors">
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p>No payments due at this time.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
