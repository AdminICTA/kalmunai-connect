
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { UserSearchBarProps } from "./UserSearchBar.d.ts";

const UserSearchBar = ({ onSearch }: UserSearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, email, QR code or phone..."
          className="pl-8 border-kalmunai-teal/20 focus:border-kalmunai-teal focus:ring-kalmunai-teal/30"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default UserSearchBar;
