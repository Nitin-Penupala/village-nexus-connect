
import { Phone, Mail, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const EmergencyContacts = () => {
  const navigate = useNavigate();

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
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
      padding: "32px 16px"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ padding: "12px", backgroundColor: "#dc2626", borderRadius: "50%" }}>
              <Phone style={{ height: "32px", width: "32px", color: "white" }} />
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#111827" }}>Emergency Contacts</h1>
          </div>
          <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "32rem", margin: "0 auto" }}>
            Important contact information for building emergencies and services
          </p>
        </div>

        {/* Emergency Contacts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          {emergencyContacts.map((contact, index) => (
            <Card key={index} style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}>
              <CardHeader>
                <CardTitle style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px",
                  fontSize: "1.25rem",
                  color: "#111827"
                }}>
                  <Phone style={{ height: "20px", width: "20px", color: "#2563eb" }} />
                  {contact.name}
                </CardTitle>
                <div style={{ 
                  fontSize: "0.875rem", 
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  {contact.department} • {contact.available}
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a 
                    href={`tel:${contact.phone}`} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      color: "#2563eb",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "500",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#e2e8f0";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#f8fafc";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <Phone style={{ height: "16px", width: "16px" }} />
                    {contact.phone}
                  </a>
                  <a 
                    href={`mailto:${contact.email}`} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      color: "#2563eb",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "500",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#e2e8f0";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#f8fafc";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <Mail style={{ height: "16px", width: "16px" }} />
                    {contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            <ArrowLeft style={{ height: "16px", width: "16px", marginRight: "8px" }} />
            Back to Complaints
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
