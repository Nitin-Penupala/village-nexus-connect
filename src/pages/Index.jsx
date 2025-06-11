
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
  
  // Quick complaint form state
  const [quickComplaintType, setQuickComplaintType] = useState("");
  const [quickComplaintPriority, setQuickComplaintPriority] = useState("");
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
    if (!quickComplaintType || !quickComplaintPriority || !quickComplaintDescription.trim()) return;
    
    const newComplaint = {
      title: `${quickComplaintType} Issue`,
      description: quickComplaintDescription,
      priority: quickComplaintPriority,
      category: quickComplaintType,
      residentName: currentUser.name,
      unit: currentUser.unit,
      building: currentUser.building,
      residentEmail: currentUser.email,
      assignedTo: ""
    };
    
    addComplaint(newComplaint);
    setQuickComplaintType("");
    setQuickComplaintPriority("");
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ padding: "12px", backgroundColor: "#2563eb", borderRadius: "50%" }}>
              <AlertCircle style={{ height: "32px", width: "32px", color: "white" }} />
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#111827" }}>Complaint Management</h1>
          </div>
          <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "32rem", margin: "0 auto" }}>
            Track and manage all building complaints efficiently. Submit new complaints and monitor their progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ padding: "12px", backgroundColor: "#fed7aa", borderRadius: "50%" }}>
                  <AlertCircle style={{ height: "24px", width: "24px", color: "#ea580c" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>In Progress Complaints</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827" }}>{inProgressCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ padding: "12px", backgroundColor: "#bbf7d0", borderRadius: "50%" }}>
                  <CheckCircle style={{ height: "24px", width: "24px", color: "#16a34a" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Completed Complaints</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827" }}>{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Complaint Submission Bar */}
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", marginBottom: "32px" }}>
          <CardContent style={{ padding: "24px" }}>
            <form onSubmit={handleQuickComplaintSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Your Name</label>
                  <Input
                    value={currentUser.name}
                    disabled
                    style={{ backgroundColor: "#f9fafb" }}
                  />
                </div>
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Apartment ID</label>
                  <Input
                    value={`${currentUser.unit}, ${currentUser.building}`}
                    disabled
                    style={{ backgroundColor: "#f9fafb" }}
                  />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Complaint Type</label>
                  <Select value={quickComplaintType} onValueChange={setQuickComplaintType}>
                    <SelectTrigger style={{ backgroundColor: "white" }}>
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white", zIndex: "60" }}>
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
                <div style={{ flex: "1" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Priority</label>
                  <Select value={quickComplaintPriority} onValueChange={setQuickComplaintPriority}>
                    <SelectTrigger style={{ backgroundColor: "white" }}>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "white", zIndex: "60" }}>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ flex: "2" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Complaint Description</label>
                  <Textarea
                    value={quickComplaintDescription}
                    onChange={(e) => setQuickComplaintDescription(e.target.value)}
                    placeholder="Describe your complaint in detail..."
                    style={{ backgroundColor: "white", minHeight: "60px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <Button 
                    type="submit"
                    style={{ backgroundColor: "#2563eb", color: "white" }}
                    disabled={!quickComplaintType || !quickComplaintPriority || !quickComplaintDescription.trim()}
                  >
                    <Send style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#6b7280" }}>
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </p>
        </div>

        {/* Filter Bar Card */}
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", marginBottom: "32px" }}>
          <CardContent style={{ padding: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints..."
                style={{ width: "100%", maxWidth: "400px" }}
              />
              <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" style={{ backgroundColor: "white" }}>
                      <Filter style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" style={{ backgroundColor: "white", zIndex: "60", border: "1px solid #d1d5db", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
                    <DropdownMenuItem onClick={() => setSelectedFilter("all")} style={{ backgroundColor: "white" }}>
                      All Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("completed")} style={{ backgroundColor: "white" }}>
                      Completed Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")} style={{ backgroundColor: "white" }}>
                      In Progress Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("your-complaints")} style={{ backgroundColor: "white" }}>
                      Your Complaints
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
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
          <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: "48px", textAlign: "center" }}>
              <AlertCircle style={{ height: "64px", width: "64px", color: "#9ca3af", margin: "0 auto 16px auto" }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>No complaints found</h3>
              <p style={{ color: "#6b7280", marginBottom: "16px" }}>
                Try adjusting your filters or submit a new complaint using the form above.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
