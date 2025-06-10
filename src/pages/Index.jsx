
import { useState } from "react";
import { Search, Plus, Users, Home, Phone, Mail, AlertCircle, CheckCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const buildings = ["all", ...Array.from(new Set(complaints.map(c => c.building)))];
  
  // Mock current user for "your complaints" filter
  const currentUserEmail = "sarah.johnson@email.com";

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBuilding = selectedBuilding === "all" || complaint.building === selectedBuilding;
    
    let matchesFilter = true;
    if (selectedFilter === "completed") {
      matchesFilter = complaint.status === "completed";
    } else if (selectedFilter === "in-progress") {
      matchesFilter = complaint.status === "in-progress";
    } else if (selectedFilter === "your-complaints") {
      matchesFilter = complaint.residentEmail === currentUserEmail;
    }
    
    return matchesSearch && matchesBuilding && matchesFilter;
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

        {/* Search and Filter Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search complaints, residents, or units..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {buildings.map(building => (
                  <option key={building} value={building}>
                    {building === "all" ? "All Buildings" : building}
                  </option>
                ))}
              </select>
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
                Add Complaint
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </p>
        </div>

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
                Try adjusting your search terms or add a new complaint to get started.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Complaint
              </Button>
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
