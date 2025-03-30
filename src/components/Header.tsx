
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  FileText, 
  FileSpreadsheet, 
  FileBadge, 
  Landmark, 
  AlertTriangle, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const serviceCategories = [
    {
      name: "Tax & Billing",
      icon: <Landmark className="h-5 w-5" />,
      items: [
        { name: "Property Tax", path: "/services/property-tax" },
        { name: "Income Tax Filing", path: "/services/income-tax" },
        { name: "Pay Utility Bills", path: "/services/utility-bills" },
        { name: "GST Registration", path: "/services/gst-registration" },
      ]
    },
    {
      name: "Legal Services",
      icon: <FileBadge className="h-5 w-5" />,
      items: [
        { name: "File Online FIR", path: "/services/file-fir" },
        { name: "Court Case Status", path: "/services/court-case-status" },
        { name: "Legal Aid", path: "/services/legal-aid" },
        { name: "Notary Services", path: "/services/notary" },
      ]
    },
    {
      name: "Documentation",
      icon: <FileText className="h-5 w-5" />,
      items: [
        { name: "Birth Certificate", path: "/services/birth-certificate" },
        { name: "Death Certificate", path: "/services/death-certificate" },
        { name: "Marriage Certificate", path: "/services/marriage-certificate" },
        { name: "Property Documents", path: "/services/property-documents" },
      ]
    },
    {
      name: "Personal Records",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      items: [
        { name: "ID Documents", path: "/services/id-documents" },
        { name: "Education Records", path: "/services/education-records" },
        { name: "Medical Records", path: "/services/medical-records" },
        { name: "Employment History", path: "/services/employment-history" },
      ]
    },
    {
      name: "Emergency Services",
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
        { name: "Emergency Contacts", path: "/services/emergency-contacts" },
        { name: "Disaster Management", path: "/services/disaster-management" },
        { name: "Report Incident", path: "/services/report-incident" },
        { name: "COVID-19 Resources", path: "/services/covid-resources" },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeDropdown}>
              <Landmark className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">E-Governance Navigator</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {serviceCategories.map((category) => (
              <div className="relative" key={category.name}>
                <button
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary"
                  onClick={() => toggleDropdown(category.name)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
                
                {activeDropdown === category.name && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={closeDropdown}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <User className="mr-2 h-4 w-4" />
                My Dashboard
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="sm" className="hidden md:flex">Login</Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {serviceCategories.map((category) => (
              <div key={category.name}>
                <button
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                  onClick={() => toggleDropdown(category.name)}
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </div>
                </button>
                
                {activeDropdown === category.name && (
                  <div className="pl-4">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                to="/dashboard"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                My Dashboard
              </Link>
              <Link
                to="/auth/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
