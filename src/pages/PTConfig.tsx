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
import { CreditCard, Plus, MapPin, IndianRupee, Calendar } from "lucide-react";

// Mock PT configuration data
const mockPTSlabs = [
  {
    id: "PT001",
    state: "Maharashtra",
    slabFrom: 0,
    slabTo: 5000,
    monthlyPTAmount: 0,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
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
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
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
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2500,
    employees: 42,
    status: "Active",
  },
  {
    id: "PT004",
    state: "Maharashtra",
    slabFrom: 25001,
    slabTo: null,
    monthlyPTAmount: 200,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2500,
    employees: 28,
    status: "Active",
  },
  {
    id: "PT005",
    state: "Karnataka",
    slabFrom: 0,
    slabTo: 15000,
    monthlyPTAmount: 0,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2400,
    employees: 3,
    status: "Active",
  },
  {
    id: "PT006",
    state: "Karnataka",
    slabFrom: 15001,
    slabTo: 25000,
    monthlyPTAmount: 150,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2400,
    employees: 7,
    status: "Active",
  },
  {
    id: "PT007",
    state: "Karnataka",
    slabFrom: 25001,
    slabTo: 40000,
    monthlyPTAmount: 200,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2400,
    employees: 12,
    status: "Active",
  },
  {
    id: "PT008",
    state: "Karnataka",
    slabFrom: 40001,
    slabTo: null,
    monthlyPTAmount: 200,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2400,
    employees: 8,
    status: "Active",
  },
  {
    id: "PT009",
    state: "Delhi",
    slabFrom: 0,
    slabTo: 10000,
    monthlyPTAmount: 0,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2000,
    employees: 2,
    status: "Active",
  },
  {
    id: "PT010",
    state: "Delhi",
    slabFrom: 10001,
    slabTo: 15000,
    monthlyPTAmount: 100,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2000,
    employees: 5,
    status: "Active",
  },
  {
    id: "PT011",
    state: "Delhi",
    slabFrom: 15001,
    slabTo: null,
    monthlyPTAmount: 150,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2000,
    employees: 8,
    status: "Active",
  },
  {
    id: "PT012",
    state: "Tamil Nadu",
    slabFrom: 0,
    slabTo: 21000,
    monthlyPTAmount: 0,
    monthsApplicable: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    annualCap: 2400,
    employees: 0,
    status: "Inactive",
  },
];

const columns: Column[] = [
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
    key: "monthsApplicable",
    label: "Applicable Months",
    render: (value) => (
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3 text-purple-600" />
        <span className="text-sm">{value.length} months</span>
      </div>
    ),
  },
  {
    key: "annualCap",
    label: "Annual Cap",
    render: (value) => <span className="font-medium">₹{value}</span>,
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

const filters: Filter[] = [
  {
    key: "state",
    label: "State",
    type: "select",
    options: [
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Karnataka", label: "Karnataka" },
      { value: "Delhi", label: "Delhi" },
      { value: "Tamil Nadu", label: "Tamil Nadu" },
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

export default function PTConfig() {
  const [selectedSlab, setSelectedSlab] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleView = (slab: any) => {
    setSelectedSlab(slab);
  };

  const handleEdit = (slab: any) => {
    console.log("Edit PT slab:", slab);
  };

  const handleDelete = (slab: any) => {
    console.log("Delete PT slab:", slab);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Calculate stats
  const totalSlabs = mockPTSlabs.filter((s) => s.status === "Active").length;
  const totalEmployees = mockPTSlabs.reduce((sum, s) => sum + s.employees, 0);
  const uniqueStates = [...new Set(mockPTSlabs.map((s) => s.state))].length;
  const totalPTCollection = mockPTSlabs.reduce(
    (sum, s) => sum + s.monthlyPTAmount * s.employees * 12,
    0,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="PT Configuration"
        description="Configure Professional Tax slabs by state and salary ranges"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Data Table */}
        <DataTable
          data={mockPTSlabs}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by State..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Add PT Slab"
        />
      </div>

      {/* PT Slab Details Dialog */}
      {selectedSlab && (
        <Dialog
          open={!!selectedSlab}
          onOpenChange={() => setSelectedSlab(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>PT Slab Details - {selectedSlab.state}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Slab ID
                  </Label>
                  <p className="font-mono">{selectedSlab.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Status
                  </Label>
                  <Badge
                    variant={
                      selectedSlab.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {selectedSlab.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    State
                  </Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{selectedSlab.state}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Affected Employees
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedSlab.employees}
                  </p>
                </div>
              </div>

              {/* Slab Configuration */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Slab Configuration
                </h3>
                <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span>Salary Range</span>
                    <span className="font-medium">
                      ₹{selectedSlab.slabFrom.toLocaleString()} -{" "}
                      {selectedSlab.slabTo
                        ? `₹${selectedSlab.slabTo.toLocaleString()}`
                        : "No Limit"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly PT Amount</span>
                    <span className="font-medium text-green-600">
                      ₹{selectedSlab.monthlyPTAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Cap</span>
                    <span className="font-medium">
                      ₹{selectedSlab.annualCap}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applicable Months</span>
                    <span className="font-medium">
                      {selectedSlab.monthsApplicable.length} months
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Applicable Months
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                    "Jan",
                    "Feb",
                    "Mar",
                  ].map((month) => (
                    <Badge
                      key={month}
                      variant={
                        selectedSlab.monthsApplicable.includes(month)
                          ? "default"
                          : "outline"
                      }
                      className="justify-center"
                    >
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Impact Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Collection</span>
                    <span className="font-medium">
                      ₹
                      {(
                        selectedSlab.monthlyPTAmount * selectedSlab.employees
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Collection</span>
                    <span className="font-bold text-blue-600">
                      ₹
                      {(
                        selectedSlab.monthlyPTAmount *
                        selectedSlab.employees *
                        12
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
