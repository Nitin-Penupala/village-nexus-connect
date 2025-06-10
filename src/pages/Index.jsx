import { useState } from "react";
import { Search, Plus, Users, Home, Phone, Mail, AlertCircle, CheckCircle, Filter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddComplaintDialog from "@/components/AddComplaintDialog";
import ComplaintCard from "@/components/ComplaintCard";

const initialComplaints = [
  {
    id: "1",
    title: "Water Leakage in Bathroom",
    description: "There is a continuous water leak from the bathroom ceiling causing damage to the floor.",
    status: "in-progress",
    priority: "high",
    category: "Plumbing",
    createdDate: "2023-11-15",
    residentName: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    residentEmail: "sarah.johnson@email.com",
    assignedTo: "John Maintenance"
  },
  {
    id: "2",
    title: "Broken Elevator",
    description: "The main elevator in the building has been out of order for 3 days.",
    status: "completed",
    priority: "high",
    category: "Mechanical",
    createdDate: "2023-11-10",
    residentName: "David Chen",
    unit: "B-205",
    building: "Oak Building",
    residentEmail: "david.chen@email.com",
    assignedTo: "Mike Technical"
  },
  {
    id: "3",
    title: "Noise Complaint",
    description: "Loud music and noise from the upper floor during night hours.",
    status: "in-progress",
    priority: "medium",
    category: "Noise",
    createdDate: "2023-11-12",
    residentName: "Maria Rodriguez",
    unit: "C-302",
    building: "Pine Building",
    residentEmail: "maria.rodriguez@email.com",
    assignedTo: "Security Team"
  },
  {
    id: "4",
    title: "Parking Space Issue",
    description: "Unauthorized vehicle parked in my designated parking spot.",
    status: "completed",
    priority: "low",
    category: "Parking",
    createdDate: "2023-11-08",
    residentName: "James Wilson",
    unit: "A-203",
    building: "Maple Building",
    residentEmail: "james.wilson@email.com",
    assignedTo: "Security Team"
  },
  {
    id: "5",
    title: "Air Conditioning Not Working",
    description: "The AC unit in my apartment stopped working and needs repair.",
    status: "in-progress",
    priority: "medium",
    category: "HVAC",
    createdDate: "2023-11-14",
    residentName: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    residentEmail: "sarah.johnson@email.com",
    assignedTo: "HVAC Specialist"
  }
];

const Index = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Quick complaint form state
  const [quickComplaintType, setQuickComplaintType] = useState("");
  const [quickComplaintDescription, setQuickComplaintDescription] = useState("");
  
  // Current user info (auto-filled)
  const currentUser = {
    name: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    email: "sarah.johnson@email.com"
  };

  const buildings = ["all", ...Array.from(new Set(complaints.map(c => c.building)))];
  
  // Mock current user for "your complaints" filter
  const currentUserEmail = "sarah.johnson@email.com";

  // First filter based on search term only (since building filter was removed)
  const visibleComplaints = complaints.filter(complaint => {
    return complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           complaint.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           complaint.unit.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Further filter the visible complaints based on the selected status filter
  const filteredComplaints = visibleComplaints.filter(complaint => {
    if (selectedFilter === "completed") {
      return complaint.status === "completed";
    } else if (selectedFilter === "in-progress") {
      return complaint.status === "in-progress";
    } else if (selectedFilter === "your-complaints") {
      return complaint.residentEmail === currentUserEmail;
    }
    return true;
  });

  const addComplaint = (newComplaint) => {
    const complaint = {
      ...newComplaint,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      status: "in-progress"
    };
    setComplaints([...complaints, complaint]);
  };

  const handleQuickComplaintSubmit = (e) => {
    e.preventDefault();
    if (!quickComplaintType || !quickComplaintDescription.trim()) return;
    
    const newComplaint = {
      title: `${quickComplaintType} Issue`,
      description: quickComplaintDescription,
      priority: "medium",
      category: quickComplaintType,
      residentName: currentUser.name,
      unit: currentUser.unit,
      building: currentUser.building,
      residentEmail: currentUser.email,
      assignedTo: ""
    };
    
    addComplaint(newComplaint);
    setQuickComplaintType("");
    setQuickComplaintDescription("");
  };

  const updateComplaint = (updatedComplaint) => {
    setComplaints(complaints.map(c => c.id === updatedComplaint.id ? updatedComplaint : c));
  };

  const deleteComplaint = (id) => {
    setComplaints(complaints.filter(c => c.id !== id));
  };

  const inProgressCount = complaints.filter(c => c.status === "in-progress").length;
  const completedCount = complaints.filter(c => c.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Complaint Management</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track and manage all building complaints efficiently. Submit new complaints and monitor their progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">In Progress Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Complaint Submission Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleQuickComplaintSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <Input
                    value={currentUser.name}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment ID</label>
                  <Input
                    value={`${currentUser.unit}, ${currentUser.building}`}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
                  <Select value={quickComplaintType} onValueChange={setQuickComplaintType}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="HVAC">HVAC</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Noise">Noise</SelectItem>
                      <SelectItem value="Parking">Parking</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-2 md:flex-[2]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Description</label>
                  <Textarea
                    value={quickComplaintDescription}
                    onChange={(e) => setQuickComplaintDescription(e.target.value)}
                    placeholder="Describe your complaint in detail..."
                    className="bg-white min-h-[60px]"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!quickComplaintType || !quickComplaintDescription.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </p>
        </div>

        {/* New Filter Bar Card relocated here */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints..."
                className="w-full md:w-1/2"
              />
              <div className="flex flex-row gap-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white z-50">
                    <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                      All Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>
                      Completed Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")}>
                      In Progress Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("your-complaints")}>
                      Your Complaints
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Detailed Complaint
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onUpdate={updateComplaint}
              onDelete={deleteComplaint}
            />
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No complaints found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or submit a new complaint using the form above.
              </p>
            </CardContent>
          </Card>
        )}

        <AddComplaintDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={addComplaint}
        />
      </div>
    </div>
  );
};

export default Index;
