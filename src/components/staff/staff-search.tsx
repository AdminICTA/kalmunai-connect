
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { StaffService } from "@/services/staff-service";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface StaffSearchProps {
  onSearchResults: (results: any[]) => void;
}

export const StaffSearch: React.FC<StaffSearchProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await StaffService.searchStaff(searchTerm);
      onSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        className="w-full"
        placeholder="Search by name, NIC, or designation..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        variant="outline" 
        onClick={handleSearch} 
        disabled={isLoading}
      >
        <Search className="h-4 w-4 mr-2" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};
