import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffList } from "@/components/staff/staff-list";
import { StaffSearch } from "@/components/staff/staff-search";
import { StaffDetailsModal } from "@/components/staff/staff-details-modal";
import { StaffForm } from "@/components/staff/staff-form";
import { Staff } from "@/types/staff";
import { StaffService } from "@/services/staff-service";
import { MainLayout } from "@/components/layout/main-layout";
import { toast } from "sonner";
import { Plus, Building, ArrowLeft } from "lucide-react";
import { ModalForm } from "@/components/ui/modal-form";
import { useNavigate } from "react-router-dom";

interface Department {
  id: string;
  name: string;
  divisions: { id: string; name: string }[];
}

const StaffDetails = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchResults, setSearchResults] = useState<Staff[]>([]);
  const [activeTab, setActiveTab] = useState("departments");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await StaffService.getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      toast.error("Failed to load departments");
    }
  };

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleSearchResults = (results: Staff[]) => {
    setSearchResults(results);
    if (results.length === 0) {
      toast.info("No staff found matching your search");
    } else if (results.length === 1) {
      // If only one result, directly open the staff details
      handleStaffSelect(results[0]);
    }
    // Otherwise, just display the list of results
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear search results when switching tabs
    if (value === "departments") {
      setSearchResults([]);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Staff Management</h1>
          </div>
          <Button onClick={() => setIsAddStaffOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Staff
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="departments" 
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
              </TabsList>
              
              <TabsContent value="departments">
                <div className="space-y-6">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="bg-slate-50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-lg flex items-center">
                          <Building className="h-5 w-5 mr-2" />
                          {dept.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {dept.divisions.map((division) => (
                            <Card key={division.id}>
                              <CardHeader className="py-3">
                                <CardTitle className="text-base">{division.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Button 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Implementation to show staff in this division
                                    toast.info(`Showing staff in ${division.name} division`);
                                  }}
                                >
                                  View Staff
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="search">
                <div className="space-y-6">
                  <StaffSearch onSearchResults={handleSearchResults} />
                  
                  {searchResults.length > 1 && (
                    <StaffList onSelectStaff={handleStaffSelect} />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {selectedStaff && (
          <StaffDetailsModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            staff={selectedStaff}
            departments={departments}
            onUpdate={() => {
              // Refresh staff data after update
              if (searchResults.length > 0) {
                // Re-fetch search results
                const lastSearch = document.querySelector('input')?.value;
                if (lastSearch) {
                  StaffService.searchStaff(lastSearch).then(handleSearchResults);
                }
              }
            }}
          />
        )}
        
        <ModalForm
          title="Add New Staff"
          description="Fill in the staff details below"
          open={isAddStaffOpen}
          onOpenChange={setIsAddStaffOpen}
        >
          <StaffForm 
            onClose={() => setIsAddStaffOpen(false)}
            departments={departments}
            onSuccess={() => {
              setIsAddStaffOpen(false);
              toast.success("Staff added successfully");
            }}
          />
        </ModalForm>
      </div>
    </MainLayout>
  );
};

export default StaffDetails;
