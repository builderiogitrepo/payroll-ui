import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Play,
  Lock,
  FileText,
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// Mock data for payroll runs
const mockPayrollData = [
  {
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    daysPresent: 22,
    salaryDays: 22,
    grossSalary: 100000,
    earnings: 95000,
    deductions: 15000,
    tdsDeducted: 8000,
    netPay: 72000,
    payslipStatus: "Draft",
    status: "In-Progress",
  },
  {
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    daysPresent: 20,
    salaryDays: 20,
    grossSalary: 125000,
    earnings: 115000,
    deductions: 18000,
    tdsDeducted: 12000,
    netPay: 85000,
    payslipStatus: "Draft",
    status: "In-Progress",
  },
  {
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    daysPresent: 26,
    salaryDays: 26,
    grossSalary: 66667,
    earnings: 63000,
    deductions: 8000,
    tdsDeducted: 3000,
    netPay: 52000,
    payslipStatus: "Finalized",
    status: "Completed",
  },
  {
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    daysPresent: 22,
    salaryDays: 22,
    grossSalary: 166667,
    earnings: 155000,
    deductions: 25000,
    tdsDeducted: 20000,
    netPay: 110000,
    payslipStatus: "Finalized",
    status: "Completed",
  },
];

const inProgressData = mockPayrollData.filter(
  (item) => item.status === "In-Progress",
);
const completedData = mockPayrollData.filter(
  (item) => item.status === "Completed",
);

const payrollColumns: Column[] = [
  {
    key: "empId",
    label: "Emp ID",
    className: "font-mono text-sm",
  },
  {
    key: "name",
    label: "Employee Name",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-slate-500">{row.designation}</div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "daysPresent",
    label: "Present Days",
    className: "text-center",
  },
  {
    key: "salaryDays",
    label: "Salary Days",
    className: "text-center",
    render: (value, row) => (
      <div className="text-center">
        {row.status === "In-Progress" ? (
          <Input
            type="number"
            value={value}
            className="w-16 h-8 text-center"
            min="0"
            max="31"
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    ),
  },
  {
    key: "grossSalary",
    label: "Gross Salary",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "earnings",
    label: "Earnings",
    render: (value) => (
      <span className="font-medium text-green-600">
        ₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "deductions",
    label: "Deductions",
    render: (value) => (
      <span className="font-medium text-red-600">
        ₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "tdsDeducted",
    label: "TDS",
    render: (value) => (
      <span className="font-medium text-orange-600">
        ₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "netPay",
    label: "Net Pay",
    render: (value) => (
      <span className="font-bold text-blue-600">₹{value.toLocaleString()}</span>
    ),
  },
  {
    key: "payslipStatus",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Finalized" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { value: "Technology", label: "Technology" },
      { value: "Sales", label: "Sales" },
      { value: "HR", label: "HR" },
      { value: "Finance", label: "Finance" },
    ],
  },
  {
    key: "payslipStatus",
    label: "Payslip Status",
    type: "select",
    options: [
      { value: "Draft", label: "Draft" },
      { value: "Finalized", label: "Finalized" },
    ],
  },
];

export default function PayrollRuns() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("in-progress");

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: any) => {
    console.log("Edit payroll for:", employee);
  };

  const currentData =
    activeTab === "in-progress" ? inProgressData : completedData;

  const totalEarnings = currentData.reduce(
    (sum, item) => sum + item.earnings,
    0,
  );
  const totalDeductions = currentData.reduce(
    (sum, item) => sum + item.deductions,
    0,
  );
  const totalNetPay = currentData.reduce((sum, item) => sum + item.netPay, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll Runs"
        description="Execute and manage payroll processing for employees"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Download Register
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Start New Run
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Payroll Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <TabsList className="grid w-72 grid-cols-2">
              <TabsTrigger value="in-progress">In-Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {activeTab === "in-progress" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Recalculate All
                </Button>
                <Button size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Finalize All
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="in-progress">
            <DataTable
              data={inProgressData}
              columns={payrollColumns}
              filters={filters}
              searchPlaceholder="Search by Emp ID, Name..."
              onView={handleView}
              onEdit={handleEdit}
              addButtonText="Add Employee"
            />
          </TabsContent>

          <TabsContent value="completed">
            <DataTable
              data={completedData}
              columns={payrollColumns}
              filters={filters}
              searchPlaceholder="Search by Emp ID, Name..."
              onView={handleView}
              addButtonText="Add Employee"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Payroll Breakdown Dialog */}
      {selectedEmployee && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                Payroll Breakdown - {selectedEmployee.name} (
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
                    Designation
                  </Label>
                  <p>{selectedEmployee.designation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Days Present
                  </Label>
                  <p>{selectedEmployee.daysPresent}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Salary Days
                  </Label>
                  <p>{selectedEmployee.salaryDays}</p>
                </div>
              </div>

              <Separator />

              {/* Earnings Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-700">
                  Earnings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Basic Pay</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HRA</span>
                    <span className="font-medium">₹20,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medical Allowance</span>
                    <span className="font-medium">₹5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conveyance Allowance</span>
                    <span className="font-medium">₹3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Pay</span>
                    <span className="font-medium">₹17,000</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Total Earnings</span>
                    <span>₹{selectedEmployee.earnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Deductions Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-700">
                  Deductions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Provident Fund (PF)</span>
                    <span className="font-medium">₹6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employee ESI</span>
                    <span className="font-medium">₹750</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tax</span>
                    <span className="font-medium">₹200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Deductions</span>
                    <span className="font-medium">₹8,050</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-red-600">
                    <span>Total Deductions</span>
                    <span>₹{selectedEmployee.deductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Final Calculation */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Gross Earnings</span>
                  <span className="font-medium">
                    ₹{selectedEmployee.earnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Deductions</span>
                  <span className="font-medium text-red-600">
                    -₹{selectedEmployee.deductions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TDS Deducted</span>
                  <span className="font-medium text-orange-600">
                    -₹{selectedEmployee.tdsDeducted.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-blue-600">
                  <span>Net Pay</span>
                  <span>₹{selectedEmployee.netPay.toLocaleString()}</span>
                </div>
              </div>

              {selectedEmployee.status === "In-Progress" && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Calculator className="h-4 w-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button>
                    <Lock className="h-4 w-4 mr-2" />
                    Finalize
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
