import { useState } from "react";
import { Search, Plus, Users, Home, Phone, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddResidentDialog from "@/components/AddResidentDialog";
import ResidentCard from "@/components/ResidentCard";

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  building: string;
  moveInDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatar?: string;
}

const initialResidents: Resident[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    unit: "A-101",
    building: "Maple Building",
    moveInDate: "2023-01-15",
    emergencyContact: "Mike Johnson",
    emergencyPhone: "(555) 987-6543"
  },
  {
    id: "2",
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "(555) 234-5678",
    unit: "B-205",
    building: "Oak Building",
    moveInDate: "2022-08-20",
    emergencyContact: "Lisa Chen",
    emergencyPhone: "(555) 876-5432"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "(555) 345-6789",
    unit: "C-302",
    building: "Pine Building",
    moveInDate: "2023-03-10",
    emergencyContact: "Carlos Rodriguez",
    emergencyPhone: "(555) 765-4321"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "(555) 456-7890",
    unit: "A-203",
    building: "Maple Building",
    moveInDate: "2022-11-05",
    emergencyContact: "Emma Wilson",
    emergencyPhone: "(555) 654-3210"
  }
];

const Index = () => {
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const buildings = ["all", ...Array.from(new Set(residents.map(r => r.building)))];

  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = selectedBuilding === "all" || resident.building === selectedBuilding;
    return matchesSearch && matchesBuilding;
  });

  const addResident = (newResident: Omit<Resident, "id">) => {
    const resident: Resident = {
      ...newResident,
      id: Date.now().toString()
    };
    setResidents([...residents, resident]);
  };

  const updateResident = (updatedResident: Resident) => {
    setResidents(residents.map(r => r.id === updatedResident.id ? updatedResident : r));
  };

  const deleteResident = (id: string) => {
    setResidents(residents.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Community Directory</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our resident community database. Connect with your neighbors and stay updated with community information.
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
                  <p className="text-2xl font-bold text-gray-900">{Math.floor(residents.length * 0.3)}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{Math.floor(residents.length * 0.7)}</p>
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
                  placeholder="Search residents, units, or email..."
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
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Resident
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredResidents.length} of {residents.length} residents
          </p>
        </div>

        {/* Residents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResidents.map((resident) => (
            <ResidentCard
              key={resident.id}
              resident={resident}
              onUpdate={updateResident}
              onDelete={deleteResident}
            />
          ))}
        </div>

        {filteredResidents.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No residents found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or add a new resident to get started.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Resident
              </Button>
            </CardContent>
          </Card>
        )}

        <AddResidentDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={addResident}
        />
      </div>
    </div>
  );
};

export default Index;
