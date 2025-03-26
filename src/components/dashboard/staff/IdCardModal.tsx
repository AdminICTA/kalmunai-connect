
import { useState } from "react";
import { ModalForm } from "@/components/ui/modal-form";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { toast } from "sonner";
import { IdCard } from "@/components/ui/id-card";
import { User } from "@/types/user";

interface IdCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const IdCardModal = ({ open, onOpenChange, user }: IdCardModalProps) => {
  if (!user) return null;
  
  return (
    <ModalForm
      title="ID Card Preview"
      description="Print or download the ID card"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-4">
        {/* Use our ID card component */}
        <IdCard user={user} className="mx-auto" />
        
        {/* Card actions */}
        <div className="flex justify-center space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              // Handle print functionality
              window.print();
            }}
            className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button 
            className="bg-primary text-white"
            onClick={() => {
              // Handle download functionality
              toast.success("ID Card downloaded successfully");
              onOpenChange(false);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </ModalForm>
  );
};

export default IdCardModal;
