
import { UserSearch } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Define color constants for the ID card
const colors = {
  darkBlue: "#1a365d",
  mediumBlue: "#2b6cb0",
  teal: "#319795",
};

interface IdCardUser {
  id: string;
  qr_code: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  nic: string;
}

interface IdCardProps {
  user: IdCardUser;
  className?: string;
}

export const IdCard = ({ user, className = "" }: IdCardProps) => {
  return (
    <div className={`relative w-full max-w-[360px] h-[220px] rounded-xl overflow-hidden border-2 border-black/10 shadow-lg ${className}`}>
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d] via-[#2b6cb0] to-[#319795]"></div>
      
      {/* Card security pattern - properly encoded SVG */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"></div>
      
      {/* Security hologram effect */}
      <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-transparent border border-white/20"></div>

      {/* Left side - Photo */}
      <div className="absolute top-0 left-0 h-full w-1/3 p-4 flex flex-col justify-between items-center">
        <div className="w-full">
          <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/50">
            <UserSearch className="h-12 w-12 text-[#1a365d]" />
          </div>
        </div>
        
        <div className="w-full">
          <QRCodeSVG
            value={user.qr_code || "DSPUB-00000"}
            size={75}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
      </div>
      
      {/* Right side - Information */}
      <div className="absolute top-0 right-0 h-full w-2/3 p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="text-center text-white">
          <h3 className="font-bold text-sm uppercase tracking-wider">Democratic Socialist Republic of Sri Lanka</h3>
          <h4 className="font-semibold text-xs">Divisional Secretariat - Kalmunai</h4>
          <div className="mt-1 bg-white/20 py-0.5 px-2 rounded text-xs font-medium inline-block">
            OFFICIAL ID
          </div>
        </div>
        
        {/* User details */}
        <div className="text-white space-y-0.5">
          <div className="grid grid-cols-3 text-xs">
            <span className="font-semibold">Name:</span>
            <span className="col-span-2 font-medium truncate">{user.full_name}</span>
          </div>
          <div className="grid grid-cols-3 text-xs">
            <span className="font-semibold">NIC:</span>
            <span className="col-span-2">{user.nic}</span>
          </div>
          <div className="grid grid-cols-3 text-xs">
            <span className="font-semibold">Address:</span>
            <span className="col-span-2 truncate">{user.address}</span>
          </div>
          <div className="grid grid-cols-3 text-xs">
            <span className="font-semibold">Contact:</span>
            <span className="col-span-2">{user.phone}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-white text-center text-xxs">
          <p className="text-[8px] opacity-80">ID: {user.qr_code}</p>
          <p className="text-[7px] opacity-70">This card is property of Divisional Secretariat Kalmunai. If found, please return.</p>
        </div>
      </div>
    </div>
  );
};
