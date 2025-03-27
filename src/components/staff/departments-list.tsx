
import * as React from "react";
import { Department } from "@/types/staff";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DepartmentsListProps {
  departments: Department[];
}

export const DepartmentsList: React.FC<DepartmentsListProps> = ({ departments }) => {
  return (
    <div className="space-y-4">
      {departments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No departments found.</p>
          </CardContent>
        </Card>
      ) : (
        departments.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 py-4">
              <CardTitle className="text-lg">{department.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="divisions">
                  <AccordionTrigger className="hover:bg-muted/30 px-4 py-2 rounded-md">
                    Divisions ({department.divisions.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="border rounded-md overflow-hidden mt-2">
                      <table className="w-full">
                        <thead className="bg-muted/30">
                          <tr>
                            <th className="py-2 px-4 text-left font-medium text-sm">Division Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {department.divisions.length === 0 ? (
                            <tr>
                              <td className="py-4 px-4 text-center text-muted-foreground" colSpan={1}>
                                No divisions found
                              </td>
                            </tr>
                          ) : (
                            department.divisions.map((division) => (
                              <tr key={division.id} className="border-t hover:bg-muted/20">
                                <td className="py-3 px-4">{division.name}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
