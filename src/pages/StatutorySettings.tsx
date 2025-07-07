import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Plus,
  MapPin,
  IndianRupee,
  Calendar,
  Shield,
  Users,
  Building,
  FileText,
} from "lucide-react";

// Mock PF Configuration Data
const mockPFConfig = [
  {
    id: "PF001",
    state: "All States",
    employeeContribution: 12,
    employerContribution: 12,
    salaryLimit: 15000,
    pensionLimit: 15000,
    adminCharges: 0.5,
    edliCharges: 0.5,
    status: "Active",
    applicableEmployees: 85,
  },
];

// Mock Professional Tax Data (from existing PT Config)
const mockPTSlabs = [
  {
    id: "PT001",
    state: "Maharashtra",
    slabFrom: 0,
    slabTo: 5000,
    monthlyPTAmount: 0,
    monthsApplicable: 12,
    annualCap: 2500,
    employees: 8,
    status: "Active",
  },
  {
    id: "PT002",
    state: "Maharashtra",
    slabFrom: 5001,
    slabTo: 10000,
    monthlyPTAmount: 150,
    monthsApplicable: 12,
    annualCap: 2500,
    employees: 15,
    status: "Active",
  },
  {
    id: "PT003",
    state: "Maharashtra",
    slabFrom: 10001,
    slabTo: 25000,
    monthlyPTAmount: 200,
    monthsApplicable: 12,
    annualCap: 2500,
    employees: 42,
    status: "Active",
  },
  {
    id: "PT004",
    state: "Karnataka",
    slabFrom: 0,
    slabTo: 15000,
    monthlyPTAmount: 0,
    monthsApplicable: 12,
    annualCap: 2400,
    employees: 3,
    status: "Active",
  },
  {
    id: "PT005",
    state: "Karnataka",
    slabFrom: 15001,
    slabTo: 25000,
    monthlyPTAmount: 150,
    monthsApplicable: 12,
    annualCap: 2400,
    employees: 7,
    status: "Active",
  },
];

// Mock ESIC Configuration Data
const mockESICConfig = [
  {
    id: "ESI001",
    state: "All States",
    employeeContribution: 0.75,
    employerContribution: 3.25,
    salaryLimit: 21000,
    medicalBenefit: true,
    cashBenefit: true,
    status: "Active",
    applicableEmployees: 45,
  },
];

// Column definitions for each tab
const pfColumns: Column[] = [
  {
    key: "state",
    label: "State/Region",
    render: (value) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "employeeContribution",
    label: "Employee %",
    render: (value) => <span className="font-medium">{value}%</span>,
  },
  {
    key: "employerContribution",
    label: "Employer %",
    render: (value) => <span className="font-medium">{value}%</span>,
  },
  {
    key: "salaryLimit",
    label: "Salary Limit",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "applicableEmployees",
    label: "Employees",
    className: "text-center",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

const ptColumns: Column[] = [
  {
    key: "state",
    label: "State",
    render: (value) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "slabFrom",
    label: "Slab From",
    render: (value) => (
      <span className="font-mono">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "slabTo",
    label: "Slab To",
    render: (value) => (
      <span className="font-mono">
        {value ? `₹${value.toLocaleString()}` : "No Limit"}
      </span>
    ),
  },
  {
    key: "monthlyPTAmount",
    label: "Monthly PT",
    render: (value) => (
      <div className="flex items-center gap-1">
        <IndianRupee className="h-3 w-3 text-green-600" />
        <span className="font-medium text-green-600">₹{value}</span>
      </div>
    ),
  },
  {
    key: "employees",
    label: "Employees",
    className: "text-center",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

const esicColumns: Column[] = [
  {
    key: "state",
    label: "State/Region",
    render: (value) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "employeeContribution",
    label: "Employee %",
    render: (value) => <span className="font-medium">{value}%</span>,
  },
  {
    key: "employerContribution",
    label: "Employer %",
    render: (value) => <span className="font-medium">{value}%</span>,
  },
  {
    key: "salaryLimit",
    label: "Salary Limit",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "medicalBenefit",
    label: "Medical Benefit",
    render: (value) => (
      <Badge variant={value ? "default" : "secondary"}>
        {value ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    key: "applicableEmployees",
    label: "Employees",
    className: "text-center",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

export default function StatutorySettings() {
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pf");

  const handleView = (config: any) => {
    setSelectedConfig(config);
  };

  const handleEdit = (config: any) => {
    console.log("Edit config:", config);
  };

  const handleDelete = (config: any) => {
    console.log("Delete config:", config);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Calculate statistics
  const totalPFEmployees = mockPFConfig.reduce(
    (sum, config) => sum + config.applicableEmployees,
    0,
  );
  const totalPTEmployees = mockPTSlabs.reduce(
    (sum, slab) => sum + slab.employees,
    0,
  );
  const totalESICEmployees = mockESICConfig.reduce(
    (sum, config) => sum + config.applicableEmployees,
    0,
  );
  const totalPTStates = [...new Set(mockPTSlabs.map((s) => s.state))].length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Settings"
        description="Configure PF, Professional Tax, and ESIC statutory components for compliance"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Configuration
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Statutory Components Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-96 grid-cols-3">
            <TabsTrigger value="pf">EPF</TabsTrigger>
            <TabsTrigger value="pt">Professional Tax</TabsTrigger>
            <TabsTrigger value="esic">ESIC</TabsTrigger>
          </TabsList>

          <TabsContent value="pf">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>EPF Configuration</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Configure employee and employer PF contributions as per
                      EPF Act
                    </p>
                  </div>
                  <Button onClick={handleAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add PF Config
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockPFConfig}
                  columns={pfColumns}
                  searchPlaceholder="Search PF configurations..."
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pt">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Professional Tax Configuration</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Configure state-wise professional tax slabs and rates
                    </p>
                  </div>
                  <Button onClick={handleAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add PT Slab
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockPTSlabs}
                  columns={ptColumns}
                  searchPlaceholder="Search by state..."
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="esic">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>ESIC Configuration</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Configure Employee State Insurance Corporation benefits
                      and contributions
                    </p>
                  </div>
                  <Button onClick={handleAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add ESIC Config
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockESICConfig}
                  columns={esicColumns}
                  searchPlaceholder="Search ESIC configurations..."
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Configuration Details Dialog */}
      {selectedConfig && (
        <Dialog
          open={!!selectedConfig}
          onOpenChange={() => setSelectedConfig(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "pf" && "EPF Configuration"}
                {activeTab === "pt" && "Professional Tax Configuration"}
                {activeTab === "esic" && "ESIC Configuration"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {activeTab === "pf" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Employee Contribution
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.employeeContribution}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Employer Contribution
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.employerContribution}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Salary Limit
                    </Label>
                    <p className="text-lg font-semibold">
                      ₹{selectedConfig.salaryLimit?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Applicable Employees
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.applicableEmployees}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "pt" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      State
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.state}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Monthly PT Amount
                    </Label>
                    <p className="text-lg font-semibold">
                      ₹{selectedConfig.monthlyPTAmount}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Salary Range
                    </Label>
                    <p className="text-lg font-semibold">
                      ₹{selectedConfig.slabFrom?.toLocaleString()} -
                      {selectedConfig.slabTo
                        ? ` ₹${selectedConfig.slabTo.toLocaleString()}`
                        : " No Limit"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Affected Employees
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.employees}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "esic" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Employee Contribution
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.employeeContribution}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Employer Contribution
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedConfig.employerContribution}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Salary Limit
                    </Label>
                    <p className="text-lg font-semibold">
                      ₹{selectedConfig.salaryLimit?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Medical Benefit
                    </Label>
                    <Badge
                      variant={
                        selectedConfig.medicalBenefit ? "default" : "secondary"
                      }
                    >
                      {selectedConfig.medicalBenefit ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Configuration Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Add New{" "}
              {activeTab === "pf" ? "PF" : activeTab === "pt" ? "PT" : "ESIC"}{" "}
              Configuration
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configuration form for {activeTab.toUpperCase()} would be
              implemented here.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Configuration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
