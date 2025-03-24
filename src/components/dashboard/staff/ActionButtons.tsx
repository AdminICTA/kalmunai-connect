
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
        className="bg-kalmunai-teal/10 border-kalmunai-teal/30 text-kalmunai-teal hover:bg-kalmunai-teal/20"
      >
        <Scan className="h-4 w-4 mr-2" />
        Scan QR
      </Button>
      <Button 
        onClick={onOfficeButtonClick} 
        variant="outline"
        className="bg-kalmunai-darkNavy/10 border-kalmunai-darkNavy/30 text-kalmunai-darkNavy hover:bg-kalmunai-darkNavy/20"
      >
        <Building className="h-4 w-4 mr-2" />
        Office
      </Button>
      <Button 
        onClick={onAddUserClick} 
        className="bg-gradient-kalmunai text-white"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </>
  );
};

export default ActionButtons;
