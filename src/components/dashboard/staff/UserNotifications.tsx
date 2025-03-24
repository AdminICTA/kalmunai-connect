
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  user: any;
  isRead: boolean;
}

interface UserNotificationsProps {
  notifications: Notification[];
  onNotificationAction: (notification: Notification) => void;
  formatNotificationTime: (timestamp: string) => string;
}

const UserNotifications = ({ 
  notifications, 
  onNotificationAction, 
  formatNotificationTime 
}: UserNotificationsProps) => {
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 relative"
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
          {unreadNotificationsCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotificationsCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Recent Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <DropdownMenuGroup>
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className="flex flex-col items-start py-2 px-4 cursor-pointer"
                onClick={() => onNotificationAction(notification)}
              >
                <div className="flex w-full justify-between items-start">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatNotificationTime(notification.timestamp)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{notification.message}</span>
                <div className="w-full flex justify-end mt-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs text-primary"
                  >
                    Create ID Card
                  </Button>
                </div>
                {!notification.isRead && (
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ) : (
          <div className="py-3 px-4 text-center text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNotifications;
