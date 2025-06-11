import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card style={{ 
          backgroundColor: "white", 
          border: "none", 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
        }}>
          <CardContent style={{ padding: "32px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Shield style={{ width: "48px", height: "48px", color: "#dc2626", margin: "0 auto 16px" }} />
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827" }}>Admin Login</h1>
              <p style={{ color: "#6b7280", marginTop: "8px" }}>
                Enter your credentials to access the admin portal
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle login logic here
            }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.875rem", 
                  fontWeight: "500", 
                  color: "#374151", 
                  marginBottom: "4px" 
                }}>
                  Email
                </label>
                <Input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@example.com"
                  required
                  style={{ backgroundColor: "white" }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.875rem", 
                  fontWeight: "500", 
                  color: "#374151", 
                  marginBottom: "4px" 
                }}>
                  Password
                </label>
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  style={{ backgroundColor: "white" }}
                />
              </div>

              <Button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#dc2626",
                  color: "white",
                  padding: "12px",
                  fontSize: "0.875rem",
                  fontWeight: "500"
                }}
              >
                <Shield style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                Login as Admin
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  color: "#4b5563",
                  fontSize: "0.875rem"
                }}
              >
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
