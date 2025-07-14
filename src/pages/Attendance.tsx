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
  Calendar,
  Users,
  Clock,
  Building,
  UserCheck,
  UserX,
  Plane,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  CalendarDays,
  Target,
  Percent,
} from "lucide-react";
import { BulkUploadAttendance } from "@/components/attendance/BulkUploadAttendance";

// Mock attendance data for December 2024
const mockAttendanceData = [
  {
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    reportingManager: "Sarah Wilson",
    totalWorkingDays: 22,
    daysPresent: 21,
    weeklyOffs: 8,
    holidays: 1,
    approvedPaidLeaves: 1,
    lopDays: 0,
    payableDays: 22,
    businessUnit: "JNET",
    attendancePercentage: 95.45,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    reportingManager: "Sarah Wilson",
    totalWorkingDays: 22,
    daysPresent: 20,
    weeklyOffs: 8,
    holidays: 1,
    approvedPaidLeaves: 2,
    lopDays: 0,
    payableDays: 22,
    businessUnit: "JNET",
    attendancePercentage: 90.91,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    reportingManager: "Michael Chen",
    totalWorkingDays: 26,
    daysPresent: 24,
    weeklyOffs: 4,
    holidays: 0,
    approvedPaidLeaves: 2,
    lopDays: 0,
    payableDays: 26,
    businessUnit: "Telecom",
    attendancePercentage: 92.31,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    reportingManager: "David Brown",
    totalWorkingDays: 22,
    daysPresent: 22,
    weeklyOffs: 8,
    holidays: 1,
    approvedPaidLeaves: 0,
    lopDays: 0,
    payableDays: 22,
    businessUnit: "JNET",
    attendancePercentage: 100,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    reportingManager: "David Brown",
    totalWorkingDays: 22,
    daysPresent: 19,
    weeklyOffs: 8,
    holidays: 1,
    approvedPaidLeaves: 0,
    lopDays: 3,
    payableDays: 19,
    businessUnit: "JNET",
    attendancePercentage: 86.36,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    reportingManager: "Rajesh Kumar",
    totalWorkingDays: 26,
    daysPresent: 25,
    weeklyOffs: 4,
    holidays: 0,
    approvedPaidLeaves: 1,
    lopDays: 0,
    payableDays: 26,
    businessUnit: "Telecom",
    attendancePercentage: 96.15,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
  {
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    reportingManager: "Sarah Wilson",
    totalWorkingDays: 22,
    daysPresent: 18,
    weeklyOffs: 8,
    holidays: 1,
    approvedPaidLeaves: 1,
    lopDays: 3,
    payableDays: 19,
    businessUnit: "JNET",
    attendancePercentage: 81.82,
    month: "December",
    fiscalYear: "FY 2024-25",
  },
];

const columns: Column[] = [
  {
    key: "empId",
    label: "Emp ID",
    className: "font-mono text-sm w-20",
  },
  {
    key: "name",
    label: "Name",
    className: "w-64",
    render: (value, row) => (
      <div className="flex items-center gap-3 h-full">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={`/placeholder-avatar-${row.empId}.jpg`} />
          <AvatarFallback className="bg-slate-100 text-slate-700">
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-900 truncate">{value}</div>
          <div className="text-sm text-slate-500 truncate">
            {row.designation}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    className: "w-32",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <span className="truncate font-medium text-slate-700">{value}</span>
      </div>
    ),
  },
  {
    key: "reportingManager",
    label: "Reporting Manager",
    className: "w-40",
  },
  {
    key: "totalWorkingDays",
    label: "Working Days",
    className: "text-center w-24",
  },
  {
    key: "daysPresent",
    label: "Present",
    className: "text-center w-20",
    render: (value, row) => (
      <div className="flex items-center justify-center gap-2">
        <UserCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
        <span className="font-semibold text-green-700">{value}</span>
      </div>
    ),
  },
  {
    key: "weeklyOffs",
    label: "Weekly Offs",
    className: "text-center w-24",
  },
  {
    key: "holidays",
    label: "Holidays",
    className: "text-center w-20",
  },
  {
    key: "approvedPaidLeaves",
    label: "Paid Leaves",
    className: "text-center w-24",
    render: (value) => (
      <div className="flex items-center justify-center gap-2">
        <Plane className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span className="font-semibold text-blue-700">{value}</span>
      </div>
    ),
  },
  {
    key: "lopDays",
    label: "LOP Days",
    className: "text-center w-20",
    render: (value) => (
      <div className="flex items-center justify-center gap-2">
        <UserX className="h-4 w-4 text-red-600 flex-shrink-0" />
        <span className="font-semibold text-red-700">{value}</span>
      </div>
    ),
  },
  {
    key: "payableDays",
    label: "Payable Days",
    className: "text-center font-bold w-24",
  },
  {
    key: "attendancePercentage",
    label: "Attendance %",
    className: "w-28",
    render: (value) => (
      <Badge
        variant={
          value >= 95 ? "default" : value >= 85 ? "secondary" : "destructive"
        }
        className="font-semibold flex items-center gap-1"
      >
        {value >= 95 ? (
          <CheckCircle className="h-3 w-3" />
        ) : value >= 85 ? (
          <AlertCircle className="h-3 w-3" />
        ) : (
          <XCircle className="h-3 w-3" />
        )}
        {value}%
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
      { value: "Operations", label: "Operations" },
      { value: "HR", label: "HR" },
      { value: "Finance", label: "Finance" },
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
];

export default function Attendance() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Get current month/year for default filtering
  const currentMonth = "December"; // Default to December
  const currentFiscalYear = "FY 2024-25";

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState(currentFiscalYear);

  // Filter data to show current month by default
  const filteredData = mockAttendanceData.filter(
    (attendance) =>
      attendance.month === selectedMonth &&
      attendance.fiscalYear === selectedFiscalYear,
  );

  const handleMonthYearFilter = (month: string, fiscalYear: string) => {
    setSelectedMonth(month);
    setSelectedFiscalYear(fiscalYear);
  };

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: any) => {
    console.log("Edit attendance for:", employee);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Calculate stats
  const totalEmployees = mockAttendanceData.length;
  const presentEmployees = mockAttendanceData.filter(
    (emp) => emp.daysPresent >= emp.totalWorkingDays * 0.9,
  ).length;
  const avgAttendance =
    mockAttendanceData.reduce((sum, emp) => sum + emp.attendancePercentage, 0) /
    totalEmployees;
  const lateArrivals = mockAttendanceData.filter(
    (emp) => emp.attendancePercentage < 90,
  ).length;

  return showBulkUpload ? (
    <BulkUploadAttendance onClose={() => setShowBulkUpload(false)} />
  ) : (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Management"
        description="Track employee attendance data from HRMS and manage manual uploads for December 2024"
        icon={<CalendarDays className="h-6 w-6 text-blue-600" />}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2"
            onClick={() => setShowBulkUpload(true)}
          >
            <Upload className="h-4 w-4" />
            Upload Attendance
          </Button>
        </div>
      </PageHeader>

      <div className="px-6 space-y-4">
        {/* Data Table with Fiscal/Month filters in toolbar */}
        <DataTable
          data={filteredData}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Emp ID, Name..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          addButtonText="Manual Entry"
          customToolbar={
            <>
              {/* Fiscal/Month Filters on the right side of search */}
              <div className="flex items-center gap-2">
                <Label className="text-xs text-slate-600">FY:</Label>
                <select
                  value={selectedFiscalYear}
                  onChange={(e) =>
                    handleMonthYearFilter(selectedMonth, e.target.value)
                  }
                  className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-24"
                >
                  <option value="FY 2025-26">2025-26</option>
                  <option value="FY 2024-25">2024-25</option>
                </select>
                <Label className="text-xs text-slate-600">Month:</Label>
                <select
                  value={selectedMonth}
                  onChange={(e) =>
                    handleMonthYearFilter(e.target.value, selectedFiscalYear)
                  }
                  className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-20"
                >
                  <option value="June">Jun</option>
                  <option value="May">May</option>
                  <option value="April">Apr</option>
                  <option value="March">Mar</option>
                  <option value="February">Feb</option>
                  <option value="January">Jan</option>
                  <option value="December">Dec</option>
                  <option value="November">Nov</option>
                </select>
              </div>
            </>
          }
        />
      </div>

      {/* Employee Attendance Details Dialog */}
      {selectedEmployee && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="w-full max-w-xl h-auto max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                Attendance Details - {selectedEmployee.name} (
                {selectedEmployee.empId})
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">
                      Department
                    </Label>
                    <p className="text-slate-900 font-medium">
                      {selectedEmployee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">
                      Business Unit
                    </Label>
                    <p className="text-slate-900 font-medium">
                      {selectedEmployee.businessUnit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">
                      Reporting Manager
                    </Label>
                    <p className="text-slate-900 font-medium">
                      {selectedEmployee.reportingManager}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-orange-600" />
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">
                      Attendance %
                    </Label>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedEmployee.attendancePercentage}%
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Attendance Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  December 2024 Summary
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Working Days</span>
                      <span className="font-semibold text-slate-900">
                        {selectedEmployee.totalWorkingDays}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Days Present</span>
                      <span className="font-semibold text-green-700">
                        {selectedEmployee.daysPresent}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Weekly Offs</span>
                      <span className="font-semibold text-slate-900">
                        {selectedEmployee.weeklyOffs}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Holidays</span>
                      <span className="font-semibold text-slate-900">
                        {selectedEmployee.holidays}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Paid Leaves</span>
                      <span className="font-semibold text-blue-700">
                        {selectedEmployee.approvedPaidLeaves}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">LOP Days</span>
                      <span className="font-semibold text-red-700">
                        {selectedEmployee.lopDays}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Payable Days</span>
                      <span className="font-bold text-slate-900 text-lg">
                        {selectedEmployee.payableDays}
                      </span>
                    </div>
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
