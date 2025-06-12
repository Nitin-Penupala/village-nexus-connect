
import { useState } from "react";
import { Shield, Users, AlertTriangle, Settings, LogOut, FileText, Bell, Menu, Home, Phone } from "lucide-react";
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
    { icon: Home, label: "Home", active: true },
    { icon: Phone, label: "Emergency Contacts", onClick: () => navigate('/emergency-contacts') },
    { icon: Settings, label: "Maintenance" },
    { icon: Users, label: "Apartment Residents" },
    { icon: Shield, label: "Admin Portal" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              <CardTitle className="flex items-center space-x-2 text-gray-800 text-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Recent Complaints</span>
              </CardTitle>
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
                    {complaints.slice(0, 8).map((complaint) => (
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
                          <Button size="sm" variant="outline" className="text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
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
