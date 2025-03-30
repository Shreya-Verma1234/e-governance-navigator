
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, CheckCircle, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FileFIR = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    incidentType: "",
    incidentDescription: "",
    witnessInfo: "",
    evidenceInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "FIR submitted successfully",
        description: "Your complaint has been registered. Reference ID: FIR-2023-3456",
      });
    }, 2000);
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">FIR Filed Successfully</h2>
                    <p className="text-gray-600 mb-4">
                      Your complaint has been registered with the authorities.
                    </p>
                    <div className="bg-white p-4 rounded-md w-full mb-6">
                      <p className="font-semibold mb-1">Reference Number</p>
                      <p className="text-2xl font-bold text-primary">FIR-2023-3456</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Please save this reference number for future communication. A confirmation 
                      has been sent to your registered email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={() => navigate("/dashboard")}>
                        Go to Dashboard
                      </Button>
                      <Button variant="outline">
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="font-bold mr-2">1.</span>
                    <span>Your complaint will be reviewed by the concerned police authority within 24-48 hours.</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">2.</span>
                    <span>You may be contacted for additional information or verification.</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">3.</span>
                    <span>Once verified, an investigation officer will be assigned to your case.</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">4.</span>
                    <span>You can track the status of your complaint using the reference number provided.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                For emergency assistance, please contact the emergency helpline at 112
              </p>
            </div>
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
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">File an Online FIR</CardTitle>
                  <CardDescription>
                    Submit a First Information Report for non-emergency incidents
                  </CardDescription>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Step {step} of 3
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start space-x-3 mb-6">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800">Important Information</h4>
                      <p className="text-sm text-amber-700">
                        Filing a false complaint is a punishable offense. Please provide accurate information.
                        For emergencies, contact the emergency helpline at 112 immediately.
                      </p>
                    </div>
                  </div>
                  
                  <form className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Current Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </form>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <form className="space-y-4">
                    <h3 className="text-lg font-semibold">Incident Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="incidentDate">Date of Incident</Label>
                        <Input
                          id="incidentDate"
                          name="incidentDate"
                          type="date"
                          value={formData.incidentDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="incidentTime">Time of Incident</Label>
                        <Input
                          id="incidentTime"
                          name="incidentTime"
                          type="time"
                          value={formData.incidentTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="incidentLocation">Location of Incident</Label>
                      <Input
                        id="incidentLocation"
                        name="incidentLocation"
                        value={formData.incidentLocation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="incidentType">Type of Incident</Label>
                      <Select
                        value={formData.incidentType}
                        onValueChange={(value) => handleSelectChange(value, "incidentType")}
                      >
                        <SelectTrigger id="incidentType">
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theft">Theft/Burglary</SelectItem>
                          <SelectItem value="assault">Assault</SelectItem>
                          <SelectItem value="fraud">Fraud/Cybercrime</SelectItem>
                          <SelectItem value="property">Property Damage</SelectItem>
                          <SelectItem value="missing">Missing Person/Item</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="incidentDescription">
                        Description of Incident
                        <span className="text-gray-500 text-sm ml-1">(Be as detailed as possible)</span>
                      </Label>
                      <Textarea
                        id="incidentDescription"
                        name="incidentDescription"
                        value={formData.incidentDescription}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                    </div>
                  </form>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="witnessInfo">
                        Witness Information
                        <span className="text-gray-500 text-sm ml-1">(if any)</span>
                      </Label>
                      <Textarea
                        id="witnessInfo"
                        name="witnessInfo"
                        value={formData.witnessInfo}
                        onChange={handleChange}
                        placeholder="Provide names and contact details of any witnesses"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="evidenceInfo">
                        Evidence Information
                        <span className="text-gray-500 text-sm ml-1">(if any)</span>
                      </Label>
                      <Textarea
                        id="evidenceInfo"
                        name="evidenceInfo"
                        value={formData.evidenceInfo}
                        onChange={handleChange}
                        placeholder="Describe any evidence (photos, videos, documents) you have related to the incident"
                        rows={3}
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md mt-6 border">
                      <h4 className="font-semibold mb-2">Declaration</h4>
                      <p className="text-sm text-gray-700">
                        I hereby declare that the information provided above is true to the best of my 
                        knowledge and belief. I understand that providing false information is a 
                        punishable offense under the law.
                      </p>
                      <div className="mt-4 flex items-center">
                        <input
                          type="checkbox"
                          id="declaration"
                          className="mr-2"
                          required
                        />
                        <Label htmlFor="declaration" className="text-sm font-medium">
                          I agree to the above declaration
                        </Label>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit FIR"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FileFIR;
