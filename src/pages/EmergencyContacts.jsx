import { useState } from "react";
import { Search, Users, Home, Phone, Mail, AlertCircle, Shield, Wrench, LogOut, ChevronLeft, ChevronRight, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";

const EmergencyContacts = () => {
  const { isExpanded, setIsExpanded } = useSidebar();
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
      {/* Fixed Sidebar - Same structure as Index.jsx */}
      <aside style={{
        width: isExpanded ? '280px' : '0px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: isExpanded ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 50
      }}>
        {/* Resident Name at Top */}
        <div style={{ 
          padding: '16px 24px', 
          borderBottom: '1px solid #e5e7eb',
          background: '#f8fafc'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            justifyContent: isExpanded ? 'flex-start' : 'center' 
          }}>
            <User style={{ width: 20, height: 20, color: '#2563eb' }} />
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#111827',
            }}>
              {isExpanded ? currentUser.name : currentUser.name.split(" ").map(n => n[0]).join("")}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
          {isExpanded && (
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p>Unit: {currentUser.unit}</p>
              <p>Building: {currentUser.building}</p>
            </div>
          )}
        </div>

        {/* Navigation - Updated to match Index.jsx structure */}
        <nav style={{ flex: 1, padding: '16px' }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/')}
              >
                <Home style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Home"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  background: "#eef2ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/emergency-contacts')}
              >
                <Phone style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Emergency Contacts"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/maintenance')}
              >
                <Wrench style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Maintenance"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/residents')}
              >
                <Users style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Apartment Residents"}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  borderRadius: 8,
                  padding: "10px",
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
                onClick={() => navigate('/admin-login')}
              >
                <Shield style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
                {isExpanded && "Admin Portal"}
              </Button>
            </li>
          </ul>
        </nav>

        {/* Logout section */}
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <Button
            variant="ghost"
            style={{
              width: "100%",
              justifyContent: isExpanded ? "flex-start" : "center",
              borderRadius: 8,
              padding: "10px",
              color: "#374151",
              fontWeight: 500,
            }}
            onClick={() => {}}
          >
            <LogOut style={{ width: 20, height: 20, marginRight: isExpanded ? 12 : 0 }} />
            {isExpanded && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        marginLeft: isExpanded ? '280px' : '0px',
        flex: 1,
        background: '#f8fafc',
        minHeight: '100vh',
        padding: '32px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header with Logo and Title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '32px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ padding: '8px' }}
            >
              <Menu style={{ width: '24px', height: '24px', color: '#111827' }} />
            </Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Home style={{ width: '32px', height: '32px', color: '#2563eb' }} />
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                  Fix My Flat
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Emergency Contacts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Emergency Contacts Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {emergencyContacts.map((contact, index) => (
              <Card key={index} style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.8)", 
                backdropFilter: "blur(4px)", 
                border: "none", 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
              }}>
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
