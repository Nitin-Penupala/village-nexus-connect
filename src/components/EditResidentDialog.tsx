
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Resident } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

interface EditResidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resident: Resident;
  onUpdate: (resident: Resident) => void;
}

const EditResidentDialog = ({ open, onOpenChange, resident, onUpdate }: EditResidentDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    building: "",
    moveInDate: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  useEffect(() => {
    if (resident) {
      setFormData({
        name: resident.name,
        email: resident.email,
        phone: resident.phone,
        unit: resident.unit,
        building: resident.building,
        moveInDate: resident.moveInDate,
        emergencyContact: resident.emergencyContact,
        emergencyPhone: resident.emergencyPhone,
      });
    }
  }, [resident]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.unit || !formData.building) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onUpdate({
      ...resident,
      ...formData,
    });
    
    onOpenChange(false);
    
    toast({
      title: "Resident Updated",
      description: `${formData.name}'s information has been updated.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Resident</DialogTitle>
          <DialogDescription>
            Update resident information. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="edit-unit">Unit *</Label>
              <Input
                id="edit-unit"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                placeholder="A-101"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-building">Building *</Label>
              <Input
                id="edit-building"
                value={formData.building}
                onChange={(e) => handleInputChange("building", e.target.value)}
                placeholder="Maple Building"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-moveInDate">Move-in Date</Label>
              <Input
                id="edit-moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={(e) => handleInputChange("moveInDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-emergencyContact">Emergency Contact</Label>
              <Input
                id="edit-emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                placeholder="Emergency contact name"
              />
            </div>
            <div>
              <Label htmlFor="edit-emergencyPhone">Emergency Phone</Label>
              <Input
                id="edit-emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                placeholder="(555) 987-6543"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update Resident
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditResidentDialog;
