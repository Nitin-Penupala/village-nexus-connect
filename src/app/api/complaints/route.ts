import { NextResponse } from 'next/server';

// Mock data
const complaints = [
  {
    id: "001",
    title: "Water Leakage",
    description: "Water leaking from bathroom ceiling",
    status: "pending",
    priority: "high",
    category: "plumbing",
    createdDate: "2024-01-15",
    residentName: "John Doe",
    unit: "A-101",
    building: "Block A",
    residentEmail: "john@example.com",
    assignedTo: "maintenance"
  },
  {
    id: "002",
    title: "Electrical Issue",
    description: "Power fluctuation in living room",
    status: "in-progress",
    priority: "medium",
    category: "electrical",
    createdDate: "2024-01-16",
    residentName: "Jane Smith",
    unit: "B-202",
    building: "Block B",
    residentEmail: "jane@example.com",
    assignedTo: "electrician"
  }
];

export async function GET() {
  return NextResponse.json(complaints);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    
    const complaintIndex = complaints.findIndex(c => c.id === id);
    if (complaintIndex === -1) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    complaints[complaintIndex].status = status;
    return NextResponse.json(complaints[complaintIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update complaint' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const complaint = await request.json();
    // In a real app, save to database. Here we're just returning the complaint
    return NextResponse.json(complaint);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create complaint' },
      { status: 500 }
    );
  }
}
