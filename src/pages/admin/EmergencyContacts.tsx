import { useState, useEffect } from "react";
import { PlusCircle, Phone, Mail, Shield, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { emergencyContactService } from "@/services/emergencyContactService";

const EmergencyContacts = () => {
  // ...existing state code...

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Emergency Contacts</h1>
            <p className="text-sm text-gray-600">Manage emergency contact information</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)} 
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingContact(contact)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-blue-600">
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </a>
                  <p className="text-sm text-gray-600">Available: {contact.available}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal stays the same */}
        {/* ...existing modal code... */}
      </div>
    </div>
  );
};

export default EmergencyContacts;
