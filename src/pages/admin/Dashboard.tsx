
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ComplaintDetailsModal from '../../components/modals/ComplaintDetailsModal';
import { fetchComplaints, updateComplaintStatus } from '../../services/complaintService';
import { Complaint } from '../../types/complaint';

export default function Dashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const staticComplaint: Complaint = {
    id: 'test-123',
    title: 'Test Complaint',
    description:
      'This is a test complaint description to verify the view details functionality. This complaint has a longer description to test how the modal displays larger content.',
    status: 'pending',
    createdDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    userId: 'test-user',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsData = await fetchComplaints();
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
      fetchComplaints();
      toast({ title: "Success", description: "Complaint status updated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update complaint status", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="recent-complaints">
        <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-medium">{complaint.title}</h3>
              <p className="text-gray-600 mt-2">{complaint.description}</p>
              <Button className="mt-3" onClick={() => handleViewDetails(complaint)}>
                View Details
              </Button>
            </div>
          ))}
        </div>
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
