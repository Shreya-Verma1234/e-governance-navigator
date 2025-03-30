
import { Link } from "react-router-dom";
import { Landmark, FileText, Shield, CreditCard, FileBadge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const popularServices = [
    {
      title: "Pay Property Tax",
      description: "Make property tax payments online with instant receipt generation",
      icon: <Landmark className="h-8 w-8 text-primary" />,
      link: "/services/property-tax"
    },
    {
      title: "File Online FIR",
      description: "Report incidents to law enforcement authorities electronically",
      icon: <Shield className="h-8 w-8 text-primary" />,
      link: "/services/file-fir"
    },
    {
      title: "Apply for Certificates",
      description: "Request birth, death, marriage, and other essential certificates",
      icon: <FileText className="h-8 w-8 text-primary" />,
      link: "/services/certificates"
    },
    {
      title: "Pay Utility Bills",
      description: "Pay electricity, water, and other utility bills online",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      link: "/services/utility-bills"
    },
    {
      title: "Access Personal Records",
      description: "View and download your personal records and documents",
      icon: <FileBadge className="h-8 w-8 text-primary" />,
      link: "/services/personal-records"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Government Services, One Click Away
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Access government services online, anytime, anywhere.
              A single platform for all your civic needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services">
                <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                  Explore Services
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most frequently used e-governance services that make citizen-government 
                interaction efficient and transparent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link to={service.link}>
                      <Button variant="outline" className="w-full">Access Service</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg">View All Services</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Use E-Governance Navigator</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform is designed to make government services accessible, 
                efficient, and user-friendly for all citizens.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-600">
                  No more waiting in lines. Complete government transactions from the comfort of your home.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Bank-level security protects your personal information and transactions at all times.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
                <p className="text-gray-600">
                  Get immediate access to services and receive instant confirmations for your transactions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* News & Updates Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest News & Updates</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay informed about new services, system maintenance, and important government announcements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">June {item + 10}, 2023</div>
                    <h3 className="text-xl font-semibold mb-2">New Tax Filing System Launched</h3>
                    <p className="text-gray-600 mb-4">
                      The government has introduced a simplified tax filing system to make the process easier for citizens...
                    </p>
                    <Link to="/news/1" className="text-primary font-medium hover:underline">
                      Read More
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/news">
                <Button variant="outline" size="lg">View All Updates</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
