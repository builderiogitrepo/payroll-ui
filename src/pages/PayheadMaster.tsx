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
import {
  FileText,
  Plus,
  TrendingUp,
  TrendingDown,
  Settings,
} from "lucide-react";

// Mock regular payhead data
const mockRegularPayheads = [
  {
    id: "RP001",
    payheadName: "Basic Pay",
    description: "Core fixed salary component",
    type: "Earning",
    taxable: true,
    section: "Regular",
    usage: 95,
  },
  {
    id: "RP002",
    payheadName: "House Rent Allowance",
    description: "Housing benefit for tax savings",
    type: "Earning",
    taxable: true,
    section: "Regular",
    usage: 85,
  },
  {
    id: "RP003",
    payheadName: "Medical Allowance",
    description: "Monthly medical support",
    type: "Earning",
    taxable: true,
    section: "Regular",
    usage: 78,
  },
  {
    id: "RP004",
    payheadName: "Conveyance Allowance",
    description: "Travel and transport allowance",
    type: "Earning",
    taxable: true,
    section: "Regular",
    usage: 62,
  },
  {
    id: "RP005",
    payheadName: "Special Allowance",
    description: "Additional compensation component",
    type: "Earning",
    taxable: true,
    section: "Regular",
    usage: 45,
  },
  {
    id: "RP006",
    payheadName: "Provident Fund",
    description: "Statutory Provident Fund deduction",
    type: "Deduction",
    taxable: false,
    section: "Regular",
    usage: 89,
  },
  {
    id: "RP007",
    payheadName: "Employee State Insurance",
    description: "Employee insurance contribution",
    type: "Deduction",
    taxable: false,
    section: "Regular",
    usage: 45,
  },
  {
    id: "RP008",
    payheadName: "Professional Tax",
    description: "State professional tax deduction",
    type: "Deduction",
    taxable: false,
    section: "Regular",
    usage: 92,
  },
  {
    id: "RP009",
    payheadName: "Income Tax (TDS)",
    description: "Tax deducted at source",
    type: "Deduction",
    taxable: false,
    section: "Regular",
    usage: 67,
  },
  {
    id: "RP010",
    payheadName: "Life Insurance Premium",
    description: "Employee life insurance deduction",
    type: "Deduction",
    taxable: false,
    section: "Regular",
    usage: 23,
  },
];

// Mock adjustment payhead data
const mockAdjustmentPayheads = [
  {
    id: "AP001",
    payheadName: "Overtime Allowance",
    description: "Additional payment for overtime work",
    calculationType: "Fixed",
    calculationBasis: "-",
    unit: "Per Hour",
    defaultValue: 150,
    taxable: true,
    section: "Additional",
    usage: 35,
  },
  {
    id: "AP002",
    payheadName: "Special Incentive",
    description: "Performance-based incentive payment",
    calculationType: "Percentage",
    calculationBasis: "Gross",
    unit: "Per Year",
    defaultValue: 10,
    taxable: true,
    section: "Additional",
    usage: 28,
  },
  {
    id: "AP003",
    payheadName: "Holiday Pay Allowance",
    description: "Additional pay for holiday work",
    calculationType: "Multiplier",
    calculationBasis: "Per Day Basic",
    unit: "Per Day",
    defaultValue: 1.5,
    taxable: true,
    section: "Additional",
    usage: 12,
  },
  {
    id: "AP004",
    payheadName: "Referral Bonus",
    description: "Bonus for successful employee referrals",
    calculationType: "Fixed",
    calculationBasis: "-",
    unit: "One-time",
    defaultValue: 5000,
    taxable: true,
    section: "Additional",
    usage: 8,
  },
  {
    id: "AP005",
    payheadName: "Health Insurance Allowance",
    description: "Reimbursement for health insurance",
    calculationType: "Fixed",
    calculationBasis: "-",
    unit: "Monthly",
    defaultValue: 1250,
    taxable: false,
    section: "Additional",
    usage: 15,
  },
  {
    id: "AP006",
    payheadName: "Loss of Pay",
    description: "Deduction for absent days",
    calculationType: "Fixed",
    calculationBasis: "Per Day Basic",
    unit: "Per Day",
    defaultValue: 1,
    taxable: false,
    section: "Additional",
    usage: 18,
  },
  {
    id: "AP007",
    payheadName: "Late Coming Fine",
    description: "Penalty for late arrivals",
    calculationType: "Fixed",
    calculationBasis: "-",
    unit: "Per Instance",
    defaultValue: 50,
    taxable: false,
    section: "Additional",
    usage: 22,
  },
  {
    id: "AP008",
    payheadName: "Advance Salary Deduction",
    description: "Recovery of advance salary",
    calculationType: "Fixed",
    calculationBasis: "-",
    unit: "Monthly",
    defaultValue: 0,
    taxable: false,
    section: "Additional",
    usage: 5,
  },
];

const regularColumns: Column[] = [
  {
    key: "payheadName",
    label: "Payhead Name",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-slate-500">{row.id}</div>
      </div>
    ),
  },
  {
    key: "description",
    label: "Description",
    render: (value) => (
      <div className="max-w-40 truncate" title={value}>
        {value}
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
    render: (value) => (
      <Badge variant={value === "Earning" ? "default" : "destructive"}>
        {value}
      </Badge>
    ),
  },
  {
    key: "taxable",
    label: "Taxable",
    render: (value) => (
      <span
        className={`status-tag ${value ? "status-taxable" : "status-non-taxable"}`}
      >
        {value ? "Yes" : "No"}
      </span>
    ),
  },
];

const adjustmentColumns: Column[] = [
  {
    key: "payheadName",
    label: "Payhead Name",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-slate-500">{row.id}</div>
      </div>
    ),
  },
  {
    key: "calculationType",
    label: "Type",
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "defaultValue",
    label: "Default Value",
    render: (value, row) => (
      <span className="font-medium">
        {row.calculationType === "Percentage"
          ? `${value}%`
          : row.calculationType === "Multiplier"
            ? `${value}x`
            : `₹${value}`}
      </span>
    ),
  },
  {
    key: "taxable",
    label: "Taxable",
    render: (value) => (
      <span
        className={`status-tag ${value ? "status-taxable" : "status-non-taxable"}`}
      >
        {value ? "Yes" : "No"}
      </span>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "Earning", label: "Earning" },
      { value: "Deduction", label: "Deduction" },
    ],
  },
  {
    key: "taxable",
    label: "Taxable",
    type: "select",
    options: [
      { value: "true", label: "Taxable" },
      { value: "false", label: "Non-taxable" },
    ],
  },
];

const adjustmentFilters: Filter[] = [
  {
    key: "calculationType",
    label: "Calculation Type",
    type: "select",
    options: [
      { value: "Fixed", label: "Fixed" },
      { value: "Percentage", label: "Percentage" },
      { value: "Multiplier", label: "Multiplier" },
    ],
  },
  {
    key: "taxable",
    label: "Taxable",
    type: "select",
    options: [
      { value: "true", label: "Taxable" },
      { value: "false", label: "Non-taxable" },
    ],
  },
];

export default function PayheadMaster() {
  const [selectedPayhead, setSelectedPayhead] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("regular");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleView = (payhead: any) => {
    setSelectedPayhead(payhead);
  };

  const handleEdit = (payhead: any) => {
    console.log("Edit payhead:", payhead);
  };

  const handleDelete = (payhead: any) => {
    console.log("Delete payhead:", payhead);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const currentData =
    activeTab === "regular" ? mockRegularPayheads : mockAdjustmentPayheads;
  const currentColumns =
    activeTab === "regular" ? regularColumns : adjustmentColumns;
  const currentFilters = activeTab === "regular" ? filters : adjustmentFilters;

  const totalRegular = mockRegularPayheads.length;
  const totalAdjustment = mockAdjustmentPayheads.length;
  const earningsCount = mockRegularPayheads.filter(
    (p) => p.type === "Earning",
  ).length;
  const deductionsCount = mockRegularPayheads.filter(
    (p) => p.type === "Deduction",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payhead Master"
        description="Manage regular and adjustment payheads for earnings and deductions"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Payheads
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Payhead Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-80 grid-cols-2">
            <TabsTrigger value="regular">Regular Payheads</TabsTrigger>
            <TabsTrigger value="adjustment">Additional Payheads</TabsTrigger>
          </TabsList>

          <TabsContent value="regular">
            <DataTable
              data={mockRegularPayheads}
              columns={regularColumns}
              filters={filters}
              searchPlaceholder="Search payheads..."
              onAdd={handleAdd}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              addButtonText="Add Regular Payhead"
            />
          </TabsContent>

          <TabsContent value="adjustment">
            <DataTable
              data={mockAdjustmentPayheads}
              columns={adjustmentColumns}
              filters={adjustmentFilters}
              searchPlaceholder="Search adjustment payheads..."
              onAdd={handleAdd}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              addButtonText="Add Additional Payhead"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Payhead Details Dialog */}
      {selectedPayhead && (
        <Dialog
          open={!!selectedPayhead}
          onOpenChange={() => setSelectedPayhead(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Payhead Details - {selectedPayhead.payheadName}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 p-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Payhead ID
                  </Label>
                  <p className="font-mono">{selectedPayhead.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Section
                  </Label>
                  <p>{selectedPayhead.section}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Type
                  </Label>
                  <Badge
                    variant={
                      selectedPayhead.type === "Earning"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {selectedPayhead.type}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Taxable
                  </Label>
                  <div className="mt-1">
                    <span
                      className={`status-tag ${selectedPayhead.taxable ? "status-taxable" : "status-non-taxable"}`}
                    >
                      {selectedPayhead.taxable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                {selectedPayhead.section === "Additional" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">
                        Calculation Type
                      </Label>
                      <p>{selectedPayhead.calculationType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">
                        Calculation Basis
                      </Label>
                      <p>{selectedPayhead.calculationBasis}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">
                        Unit
                      </Label>
                      <p>{selectedPayhead.unit}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">
                        Default Value
                      </Label>
                      <p className="font-semibold">
                        {selectedPayhead.calculationType === "Percentage"
                          ? `${selectedPayhead.defaultValue}%`
                          : selectedPayhead.calculationType === "Multiplier"
                            ? `${selectedPayhead.defaultValue}x`
                            : `₹${selectedPayhead.defaultValue}`}
                      </p>
                    </div>
                  </>
                )}
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Usage
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedPayhead.usage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {selectedPayhead.usage}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Description
                </Label>
                <p className="mt-1">{selectedPayhead.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Payhead Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Add New {activeTab === "regular" ? "Regular" : "Additional"}{" "}
              Payhead
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="payheadName">Payhead Name *</Label>
                  <input
                    id="payheadName"
                    type="text"
                    placeholder="e.g., Overtime Allowance, Referral Bonus"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="Brief explanation of this payhead's purpose"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Regular Payhead Fields */}
            {activeTab === "regular" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Regular Payhead Configuration
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <select
                      id="type"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Earning">Earning</option>
                      <option value="Deduction">Deduction</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2 mt-8">
                    <input
                      id="taxable"
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="taxable">Is Taxable</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Payhead Fields */}
            {activeTab === "adjustment" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Payhead Configuration
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calculationType">Calculation Type *</Label>
                    <select
                      id="calculationType"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Calculation Type</option>
                      <option value="Fixed">Fixed Amount</option>
                      <option value="Percentage">Percentage</option>
                      <option value="Multiplier">Multiplier</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="calculationBasis">Calculation Basis</Label>
                    <select
                      id="calculationBasis"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="-">None (Standalone)</option>
                      <option value="CTC">CTC (Cost to Company)</option>
                      <option value="Basic">Basic Pay</option>
                      <option value="Gross">Gross Salary</option>
                      <option value="Per Day Basic">Per Day Basic</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="unit">Unit *</Label>
                    <select
                      id="unit"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Unit</option>
                      <option value="Per Month">Per Month</option>
                      <option value="Per Day">Per Day</option>
                      <option value="Per Hour">Per Hour</option>
                      <option value="Per Year">Per Year</option>
                      <option value="One-time">One-time</option>
                      <option value="Per Instance">Per Instance</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="defaultValue">Default Value</Label>
                    <input
                      id="defaultValue"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 150, 5000, 10"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Amount, percentage, or multiplier (can be overridden in
                      adjustment entry)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="taxableAdj"
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="taxableAdj">Is Taxable</Label>
                  <p className="text-sm text-gray-500 ml-4">
                    Whether this contributes to taxable income
                  </p>
                </div>

                {/* Sample Examples */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Examples:
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-blue-700">
                    <div>
                      • <strong>Overtime Allowance:</strong> Fixed, Per Hour,
                      ₹150
                    </div>
                    <div>
                      • <strong>Special Incentive:</strong> Percentage, Gross,
                      Per Year, 10%
                    </div>
                    <div>
                      • <strong>Holiday Pay:</strong> Multiplier, Per Day Basic,
                      Per Day, 1.5x
                    </div>
                    <div>
                      • <strong>Referral Bonus:</strong> Fixed, None, One-time,
                      ₹5000
                    </div>
                    <div>
                      • <strong>Late Coming Fine:</strong> Fixed, None, Per
                      Instance, ₹50
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Payhead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
