
import * as React from "react";
import { useState } from "react";
import { staffService } from "@/services/staff-service";
import { Staff, Designation } from "@/types/staff";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Printer } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface StaffSearchProps {
  onSelectStaff: (staff: Staff) => void;
}

export const StaffSearch: React.FC<StaffSearchProps> = ({ onSelectStaff }) => {
  const [searchType, setSearchType] = useState<"name" | "nic" | "designation">("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [results, setResults] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const designations: Designation[] = [
    "DS", "AO", "ADO", "DCO", "MSO", "DO", "ICTA", "KKP", "Other"
  ];

  const handleSearch = async () => {
    if (!searchQuery && searchType !== "designation") return;
    if (searchType === "designation" && !selectedDesignation) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      let searchResults: Staff[] = [];

      switch (searchType) {
        case "name":
          searchResults = await staffService.getStaffByName(searchQuery);
          break;
        case "nic":
          const staff = await staffService.getStaffByNIC(searchQuery);
          if (staff) searchResults = [staff];
          break;
        case "designation":
          searchResults = await staffService.getStaffByDesignation(selectedDesignation);
          break;
      }

      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const printResults = () => {
    // Handle printing logic here
    if (results.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const designationTitle = searchType === 'designation' ? selectedDesignation : '';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Staff List${designationTitle ? ` - ${designationTitle}` : ''}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h2>Staff List${designationTitle ? ` - ${designationTitle}` : ''}</h2>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>NIC</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(staff => `
                <tr>
                  <td>${staff.fullName}</td>
                  <td>${staff.nic}</td>
                  <td>${staff.currentPost}</td>
                  <td>${staff.department}</td>
                  <td>${staff.division}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <RadioGroup 
                defaultValue="name" 
                className="flex flex-row space-x-4"
                onValueChange={(value) => setSearchType(value as any)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="name" id="name" />
                  <Label htmlFor="name">Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nic" id="nic" />
                  <Label htmlFor="nic">NIC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="designation" id="designation" />
                  <Label htmlFor="designation">Designation</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {searchType === "designation" ? (
                <Select 
                  value={selectedDesignation}
                  onValueChange={setSelectedDesignation}
                >
                  <SelectTrigger className="w-full sm:w-80">
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
              ) : (
                <Input
                  placeholder={`Search by ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80"
                />
              )}

              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>

              {results.length > 0 && (
                <Button variant="outline" onClick={printResults}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Results
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <>
          {results.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No staff records found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>NIC</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Division</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.fullName}</TableCell>
                      <TableCell>{staff.nic}</TableCell>
                      <TableCell>{staff.currentPost}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.division}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSelectStaff(staff)}
                        >
                          <Search className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
