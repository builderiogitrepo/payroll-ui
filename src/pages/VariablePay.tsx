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
import { BulkUploadVariablePay } from "@/components/variable-pay/BulkUploadVariablePay";

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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    fiscalYear: "FY 2024-25",
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
    className: " text-sm",
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
                ? "bg-blue-500"
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
      <span className="font-bold text-blue-600">₹{value.toLocaleString()}</span>
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
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Get current quarter/year for default filtering
  const currentQuarter = "FY 24-25 – Q3"; // Default to Q3
  const currentFiscalYear = "FY 2024-25";

  // Filter data to show current quarter by default
  const getCurrentQuarterData = () => {
    return mockVariablePayData.filter(
      (variablePay) =>
        variablePay.fyPeriod === currentQuarter &&
        variablePay.fiscalYear === currentFiscalYear,
    );
  };

  const [filteredData, setFilteredData] = useState(mockVariablePayData);
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState(currentFiscalYear);

  // Handle quarter/year filter changes
  const handleQuarterYearFilter = (quarter: string, fiscalYear: string) => {
    const filtered = mockVariablePayData.filter(
      (variablePay) =>
        variablePay.fyPeriod === quarter &&
        variablePay.fiscalYear === fiscalYear,
    );
    setFilteredData(filtered);
    setSelectedQuarter(quarter);
    setSelectedFiscalYear(fiscalYear);
  };

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

  return showBulkUpload ? (
    <BulkUploadVariablePay onClose={() => setShowBulkUpload(false)} />
  ) : (
    <div className="space-y-6">
      <PageHeader
        title="Variable Pay"
        description="Track quarterly variable pay and set performance-based awards. Employee data synced from HRMS."
      >
        <div className="flex gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
            onClick={() => setShowBulkUpload(true)}
          >
            <Upload className="h-4 w-4" />
            Upload Variable Pay Data
          </Button>
        </div>
      </PageHeader>

      <div className="px-6 space-y-4">
        {/* Data Table with Fiscal/Quarter filters in toolbar */}
        <DataTable
          data={filteredData}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Emp ID, Name..."
          onView={handleView}
          onEdit={handleEdit}
          customToolbar={
            <>
              {/* Fiscal/Quarter Filters on the right side of search */}
              <div className="flex items-center gap-2">
                <Label className="text-xs text-slate-600">FY:</Label>
                <select
                  value={selectedFiscalYear}
                  onChange={(e) =>
                    handleQuarterYearFilter(selectedQuarter, e.target.value)
                  }
                  className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-24"
                >
                  <option value="FY 2025-26">2025-26</option>
                  <option value="FY 2024-25">2024-25</option>
                </select>
                <Label className="text-xs text-slate-600">Quarter:</Label>
                <select
                  value={selectedQuarter}
                  onChange={(e) =>
                    handleQuarterYearFilter(e.target.value, selectedFiscalYear)
                  }
                  className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-20"
                >
                  <option value="FY 24-25 – Q4">Q4</option>
                  <option value="FY 24-25 – Q3">Q3</option>
                  <option value="FY 24-25 – Q2">Q2</option>
                  <option value="FY 24-25 – Q1">Q1</option>
                </select>
              </div>
            </>
          }
        />
      </div>

      {/* Employee Variable Pay Details Dialog */}
      {selectedEmployee && !editingAward && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="w-full max-w-xl h-auto max-h-[80vh] overflow-y-auto">
            <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b border-border">
              <DialogTitle className="text-foreground">
                Variable Pay Details - {selectedEmployee.name} (
                {selectedEmployee.empId})
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Department
                  </Label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Business Unit
                  </Label>
                  <p>{selectedEmployee.businessUnit}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Manager
                  </Label>
                  <p>{selectedEmployee.manager}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
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
                <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
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
                    <span className="font-bold text-blue-600">
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
          <DialogContent className="w-full max-w-xl h-auto max-h-[80vh] overflow-y-auto">
            <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b border-border">
              <DialogTitle className="text-foreground">
                Edit Performance Award - {editingAward.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Period: {editingAward.fyPeriod}</Label>
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm text-muted-foreground mt-1">
                  Based on performance rating. Current payable: ₹
                  {editingAward.payableAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingAward(null)}
                  className="border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setEditingAward(null)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
                >
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
