
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scan } from "lucide-react";

const ScanQrCode = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">QR Code Scanner</h2>
      
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-6 py-10">
            <div className="w-64 h-64 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center bg-white/50">
              <Scan className="h-16 w-16 text-primary/30" />
            </div>
            <p className="text-center text-muted-foreground">
              Position the QR code within the scanner area.<br />
              The public user details will appear automatically.
            </p>
            <Button className="bg-primary text-white">
              <Scan className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanQrCode;
