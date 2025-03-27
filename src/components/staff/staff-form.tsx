import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Staff, Designation } from "@/types/staff";
import { StaffService } from "@/services/staff-service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Define validation schema for staff form
const staffFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  nic: z.string().min(10, "NIC must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  age: z.coerce.number().min(18, "Age must be at least 18"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  currentPost: z.string().min(1, "Current post is required"),
  grade: z.string().min(1, "Grade is required"),
  division: z.string().min(1, "Division is required"),
  department: z.string().min(1, "Department is required"),
  // Family details
  fatherName: z.string().min(1, "Father's name is required"),
  fatherStatus: z.enum(["living", "deceased"]),
  motherName: z.string().min(1, "Mother's name is required"),
  motherStatus: z.enum(["living", "deceased"]),
  // Optional spouse details
  spouseName: z.string().optional(),
  spouseAddress: z.string().optional(),
  spouseMobileNumber: z.string().optional(),
  // Children details handled separately
});

// Type for form values
type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffFormProps {
  staff?: Staff;
  onSubmit?: (staff: Staff) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function StaffForm({ staff, onSubmit, onCancel, isLoading = false }: StaffFormProps) {
  const { toast } = useToast();
  const [children, setChildren] = useState<{ name: string; age: number }[]>(
    staff?.family.children || []
  );
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState<number | null>(null);

  // Initialize form with staff data if provided
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: staff
      ? {
          fullName: staff.fullName,
          nic: staff.nic,
          address: staff.address,
          mobileNumber: staff.mobileNumber,
          dob: staff.dob,
          age: staff.age,
          appointmentDate: staff.appointmentDate,
          currentPost: staff.currentPost,
          grade: staff.grade,
          division: staff.division,
          department: staff.department,
          fatherName: staff.family.fatherName,
          fatherStatus: staff.family.fatherStatus,
          motherName: staff.family.motherName,
          motherStatus: staff.family.motherStatus,
          spouseName: staff.family.spouse?.name || "",
          spouseAddress: staff.family.spouse?.address || "",
          spouseMobileNumber: staff.family.spouse?.mobileNumber || "",
        }
      : {
          fullName: "",
          nic: "",
          address: "",
          mobileNumber: "",
          dob: "",
          age: 18,
          appointmentDate: "",
          currentPost: "",
          grade: "",
          division: "",
          department: "",
          fatherName: "",
          fatherStatus: "living",
          motherName: "",
          motherStatus: "living",
          spouseName: "",
          spouseAddress: "",
          spouseMobileNumber: "",
        },
  });

  // Function to add child
  const addChild = () => {
    if (childName && childAge) {
      setChildren([...children, { name: childName, age: childAge }]);
      setChildName("");
      setChildAge(null);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Child name and age are required",
      });
    }
  };

  // Function to remove child
  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = (values: StaffFormValues) => {
    try {
      // Construct staff object
      const staffData: Omit<Staff, "id"> = {
        fullName: values.fullName,
        nic: values.nic,
        address: values.address,
        mobileNumber: values.mobileNumber,
        dob: values.dob,
        age: values.age,
        appointmentDate: values.appointmentDate,
        currentPost: values.currentPost,
        grade: values.grade,
        division: values.division,
        department: values.department,
        family: {
          fatherName: values.fatherName,
          fatherStatus: values.fatherStatus,
          motherName: values.motherName,
          motherStatus: values.motherStatus,
          children: children,
          spouse: values.spouseName
            ? {
                name: values.spouseName,
                address: values.spouseAddress || "",
                mobileNumber: values.spouseMobileNumber || "",
              }
            : undefined,
        },
      };

      // If staff exists, update it, otherwise create new
      if (staff?.id) {
        StaffService.updateStaff(staff.id, staffData)
          .then((updatedStaff) => {
            toast({
              title: "Success",
              description: "Staff updated successfully",
            });
            onSubmit?.(updatedStaff);
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: `Failed to update staff: ${error.message}`,
            });
          });
      } else {
        StaffService.createStaff(staffData)
          .then((newStaff) => {
            toast({
              title: "Success",
              description: "Staff created successfully",
            });
            onSubmit?.(newStaff);
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: `Failed to create staff: ${error.message}`,
            });
          });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NIC */}
              <FormField
                control={form.control}
                name="nic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter NIC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Number */}
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Appointment Date */}
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Post */}
              <FormField
                control={form.control}
                name="currentPost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Post</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter current post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter grade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Division */}
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter division" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Department */}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Family Details */}
            <h4 className="text-lg font-semibold mt-4">Family Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Father's Name */}
              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter father's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Father's Status */}
              <FormField
                control={form.control}
                name="fatherStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="living">Living</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mother's Name */}
              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mother's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mother's Status */}
              <FormField
                control={form.control}
                name="motherStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother's Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="living">Living</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Spouse Details */}
            <h4 className="text-lg font-semibold mt-4">Spouse Details (Optional)</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spouse's Name */}
              <FormField
                control={form.control}
                name="spouseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spouse's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter spouse's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Spouse's Mobile Number */}
              <FormField
                control={form.control}
                name="spouseMobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spouse's Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter spouse's mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Spouse's Address */}
            <FormField
              control={form.control}
              name="spouseAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spouse's Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter spouse's address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Children Details */}
            <h4 className="text-lg font-semibold mt-4">Children Details</h4>

            {/* Add Child Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormLabel>Child's Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter child's name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                />
              </div>
              <div>
                <FormLabel>Child's Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter child's age"
                  value={childAge !== null ? childAge.toString() : ""}
                  onChange={(e) =>
                    setChildAge(e.target.value ? parseInt(e.target.value) : null)
                  }
                />
              </div>
            </div>
            <Button type="button" onClick={addChild}>
              Add Child
            </Button>

            {/* Display Children */}
            {children.length > 0 && (
              <div className="mt-4">
                <h5 className="text-md font-semibold">List of Children</h5>
                <ul>
                  {children.map((child, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b">
                      <span>{child.name} - {child.age} years</span>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeChild(index)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={onCancel} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
