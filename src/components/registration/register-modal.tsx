
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api-service";
import { ENDPOINTS } from "@/services/api-config";

import { ModalForm } from "@/components/ui/modal-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  nic: z.string().min(5, "NIC must be at least 5 characters"),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface RegistrationResponse {
  success: boolean;
  message?: string;
}

export function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      nic: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    try {
      // Send registration data to API
      const response = await apiService.post<RegistrationResponse>(
        ENDPOINTS.USERS.REGISTER, 
        {
          ...data,
          status: "pending", // For staff notification
        }
      );
      
      if (response.success) {
        // Emit an event to notify parent components about the new user
        const newUserEvent = new CustomEvent('userCreated', { 
          detail: response.data 
        });
        window.dispatchEvent(newUserEvent);

        toast({
          title: "Registration Successful",
          description: "Your application has been submitted for processing.",
        });
        form.reset();
        onOpenChange(false);
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: response.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalForm
      title="Register for Digital ID"
      description="Fill in your details to apply for a new digital ID card."
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="nic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIC Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your NIC number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalForm>
  );
}
