import * as React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { Building, UserPlus, Search, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StaffService } from "@/services/staff-service";
import { Department, Staff, Designation } from "@/types/staff";
import { StaffForm } from "@/components/staff/staff-form";
import { StaffList } from "@/components/staff/staff-list";
import { StaffSearch } from "@/components/staff/staff-search";
import { StaffDetailsModal } from "@/components/staff/staff-details-modal";
import { DepartmentsList } from "@/components/staff/departments-list";
import { useNavigate } from "react-router-dom";

const StaffDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const menuItems = [
    { label: "Departments", icon: Building, value: "departments" },
    { label: "Staff List", icon: FileText, value: "staff-list" },
    { label: "Search", icon: Search, value: "search" },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const departmentsData = await StaffService.getAllDepartmentsWithDivisions();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsAddingStaff(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseAddStaff = () => {
    setIsAddingStaff(false);
  };

  return (
    <DashboardLayout
      title="Staff Details"
      subtitle="Manage staff information and department structure"
      menu={menuItems}
    >
      <TabsContent value="departments" className="space-y-6 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Departments and Divisions</h2>
          <Button onClick={handleAddStaff}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Staff
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="ml-2">Loading departments...</p>
          </div>
        ) : (
          <DepartmentsList departments={departments} />
        )}
      </TabsContent>

      <TabsContent value="staff-list" className="space-y-6 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Staff List</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/staff-print")}>
              <Printer className="h-4 w-4 mr-2" />
              Print List
            </Button>
            <Button onClick={handleAddStaff}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Staff
            </Button>
          </div>
        </div>
        <StaffList onSelectStaff={handleStaffSelect} />
      </TabsContent>

      <TabsContent value="search" className="space-y-6 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Search Staff</h2>
          <Button onClick={handleAddStaff}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Staff
          </Button>
        </div>
        <StaffSearch onSelectStaff={handleStaffSelect} />
      </TabsContent>

      {isModalOpen && selectedStaff && (
        <StaffDetailsModal
          staff={selectedStaff}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          departments={departments}
        />
      )}

      {isAddingStaff && (
        <StaffForm
          departments={departments}
          onClose={handleCloseAddStaff}
        />
      )}
    </DashboardLayout>
  );
};

export default StaffDetails;
