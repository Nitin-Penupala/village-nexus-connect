
export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  createdDate: string;
  residentName?: string;
  unit?: string;
  building?: string;
  residentEmail?: string;
  assignedTo?: string;
  createdAt?: string;
  userId?: string;
}
