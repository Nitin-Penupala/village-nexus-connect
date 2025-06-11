import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, User, Home, Calendar, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditComplaintDialog from "./EditComplaintDialog";

const ComplaintCard = ({ complaint, onUpdate, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(complaint.status)}
              <Badge variant="secondary" className={getStatusColor(complaint.status)}>
                {complaint.status === "in-progress" ? "In Progress" : "Completed"}
              </Badge>
            </div>
            {complaint.status !== "completed" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white z-50">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{complaint.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{complaint.description}</p>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-700">
              {complaint.category}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                    {getInitials(complaint.residentName)}
                  </AvatarFallback>
                </Avatar>
                <span>{complaint.residentName}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Home className="h-4 w-4" />
              <span>{complaint.unit}, {complaint.building}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(complaint.createdDate)}</span>
            </div>

            {complaint.assignedTo && (
              <div className="pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditComplaintDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        complaint={complaint}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ComplaintCard;
