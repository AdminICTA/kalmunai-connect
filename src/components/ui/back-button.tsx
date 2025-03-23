
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  fallbackPath?: string
}

export function BackButton({ 
  className = "", 
  variant = "ghost", 
  size = "sm",
  fallbackPath = "/"
}: BackButtonProps) {
  const navigate = useNavigate()
  
  const handleGoBack = () => {
    // If there's history, go back; otherwise go to fallback path
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(fallbackPath)
    }
  }
  
  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleGoBack}
      className={`${className}`}
      aria-label="Go back"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>Back</span>
    </Button>
  )
}
