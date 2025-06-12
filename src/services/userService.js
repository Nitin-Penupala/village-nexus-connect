const MOCK_USER = {
  name: "Sarah Johnson",
  unit: "A-101",
  building: "Maple Building",
  email: "sarah.johnson@email.com"
};

export const userService = {
  getCurrentUser: async () => {
    return Promise.resolve(MOCK_USER);
  },

  updateUserProfile: async (updates) => {
    Object.assign(MOCK_USER, updates);
    return Promise.resolve(MOCK_USER);
  }
};
