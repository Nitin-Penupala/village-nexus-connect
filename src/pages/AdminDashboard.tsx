import { useState } from "react";
import { Shield, Users, AlertTriangle, Settings, LogOut, FileText, Bell, Menu, Home, Phone, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { complaintService } from "@/services/complaintService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdDate: string;
  residentName: string;
  unit: string;
  building: string;
  residentEmail: string;
  assignedTo: string;
}

const AdminDashboard = () => {
  console.log("AdminDashboard component rendering...");
  
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showNewComplaintModal, setShowNewComplaintModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    priority: 'medium',
    unit: '',
    building: '',
    residentName: '',
    residentEmail: '',
    category: '',
  });
  const queryClient = useQueryClient();

  // Fetch complaints data with proper error handling
  const { data: complaints = [], isLoading, error } = useQuery<Complaint[]>({
    queryKey: ['complaints'],
    queryFn: async () => {
      console.log("Fetching complaints...");
      try {
        const result = await complaintService.getAllComplaints();
        console.log("Complaints fetched successfully:", result);
        return Array.isArray(result) ? result : [];
      } catch (err) {
        console.error("Error fetching complaints:", err);
        return [];
      }
    },
  });

  console.log("Component state:", { complaints, isLoading, error, complaintsLength: complaints?.length });

  // Calculate dashboard stats from real data with safety checks
  const dashboardStats = [
    { 
      title: "Total Residents", 
      value: "124", 
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Active Complaints", 
      value: Array.isArray(complaints) ? complaints.filter(c => c.status === "in-progress").length.toString() : "0", 
      icon: AlertTriangle, 
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      title: "Resolved Issues", 
      value: Array.isArray(complaints) ? complaints.filter(c => c.status === "resolved").length.toString() : "0", 
      icon: FileText, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Pending Actions", 
      value: Array.isArray(complaints) ? complaints.filter(c => c.status === "pending").length.toString() : "0", 
      icon: Bell, 
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/');
  };

  const toggleSidebar = () => {
    console.log("Toggle sidebar clicked");
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  const handleStatusUpdate = async (newStatusValue: string) => {
    if (newStatusValue === selectedComplaint?.status) return;
    setNewStatus(newStatusValue);
  };

  const submitStatusUpdate = async () => {
    if (!selectedComplaint || !newStatus) return;
    
    setIsUpdating(true);
    try {
      const response = await complaintService.updateComplaintStatus(selectedComplaint.id, newStatus);
      if (!response) throw new Error('Failed to update status');
      
      // Update local state
      await queryClient.invalidateQueries(['complaints']);
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      setShowDetailsModal(false);
      setNewStatus("");
      toast({
        title: "Status Updated",
        description: "Complaint status has been successfully updated.",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Status update error:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update complaint status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateComplaint = async () => {
    try {
      await complaintService.createComplaint({
        ...newComplaint,
        status: 'pending',
        createdDate: new Date().toISOString(),
      });
      
      await queryClient.invalidateQueries(['complaints']);
      setShowNewComplaintModal(false);
      setNewComplaint({ title: '', description: '', priority: 'medium', unit: '', building: '', residentName: '', residentEmail: '', category: '' });
      toast({
        title: "Success",
        description: "Complaint created successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create complaint",
        variant: "destructive",
      });
    }
  };

  const renderNewComplaintModal = () => (
    <Dialog open={showNewComplaintModal} onOpenChange={setShowNewComplaintModal}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Complaint</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Title</label>
              <input
                type="text"
                value={newComplaint.title}
                onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Priority</label>
              <select
                value={newComplaint.priority}
                onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Description</label>
            <textarea
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Unit</label>
              <input
                type="text"
                value={newComplaint.unit}
                onChange={(e) => setNewComplaint({...newComplaint, unit: e.target.value})}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Building</label>
              <input
                type="text"
                value={newComplaint.building}
                onChange={(e) => setNewComplaint({...newComplaint, building: e.target.value})}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowNewComplaintModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateComplaint}
              disabled={!newComplaint.title || !newComplaint.description}
            >
              Create Complaint
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { 
      icon: Phone, 
      label: "Emergency Contacts", 
      onClick: () => navigate('/emergency-contacts'),
      active: false
    },
    { 
      icon: Users, 
      label: "Apartment Residents", 
      onClick: () => navigate('/admin/residents'),
      active: false
    },
  ];

  if (error) {
    console.error("Query error:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">Error loading dashboard</p>
          <p className="text-gray-600 text-sm mt-2">{error.message || "Unknown error"}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    console.log("Dashboard is loading...");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  console.log("Rendering main dashboard content");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'} flex flex-col relative z-10`}>
        {/* User Profile Section */}
        <div className="p-4 border-b bg-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-white" />
            </div>
            {isSidebarExpanded && (
              <div>
                <h3 className="font-semibold text-gray-800">Admin User</h3>
                <p className="text-sm text-gray-600">Building: Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-2 space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isSidebarExpanded && 'justify-center px-2'}`}
                title={!isSidebarExpanded ? item.label : ''}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarExpanded && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${!isSidebarExpanded && 'justify-center px-2'}`}
            title={!isSidebarExpanded ? 'Logout' : ''}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isSidebarExpanded && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Home className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Fix My Flat</h1>
                  <p className="text-sm text-gray-600">Admin Management System</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Management</h1>
            <p className="text-gray-600">Hey! Admin User</p>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage all building operations efficiently.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Complaints Section */}
          <Card className="shadow-md">
            <CardHeader className="bg-gray-50 border-b px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Recent Complaints</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowNewComplaintModal(true)}
                  className="flex items-center space-x-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>New Complaint</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">ID</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Title</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Unit</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Priority</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(complaints) && complaints.slice(0, 8).map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          #{complaint.id.toString().padStart(3, '0')}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">{complaint.title}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{complaint.unit}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                            onClick={() => handleViewDetails(complaint)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!Array.isArray(complaints) || complaints.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No complaints found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Complaint Details Modal */}
          <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
              <DialogHeader>
                <DialogTitle>Complaint Details</DialogTitle>
              </DialogHeader>
              {selectedComplaint && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Title</label>
                      <p className="mt-1">{selectedComplaint.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <p className="mt-1">{selectedComplaint.status}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1">{selectedComplaint.description}</p>
                  </div>
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-500 block mb-2">Update Status</label>
                    <div className="flex gap-2">
                      {['pending', 'in-progress', 'resolved', 'rejected'].map((status) => (
                        <Button
                          key={status}
                          variant={newStatus === status ? "default" : "outline"}
                          onClick={() => handleStatusUpdate(status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={submitStatusUpdate}
                        disabled={!newStatus || newStatus === selectedComplaint?.status || isUpdating}
                        className={`bg-blue-600 hover:bg-blue-700 text-white ${
                          (!newStatus || newStatus === selectedComplaint?.status || isUpdating) 
                            ? 'opacity-50 cursor-not-allowed' 
                            : ''
                        }`}
                      >
                        {isUpdating ? 'Updating...' : newStatus ? 'Save Changes' : 'Select a status'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* New Complaint Modal */}
          {renderNewComplaintModal()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
