const MOCK_COMPLAINTS = [
  {
    id: "1",
    title: "Water Leakage in Bathroom",
    description: "There is a continuous water leak from the bathroom ceiling causing damage to the floor.",
    status: "in-progress",
    priority: "high",
    category: "Plumbing",
    createdDate: "2023-11-15",
    residentName: "Sarah Johnson",
    unit: "A-101",
    building: "Maple Building",
    residentEmail: "sarah.johnson@email.com",
    assignedTo: "John Maintenance"
  },
  // Add other initial complaints...
];

export const complaintService = {
  getAllComplaints: async () => {
    return Promise.resolve(MOCK_COMPLAINTS);
  },

  addComplaint: async (complaint) => {
    const newComplaint = {
      ...complaint,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      status: "in-progress"
    };
    MOCK_COMPLAINTS.push(newComplaint);
    return Promise.resolve(newComplaint);
  },

  updateComplaint: async (id, updates) => {
    const index = MOCK_COMPLAINTS.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Complaint not found');
    
    MOCK_COMPLAINTS[index] = { ...MOCK_COMPLAINTS[index], ...updates };
    return Promise.resolve(MOCK_COMPLAINTS[index]);
  },

  deleteComplaint: async (id) => {
    const index = MOCK_COMPLAINTS.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Complaint not found');
    
    MOCK_COMPLAINTS.splice(index, 1);
    return Promise.resolve({ success: true });
  }
};
