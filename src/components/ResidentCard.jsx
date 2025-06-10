
import { useState } from "react";
import { Phone, Mail, Home, Calendar, MoreVertical, Edit, Trash2, User } from "lucide-react";
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
import EditResidentDialog from "./EditResidentDialog";

const ResidentCard = ({ resident, onUpdate, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={resident.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {getInitials(resident.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{resident.name}</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {resident.unit}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(resident.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Home className="h-4 w-4" />
              <span>{resident.building}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="truncate">{resident.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{resident.phone}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Moved in {formatDate(resident.moveInDate)}</span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <div>
                  <span className="font-medium">Emergency:</span> {resident.emergencyContact}
                  <br />
                  <span className="text-xs">{resident.emergencyPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditResidentDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        resident={resident}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ResidentCard;
