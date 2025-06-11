
import { useState } from "react";
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation (in real app, this would be proper authentication)
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (email === "admin@building.com" && password === "admin123") {
      // In a real app, you would handle authentication properly
      console.log("Admin login successful");
      // For now, just show success message
      alert("Login successful! Admin portal functionality would be implemented here.");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <Card style={{ 
        width: "100%", 
        maxWidth: "400px", 
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        border: "none",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }}>
        <CardHeader style={{ textAlign: "center", paddingBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div style={{ padding: "16px", backgroundColor: "#dc2626", borderRadius: "50%" }}>
              <Shield style={{ height: "32px", width: "32px", color: "white" }} />
            </div>
          </div>
          <CardTitle style={{ fontSize: "1.5rem", color: "#111827" }}>Admin Portal</CardTitle>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Enter your credentials to access the admin dashboard
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ 
                display: "block", 
                fontSize: "0.875rem", 
                fontWeight: "500", 
                color: "#374151", 
                marginBottom: "4px" 
              }}>
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@building.com"
                style={{ backgroundColor: "white" }}
              />
            </div>

            <div>
              <label style={{ 
                display: "block", 
                fontSize: "0.875rem", 
                fontWeight: "500", 
                color: "#374151", 
                marginBottom: "4px" 
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ backgroundColor: "white", paddingRight: "40px" }}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "4px"
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ height: "16px", width: "16px", color: "#6b7280" }} />
                  ) : (
                    <Eye style={{ height: "16px", width: "16px", color: "#6b7280" }} />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div style={{ 
                backgroundColor: "#fef2f2", 
                border: "1px solid #fecaca", 
                color: "#dc2626", 
                padding: "8px 12px", 
                borderRadius: "6px", 
                fontSize: "0.875rem" 
              }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#dc2626",
                color: "white",
                padding: "12px",
                marginTop: "8px"
              }}
            >
              Sign In
            </Button>

            <div style={{ 
              textAlign: "center", 
              fontSize: "0.75rem", 
              color: "#6b7280", 
              marginTop: "8px" 
            }}>
              Demo credentials: admin@building.com / admin123
            </div>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              style={{ color: "#6b7280", textDecoration: "none" }}
            >
              <ArrowLeft style={{ height: "16px", width: "16px", marginRight: "8px" }} />
              Back to Complaints
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
