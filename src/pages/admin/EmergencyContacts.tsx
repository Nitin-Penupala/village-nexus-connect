
import { useState, useEffect } from "react";
import { PlusCircle, Phone, Mail, Shield, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { emergencyContactService } from "@/services/emergencyContactService";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    phone: '',
    available: '24/7',
  });

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const data = await emergencyContactService.getAllContacts();
        setContacts(data);
      } catch (err) {
        setError('Failed to load emergency contacts');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

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

        {/* Modal */}
        <Dialog open={showAddModal || !!editingContact} onOpenChange={() => {
          setShowAddModal(false);
          setEditingContact(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-md border p-2"
                  value={editingContact?.name || newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-md border p-2"
                  value={editingContact?.role || newContact.role}
                  onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  className="w-full mt-1 rounded-md border p-2"
                  value={editingContact?.phone || newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Availability</label>
                <input
                  type="text"
                  className="w-full mt-1 rounded-md border p-2"
                  value={editingContact?.available || newContact.available}
                  onChange={(e) => setNewContact({ ...newContact, available: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setShowAddModal(false);
                  setEditingContact(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle save logic here
                  setShowAddModal(false);
                  setEditingContact(null);
                }}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmergencyContacts;
