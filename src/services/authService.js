import jwt from 'jsonwebtoken';

const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

const JWT_SECRET = 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

export const authService = {
  login: async (email, password) => {
    try {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const token = jwt.sign(
          { email: ADMIN_CREDENTIALS.email, role: 'admin' },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
        return { token, admin: { email: ADMIN_CREDENTIALS.email } };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error(error.message || 'Authentication failed');
    }
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }
};
