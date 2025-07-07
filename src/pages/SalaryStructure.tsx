import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Plus,
  FileText,
  Building,
  DollarSign,
  Percent,
} from "lucide-react";

// Mock salary structure data
const mockSalaryStructures = [
  {
    id: "SS001",
    structureName: "Senior Developer - JNET",
    businessUnit: "JNET",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Senior Developer, Tech Lead",
    totalEmployees: 12,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 50,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 40,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Medical Allowance",
          type: "Fixed",
          basis: "-",
          value: 5000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Conveyance",
          type: "Fixed",
          basis: "-",
          value: 3000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Special Allowance",
          type: "Percentage",
          basis: "CTC",
          value: 10,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          component: "PF",
          source: "Statutory Components",
          enabled: true,
          configuration: "12% of Basic (₹15,000 limit)",
          basis: "Basic",
          applicabilityRule: "Always",
          managedIn: "Statutory Components",
        },
        {
          component: "ESI",
          source: "Statutory Components",
          enabled: true,
          configuration: "0.75% of Gross (₹21,000 limit)",
          basis: "Gross",
          applicabilityRule: "Gross Salary < ₹21,000",
          managedIn: "Statutory Components",
        },
        {
          component: "Professional Tax",
          source: "Statutory Components",
          enabled: true,
          configuration:
            "State-wise slabs (Maharashtra: ₹200 for ₹10,001-₹25,000)",
          basis: "Gross",
          applicabilityRule: "Based on State & Salary Slab",
          managedIn: "Statutory Components",
        },
      ],
    },
  },
  {
    id: "SS002",
    structureName: "Software Engineer - JNET",
    businessUnit: "JNET",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Software Engineer, Junior Developer",
    totalEmployees: 25,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 50,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 40,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Medical Allowance",
          type: "Fixed",
          basis: "-",
          value: 3000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Conveyance",
          type: "Fixed",
          basis: "-",
          value: 2000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Special Allowance",
          type: "Percentage",
          basis: "CTC",
          value: 8,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          component: "PF",
          source: "Statutory Components",
          enabled: true,
          configuration: "12% Employee + 12% Employer on Basic (₹15,000 limit)",
          basis: "Basic",
          applicabilityRule: "Always",
          managedIn: "Statutory Components",
        },
        {
          component: "ESI",
          source: "Statutory Components",
          enabled: true,
          configuration: "0.75% of Gross (₹21,000 limit)",
          basis: "Gross",
          applicabilityRule: "Gross Salary < ₹21,000",
          managedIn: "Statutory Components",
        },
        {
          component: "Professional Tax",
          source: "Statutory Components",
          enabled: true,
          configuration:
            "State-wise slabs (Maharashtra: ₹200 for ₹10,001-₹25,000)",
          basis: "Gross",
          applicabilityRule: "Based on State & Salary Slab",
          managedIn: "Statutory Components",
        },
      ],
    },
  },
  {
    id: "SS003",
    structureName: "Sales Executive - Telecom",
    businessUnit: "Telecom",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Sales Executive, Field Executive",
    totalEmployees: 18,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 60,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 50,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Travel Allowance",
          type: "Fixed",
          basis: "-",
          value: 4000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Commission",
          type: "Percentage",
          basis: "CTC",
          value: 15,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          component: "PF",
          source: "Statutory Components",
          enabled: true,
          configuration: "12% Employee + 12% Employer on Basic (₹15,000 limit)",
          basis: "Basic",
          applicabilityRule: "Always",
          managedIn: "Statutory Components",
        },
        {
          component: "ESI",
          source: "Statutory Components",
          enabled: true,
          configuration: "0.75% of Gross (₹21,000 limit)",
          basis: "Gross",
          applicabilityRule: "Gross Salary < ₹21,000",
          managedIn: "Statutory Components",
        },
        {
          component: "Professional Tax",
          source: "Statutory Components",
          enabled: true,
          configuration:
            "State-wise slabs (Maharashtra: ₹200 for ₹10,001-₹25,000)",
          basis: "Gross",
          applicabilityRule: "Based on State & Salary Slab",
          managedIn: "Statutory Components",
        },
      ],
    },
  },
  {
    id: "SS004",
    structureName: "Manager - JNET",
    businessUnit: "JNET",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Manager, Team Lead",
    totalEmployees: 8,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 45,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 40,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Medical Allowance",
          type: "Fixed",
          basis: "-",
          value: 8000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Conveyance",
          type: "Fixed",
          basis: "-",
          value: 5000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Management Allowance",
          type: "Percentage",
          basis: "CTC",
          value: 15,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          name: "PF",
          type: "Percentage",
          basis: "Basic",
          value: 12,
          rule: "Always",
        },
        {
          name: "Professional Tax",
          type: "Fixed",
          basis: "-",
          value: 200,
          rule: "Always",
        },
        {
          name: "Insurance",
          type: "Fixed",
          basis: "-",
          value: 1000,
          rule: "Optional",
        },
      ],
    },
  },
  {
    id: "SS005",
    structureName: "Telecaller - Telecom",
    businessUnit: "Telecom",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Telecaller, Customer Support",
    totalEmployees: 15,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 70,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 40,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Incentive",
          type: "Percentage",
          basis: "CTC",
          value: 10,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          name: "PF",
          type: "Percentage",
          basis: "Basic",
          value: 12,
          rule: "Always",
        },
        {
          name: "ESI",
          type: "Percentage",
          basis: "Gross",
          value: 0.75,
          rule: "Always",
        },
        {
          name: "Professional Tax",
          type: "Fixed",
          basis: "-",
          value: 150,
          rule: "Always",
        },
      ],
    },
  },
  {
    id: "SS006",
    structureName: "Intern - JNET",
    businessUnit: "JNET",
    offerType: "Internship",
    status: "Active",
    assignedRoles: "Intern, Trainee",
    totalEmployees: 6,
    components: {
      earnings: [
        {
          name: "Stipend",
          type: "Fixed",
          basis: "-",
          value: 15000,
          taxable: false,
          pfApplicable: false,
        },
        {
          name: "Meal Allowance",
          type: "Fixed",
          basis: "-",
          value: 2000,
          taxable: false,
          pfApplicable: false,
        },
      ],
      deductions: [],
    },
  },
  {
    id: "SS007",
    structureName: "Contract - Telecom",
    businessUnit: "Telecom",
    offerType: "Contract",
    salaryFrequency: "Monthly",
    variableFrequency: "None",
    status: "Active",
    assignedRoles: "Contract Worker",
    totalEmployees: 10,
    components: {
      earnings: [
        {
          name: "Contract Pay",
          type: "Fixed",
          basis: "-",
          value: 25000,
          taxable: true,
          pfApplicable: false,
        },
        {
          name: "Overtime",
          type: "Fixed",
          basis: "-",
          value: 5000,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          name: "TDS",
          type: "Percentage",
          basis: "Gross",
          value: 2,
          rule: "Always",
        },
      ],
    },
  },
  {
    id: "SS008",
    structureName: "Executive - JNET (Inactive)",
    businessUnit: "JNET",
    offerType: "Full-time",
    status: "Active",
    assignedRoles: "Executive",
    totalEmployees: 0,
    components: {
      earnings: [
        {
          name: "Basic Pay",
          type: "Percentage",
          basis: "CTC",
          value: 55,
          taxable: true,
          pfApplicable: true,
        },
        {
          name: "HRA",
          type: "Percentage",
          basis: "Basic",
          value: 40,
          taxable: true,
          pfApplicable: false,
        },
      ],
      deductions: [
        {
          name: "PF",
          type: "Percentage",
          basis: "Basic",
          value: 12,
          rule: "Always",
        },
      ],
    },
  },
];

const columns: Column[] = [
  {
    key: "structureName",
    label: "Structure Name",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-slate-500">{row.id}</div>
      </div>
    ),
  },
  {
    key: "businessUnit",
    label: "Business Unit",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-slate-400" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "offerType",
    label: "Offer Type",
  },

  {
    key: "assignedRoles",
    label: "Assigned Roles",
    render: (value) => (
      <div className="max-w-32 truncate" title={value}>
        {value}
      </div>
    ),
  },
  {
    key: "totalEmployees",
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

const filters: Filter[] = [
  {
    key: "businessUnit",
    label: "Business Unit",
    type: "select",
    options: [
      { value: "JNET", label: "JNET" },
      { value: "Telecom", label: "Telecom" },
    ],
  },
  {
    key: "offerType",
    label: "Offer Type",
    type: "select",
    options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Contract", label: "Contract" },
      { value: "Internship", label: "Internship" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
];

export default function SalaryStructure() {
  const [selectedStructure, setSelectedStructure] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleView = (structure: any) => {
    setSelectedStructure(structure);
  };

  const handleEdit = (structure: any) => {
    console.log("Edit structure:", structure);
  };

  const handleDelete = (structure: any) => {
    console.log("Delete structure:", structure);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const activeStructures = mockSalaryStructures.filter(
    (s) => s.status === "Active",
  ).length;
  const jnetStructures = mockSalaryStructures.filter(
    (s) => s.businessUnit === "JNET",
  ).length;
  const telecomStructures = mockSalaryStructures.filter(
    (s) => s.businessUnit === "Telecom",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Salary Structure Configuration"
        description="Configure compensation structures, earnings, and deductions for different roles"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Data Table */}
        <DataTable
          data={mockSalaryStructures}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Structure Name..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Create Structure"
        />
      </div>

      {/* Structure Details Dialog */}
      {selectedStructure && (
        <Dialog
          open={!!selectedStructure}
          onOpenChange={() => setSelectedStructure(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Salary Structure Details - {selectedStructure.structureName}
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="deductions">Deductions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Structure ID
                    </Label>
                    <p className="font-mono">{selectedStructure.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Business Unit
                    </Label>
                    <p>{selectedStructure.businessUnit}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Offer Type
                    </Label>
                    <p>{selectedStructure.offerType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Status
                    </Label>
                    <Badge
                      variant={
                        selectedStructure.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedStructure.status}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Assigned Roles
                    </Label>
                    <p>{selectedStructure.assignedRoles}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Total Employees
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedStructure.totalEmployees}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-4">
                <h3 className="text-lg font-semibold text-green-700">
                  Earnings Components
                </h3>
                <div className="space-y-3">
                  {selectedStructure.components.earnings.map(
                    (earning: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{earning.name}</span>
                          <div className="text-sm text-green-600">
                            {earning.type}{" "}
                            {earning.basis !== "-" && `of ${earning.basis}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            {earning.type === "Percentage"
                              ? `${earning.value}%`
                              : `₹${earning.value}`}
                          </span>
                          <div className="text-sm">
                            {earning.taxable && (
                              <span className="text-blue-600">Taxable</span>
                            )}
                            {earning.taxable && earning.pfApplicable && " • "}
                            {earning.pfApplicable && (
                              <span className="text-purple-600">PF</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </TabsContent>

              <TabsContent value="deductions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-red-700">
                    Statutory Deduction Components
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200"
                  >
                    Managed in Statutory Components
                  </Badge>
                </div>
                <div className="space-y-3">
                  {selectedStructure.components.deductions.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">
                      No deductions configured
                    </p>
                  ) : (
                    selectedStructure.components.deductions.map(
                      (deduction: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-start p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-blue-900">
                                {deduction.component}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {deduction.source}
                              </Badge>
                            </div>
                            <div className="text-sm text-blue-700 mt-1">
                              0.75% of Gross (₹21,000 limit)
                            </div>
                            <div className="text-xs text-slate-600 mt-2">
                              <span className="font-medium">Basis:</span>{" "}
                              {deduction.basis} •
                              <span className="font-medium"> Rule:</span>{" "}
                              {deduction.applicabilityRule}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                deduction.enabled ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {deduction.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                            <div className="text-xs text-slate-500 mt-1">
                              Configure in {deduction.managedIn}
                            </div>
                          </div>
                        </div>
                      ),
                    )
                  )}
                </div>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Settings className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-amber-800">
                        Statutory Deductions Management
                      </div>
                      <div className="text-amber-700 mt-1">
                        These deductions are automatically calculated based on
                        configurations in the
                        <span className="font-medium">
                          {" "}
                          Statutory Components
                        </span>{" "}
                        module. To modify rates or rules, please update them in
                        Statutory Components.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Configure Structure Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Salary Structure</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="deductions">Deductions</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="structureName">Structure Name *</Label>
                  <input
                    id="structureName"
                    type="text"
                    placeholder="e.g., Senior Developer - JNET"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="businessUnit">Business Unit *</Label>
                  <select
                    id="businessUnit"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Business Unit</option>
                    <option value="JNET">JNET</option>
                    <option value="Telecom">Telecom</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="offerType">Offer Type *</Label>
                  <select
                    id="offerType"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Offer Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="assignedRoles">Assigned Roles</Label>
                  <input
                    id="assignedRoles"
                    type="text"
                    placeholder="e.g., Senior Developer, Tech Lead"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-700">
                  Earnings Configuration
                </h3>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Earning
                </Button>
              </div>

              <div className="space-y-4">
                {/* Sample Earnings Configuration */}
                <Card className="p-4">
                  <div className="grid grid-cols-6 gap-4 items-end">
                    <div>
                      <Label htmlFor="payhead1">Payhead Name</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Basic Pay">Basic Pay</option>
                        <option value="HRA">House Rent Allowance</option>
                        <option value="Medical Allowance">
                          Medical Allowance
                        </option>
                        <option value="Conveyance Allowance">
                          Conveyance Allowance
                        </option>
                        <option value="Special Allowance">
                          Special Allowance
                        </option>
                      </select>
                    </div>

                    <div>
                      <Label>Calculation Type</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </div>

                    <div>
                      <Label>Calculation Base</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="CTC">CTC</option>
                        <option value="Basic">Basic</option>
                        <option value="Gross">Gross</option>
                        <option value="-">—</option>
                      </select>
                    </div>

                    <div>
                      <Label>Value</Label>
                      <input
                        type="number"
                        placeholder="50"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="taxable1" defaultChecked />
                        <Label htmlFor="taxable1" className="text-sm">
                          Taxable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pf1" defaultChecked />
                        <Label htmlFor="pf1" className="text-sm">
                          PF
                        </Label>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="grid grid-cols-6 gap-4 items-end">
                    <div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="HRA">House Rent Allowance</option>
                        <option value="Basic Pay">Basic Pay</option>
                        <option value="Medical Allowance">
                          Medical Allowance
                        </option>
                        <option value="Conveyance Allowance">
                          Conveyance Allowance
                        </option>
                        <option value="Special Allowance">
                          Special Allowance
                        </option>
                      </select>
                    </div>

                    <div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </div>

                    <div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Basic">Basic</option>
                        <option value="CTC">CTC</option>
                        <option value="Gross">Gross</option>
                        <option value="-">—</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="number"
                        placeholder="40"
                        defaultValue="40"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="taxable2" defaultChecked />
                        <Label htmlFor="taxable2" className="text-sm">
                          Taxable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pf2" />
                        <Label htmlFor="pf2" className="text-sm">
                          PF
                        </Label>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  Sample Configuration:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>• Basic Pay: 50% of CTC (Taxable, PF Applicable)</div>
                  <div>• HRA: 40% of Basic (Taxable, No PF)</div>
                  <div>• Medical Allowance: ₹5,000 Fixed (Taxable, No PF)</div>
                  <div>• Special Allowance: 10% of CTC (Taxable, No PF)</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deductions" className="space-y-6">
              {/* Statutory Deductions Info */}
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-medium text-slate-900">
                  Statutory Deductions
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  PF, ESI, and Professional Tax are automatically applied from
                  Statutory Components configuration.
                </p>
              </div>

              {/* Company Policy Deductions Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-slate-900">
                    Company Policy Deductions
                  </h4>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deduction
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 items-end p-4 border rounded-lg">
                    <div>
                      <Label className="text-sm font-medium">
                        Deduction Name
                      </Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Transport Charges">
                          Transport Charges
                        </option>
                        <option value="Canteen Charges">Canteen Charges</option>
                        <option value="Uniform Charges">Uniform Charges</option>
                        <option value="Security Deposit">
                          Security Deposit
                        </option>
                        <option value="Parking Charges">Parking Charges</option>
                        <option value="Maintenance Charges">
                          Maintenance Charges
                        </option>
                        <option value="Accommodation Charges">
                          Accommodation Charges
                        </option>
                        <option value="Mess Charges">Mess Charges</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Fixed">Fixed Amount</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Base</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="-">—</option>
                        <option value="Basic">Basic</option>
                        <option value="Gross">Gross</option>
                        <option value="CTC">CTC</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Value</Label>
                      <input
                        type="number"
                        placeholder="1500"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>

                  <div className="pl-4">
                    <Label className="text-sm font-medium">
                      Applicability Rule
                    </Label>
                    <input
                      type="text"
                      placeholder="e.g., Always, Opt-in only, After probation"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="text-sm text-slate-500 mt-4">
                  <p>
                    <strong>Examples:</strong> Transport (₹2,000), Canteen
                    (₹1,500), Uniform (₹500), Parking (₹300)
                  </p>
                  <p className="mt-1">
                    <strong>Note:</strong> Medical insurance, loans, and ad-hoc
                    deductions are managed in separate modules
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Save Salary Structure
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
