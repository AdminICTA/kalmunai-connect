
import * as React from "react";
import { useState, useEffect } from "react";
import { StaffService } from "@/services/staff-service";
import { Staff, Designation } from "@/types/staff";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";

const StaffPrint = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState<"name" | "designation">("designation");
  const [searchValue, setSearchValue] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  
  const designations: Designation[] = [
    "DS", "AO", "ADO", "DCO", "MSO", "DO", "ICTA", "KKP", "Other"
  ];

  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      try {
        const data = await StaffService.getAllStaff();
        setStaffList(data);
        setFilteredStaff(data);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleSearch = () => {
    if (searchType === "name") {
      const filtered = staffList.filter((staff) =>
        staff.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredStaff(filtered);
    } else if (searchType === "designation" && selectedDesignation) {
      const filtered = staffList.filter(
        (staff) => staff.currentPost === selectedDesignation
      );
      setFilteredStaff(filtered);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const title = searchType === "designation" && selectedDesignation 
      ? `Staff List - ${selectedDesignation}`
      : "Staff List";

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>NIC</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Division</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStaff.map(staff => `
                <tr>
                  <td>${staff.fullName}</td>
                  <td>${staff.nic}</td>
                  <td>${staff.currentPost}</td>
                  <td>${staff.department}</td>
                  <td>${staff.division}</td>
                  <td>${staff.mobileNumber}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton fallbackPath="/staff-details" />
          <h1 className="text-2xl font-bold">Staff Print</h1>
        </div>
        <Button onClick={handlePrint} disabled={filteredStaff.length === 0}>
          <Printer className="h-4 w-4 mr-2" />
          Print List
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Staff</CardTitle>
          <CardDescription>
            Filter staff by name or designation to generate printable lists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Search Type</Label>
                <Select
                  value={searchType}
                  onValueChange={(value) => setSearchType(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select search type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="designation">Designation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {searchType === "name" ? (
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="Enter name to search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <Select
                    value={selectedDesignation}
                    onValueChange={setSelectedDesignation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((designation) => (
                        <SelectItem key={designation} value={designation}>
                          {designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button onClick={handleSearch} className="w-full" disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>
            {filteredStaff.length} staff members found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <p className="ml-2">Loading staff data...</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No staff members found. Try adjusting your search criteria.
            </p>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/20">
                  <tr>
                    <th className="text-left p-3 font-medium">Full Name</th>
                    <th className="text-left p-3 font-medium">NIC</th>
                    <th className="text-left p-3 font-medium">Designation</th>
                    <th className="text-left p-3 font-medium">Department</th>
                    <th className="text-left p-3 font-medium">Division</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="border-t hover:bg-muted/10">
                      <td className="p-3">{staff.fullName}</td>
                      <td className="p-3">{staff.nic}</td>
                      <td className="p-3">{staff.currentPost}</td>
                      <td className="p-3">{staff.department}</td>
                      <td className="p-3">{staff.division}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPrint;
