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
  Upload,
  Download,
  FileText,
  Calendar,
  IndianRupee,
  User,
  Building,
} from "lucide-react";

// Mock TDS upload data
const mockTDSData = [
  // June 2025 data (FY 2025-26)
  {
    id: "TDS_J001",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "New",
    tdsAmount: 9500,
    notes: "Monthly TDS as per new tax regime for June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J002",
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "New",
    tdsAmount: 14000,
    notes: "Monthly TDS including performance bonus for June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J003",
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "Old",
    tdsAmount: 3500,
    notes: "Monthly TDS as per old tax regime for June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J004",
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "New",
    tdsAmount: 22000,
    notes: "Monthly TDS for senior role June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J005",
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "Old",
    tdsAmount: 17000,
    notes: "Monthly TDS including management allowance June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J006",
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "New",
    tdsAmount: 900,
    notes: "Lower TDS due to income slab June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-01",
    status: "Processed",
  },
  {
    id: "TDS_J007",
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    fiscalYear: "FY 2025-26",
    month: "June",
    taxRegime: "New",
    tdsAmount: 5800,
    notes: "Monthly TDS for mid-level position June 2025",
    uploadedBy: "HR Admin",
    uploadedDate: "2025-06-02",
    status: "Pending",
  },
  // Previous data (FY 2024-25)
  {
    id: "TDS001",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "New",
    tdsAmount: 8000,
    notes: "Monthly TDS as per new tax regime",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS002",
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "New",
    tdsAmount: 12000,
    notes: "Monthly TDS including variable pay component",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS003",
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "Old",
    tdsAmount: 3000,
    notes: "Monthly TDS as per old tax regime with deductions",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS004",
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "New",
    tdsAmount: 20000,
    notes: "Monthly TDS for senior role",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS005",
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "Old",
    tdsAmount: 15000,
    notes: "Monthly TDS including management allowance",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS006",
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "New",
    tdsAmount: 800,
    notes: "Lower TDS due to income slab",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-01",
    status: "Processed",
  },
  {
    id: "TDS007",
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "December",
    taxRegime: "New",
    tdsAmount: 5000,
    notes: "Monthly TDS for mid-level position",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-12-02",
    status: "Pending",
  },
  // November data
  {
    id: "TDS008",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "November",
    taxRegime: "New",
    tdsAmount: 7500,
    notes: "Monthly TDS for November",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-11-01",
    status: "Processed",
  },
  {
    id: "TDS009",
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "November",
    taxRegime: "New",
    tdsAmount: 11500,
    notes: "Monthly TDS for November",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-11-01",
    status: "Processed",
  },
  {
    id: "TDS010",
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    fiscalYear: "FY 2024-25",
    month: "November",
    taxRegime: "New",
    tdsAmount: 19000,
    notes: "Monthly TDS for November",
    uploadedBy: "HR Admin",
    uploadedDate: "2024-11-01",
    status: "Processed",
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
    key: "month",
    label: "Month",
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-600" />
        <span>
          {value} {row.fiscalYear.split(" ")[1]}
        </span>
      </div>
    ),
  },
  {
    key: "taxRegime",
    label: "Tax Regime",
    render: (value) => (
      <Badge variant={value === "New" ? "default" : "secondary"}>
        {value} Regime
      </Badge>
    ),
  },
  {
    key: "tdsAmount",
    label: "TDS Amount",
    render: (value) => (
      <div className="flex items-center gap-1">
        <IndianRupee className="h-3 w-3 text-green-600" />
        <span className="font-medium text-green-600">
          ₹{value.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    key: "uploadedBy",
    label: "Uploaded By",
    render: (value) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-slate-400" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "uploadedDate",
    label: "Upload Date",
    render: (value) => (
      <span className="text-sm">{new Date(value).toLocaleDateString()}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Processed" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "fiscalYear",
    label: "Fiscal Year",
    type: "select",
    options: [
      { value: "FY 2025-26", label: "FY 2025-26" },
      { value: "FY 2024-25", label: "FY 2024-25" },
      { value: "FY 2023-24", label: "FY 2023-24" },
    ],
  },
  {
    key: "month",
    label: "Month",
    type: "select",
    options: [
      { value: "December", label: "December" },
      { value: "November", label: "November" },
      { value: "October", label: "October" },
      { value: "September", label: "September" },
    ],
  },
  {
    key: "taxRegime",
    label: "Tax Regime",
    type: "select",
    options: [
      { value: "New", label: "New Regime" },
      { value: "Old", label: "Old Regime" },
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
      { value: "Processed", label: "Processed" },
      { value: "Pending", label: "Pending" },
    ],
  },
];

export default function TDSUpload() {
  const [selectedTDS, setSelectedTDS] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Get current month/year for default filtering
  const currentMonth = "June"; // Default to June
  const currentFiscalYear = "FY 2025-26";

  // Filter data to show current month by default
  const getCurrentMonthData = () => {
    return mockTDSData.filter(
      (tds) =>
        tds.month === currentMonth && tds.fiscalYear === currentFiscalYear,
    );
  };

  const [filteredData, setFilteredData] = useState(getCurrentMonthData());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState(currentFiscalYear);

  // Handle month/year filter changes
  const handleMonthYearFilter = (month: string, fiscalYear: string) => {
    const filtered = mockTDSData.filter(
      (tds) => tds.month === month && tds.fiscalYear === fiscalYear,
    );
    setFilteredData(filtered);
    setSelectedMonth(month);
    setSelectedFiscalYear(fiscalYear);
  };

  const handleView = (tds: any) => {
    setSelectedTDS(tds);
  };

  const handleEdit = (tds: any) => {
    console.log("Edit TDS:", tds);
  };

  const handleDelete = (tds: any) => {
    console.log("Delete TDS:", tds);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Calculate stats based on filtered data
  const totalUploads = filteredData.length;
  const totalTDSAmount = filteredData.reduce(
    (sum, tds) => sum + tds.tdsAmount,
    0,
  );
  const uniqueEmployees = [...new Set(filteredData.map((tds) => tds.empId))]
    .length;
  const pendingUploads = filteredData.filter(
    (tds) => tds.status === "Pending",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Taxes"
        description="Upload and manage TDS data for employees by fiscal year and month"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </PageHeader>

      <div className="px-6 space-y-4">
        {/* Month/Year Filter Controls */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm">Fiscal Year:</Label>
              <select
                value={selectedFiscalYear}
                onChange={(e) =>
                  handleMonthYearFilter(selectedMonth, e.target.value)
                }
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FY 2025-26">FY 2025-26</option>
                <option value="FY 2024-25">FY 2024-25</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm">Month:</Label>
              <select
                value={selectedMonth}
                onChange={(e) =>
                  handleMonthYearFilter(e.target.value, selectedFiscalYear)
                }
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="June">June 2025</option>
                <option value="May">May 2025</option>
                <option value="April">April 2025</option>
                <option value="March">March 2025</option>
                <option value="February">February 2025</option>
                <option value="January">January 2025</option>
                <option value="December">December 2024</option>
                <option value="November">November 2024</option>
              </select>
            </div>

            <div className="ml-auto text-sm text-slate-600">
              Showing {totalUploads} records for {selectedMonth}{" "}
              {selectedFiscalYear}
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={columns}
          filters={filters.filter(
            (f) => f.key !== "fiscalYear" && f.key !== "month",
          )} // Remove month/year from table filters since we have dedicated controls
          searchPlaceholder="Search by Emp ID, Name..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Upload TDS Data"
        />
      </div>

      {/* TDS Details Dialog */}
      {selectedTDS && (
        <Dialog open={!!selectedTDS} onOpenChange={() => setSelectedTDS(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                TDS Details - {selectedTDS.name} ({selectedTDS.empId})
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    TDS ID
                  </Label>
                  <p className="font-mono">{selectedTDS.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Department
                  </Label>
                  <p>{selectedTDS.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Designation
                  </Label>
                  <p>{selectedTDS.designation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Status
                  </Label>
                  <Badge
                    variant={
                      selectedTDS.status === "Processed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedTDS.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* TDS Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">TDS Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Fiscal Year
                    </Label>
                    <p className="font-medium">{selectedTDS.fiscalYear}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Month
                    </Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{selectedTDS.month}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Tax Regime
                    </Label>
                    <Badge
                      variant={
                        selectedTDS.taxRegime === "New"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedTDS.taxRegime} Regime
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      TDS Amount
                    </Label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">
                        ₹{selectedTDS.tdsAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Upload Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Upload Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Uploaded By
                    </Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">
                        {selectedTDS.uploadedBy}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Upload Date
                    </Label>
                    <p>
                      {new Date(selectedTDS.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Notes
                </Label>
                <p className="mt-1 p-3 bg-slate-50 rounded-lg">
                  {selectedTDS.notes}
                </p>
              </div>

              {selectedTDS.status === "Pending" && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Edit TDS</Button>
                  <Button>Process TDS</Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
