const MOCK_EMERGENCY_CONTACTS = [
  {
    id: 1,
    name: "Building Security",
    phone: "+1 (555) 123-4567",
    email: "security@building.com",
    department: "Security",
    available: "24/7"
  },
  {
    id: 2,
    name: "Maintenance Emergency",
    phone: "+1 (555) 234-5678",
    email: "maintenance@building.com",
    department: "Maintenance",
    available: "24/7"
  },
  {
    id: 3,
    name: "Fire Department",
    phone: "911",
    email: "emergency@fire.gov",
    department: "Emergency",
    available: "24/7"
  },
  {
    id: 4,
    name: "Building Manager",
    phone: "+1 (555) 345-6789",
    email: "manager@building.com",
    department: "Management",
    available: "9 AM - 6 PM"
  },
  {
    id: 5,
    name: "Medical Emergency",
    phone: "911",
    email: "emergency@medical.gov",
    department: "Emergency",
    available: "24/7"
  }
];

export const emergencyContactService = {
  getAllContacts: async () => {
    return Promise.resolve(MOCK_EMERGENCY_CONTACTS);
  },

  getContactsByDepartment: async (department) => {
    const contacts = MOCK_EMERGENCY_CONTACTS.filter(
      contact => contact.department.toLowerCase() === department.toLowerCase()
    );
    return Promise.resolve(contacts);
  },

  getContactById: async (id) => {
    const contact = MOCK_EMERGENCY_CONTACTS.find(c => c.id === id);
    if (!contact) throw new Error('Contact not found');
    return Promise.resolve(contact);
  }
};
