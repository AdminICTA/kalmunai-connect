
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StaffService } from "@/services/staff-service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";
import { Staff } from "@/types/staff";

const StaffPrint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Check if staff was passed via location state
        if (location.state?.staff) {
          setStaff(location.state.staff);
        } else {
          // If not, get staff ID from URL query params
          const searchParams = new URLSearchParams(location.search);
          const staffId = searchParams.get("id");
          
          if (staffId) {
            const staffData = await StaffService.getStaffById(staffId);
            setStaff(staffData);
          } else {
            toast.error("No staff ID provided");
            navigate("/staff-details");
          }
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
        toast.error("Failed to load staff details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-red-500">Staff data not found</p>
        <div className="flex justify-center mt-4">
          <Button onClick={() => navigate("/staff-details")}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-4 print:hidden">
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate("/staff-details")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-8 print:py-2 max-w-4xl">
        <div className="border p-6 print:border-none print:p-0 rounded-lg">
          <div className="flex justify-between mb-6 items-center">
            <h1 className="text-2xl font-bold">Staff Record</h1>
            <p className="text-sm text-gray-500">Generated: {new Date().toLocaleDateString()}</p>
          </div>

          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{staff.fullName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium w-1/3">NIC:</span>
                  <span>{staff.nic || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Address:</span>
                  <span>{staff.address || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Mobile:</span>
                  <span>{staff.mobileNumber || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Date of Birth:</span>
                  <span>{formatDate(staff.dateOfBirth)}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Age:</span>
                  <span>{staff.age || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Gender:</span>
                  <span>{staff.gender || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Email:</span>
                  <span>{staff.email || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Employment Details</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium w-1/3">Department:</span>
                  <span>{staff.department || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Division:</span>
                  <span>{staff.division || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Current Post:</span>
                  <span>{staff.currentPost || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Grade:</span>
                  <span>{staff.grade || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Appointment:</span>
                  <span>{formatDate(staff.appointmentDate)}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Service Period:</span>
                  <span>{staff.servicePeriod || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Employee ID:</span>
                  <span>{staff.employeeId || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Family Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium w-1/2">Father's Name:</span>
                  <span>{staff.fatherName || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/2">Father's Status:</span>
                  <span>{staff.fatherStatus || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/2">Mother's Name:</span>
                  <span>{staff.motherName || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/2">Mother's Status:</span>
                  <span>{staff.motherStatus || "N/A"}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Spouse Details</h4>
                <div className="pl-4 border-l space-y-2">
                  <div className="flex">
                    <span className="font-medium w-1/3">Name:</span>
                    <span>{staff.spouseName || "N/A"}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-1/3">Address:</span>
                    <span>{staff.spouseAddress || "N/A"}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-1/3">Mobile:</span>
                    <span>{staff.spouseMobile || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Children</h4>
              {staff.children && staff.children.length > 0 ? (
                <div className="pl-4 border-l space-y-4">
                  {staff.children.map((child, index) => (
                    <div key={index}>
                      <h5 className="font-medium">Child {index + 1}</h5>
                      <p>Name: {child.name || "N/A"}, Age: {child.age || "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No children information available</p>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-8 pt-4 border-t print:mt-4">
            <p>Divisional Secretariat Kalmunai - Staff Records System</p>
            <p>This document is for official use only.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffPrint;
