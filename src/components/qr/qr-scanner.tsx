
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QrScannerProps {
  onScan: (data: string) => void;
}

export const QrScanner = ({ onScan }: QrScannerProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    
    // List cameras on load
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setCameras(devices);
          setSelectedCamera(devices[0].id); // Select first camera by default
        }
      })
      .catch((err) => {
        toast.error("Unable to access camera: " + err);
        console.error("Unable to access camera:", err);
      });
      
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => {
          console.error("Error stopping scanner:", err);
        });
      }
    };
  }, []);
  
  const startScanner = () => {
    if (!scannerRef.current || !selectedCamera) return;
    
    setIsStarted(true);
    
    const config = { 
      fps: 10, 
      qrbox: { width: 250, height: 250 }, 
      rememberLastUsedCamera: true 
    };
    
    scannerRef.current.start(
      selectedCamera,
      config,
      (decodedText) => {
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        // This is an ongoing scanning, ignore errors here
        console.log(errorMessage);
      }
    ).catch((err) => {
      toast.error("Failed to start scanner: " + err);
      setIsStarted(false);
    });
  };
  
  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => {
        setIsStarted(false);
      }).catch((err) => {
        console.error("Error stopping scanner:", err);
      });
    }
  };
  
  const handleScanSuccess = (decodedText: string) => {
    // Stop scanning after successful scan
    stopScanner();
    console.log("Scanned QR Code:", decodedText);
    // Pass the decoded text to the parent component
    onScan(decodedText);
  };
  
  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
    
    // If already scanning, stop and restart with new camera
    if (isStarted && scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => {
        startScanner();
      }).catch(err => {
        console.error("Error stopping scanner:", err);
      });
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div 
        id="qr-reader" 
        ref={containerRef} 
        className="w-full h-64 border-2 border-dashed border-primary/50 rounded-lg overflow-hidden bg-gray-50"
      />
      
      <div className="space-y-3">
        {cameras.length > 1 && (
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            {cameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.label}
              </option>
            ))}
          </select>
        )}
        
        {!isStarted ? (
          <Button 
            onClick={startScanner} 
            className="w-full bg-gradient-kalmunai hover:bg-kalmunai-teal"
          >
            Start Scanning
          </Button>
        ) : (
          <Button 
            onClick={stopScanner} 
            variant="outline" 
            className="w-full"
          >
            Stop Scanning
          </Button>
        )}
        
        <p className="text-xs text-center text-muted-foreground">
          Position your ID card QR code within the scanner area
        </p>
      </div>
    </div>
  );
};
