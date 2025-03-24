
import { Button } from "@/components/ui/button";
import { Scan, Building, UserPlus } from "lucide-react";

interface ActionButtonsProps {
  onScanQrCode: () => void;
  onOfficeButtonClick: () => void;
  onAddUserClick: () => void;
}

const ActionButtons = ({ 
  onScanQrCode, 
  onOfficeButtonClick, 
  onAddUserClick 
}: ActionButtonsProps) => {
  return (
    <>
      <Button 
        onClick={onScanQrCode} 
        variant="outline"
        className="bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20"
      >
        <Scan className="h-4 w-4 mr-2" />
        Scan QR
      </Button>
      <Button 
        onClick={onOfficeButtonClick} 
        variant="outline"
        className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
      >
        <Building className="h-4 w-4 mr-2" />
        Office
      </Button>
      <Button 
        onClick={onAddUserClick} 
        className="bg-primary text-white"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </>
  );
};

export default ActionButtons;
