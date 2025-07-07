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
} from "lucide-react";

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
    label: "Name",
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
    key: "reportingManager",
    label: "Reporting Manager",
  },
  {
    key: "totalWorkingDays",
    label: "Working Days",
    className: "text-center",
  },
  {
    key: "daysPresent",
    label: "Present",
    className: "text-center",
    render: (value, row) => (
      <div className="flex items-center justify-center gap-2">
        <UserCheck className="h-4 w-4 text-green-600" />
        <span className="font-medium text-green-600">{value}</span>
      </div>
    ),
  },
  {
    key: "weeklyOffs",
    label: "Weekly Offs",
    className: "text-center",
  },
  {
    key: "holidays",
    label: "Holidays",
    className: "text-center",
  },
  {
    key: "approvedPaidLeaves",
    label: "Paid Leaves",
    className: "text-center",
    render: (value) => (
      <div className="flex items-center justify-center gap-2">
        <Plane className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-blue-600">{value}</span>
      </div>
    ),
  },
  {
    key: "lopDays",
    label: "LOP Days",
    className: "text-center",
    render: (value) => (
      <div className="flex items-center justify-center gap-2">
        <UserX className="h-4 w-4 text-red-600" />
        <span className="font-medium text-red-600">{value}</span>
      </div>
    ),
  },
  {
    key: "payableDays",
    label: "Payable Days",
    className: "text-center font-bold",
  },
  {
    key: "attendancePercentage",
    label: "Attendance %",
    render: (value) => (
      <Badge
        variant={
          value >= 95 ? "default" : value >= 85 ? "secondary" : "destructive"
        }
      >
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Management"
        description="Track employee attendance data from HRMS and manage manual uploads for December 2024"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Attendance
          </Button>
        </div>
      </PageHeader>

      <div className="px-6">
        {/* Data Table */}
        <DataTable
          data={mockAttendanceData}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Emp ID, Name..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          addButtonText="Manual Entry"
        />
      </div>

      {/* Employee Attendance Details Dialog */}
      {selectedEmployee && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Attendance Details - {selectedEmployee.name} (
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
                    Reporting Manager
                  </Label>
                  <p>{selectedEmployee.reportingManager}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Attendance %
                  </Label>
                  <p className="text-lg font-semibold">
                    {selectedEmployee.attendancePercentage}%
                  </p>
                </div>
              </div>

              <Separator />

              {/* Attendance Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  December 2024 Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Working Days</span>
                      <span className="font-medium">
                        {selectedEmployee.totalWorkingDays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Present</span>
                      <span className="font-medium text-green-600">
                        {selectedEmployee.daysPresent}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Offs</span>
                      <span className="font-medium">
                        {selectedEmployee.weeklyOffs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Holidays</span>
                      <span className="font-medium">
                        {selectedEmployee.holidays}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Approved Paid Leaves</span>
                      <span className="font-medium text-blue-600">
                        {selectedEmployee.approvedPaidLeaves}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loss of Pay Days</span>
                      <span className="font-medium text-red-600">
                        {selectedEmployee.lopDays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payable Days</span>
                      <span className="font-bold text-lg">
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
