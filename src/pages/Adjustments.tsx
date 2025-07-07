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
import {
  Calculator,
  Plus,
  Upload,
  TrendingUp,
  TrendingDown,
  User,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock adjustment entry data
const mockAdjustmentEntries = [
  {
    id: "ADJ001",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    month: "Dec 2024",
    adjustmentType: "Earning",
    payheadName: "Overtime Allowance",
    units: 8,
    amount: 1200,
    reason: "Weekend project work",
    approvedBy: "Sarah Wilson",
    status: "Finalized",
    taxable: true,
    createdDate: "2024-12-01",
  },
  {
    id: "ADJ002",
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    month: "Dec 2024",
    adjustmentType: "Earning",
    payheadName: "Special Incentive",
    units: 1,
    amount: 5000,
    reason: "Excellent performance on Q4 project",
    approvedBy: "Sarah Wilson",
    status: "Finalized",
    taxable: true,
    createdDate: "2024-12-02",
  },
  {
    id: "ADJ003",
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    month: "Dec 2024",
    adjustmentType: "Deduction",
    payheadName: "Loss of Pay",
    units: 2,
    amount: 1500,
    reason: "Unauthorized absence on Dec 15-16",
    approvedBy: "Michael Chen",
    status: "Finalized",
    taxable: false,
    createdDate: "2024-12-03",
  },
  {
    id: "ADJ004",
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    month: "Dec 2024",
    adjustmentType: "Earning",
    payheadName: "Referral Bonus",
    units: 1,
    amount: 5000,
    reason: "Successful referral - hired Ravi Patel",
    approvedBy: "David Brown",
    status: "Finalized",
    taxable: true,
    createdDate: "2024-12-04",
  },
  {
    id: "ADJ005",
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    month: "Dec 2024",
    adjustmentType: "Deduction",
    payheadName: "Late Coming Fine",
    units: 5,
    amount: 250,
    reason: "Late arrivals on 5 occasions",
    approvedBy: "David Brown",
    status: "Draft",
    taxable: false,
    createdDate: "2024-12-05",
  },
  {
    id: "ADJ006",
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    month: "Dec 2024",
    adjustmentType: "Earning",
    payheadName: "Holiday Pay Allowance",
    units: 2,
    amount: 800,
    reason: "Worked on Dec 25 & 26 holidays",
    approvedBy: "Rajesh Kumar",
    status: "Finalized",
    taxable: true,
    createdDate: "2024-12-06",
  },
  {
    id: "ADJ007",
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    month: "Dec 2024",
    adjustmentType: "Deduction",
    payheadName: "Advance Salary Deduction",
    units: 1,
    amount: 10000,
    reason: "Recovery of advance taken in November",
    approvedBy: "Sarah Wilson",
    status: "Finalized",
    taxable: false,
    createdDate: "2024-12-07",
  },
  {
    id: "ADJ008",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    month: "Dec 2024",
    adjustmentType: "Earning",
    payheadName: "Health Insurance Allowance",
    units: 1,
    amount: 1250,
    reason: "Reimbursement for family health insurance",
    approvedBy: "Sarah Wilson",
    status: "Draft",
    taxable: false,
    createdDate: "2024-12-08",
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
  },
  {
    key: "month",
    label: "Month",
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "adjustmentType",
    label: "Type",
    render: (value) => (
      <div className="flex items-center gap-2">
        {value === "Earning" ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        )}
        <Badge variant={value === "Earning" ? "default" : "destructive"}>
          {value}
        </Badge>
      </div>
    ),
  },
  {
    key: "payheadName",
    label: "Payhead",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "units",
    label: "Units",
    className: "text-center",
  },
  {
    key: "amount",
    label: "Amount",
    render: (value, row) => (
      <span
        className={`font-medium ${row.adjustmentType === "Earning" ? "text-green-600" : "text-red-600"}`}
      >
        {row.adjustmentType === "Earning" ? "+" : "-"}₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "approvedBy",
    label: "Approved By",
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <div className="flex items-center gap-2">
        {value === "Finalized" ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <Clock className="h-4 w-4 text-orange-600" />
        )}
        <Badge variant={value === "Finalized" ? "default" : "secondary"}>
          {value}
        </Badge>
      </div>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "month",
    label: "Month",
    type: "select",
    options: [
      { value: "Dec 2024", label: "December 2024" },
      { value: "Nov 2024", label: "November 2024" },
      { value: "Oct 2024", label: "October 2024" },
    ],
  },
  {
    key: "adjustmentType",
    label: "Type",
    type: "select",
    options: [
      { value: "Earning", label: "Earning" },
      { value: "Deduction", label: "Deduction" },
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
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Draft", label: "Draft" },
      { value: "Finalized", label: "Finalized" },
    ],
  },
];

export default function Adjustments() {
  const [selectedAdjustment, setSelectedAdjustment] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleView = (adjustment: any) => {
    setSelectedAdjustment(adjustment);
  };

  const handleEdit = (adjustment: any) => {
    console.log("Edit adjustment:", adjustment);
  };

  const handleDelete = (adjustment: any) => {
    console.log("Delete adjustment:", adjustment);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Calculate stats
  const totalAdjustments = mockAdjustmentEntries.length;
  const totalEarnings = mockAdjustmentEntries
    .filter((adj) => adj.adjustmentType === "Earning")
    .reduce((sum, adj) => sum + adj.amount, 0);
  const totalDeductions = mockAdjustmentEntries
    .filter((adj) => adj.adjustmentType === "Deduction")
    .reduce((sum, adj) => sum + adj.amount, 0);
  const pendingApprovals = mockAdjustmentEntries.filter(
    (adj) => adj.status === "Draft",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Adjustment Entry"
        description="Process salary adjustments and corrections for employees in December 2024"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Data Table */}
        <DataTable
          data={mockAdjustmentEntries}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Emp ID, Name..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Add Adjustment"
        />
      </div>

      {/* Adjustment Details Dialog */}
      {selectedAdjustment && (
        <Dialog
          open={!!selectedAdjustment}
          onOpenChange={() => setSelectedAdjustment(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Adjustment Details - {selectedAdjustment.name} (
                {selectedAdjustment.empId})
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Adjustment ID
                  </Label>
                  <p className="font-mono">{selectedAdjustment.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Department
                  </Label>
                  <p>{selectedAdjustment.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Month
                  </Label>
                  <p>{selectedAdjustment.month}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Created Date
                  </Label>
                  <p>
                    {new Date(
                      selectedAdjustment.createdDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Adjustment Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Adjustment Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Type
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedAdjustment.adjustmentType === "Earning" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <Badge
                        variant={
                          selectedAdjustment.adjustmentType === "Earning"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {selectedAdjustment.adjustmentType}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Payhead
                    </Label>
                    <p className="font-medium">
                      {selectedAdjustment.payheadName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Units
                    </Label>
                    <p className="font-medium">{selectedAdjustment.units}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Amount
                    </Label>
                    <p
                      className={`text-lg font-bold ${selectedAdjustment.adjustmentType === "Earning" ? "text-green-600" : "text-red-600"}`}
                    >
                      {selectedAdjustment.adjustmentType === "Earning"
                        ? "+"
                        : "-"}
                      ₹{selectedAdjustment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Taxable
                    </Label>
                    <Badge
                      variant={
                        selectedAdjustment.taxable ? "default" : "secondary"
                      }
                    >
                      {selectedAdjustment.taxable ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Status
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedAdjustment.status === "Finalized" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-600" />
                      )}
                      <Badge
                        variant={
                          selectedAdjustment.status === "Finalized"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedAdjustment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Approval & Reason */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Reason
                  </Label>
                  <p className="mt-1 p-3 bg-slate-50 rounded-lg">
                    {selectedAdjustment.reason}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Approved By
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">
                      {selectedAdjustment.approvedBy}
                    </span>
                  </div>
                </div>
              </div>

              {selectedAdjustment.status === "Draft" && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Edit Adjustment</Button>
                  <Button>Approve & Finalize</Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Adjustment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Adjustment Entry</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Employee & Period Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Employee & Period Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empId">Employee *</Label>
                  <select
                    id="empId"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Search & Select Employee</option>
                    <option value="E1001">
                      E1001 - John Smith (Software Engineer)
                    </option>
                    <option value="E1002">
                      E1002 - Priya Sharma (Senior Developer)
                    </option>
                    <option value="E1003">
                      E1003 - Sarah Wilson (Team Lead)
                    </option>
                    <option value="E1004">
                      E1004 - Michael Chen (Sales Manager)
                    </option>
                    <option value="T1001">
                      T1001 - Rajesh Kumar (Sales Executive)
                    </option>
                    <option value="T1002">
                      T1002 - Anita Desai (Telecaller)
                    </option>
                    <option value="E1005">
                      E1005 - Ravi Patel (QA Engineer)
                    </option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="payrollPeriod">Payroll Period *</Label>
                  <select
                    id="payrollPeriod"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Month</option>
                    <option value="Dec 2024">December 2024</option>
                    <option value="Jan 2025">January 2025</option>
                    <option value="Nov 2024">November 2024</option>
                    <option value="Oct 2024">October 2024</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Adjustment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Adjustment Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adjustmentType">Adjustment Type *</Label>
                  <select
                    id="adjustmentType"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Earning">Earning (Addition)</option>
                    <option value="Deduction">Deduction (Reduction)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="adjustmentPayhead">
                    Adjustment Payhead *
                  </Label>
                  <select
                    id="adjustmentPayhead"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Payhead</option>
                    <optgroup label="Earning Payheads">
                      <option value="Overtime Allowance">
                        Overtime Allowance
                      </option>
                      <option value="Special Incentive">
                        Special Incentive
                      </option>
                      <option value="Holiday Pay Allowance">
                        Holiday Pay Allowance
                      </option>
                      <option value="Referral Bonus">Referral Bonus</option>
                      <option value="Health Insurance Allowance">
                        Health Insurance Allowance
                      </option>
                    </optgroup>
                    <optgroup label="Deduction Payheads">
                      <option value="Loss of Pay">Loss of Pay</option>
                      <option value="Late Coming Fine">Late Coming Fine</option>
                      <option value="Advance Salary Deduction">
                        Advance Salary Deduction
                      </option>
                      <option value="Loan Deduction">Loan Deduction</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <Label htmlFor="units">Units</Label>
                  <input
                    id="units"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 8 (hours), 2 (days), 1 (instance)"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: For per-day/hour calculations (OT hours, absent
                    days, etc.)
                  </p>
                </div>

                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter amount in ₹"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Absolute value to add/deduct from salary
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="isTaxable"
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="isTaxable">
                  Is Taxable (for earnings only)
                </Label>
                <p className="text-sm text-gray-500 ml-4">
                  Auto-selected from payhead master
                </p>
              </div>
            </div>

            {/* Approval & Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Approval & Documentation
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="approvedBy">Approved By</Label>
                  <select
                    id="approvedBy"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Approver</option>
                    <option value="Sarah Wilson">
                      Sarah Wilson (Team Lead)
                    </option>
                    <option value="Michael Chen">
                      Michael Chen (Sales Manager)
                    </option>
                    <option value="David Brown">
                      David Brown (Department Head)
                    </option>
                    <option value="HR Admin">HR Admin</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="Draft"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Finalized">Finalized</option>
                    <option value="Processed">Processed</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Notes / Reason *</Label>
                <textarea
                  id="reason"
                  placeholder="Enter detailed reason for this adjustment (e.g., Weekend project work, Unauthorized absence on Dec 15-16, Successful referral)"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide clear justification for audit trail and employee
                  understanding
                </p>
              </div>
            </div>

            {/* Examples Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                Common Adjustment Examples:
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-blue-700">
                <div>
                  <strong>Earning:</strong> Overtime (8 hours × ₹150/hour =
                  ₹1,200)
                </div>
                <div>
                  <strong>Earning:</strong> Referral Bonus (1 instance × ₹5,000
                  = ₹5,000)
                </div>
                <div>
                  <strong>Deduction:</strong> Loss of Pay (2 days × ₹1,500/day =
                  ₹3,000)
                </div>
                <div>
                  <strong>Deduction:</strong> Late Fine (5 instances × ₹50 =
                  ₹250)
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Adjustment Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
