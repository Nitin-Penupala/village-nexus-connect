import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
