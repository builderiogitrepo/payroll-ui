import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Upload,
  Building,
  Target,
  Award,
  DollarSign,
  Percent,
} from "lucide-react";

// Mock variable pay data
const mockVariablePayData = [
  {
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    grossCTC: 1200000,
    variablePercent: 10,
    annualVariablePay: 120000,
    quarterlyAmount: 30000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 85,
    payableAmount: 25500,
    manager: "Sarah Wilson",
    performance: "Exceeded Expectations",
    businessUnit: "JNET",
  },
  {
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    grossCTC: 1500000,
    variablePercent: 12,
    annualVariablePay: 180000,
    quarterlyAmount: 45000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 90,
    payableAmount: 40500,
    manager: "Sarah Wilson",
    performance: "Outstanding",
    businessUnit: "JNET",
  },
  {
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    grossCTC: 800000,
    variablePercent: 15,
    annualVariablePay: 120000,
    quarterlyAmount: 30000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 75,
    payableAmount: 22500,
    manager: "Michael Chen",
    performance: "Met Expectations",
    businessUnit: "Telecom",
  },
  {
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    grossCTC: 2000000,
    variablePercent: 20,
    annualVariablePay: 400000,
    quarterlyAmount: 100000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 95,
    payableAmount: 95000,
    manager: "David Brown",
    performance: "Outstanding",
    businessUnit: "JNET",
  },
  {
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    grossCTC: 1800000,
    variablePercent: 18,
    annualVariablePay: 324000,
    quarterlyAmount: 81000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 80,
    payableAmount: 64800,
    manager: "David Brown",
    performance: "Exceeded Expectations",
    businessUnit: "JNET",
  },
  {
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    grossCTC: 400000,
    variablePercent: 8,
    annualVariablePay: 32000,
    quarterlyAmount: 8000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 70,
    payableAmount: 5600,
    manager: "Rajesh Kumar",
    performance: "Met Expectations",
    businessUnit: "Telecom",
  },
  {
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    grossCTC: 1000000,
    variablePercent: 10,
    annualVariablePay: 100000,
    quarterlyAmount: 25000,
    fyPeriod: "FY 24-25 – Q3",
    payablePercent: 60,
    payableAmount: 15000,
    manager: "Sarah Wilson",
    performance: "Below Expectations",
    businessUnit: "JNET",
  },
  // Q2 Data for comparison
  {
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    grossCTC: 1200000,
    variablePercent: 10,
    annualVariablePay: 120000,
    quarterlyAmount: 30000,
    fyPeriod: "FY 24-25 – Q2",
    payablePercent: 80,
    payableAmount: 24000,
    manager: "Sarah Wilson",
    performance: "Met Expectations",
    businessUnit: "JNET",
  },
  {
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    grossCTC: 1500000,
    variablePercent: 12,
    annualVariablePay: 180000,
    quarterlyAmount: 45000,
    fyPeriod: "FY 24-25 – Q2",
    payablePercent: 85,
    payableAmount: 38250,
    manager: "Sarah Wilson",
    performance: "Exceeded Expectations",
    businessUnit: "JNET",
  },
];

const columns: Column[] = [
  {
    key: "empId",
    label: "Emp ID",
    className: "font-mono text-sm",
  },
  {
    key: "name",
    label: "Employee",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`/placeholder-avatar-${row.empId}.jpg`} />
          <AvatarFallback>
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-slate-500">{row.designation}</div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-slate-400" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "grossCTC",
    label: "Gross CTC",
    render: (value) => (
      <span className="font-medium">₹{(value / 100000).toFixed(1)}L</span>
    ),
  },
  {
    key: "variablePercent",
    label: "Variable %",
    render: (value) => (
      <div className="flex items-center gap-1">
        <Percent className="h-3 w-3 text-blue-600" />
        <span className="font-medium">{value}%</span>
      </div>
    ),
  },
  {
    key: "quarterlyAmount",
    label: "Quarterly Amt",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "fyPeriod",
    label: "FY Period",
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "payablePercent",
    label: "Performance Award %",
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <div className="w-12 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              value >= 90
                ? "bg-green-500"
                : value >= 70
                  ? "bg-blue-500"
                  : "bg-orange-500"
            }`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
    ),
  },
  {
    key: "payableAmount",
    label: "Payable Amount",
    render: (value) => (
      <span className="font-bold text-green-600">
        ₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "performance",
    label: "Performance",
    render: (value) => (
      <Badge
        variant={
          value === "Outstanding"
            ? "default"
            : value === "Exceeded Expectations"
              ? "default"
              : value === "Met Expectations"
                ? "secondary"
                : "destructive"
        }
      >
        {value}
      </Badge>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "fyPeriod",
    label: "FY Period",
    type: "select",
    options: [
      { value: "FY 24-25 – Q3", label: "FY 24-25 – Q3" },
      { value: "FY 24-25 – Q2", label: "FY 24-25 – Q2" },
      { value: "FY 24-25 – Q1", label: "FY 24-25 – Q1" },
    ],
  },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { value: "Technology", label: "Technology" },
      { value: "Sales", label: "Sales" },
      { value: "Operations", label: "Operations" },
    ],
  },
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
    key: "performance",
    label: "Performance",
    type: "select",
    options: [
      { value: "Outstanding", label: "Outstanding" },
      { value: "Exceeded Expectations", label: "Exceeded Expectations" },
      { value: "Met Expectations", label: "Met Expectations" },
      { value: "Below Expectations", label: "Below Expectations" },
    ],
  },
];

export default function VariablePay() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [editingAward, setEditingAward] = useState<any>(null);

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: any) => {
    setEditingAward(employee);
  };

  // Calculate stats (Q3 only)
  const q3Data = mockVariablePayData.filter(
    (emp) => emp.fyPeriod === "FY 24-25 – Q3",
  );
  const totalEmployees = q3Data.length;
  const totalQuarterlyBudget = q3Data.reduce(
    (sum, emp) => sum + emp.quarterlyAmount,
    0,
  );
  const totalPayable = q3Data.reduce((sum, emp) => sum + emp.payableAmount, 0);
  const avgAwardPercent =
    q3Data.reduce((sum, emp) => sum + emp.payablePercent, 0) / totalEmployees;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Variable Pay Tracker"
        description="Track quarterly variable pay and set performance-based awards. Employee data synced from HRMS."
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Awards
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* HRMS Sync Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 rounded-full p-1">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">
                Data Source: HRMS Integration
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Employee information (Name, CTC, Variable %) is automatically
                synced from HRMS. Managers can set performance awards using
                "Upload Awards" or edit individual ratings.
              </p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={mockVariablePayData}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Emp ID, Name..."
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>

      {/* Employee Variable Pay Details Dialog */}
      {selectedEmployee && !editingAward && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Variable Pay Details - {selectedEmployee.name} (
                {selectedEmployee.empId})
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Department
                  </Label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Business Unit
                  </Label>
                  <p>{selectedEmployee.businessUnit}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Manager
                  </Label>
                  <p>{selectedEmployee.manager}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Performance Rating
                  </Label>
                  <Badge
                    variant={
                      selectedEmployee.performance === "Outstanding"
                        ? "default"
                        : selectedEmployee.performance ===
                            "Exceeded Expectations"
                          ? "default"
                          : selectedEmployee.performance === "Met Expectations"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {selectedEmployee.performance}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Variable Pay Calculation */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Variable Pay Calculation
                </h3>
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span>Annual Gross CTC</span>
                    <span className="font-medium">
                      ₹{selectedEmployee.grossCTC.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Variable Pay Percentage</span>
                    <span className="font-medium">
                      {selectedEmployee.variablePercent}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Variable Pay</span>
                    <span className="font-medium">
                      ₹{selectedEmployee.annualVariablePay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quarterly Amount</span>
                    <span className="font-medium">
                      ₹{selectedEmployee.quarterlyAmount.toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Award Percentage ({selectedEmployee.fyPeriod})</span>
                    <span className="font-bold text-blue-600">
                      {selectedEmployee.payablePercent}%
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Final Payable Amount</span>
                    <span className="font-bold text-green-600">
                      ₹{selectedEmployee.payableAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Award Dialog */}
      {editingAward && (
        <Dialog
          open={!!editingAward}
          onOpenChange={() => setEditingAward(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Edit Performance Award - {editingAward.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Period: {editingAward.fyPeriod}</Label>
                <p className="text-sm text-slate-600">
                  Quarterly Amount: ₹
                  {editingAward.quarterlyAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <Label htmlFor="awardPercent">
                  Performance Award Percentage
                </Label>
                <Input
                  id="awardPercent"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={editingAward.payablePercent}
                  className="mt-1"
                />
                <p className="text-sm text-slate-500 mt-1">
                  Based on performance rating. Current payable: ₹
                  {editingAward.payableAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingAward(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setEditingAward(null)}>
                  Update Performance Award
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
