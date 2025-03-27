import * as React from "react";
import { useState } from "react";
import { Staff, Department } from "@/types/staff";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Printer, Edit, Trash2 } from "lucide-react";
import { StaffForm } from "./staff-form";
import { StaffService } from "@/services/staff-service";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StaffDetailsModalProps {
  staff: Staff;
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
}

export const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  staff,
  isOpen,
  onClose,
  departments,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const success = await StaffService.deleteStaff(staff.id);
      if (success) {
        toast.success("Staff member deleted successfully");
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete staff:", error);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Staff Details - ${staff.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 18px; font-weight: bold; padding-bottom: 5px; border-bottom: 1px solid #ccc; margin-bottom: 10px; }
            .field { display: flex; margin-bottom: 8px; }
            .field-label { font-weight: bold; width: 180px; }
            .field-value { flex: 1; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Staff Details</h1>
          
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="field">
              <div class="field-label">Full Name:</div>
              <div class="field-value">${staff.fullName}</div>
            </div>
            <div class="field">
              <div class="field-label">NIC Number:</div>
              <div class="field-value">${staff.nic}</div>
            </div>
            <div class="field">
              <div class="field-label">Address:</div>
              <div class="field-value">${staff.address}</div>
            </div>
            <div class="field">
              <div class="field-label">Mobile Number:</div>
              <div class="field-value">${staff.mobileNumber}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth:</div>
              <div class="field-value">${format(new Date(staff.dob), "MMMM d, yyyy")}</div>
            </div>
            <div class="field">
              <div class="field-label">Age:</div>
              <div class="field-value">${staff.age}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Employment Information</div>
            <div class="field">
              <div class="field-label">Appointment Date:</div>
              <div class="field-value">${format(new Date(staff.appointmentDate), "MMMM d, yyyy")}</div>
            </div>
            <div class="field">
              <div class="field-label">Current Post:</div>
              <div class="field-value">${staff.currentPost}</div>
            </div>
            <div class="field">
              <div class="field-label">Grade:</div>
              <div class="field-value">${staff.grade}</div>
            </div>
            <div class="field">
              <div class="field-label">Division:</div>
              <div class="field-value">${staff.division}</div>
            </div>
            <div class="field">
              <div class="field-label">Department:</div>
              <div class="field-value">${staff.department}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Family Information</div>
            <div class="field">
              <div class="field-label">Father's Name:</div>
              <div class="field-value">${staff.family.fatherName} (${staff.family.fatherStatus})</div>
            </div>
            <div class="field">
              <div class="field-label">Mother's Name:</div>
              <div class="field-value">${staff.family.motherName} (${staff.family.motherStatus})</div>
            </div>
            ${staff.family.spouse ? `
              <div class="field">
                <div class="field-label">Spouse Name:</div>
                <div class="field-value">${staff.family.spouse.name}</div>
              </div>
              <div class="field">
                <div class="field-label">Spouse Address:</div>
                <div class="field-value">${staff.family.spouse.address}</div>
              </div>
              <div class="field">
                <div class="field-label">Spouse Mobile:</div>
                <div class="field-value">${staff.family.spouse.mobileNumber}</div>
              </div>
            ` : ''}
            ${staff.family.children.length > 0 ? `
              <div class="field">
                <div class="field-label">Children:</div>
                <div class="field-value">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${staff.family.children.map(child => `
                        <tr>
                          <td>${child.name}</td>
                          <td>${child.age}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <Dialog open={isOpen && !isEditing} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Staff Details - {staff.fullName}</DialogTitle>
            <DialogDescription>
              View complete information about this staff member.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Full Name</div>
                  <div className="text-base">{staff.fullName}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">NIC Number</div>
                  <div className="text-base">{staff.nic}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Mobile Number</div>
                  <div className="text-base">{staff.mobileNumber}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Date of Birth</div>
                  <div className="text-base">
                    {format(new Date(staff.dob), "MMMM d, yyyy")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Age</div>
                  <div className="text-base">{staff.age}</div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="text-sm font-medium">Address</div>
                  <div className="text-base">{staff.address}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Current Post</div>
                  <div className="text-base">{staff.currentPost}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Appointment Date</div>
                  <div className="text-base">
                    {format(new Date(staff.appointmentDate), "MMMM d, yyyy")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Grade</div>
                  <div className="text-base">{staff.grade}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Department</div>
                  <div className="text-base">{staff.department}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Division</div>
                  <div className="text-base">{staff.division}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="family" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Father's Name</div>
                  <div className="text-base">
                    {staff.family.fatherName}{" "}
                    <span className="text-sm text-muted-foreground">
                      ({staff.family.fatherStatus})
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Mother's Name</div>
                  <div className="text-base">
                    {staff.family.motherName}{" "}
                    <span className="text-sm text-muted-foreground">
                      ({staff.family.motherStatus})
                    </span>
                  </div>
                </div>
              </div>

              {staff.family.spouse && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Spouse Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Name</div>
                      <div className="text-base">{staff.family.spouse.name}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Mobile Number</div>
                      <div className="text-base">{staff.family.spouse.mobileNumber}</div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <div className="text-sm font-medium">Address</div>
                      <div className="text-base">{staff.family.spouse.address}</div>
                    </div>
                  </div>
                </div>
              )}

              {staff.family.children.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Children</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Name</th>
                        <th className="text-left pb-2">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.family.children.map((child, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-2">{child.name}</td>
                          <td className="py-2">{child.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleting(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isEditing && (
        <StaffForm
          departments={departments}
          editStaff={staff}
          onClose={handleCloseEdit}
        />
      )}

      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff
              record for {staff.fullName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
