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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Plus,
  FileText,
  Building,
  DollarSign,
  Percent,
  MapPin,
  IndianRupee,
  Calendar,
  Shield,
  Users,
  CreditCard,
  TrendingUp,
  PieChart,
  BarChart3,
  Layers,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

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
          name: "Sales Commission",
          type: "Percentage",
          basis: "Sales Target",
          value: 15,
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
          name: "Special Allowance",
          type: "Percentage",
          basis: "CTC",
          value: 12,
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
];

// Mock payhead data for multi-select
const mockPayheads = [
  { id: "PH001", name: "Basic Pay" },
  { id: "PH002", name: "HRA" },
  { id: "PH003", name: "Medical Allowance" },
  { id: "PH004", name: "Conveyance" },
  { id: "PH005", name: "Special Allowance" },
  { id: "PH006", name: "Dearness Allowance" },
];

// Mock PF Configuration Data
const mockPFConfig = [
  {
    id: "PF001",
    state: "All States",
    ruleType: "With Minimum Wage Rule",
    pfBasisPayheads: ["Basic Pay"],
    employeeContribution: 12,
    employerContribution: 12,
    salaryLimit: 15000,
    pensionLimit: 15000,
    epsPercentage: 8.33,
    epsCap: 1250,
    adminCharges: 0.5,
    edliCharges: 0.5,
    autoAdjustEmployerShare: true,
    status: "Active",
    applicableEmployees: 85,
  },
  {
    id: "PF002",
    state: "Karnataka",
    ruleType: "Without Minimum Wage Rule",
    pfBasisPayheads: ["Basic Pay", "Dearness Allowance"],
    employeeContribution: 12,
    employerContribution: 12,
    salaryLimit: 0, // No limit for actual basic
    pensionLimit: 15000,
    epsPercentage: 8.33,
    epsCap: 1250,
    adminCharges: 0.5,
    edliCharges: 0.5,
    autoAdjustEmployerShare: false,
    status: "Active",
    applicableEmployees: 42,
  },
];

// Mock Professional Tax Data
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

// Column definitions for Salary Structure
const salaryStructureColumns: Column[] = [
  {
    key: "structureName",
    label: "Structure Name",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Settings className="h-4 w-4 text-blue-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "businessUnit",
    label: "Business Unit",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-green-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "offerType",
    label: "Offer Type",
    render: (value) => (
      <Badge variant="outline" className="text-xs">
        {value}
      </Badge>
    ),
  },
  {
    key: "assignedRoles",
    label: "Assigned Roles",
    render: (value) => (
      <div className="max-w-[200px]">
        <span className="text-sm text-gray-600">{value}</span>
      </div>
    ),
  },
  {
    key: "totalEmployees",
    label: "Employees",
    className: "text-center",
    render: (value) => (
      <div className="flex items-center justify-center gap-1">
        <Users className="h-4 w-4 text-purple-600" />
        <span className="font-medium">{value}</span>
      </div>
    ),
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

// Column definitions for PF Configuration
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
    key: "ruleType",
    label: "Rule Type",
    render: (value) => (
      <Badge
        variant="outline"
        className={`text-xs ${
          value === "With Minimum Wage Rule"
            ? "border-green-200 text-green-700 bg-green-50"
            : "border-blue-200 text-blue-700 bg-blue-50"
        }`}
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "pfBasisPayheads",
    label: "PF Basis Payheads",
    render: (value) => (
      <div className="flex flex-wrap gap-1 max-w-[150px]">
        {value.map((payhead: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {payhead}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "employeeContribution",
    label: "Employee %",
    render: (value) => <span className="font-medium">{value}%</span>,
  },
  {
    key: "epsPercentage",
    label: "EPS %",
    render: (value) => (
      <span className="font-medium text-purple-600">{value}%</span>
    ),
  },
  {
    key: "salaryLimit",
    label: "PF Base Limit",
    render: (value) => (
      <span className="font-medium">
        {value === 0 ? "No Limit" : `₹${value.toLocaleString()}`}
      </span>
    ),
  },
  {
    key: "epsCap",
    label: "EPS Cap",
    render: (value) => (
      <span className="font-medium text-purple-600">
        ₹{value.toLocaleString()}
      </span>
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

// Column definitions for Professional Tax
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

// Column definitions for ESIC Configuration
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

export default function SalaryConfiguration() {
  const [selectedTab, setSelectedTab] = useState("salary-structure");
  const [selectedStatutoryTab, setSelectedStatutoryTab] = useState("pf-config");
  const [selectedStructure, setSelectedStructure] = useState<any>(null);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // PF Config Form State for both rule types
  const [pfWithMaxWageConfig, setPfWithMaxWageConfig] = useState({
    enabled: false,
    pfWageLimit: 15000,
    pfBasisPayheads: [] as string[],
    employeeContribution: 12,
    employerContribution: 12,
    epsContribution: 8.33,
    epsCap: 1250,
  });

  const [pfWithoutMaxWageConfig, setPfWithoutMaxWageConfig] = useState({
    enabled: false,
    pfBasisPayheads: [] as string[],
    employeeContribution: 12,
    employerContribution: 12,
    epsContribution: 8.33,
    epsCap: 1250,
  });

  // ESIC Configuration State
  const [esicConfig, setEsicConfig] = useState({
    enabled: false,
    employeeWageCeiling: 21000,
    esicCalculationBasis: [] as string[],
    employeeContribution: 0.75,
    employerContribution: 3.25,
  });

  const handleView = (item: any) => {
    setSelectedStructure(item);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedStructure(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: any) => {
    // Handle delete logic
    console.log("Delete:", item);
  };

  const handleAdd = () => {
    // Handle add functionality based on current tab
    if (selectedTab === "salary-structure") {
      // Handle salary structure add - for now just log
      console.log("Add new salary structure");
    } else if (selectedTab === "statutory-components") {
      // Handle statutory components add based on sub-tab
      console.log("Add functionality for", selectedStatutoryTab);
    }
  };

  const renderSalaryStructureView = () => {
    if (!selectedStructure) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Structure Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Structure Name
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedStructure.structureName}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Business Unit
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedStructure.businessUnit}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Offer Type
                  </Label>
                  <Badge variant="outline">{selectedStructure.offerType}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Assigned Roles
                  </Label>
                  <p className="text-sm">{selectedStructure.assignedRoles}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Total Employees
                  </Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-lg font-semibold">
                      {selectedStructure.totalEmployees}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Earnings Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedStructure.components.earnings.map(
                  (earning: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-medium">{earning.name}</p>
                          <p className="text-sm text-gray-600">
                            {earning.type} - {earning.basis}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {earning.type === "Percentage"
                            ? `${earning.value}%`
                            : `₹${earning.value.toLocaleString()}`}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {earning.taxable && (
                            <Badge variant="outline" className="text-xs">
                              Taxable
                            </Badge>
                          )}
                          {earning.pfApplicable && (
                            <Badge variant="outline" className="text-xs">
                              PF
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Deduction Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedStructure.components.deductions.map(
                  (deduction: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="font-medium">{deduction.component}</p>
                          <p className="text-sm text-gray-600">
                            {deduction.basis} - {deduction.applicabilityRule}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {deduction.configuration}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {deduction.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Salary Configuration
              </h1>
            </div>
          </div>
          <Link
            to="/payheads"
            className="inline-flex items-center gap-2 text-blue-700 font-medium hover:underline hover:text-blue-900 transition-colors text-base"
          >
            Payhead Configuration
            <Settings className="h-5 w-5 text-black-200" />
          </Link>
        </div>
        {/* Parent Tabs - Underline Style */}
        <div className="w-full px-6">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full mt-8"
          >
            <TabsList className="flex border-b border-slate-200 bg-transparent p-0 gap-8 justify-start w-full">
              <TabsTrigger
                value="salary-structure"
                className="relative px-0 pb-2 text-lg font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
                style={{ background: "none", border: "none" }}
              >
                Salary Structures
              </TabsTrigger>
              <TabsTrigger
                value="statutory-components"
                className="relative px-0 pb-2 text-lg font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
                style={{ background: "none", border: "none" }}
              >
                Statutory Components
              </TabsTrigger>
            </TabsList>

            <TabsContent value="salary-structure" className="space-y-4">
              <DataTable
                data={mockSalaryStructures}
                columns={salaryStructureColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchPlaceholder="Search salary structures..."
                customToolbar={
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleAdd}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Structure
                    </Button>
                    {/* Export button is assumed to be rendered by DataTable, so Add Structure is to its left */}
                  </div>
                }
              />
            </TabsContent>

            <TabsContent value="statutory-components" className="space-y-6">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
                <Tabs
                  value={selectedStatutoryTab}
                  onValueChange={setSelectedStatutoryTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-white shadow-sm border border-slate-200 rounded-lg p-1">
                    <TabsTrigger
                      value="pf-config"
                      className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-slate-50"
                    >
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">PF Configuration</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="pt-config"
                      className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-slate-50"
                    >
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">Professional Tax</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="esic-config"
                      className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-slate-50"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="font-medium">ESIC Configuration</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="pf-config" className="space-y-6">
                    {/* With Maximum Wage Rule Section */}
                    <Card className="border-green-200 bg-green-50/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <CardTitle className="text-green-800">
                                With Maximum Wage Rule
                              </CardTitle>
                              <p className="text-sm text-green-600 mt-1">
                                PF contribution base is capped at the specified
                                wage limit
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Label
                              htmlFor="withMaxWage"
                              className="text-sm font-medium"
                            >
                              Enable Configuration
                            </Label>
                            <Checkbox
                              id="withMaxWage"
                              checked={pfWithMaxWageConfig.enabled}
                              onCheckedChange={(checked) =>
                                setPfWithMaxWageConfig((prev) => ({
                                  ...prev,
                                  enabled: !!checked,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </CardHeader>
                      {pfWithMaxWageConfig.enabled && (
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="withMaxWageLimit">
                                PF Wage Limit (₹) *
                              </Label>
                              <Input
                                id="withMaxWageLimit"
                                type="number"
                                min="0"
                                value={pfWithMaxWageConfig.pfWageLimit}
                                onChange={(e) =>
                                  setPfWithMaxWageConfig((prev) => ({
                                    ...prev,
                                    pfWageLimit: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>PF Wage Calculation Basis *</Label>
                              <Select
                                value=""
                                onValueChange={(value) => {
                                  if (
                                    value &&
                                    !pfWithMaxWageConfig.pfBasisPayheads.includes(
                                      value,
                                    )
                                  ) {
                                    setPfWithMaxWageConfig((prev) => ({
                                      ...prev,
                                      pfBasisPayheads: [
                                        ...prev.pfBasisPayheads,
                                        value,
                                      ],
                                    }));
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payheads" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockPayheads
                                    .filter(
                                      (payhead) =>
                                        !pfWithMaxWageConfig.pfBasisPayheads.includes(
                                          payhead.name,
                                        ),
                                    )
                                    .map((payhead) => (
                                      <SelectItem
                                        key={payhead.id}
                                        value={payhead.name}
                                      >
                                        {payhead.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {pfWithMaxWageConfig.pfBasisPayheads.map(
                                  (payhead, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {payhead}
                                      <button
                                        type="button"
                                        className="ml-1 text-xs hover:text-red-600"
                                        onClick={() => {
                                          setPfWithMaxWageConfig((prev) => ({
                                            ...prev,
                                            pfBasisPayheads:
                                              prev.pfBasisPayheads.filter(
                                                (p) => p !== payhead,
                                              ),
                                          }));
                                        }}
                                      >
                                        ×
                                      </button>
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="withMaxWageEmployeeRate">
                                Employee Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withMaxWageEmployeeRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={pfWithMaxWageConfig.employeeContribution}
                                onChange={(e) =>
                                  setPfWithMaxWageConfig((prev) => ({
                                    ...prev,
                                    employeeContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="withMaxWageEmployerRate">
                                Employer Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withMaxWageEmployerRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={pfWithMaxWageConfig.employerContribution}
                                onChange={(e) =>
                                  setPfWithMaxWageConfig((prev) => ({
                                    ...prev,
                                    employerContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="withMaxWageEpsRate">
                                EPS Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withMaxWageEpsRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={pfWithMaxWageConfig.epsContribution}
                                onChange={(e) =>
                                  setPfWithMaxWageConfig((prev) => ({
                                    ...prev,
                                    epsContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="withMaxWageEpsCap">
                                EPS Cap (₹) *
                              </Label>
                              <Input
                                id="withMaxWageEpsCap"
                                type="number"
                                min="0"
                                value={pfWithMaxWageConfig.epsCap}
                                onChange={(e) =>
                                  setPfWithMaxWageConfig((prev) => ({
                                    ...prev,
                                    epsCap: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <Alert className="border-green-200 bg-green-50">
                            <Shield className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                              <div className="text-green-700 text-sm">
                                <strong>Note:</strong> The remaining employer
                                contribution after EPS will be automatically
                                adjusted towards EPF.
                              </div>
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      )}
                    </Card>

                    {/* Without Maximum PF Wage Rule Section */}
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-blue-800">
                                Without Maximum PF Wage Rule
                              </CardTitle>
                              <p className="text-sm text-blue-600 mt-1">
                                PF contribution base uses actual wage
                                calculation basis without any cap
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Label
                              htmlFor="withoutMaxWage"
                              className="text-sm font-medium"
                            >
                              Enable Configuration
                            </Label>
                            <Checkbox
                              id="withoutMaxWage"
                              checked={pfWithoutMaxWageConfig.enabled}
                              onCheckedChange={(checked) =>
                                setPfWithoutMaxWageConfig((prev) => ({
                                  ...prev,
                                  enabled: !!checked,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </CardHeader>
                      {pfWithoutMaxWageConfig.enabled && (
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>PF Wage Calculation Basis *</Label>
                            <Select
                              value=""
                              onValueChange={(value) => {
                                if (
                                  value &&
                                  !pfWithoutMaxWageConfig.pfBasisPayheads.includes(
                                    value,
                                  )
                                ) {
                                  setPfWithoutMaxWageConfig((prev) => ({
                                    ...prev,
                                    pfBasisPayheads: [
                                      ...prev.pfBasisPayheads,
                                      value,
                                    ],
                                  }));
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select payheads" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockPayheads
                                  .filter(
                                    (payhead) =>
                                      !pfWithoutMaxWageConfig.pfBasisPayheads.includes(
                                        payhead.name,
                                      ),
                                  )
                                  .map((payhead) => (
                                    <SelectItem
                                      key={payhead.id}
                                      value={payhead.name}
                                    >
                                      {payhead.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {pfWithoutMaxWageConfig.pfBasisPayheads.map(
                                (payhead, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {payhead}
                                    <button
                                      type="button"
                                      className="ml-1 text-xs hover:text-red-600"
                                      onClick={() => {
                                        setPfWithoutMaxWageConfig((prev) => ({
                                          ...prev,
                                          pfBasisPayheads:
                                            prev.pfBasisPayheads.filter(
                                              (p) => p !== payhead,
                                            ),
                                        }));
                                      }}
                                    >
                                      ×
                                    </button>
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="withoutMaxWageEmployeeRate">
                                Employee Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withoutMaxWageEmployeeRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={
                                  pfWithoutMaxWageConfig.employeeContribution
                                }
                                onChange={(e) =>
                                  setPfWithoutMaxWageConfig((prev) => ({
                                    ...prev,
                                    employeeContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="withoutMaxWageEmployerRate">
                                Employer Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withoutMaxWageEmployerRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={
                                  pfWithoutMaxWageConfig.employerContribution
                                }
                                onChange={(e) =>
                                  setPfWithoutMaxWageConfig((prev) => ({
                                    ...prev,
                                    employerContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="withoutMaxWageEpsRate">
                                EPS Contribution Rate (%) *
                              </Label>
                              <Input
                                id="withoutMaxWageEpsRate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={pfWithoutMaxWageConfig.epsContribution}
                                onChange={(e) =>
                                  setPfWithoutMaxWageConfig((prev) => ({
                                    ...prev,
                                    epsContribution:
                                      parseFloat(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="withoutMaxWageEpsCap">
                                EPS Cap (₹) *
                              </Label>
                              <Input
                                id="withoutMaxWageEpsCap"
                                type="number"
                                min="0"
                                value={pfWithoutMaxWageConfig.epsCap}
                                onChange={(e) =>
                                  setPfWithoutMaxWageConfig((prev) => ({
                                    ...prev,
                                    epsCap: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <Alert className="border-blue-200 bg-blue-50">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <AlertDescription>
                              <div className="text-blue-700 text-sm">
                                <strong>Note:</strong> The remaining employer
                                contribution after EPS will be automatically
                                adjusted towards EPF.
                              </div>
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      )}
                    </Card>
                  </TabsContent>

                  <TabsContent value="pt-config" className="space-y-4">
                    <DataTable
                      data={mockPTSlabs}
                      columns={ptColumns}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      searchPlaceholder="Search PT slabs..."
                    />
                  </TabsContent>

                  <TabsContent value="esic-config" className="space-y-4">
                    <DataTable
                      data={mockESICConfig}
                      columns={esicColumns}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      searchPlaceholder="Search ESIC configurations..."
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              {selectedTab === "salary-structure"
                ? "Salary Structure Details"
                : selectedTab === "statutory-components"
                  ? `${selectedStatutoryTab === "pf-config" ? "PF" : selectedStatutoryTab === "pt-config" ? "Professional Tax" : "ESIC"} Configuration Details`
                  : "Configuration Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedTab === "salary-structure" && renderSalaryStructureView()}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Configuration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Edit functionality will be implemented here.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
