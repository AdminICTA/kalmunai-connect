
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { StaffForm } from "./staff-form";
import { Staff } from "@/types/staff";
import { StaffService } from "@/services/staff-service";
import { useNavigate } from "react-router-dom";
import { Printer, Download, Trash2, Edit, X, Eye } from "lucide-react";

interface Department {
  id: string;
  name: string;
  divisions: { id: string; name: string }[];
}

interface StaffDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Staff;
  onUpdate?: () => void;
  departments: Department[];
}

export const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  open,
  onOpenChange,
  staff,
  onUpdate,
  departments,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Reset state when the modal opens/closes
  useEffect(() => {
    if (open) {
      setActiveTab("details");
      setIsEditing(false);
      setIsDeleting(false);
    }
  }, [open]);

  const handleDelete = async () => {
    try {
      await StaffService.deleteStaff(staff.id);
      toast.success("Staff record deleted successfully");
      onOpenChange(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Failed to delete staff record");
    }
  };

  const handlePrint = () => {
    navigate("/staff-print", { state: { staff } });
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!staff) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex justify-between items-center">
            <span>Staff Record: {staff.fullName}</span>
            <div className="flex gap-2">
              {!isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsDeleting(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            NIC: {staff.nic} | Department: {staff.department} | Position: {staff.currentPost}
          </DialogDescription>
        </DialogHeader>

        {isDeleting ? (
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-lg text-destructive">Confirm Delete</h3>
            <p>
              Are you sure you want to delete the record for {staff.fullName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ) : isEditing ? (
          <StaffForm 
            onClose={() => setIsEditing(false)}
            staffData={staff}
            departments={departments}
            onSuccess={() => {
              setIsEditing(false);
              if (onUpdate) onUpdate();
              toast.success("Staff record updated successfully");
            }}
          />
        ) : (
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Personal Details</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="family">Family Details</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Full Name</h3>
                  <p>{staff.fullName || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">NIC</h3>
                  <p>{staff.nic || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Address</h3>
                  <p>{staff.address || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Mobile Number</h3>
                  <p>{staff.mobileNumber || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Date of Birth</h3>
                  <p>{formatDate(staff.dateOfBirth)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Age</h3>
                  <p>{staff.age || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Gender</h3>
                  <p>{staff.gender || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Email</h3>
                  <p>{staff.email || "N/A"}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="employment" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Department</h3>
                  <p>{staff.department || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Division</h3>
                  <p>{staff.division || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Current Post</h3>
                  <p>{staff.currentPost || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Grade</h3>
                  <p>{staff.grade || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Appointment Date</h3>
                  <p>{formatDate(staff.appointmentDate)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Service Period</h3>
                  <p>{staff.servicePeriod || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Employee ID</h3>
                  <p>{staff.employeeId || "N/A"}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="family" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Father's Name</h3>
                  <p>{staff.fatherName || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Father's Status</h3>
                  <p>{staff.fatherStatus || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Mother's Name</h3>
                  <p>{staff.motherName || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Mother's Status</h3>
                  <p>{staff.motherStatus || "N/A"}</p>
                </div>
                
                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Spouse Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-gray-200">
                    <div className="space-y-2">
                      <h4 className="font-medium">Name</h4>
                      <p>{staff.spouseName || "N/A"}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Address</h4>
                      <p>{staff.spouseAddress || "N/A"}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Mobile Number</h4>
                      <p>{staff.spouseMobile || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Children</h3>
                  {staff.children && staff.children.length > 0 ? (
                    <div className="space-y-4">
                      {staff.children.map((child, index) => (
                        <div key={index} className="pl-4 border-l-2 border-gray-200">
                          <h4 className="font-medium">Child {index + 1}</h4>
                          <p>{child.name || "N/A"}, Age: {child.age || "N/A"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No children information available</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
