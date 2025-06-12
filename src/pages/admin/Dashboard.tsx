import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import ComplaintDetailsModal from '../../components/modals/ComplaintDetailsModal';
import { fetchComplaints, updateComplaintStatus } from '../../services/complaintService';

export default function Dashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const staticComplaint = {
    id: 'test-123',
    title: 'Test Complaint',
    description:
      'This is a test complaint description to verify the view details functionality. This complaint has a longer description to test how the modal displays larger content.',
    status: 'pending',
    createdAt: new Date().toISOString(),
    userId: 'test-user',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsData = await fetchComplaints();
        // Add static complaint at the beginning of the array
        setComplaints([staticComplaint, ...complaintsData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsModalVisible(true);
  };

  const handleStatusUpdate = async (complaintId: string, newStatus: string) => {
    try {
      await updateComplaintStatus(complaintId, newStatus);
      // Refresh complaints data
      fetchComplaints();
      message.success('Complaint status updated successfully');
    } catch (error) {
      message.error('Failed to update complaint status');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="recent-complaints">
        <h2>Recent Complaints</h2>
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-item">
            <p>{complaint.description}</p>
            <Button onClick={() => handleViewDetails(complaint)}>View Details</Button>
          </div>
        ))}
      </div>

      <ComplaintDetailsModal
        isVisible={isModalVisible}
        complaint={selectedComplaint}
        onClose={() => setIsModalVisible(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}