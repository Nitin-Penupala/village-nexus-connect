
import { useState } from "react";
import { Users, Search, Phone, Mail, Building, Home, Menu, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Resident {
  id: string;
  name: string;
  unit: string;
  building: string;
  phone: string;
  email: string;
  movingDate: string;
  status: 'active' | 'inactive';
}

const ApartmentResidents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  // Mock data with more residents
  const { data: residents = [] } = useQuery<Resident[]>({
    queryKey: ['residents'],
    queryFn: () => Promise.resolve([
      {
        id: '1',
        name: 'John Doe',
        unit: 'A101',
        building: 'Block A',
        phone: '123-456-7890',
        email: 'john@example.com',
        movingDate: '2023-01-01',
        status: 'active'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        unit: 'A102',
        building: 'Block A',
        phone: '123-456-7891',
        email: 'sarah@example.com',
        movingDate: '2023-02-15',
        status: 'active'
      },
      {
        id: '3',
        name: 'Mike Wilson',
        unit: 'B201',
        building: 'Block B',
        phone: '123-456-7892',
        email: 'mike@example.com',
        movingDate: '2023-03-10',
        status: 'active'
      },
      {
        id: '4',
        name: 'Emily Davis',
        unit: 'B202',
        building: 'Block B',
        phone: '123-456-7893',
        email: 'emily@example.com',
        movingDate: '2023-04-05',
        status: 'active'
      },
      {
        id: '5',
        name: 'Robert Brown',
        unit: 'C301',
        building: 'Block C',
        phone: '123-456-7894',
        email: 'robert@example.com',
        movingDate: '2023-05-20',
        status: 'active'
      },
      {
        id: '6',
        name: 'Lisa Garcia',
        unit: 'C302',
        building: 'Block C',
        phone: '123-456-7895',
        email: 'lisa@example.com',
        movingDate: '2023-06-12',
        status: 'active'
      }
    ])
  });

  const filteredResidents = residents.filter(resident => 
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      onClick: () => navigate('/admin-dashboard'),
      active: false
    },
    { 
      icon: Phone, 
      label: "Emergency Contacts", 
      onClick: () => navigate('/emergency-contacts'),
      active: false
    },
    { 
      icon: Users, 
      label: "Apartment Residents", 
      active: true
    },
  ];

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
            onClick={() => navigate('/')}
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
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Home className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Fix My Flat</h1>
                  <p className="text-sm text-gray-600">Apartment Residents</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Apartment Residents</h1>
            <p className="text-sm text-gray-600">Manage resident information ({residents.length} total residents)</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search residents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export List</Button>
              <Button>Add Resident</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResidents.map((resident) => (
              <Card key={resident.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{resident.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Building className="h-4 w-4" />
                        {resident.building} - Unit {resident.unit}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resident.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {resident.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <a href={`tel:${resident.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <Phone className="h-4 w-4" />
                      {resident.phone}
                    </a>
                    <a href={`mailto:${resident.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <Mail className="h-4 w-4" />
                      {resident.email}
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Resident since: {new Date(resident.movingDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResidents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No residents found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentResidents;
