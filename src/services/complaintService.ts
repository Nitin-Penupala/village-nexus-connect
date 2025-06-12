import axios from 'axios';

export const complaintService = {
  getAllComplaints: async () => {
    const response = await fetch('/api/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    return response.json();
  },

  updateComplaintStatus: async (id: string, status: string) => {
    try {
      const response = await fetch('/api/complaints', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      return response.json();
    } catch (error) {
      console.error('Error in updateComplaintStatus:', error);
      throw error;
    }
  },

  createComplaint: async (complaint: any) => {
    const response = await fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...complaint,
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        status: 'pending',
        createdDate: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create complaint');
    }

    return response.json();
  },
};