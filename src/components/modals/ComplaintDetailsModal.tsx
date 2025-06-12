import React from 'react';
import { Modal, Button, Select } from 'antd';
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
    <Modal
      title="Complaint Details"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      {complaint && (
        <div>
          <h3>{complaint.title}</h3>
          <p><strong>Description:</strong></p>
          <p>{complaint.description}</p>
          <div className="mt-4">
            <p><strong>Current Status:</strong></p>
            <Select
              defaultValue={complaint.status}
              style={{ width: 200 }}
              onChange={handleStatusChange}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ComplaintDetailsModal;
