
import { useState } from "react";
import { Shield, Users, AlertTriangle, Settings, LogOut, FileText, Bell, Menu, ChevronLeft, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { complaintService } from "@/services/complaintService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Fetch complaints data
  const { data: complaints = [], isLoading, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: complaintService.getAllComplaints,
  });

  // Calculate dashboard stats from real data
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
      value: complaints.filter(c => c.status === "in-progress").length.toString(), 
      icon: AlertTriangle, 
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      title: "Resolved Issues", 
      value: complaints.filter(c => c.status === "resolved").length.toString(), 
      icon: FileText, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Pending Actions", 
      value: complaints.filter(c => c.status === "pending").length.toString(), 
      icon: Bell, 
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const sidebarItems = [
    { icon: FileText, label: "Dashboard", active: true },
    { icon: Users, label: "Residents" },
    { icon: AlertTriangle, label: "Complaints" },
    { icon: Bell, label: "Notifications" },
    { icon: Phone, label: "Emergency Contacts", onClick: () => navigate('/emergency-contacts') },
    { icon: Settings, label: "Settings" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${!isSidebarExpanded && 'justify-center'}`}>
              <Shield className="h-8 w-8 text-red-600 flex-shrink-0" />
              {isSidebarExpanded && (
                <div>
                  <h1 className="text-lg font-bold text-gray-800">FixMyFlat</h1>
                  <p className="text-sm text-gray-600">Admin Portal</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-2"
            >
              {isSidebarExpanded ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-red-50 text-red-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isSidebarExpanded && 'justify-center'}`}
                title={!isSidebarExpanded ? item.label : ''}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarExpanded && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${!isSidebarExpanded && 'justify-center'}`}
            title={!isSidebarExpanded ? 'Logout' : ''}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isSidebarExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your building operations</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Complaints Table */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Recent Complaints</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">ID</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Title</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Unit</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Priority</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.slice(0, 5).map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          #{complaint.id.toString().padStart(3, '0')}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">{complaint.title}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{complaint.unit}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Button size="sm" variant="outline" className="text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-300">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {complaints.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No complaints found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
