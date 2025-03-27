
import * as React from "react";
import { useState } from "react";
import { staffService } from "@/services/staff-service";
import { Department, Staff } from "@/types/staff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface StaffFormProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  editStaff?: Staff;
}

const MAX_CHILDREN = 5;

const familySchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherStatus: z.enum(["living", "deceased"]),
  motherName: z.string().min(1, "Mother's name is required"),
  motherStatus: z.enum(["living", "deceased"]),
  spouse: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    mobileNumber: z.string().optional(),
  }).optional(),
  children: z.array(
    z.object({
      name: z.string().min(1, "Child name is required"),
      age: z.number().min(0, "Age must be 0 or greater").max(100, "Age must be less than 100"),
    })
  ).optional(),
});

const staffSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  nic: z.string().min(1, "NIC number is required"),
  address: z.string().min(1, "Address is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  dob: z.string().min(1, "Date of birth is required"),
  age: z.number().min(18, "Age must be 18 or greater").max(100, "Age must be less than 100"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  currentPost: z.string().min(1, "Current post is required"),
  grade: z.string().min(1, "Grade is required"),
  department: z.string().min(1, "Department is required"),
  division: z.string().min(1, "Division is required"),
  family: familySchema,
});

type FormValues = z.infer<typeof staffSchema>;

export const StaffForm: React.FC<StaffFormProps> = ({
  isOpen,
  onClose,
  departments,
  editStaff,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    editStaff?.department || ""
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: editStaff
      ? {
          ...editStaff,
          family: {
            ...editStaff.family,
            children: editStaff.family.children || [],
          },
        }
      : {
          fullName: "",
          nic: "",
          address: "",
          mobileNumber: "",
          dob: "",
          age: 0,
          appointmentDate: "",
          currentPost: "",
          grade: "",
          department: "",
          division: "",
          family: {
            fatherName: "",
            fatherStatus: "living",
            motherName: "",
            motherStatus: "living",
            spouse: {
              name: "",
              address: "",
              mobileNumber: "",
            },
            children: [],
          },
        },
  });

  const watchDepartment = form.watch("department");

  React.useEffect(() => {
    if (watchDepartment !== selectedDepartment) {
      setSelectedDepartment(watchDepartment);
      form.setValue("division", "");
    }
  }, [watchDepartment, form, selectedDepartment]);

  const getDivisionsByDepartment = (departmentId: string) => {
    const department = departments.find((d) => d.id === departmentId);
    return department?.divisions || [];
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      if (editStaff) {
        await staffService.updateStaff(editStaff.id, values);
        toast.success("Staff member updated successfully");
      } else {
        await staffService.createStaff(values);
        toast.success("Staff member created successfully");
      }
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save staff data");
    } finally {
      setIsLoading(false);
    }
  };

  const addChild = () => {
    const currentChildren = form.getValues("family.children") || [];
    if (currentChildren.length < MAX_CHILDREN) {
      form.setValue("family.children", [
        ...currentChildren,
        { name: "", age: 0 },
      ]);
    }
  };

  const removeChild = (index: number) => {
    const currentChildren = form.getValues("family.children") || [];
    form.setValue(
      "family.children",
      currentChildren.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editStaff ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
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
                          <Input placeholder="NIC number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              // Calculate age
                              const birthDate = new Date(e.target.value);
                              const today = new Date();
                              let age = today.getFullYear() - birthDate.getFullYear();
                              const monthDiff = today.getMonth() - birthDate.getMonth();
                              if (
                                monthDiff < 0 ||
                                (monthDiff === 0 && today.getDate() < birthDate.getDate())
                              ) {
                                age--;
                              }
                              form.setValue("age", age);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="employment" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currentPost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Post</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select post" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DS">DS</SelectItem>
                              <SelectItem value="AO">AO</SelectItem>
                              <SelectItem value="ADO">ADO</SelectItem>
                              <SelectItem value="DCO">DCO</SelectItem>
                              <SelectItem value="MSO">MSO</SelectItem>
                              <SelectItem value="DO">DO</SelectItem>
                              <SelectItem value="ICTA">ICTA</SelectItem>
                              <SelectItem value="KKP">KKP</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Input placeholder="Grade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((department) => (
                                <SelectItem
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!selectedDepartment}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                            <SelectContent>
                              {getDivisionsByDepartment(selectedDepartment).map(
                                (division) => (
                                  <SelectItem
                                    key={division.id}
                                    value={division.id}
                                  >
                                    {division.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="family" className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">Parents Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="family.fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Father's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="family.fatherStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="living">Living</SelectItem>
                                <SelectItem value="deceased">Deceased</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="family.motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Mother's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="family.motherStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="living">Living</SelectItem>
                                <SelectItem value="deceased">Deceased</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Spouse Information (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="family.spouse.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spouse Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Spouse name" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="family.spouse.mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Mobile number" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="family.spouse.address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Address" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Children (Optional)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addChild}
                      disabled={(form.getValues("family.children") || []).length >= MAX_CHILDREN}
                    >
                      Add Child
                    </Button>
                  </div>

                  {(form.getValues("family.children") || []).map((_, index) => (
                    <div 
                      key={index} 
                      className="grid grid-cols-2 gap-4 p-4 border rounded-md mb-4"
                    >
                      <FormField
                        control={form.control}
                        name={`family.children.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Child name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-end gap-2">
                        <FormField
                          control={form.control}
                          name={`family.children.${index}.age`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="mb-[2px]"
                          onClick={() => removeChild(index)}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editStaff ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
