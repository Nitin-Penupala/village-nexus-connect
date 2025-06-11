import { useState } from "react";
import { Home, Phone, Mail, AlertCircle, Shield, Wrench, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const currentUser = {
    name: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    email: "sarah.johnson@email.com"
  };

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

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Fixed Sidebar - Same as Index.jsx */}
      <aside style={{
        width: '280px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo area */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Home style={{ width: '32px', height: '32px', color: '#2563eb' }} />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
              Fix My Flat
            </span>
          </div>
        </div>

        {/* User info */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <div className="flex items-center">
            <Avatar>
              <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-semibold text-lg">
                {currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </span>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold text-gray-900">{currentUser.name}</p>
              <p className="text-sm text-gray-500">Resident</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px' }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  borderRadius: 8,
                  padding: "10px 24px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/')}
              >
                <AlertCircle style={{ marginRight: 12, width: 20, height: 20 }} />
                Overview
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  borderRadius: 8,
                  padding: "10px 24px",
                  background: "#eef2ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                <Phone style={{ marginRight: 12, width: 20, height: 20 }} />
                Emergency Contacts
              </Button>
            </li>
            {/* ...rest of navigation buttons... */}
          </ul>
        </nav>

        {/* Logout button */}
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        marginLeft: '280px',
        flex: 1,
        background: '#f8fafc',
        minHeight: '100vh',
        padding: '32px',
        maxWidth: 'calc(100vw - 280px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Emergency Contacts
            </h1>
            <p style={{ color: '#6b7280' }}>
              Quick access to all important emergency contact information.
            </p>
          </div>

          {/* Emergency Contacts Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {emergencyContacts.map((contact, index) => (
              <Card key={index} style={{ backgroundColor: "white", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
                <CardContent style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ 
                        padding: "12px", 
                        backgroundColor: contact.department === "Emergency" ? "#fee2e2" : "#e0e7ff", 
                        borderRadius: "50%" 
                      }}>
                        <Phone style={{ 
                          height: "24px", 
                          width: "24px", 
                          color: contact.department === "Emergency" ? "#dc2626" : "#4f46e5" 
                        }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827" }}>
                          {contact.name}
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                          {contact.department}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a href={`tel:${contact.phone}`} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        color: "#4f46e5",
                        textDecoration: "none"
                      }}>
                        <Phone style={{ height: "16px", width: "16px" }} />
                        {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        color: "#4f46e5",
                        textDecoration: "none"
                      }}>
                        <Mail style={{ height: "16px", width: "16px" }} />
                        {contact.email}
                      </a>
                    </div>

                    <div style={{ 
                      marginTop: "8px", 
                      padding: "8px", 
                      backgroundColor: "#f3f4f6", 
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      color: "#374151"
                    }}>
                      <strong>Available:</strong> {contact.available}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyContacts;
