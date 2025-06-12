import { useState } from "react";
import { Users, Search, Phone, Mail, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

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

  // Mock data - replace with actual API call
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
      // Add more mock data as needed
    ])
  });

  const filteredResidents = residents.filter(resident => 
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Apartment Residents</h1>
        <p className="text-sm text-gray-600">Manage resident information</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResidents.map((resident) => (
          <Card key={resident.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
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

              <div className="mt-4 space-y-2">
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
    </div>
  );
};

export default ApartmentResidents;
