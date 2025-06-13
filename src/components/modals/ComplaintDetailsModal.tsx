
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Complaint } from '../../types/complaint';

interface ComplaintDetailsModalProps {
  isVisible: boolean;
  complaint: Complaint | null;
  onClose: () => void;
  onStatusUpdate: (complaintId: string, newStatus: string) => void;
}

const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({
  isVisible,
  complaint,
  onClose,
  onStatusUpdate,
}) => {
  const handleStatusChange = (value: string) => {
    if (complaint) {
      onStatusUpdate(complaint.id, value);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complaint Details</DialogTitle>
        </DialogHeader>
        {complaint && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{complaint.title}</h3>
            <div>
              <p className="font-medium">Description:</p>
              <p className="text-gray-600">{complaint.description}</p>
            </div>
            <div>
              <p className="font-medium mb-2">Current Status:</p>
              <Select defaultValue={complaint.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailsModal;
