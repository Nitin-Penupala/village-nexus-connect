
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditComplaintDialog = ({ open, onOpenChange, complaint, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in-progress",
    priority: "medium",
    category: "",
    residentName: "",
    unit: "",
    building: "",
    residentEmail: "",
    assignedTo: ""
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title || "",
        description: complaint.description || "",
        status: complaint.status || "in-progress",
        priority: complaint.priority || "medium",
        category: complaint.category || "",
        residentName: complaint.residentName || "",
        unit: complaint.unit || "",
        building: complaint.building || "",
        residentEmail: complaint.residentEmail || "",
        assignedTo: complaint.assignedTo || ""
      });
    }
  }, [complaint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...complaint,
      ...formData
    });
    onOpenChange(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of the complaint"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="HVAC">HVAC</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Noise">Noise</SelectItem>
                <SelectItem value="Parking">Parking</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="residentName">Resident Name</Label>
            <Input
              id="residentName"
              value={formData.residentName}
              onChange={(e) => handleInputChange("residentName", e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="residentEmail">Resident Email</Label>
            <Input
              id="residentEmail"
              type="email"
              value={formData.residentEmail}
              onChange={(e) => handleInputChange("residentEmail", e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                placeholder="A-101"
                required
              />
            </div>

            <div>
              <Label htmlFor="building">Building</Label>
              <Input
                id="building"
                value={formData.building}
                onChange={(e) => handleInputChange("building", e.target.value)}
                placeholder="Maple Building"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => handleInputChange("assignedTo", e.target.value)}
              placeholder="Maintenance staff name"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update Complaint
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditComplaintDialog;
