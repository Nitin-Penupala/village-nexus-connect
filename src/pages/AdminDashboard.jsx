
import { useState } from "react";
import { Shield, Users, AlertTriangle, Settings, LogOut, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for dashboard
  const dashboardStats = [
    { title: "Total Residents", value: "124", icon: Users, color: "text-blue-600" },
    { title: "Active Complaints", value: "8", icon: AlertTriangle, color: "text-orange-600" },
    { title: "Resolved Issues", value: "47", icon: FileText, color: "text-green-600" },
    { title: "Pending Actions", value: "3", icon: Bell, color: "text-red-600" }
  ];

  const recentComplaints = [
    { id: 1, type: "Plumbing", unit: "A-101", priority: "High", status: "In Progress" },
    { id: 2, type: "Electrical", unit: "B-205", priority: "Medium", status: "Pending" },
    { id: 3, type: "Maintenance", unit: "C-304", priority: "Low", status: "Resolved" },
    { id: 4, type: "Noise", unit: "A-102", priority: "Medium", status: "Pending" }
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-600" />
            {isSidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-800">Admin Portal</h1>
                <p className="text-sm text-gray-600">Village Nexus</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium">
              <FileText className="h-5 w-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Users className="h-5 w-5" />
              {isSidebarOpen && <span>Residents</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <AlertTriangle className="h-5 w-5" />
              {isSidebarOpen && <span>Complaints</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              {isSidebarOpen && <span>Notifications</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Complaints Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Recent Complaints</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Unit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">#{complaint.id.toString().padStart(3, '0')}</td>
                        <td className="py-3 px-4 text-sm">{complaint.type}</td>
                        <td className="py-3 px-4 text-sm">{complaint.unit}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" className="text-xs">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
