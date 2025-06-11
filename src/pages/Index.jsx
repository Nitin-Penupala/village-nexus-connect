import { useState } from "react";
import { Search, Plus, Users, Home, Phone, Mail, AlertCircle, CheckCircle, Filter, Send, Menu, X, Shield, Wrench, LogOut, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
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
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";

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
  const { isExpanded, setIsExpanded } = useSidebar();
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Quick complaint form state
  const [quickComplaintType, setQuickComplaintType] = useState("");
  const [customComplaintType, setCustomComplaintType] = useState("");
  const [quickComplaintDescription, setQuickComplaintDescription] = useState("");
  
  // Current user info (auto-filled)
  const currentUser = {
    name: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    email: "sarah.johnson@email.com"
  };

  // Emergency contacts data
  const emergencyContacts = [
    {
      name: "Building Security",
      phone: "+1 (555) 123-4567",
      email: "security@building.com",
      department: "Security",
      available: "24/7"
    },
    {
      name: "Maintenance Emergency",
      phone: "+1 (555) 234-5678", 
      email: "maintenance@building.com",
      department: "Maintenance",
      available: "24/7"
    },
    {
      name: "Fire Department",
      phone: "911",
      email: "emergency@fire.gov",
      department: "Emergency",
      available: "24/7"
    },
    {
      name: "Building Manager",
      phone: "+1 (555) 345-6789",
      email: "manager@building.com", 
      department: "Management",
      available: "9 AM - 6 PM"
    },
    {
      name: "Medical Emergency",
      phone: "911",
      email: "emergency@medical.gov",
      department: "Emergency", 
      available: "24/7"
    }
  ];

  // Priority mapping based on complaint type
  const getPriorityByType = (type) => {
    const priorityMap = {
      "Plumbing": "high",
      "Electrical": "high", 
      "HVAC": "medium",
      "Mechanical": "high",
      "Noise": "low",
      "Parking": "low",
      "Security": "high"
    };
    return priorityMap[type] || "medium";
  };

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
    const complaintType = quickComplaintType === "Other" ? customComplaintType : quickComplaintType;
    if (!complaintType || !quickComplaintDescription.trim()) return;
    
    const newComplaint = {
      title: `${complaintType} Issue`,
      description: quickComplaintDescription,
      priority: getPriorityByType(complaintType),
      category: complaintType,
      residentName: currentUser.name,
      unit: currentUser.unit,
      building: currentUser.building,
      residentEmail: currentUser.email,
      assignedTo: ""
    };
    
    addComplaint(newComplaint);
    setQuickComplaintType("");
    setCustomComplaintType("");
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Fixed Sidebar */}
      <aside style={{
        width: isExpanded ? '280px' : '0px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: isExpanded ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 50
      }}>
        {/* Resident Name at Top */}
        <div style={{ 
          padding: '16px 24px', 
          borderBottom: '1px solid #e5e7eb',
          background: '#f8fafc'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            justifyContent: isExpanded ? 'flex-start' : 'center' 
          }}>
            <User style={{ width: 20, height: 20, color: '#2563eb' }} />
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#111827',
            }}>
              {isExpanded ? currentUser.name : currentUser.name.split(" ").map(n => n[0]).join("")}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
          {isExpanded && (
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p>Unit: {currentUser.unit}</p>
              <p>Building: {currentUser.building}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px' }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  background: "#eef2ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/')}
              >
                <Home style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Home"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/emergency-contacts')}
              >
                <Phone style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Emergency Contacts"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/maintenance')}
              >
                <Wrench style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Maintenance"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/residents')}
              >
                <Users style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Apartment Residents"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/admin-login')}
              >
                <Shield style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Admin Portal"}
              </Button>
            </li>
          </ul>
        </nav>

        {/* Logout section */}
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <Button
            variant="ghost"
            style={{
              width: "100%",
              justifyContent: isExpanded ? "flex-start" : "center",
              borderRadius: 8,
              padding: "10px",
              color: "#374151",
              fontWeight: 500,
            }}
            onClick={() => {}}
          >
            <LogOut style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
            {isExpanded && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        marginLeft: isExpanded ? '280px' : '0px',
        flex: 1,
        background: '#f8fafc',
        minHeight: '100vh',
        padding: '32px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header with Logo and Title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '32px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ padding: '8px' }}
            >
              <Menu style={{ width: '24px', height: '24px', color: '#111827' }} />
            </Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Home style={{ width: '32px', height: '32px', color: '#2563eb' }} />
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                  Fix My Flat
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Complaint Management System
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Complaint Management
            </h1>
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4b5563' }}>
                Hey! {currentUser.name}
              </h2>
            </div>
            <p style={{ color: '#6b7280' }}>
              Track and manage all building complaints efficiently.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px',
            marginBottom: '32px'
          }}>
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
                      <SelectContent style={{ backgroundColor: "white", zIndex: "60", opacity: "1" }}>
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
                  {quickComplaintType === "Other" && (
                    <div style={{ flex: "1" }}>
                      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Custom Complaint Type</label>
                      <Input
                        value={customComplaintType}
                        onChange={(e) => setCustomComplaintType(e.target.value)}
                        placeholder="Enter complaint type"
                        style={{ backgroundColor: "white" }}
                      />
                    </div>
                  )}
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
                      disabled={!quickComplaintType || (quickComplaintType === "Other" && !customComplaintType.trim()) || !quickComplaintDescription.trim()}
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

          {/* No Complaints Message */}
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
      </main>
    </div>
  );
};

export default Index;
