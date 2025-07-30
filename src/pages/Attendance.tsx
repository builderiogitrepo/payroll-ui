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
  RefreshCw,
  Filter as FilterIcon,
  Search,
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
    className: " text-sm w-20",
  },
  {
    key: "name",
    label: "Name",
    className: "w-64",
    render: (value, row) => (
      <div className="flex items-center gap-3 h-full">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={`/placeholder-avatar-${row.empId}.jpg`} />
          <AvatarFallback className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-foreground truncate">{value}</div>
          <div className="text-sm text-muted-foreground truncate">
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
      <Badge
        variant="secondary"
        className="bg-primary/10 text-primary hover:bg-primary/20"
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "totalWorkingDays",
    label: "Working Days",
    className: "w-24 text-center",
  },
  {
    key: "daysPresent",
    label: "Present",
    className: "w-20 text-center",
    render: (value) => (
      <div className="text-center">
        <div className="font-semibold text-blue-600">{value}</div>
      </div>
    ),
  },
  {
    key: "approvedPaidLeaves",
    label: "Paid Leave",
    className: "w-24 text-center",
    render: (value) => (
      <div className="text-center">
        <div className="font-semibold text-blue-600">{value}</div>
      </div>
    ),
  },
  {
    key: "lopDays",
    label: "LOP",
    className: "w-16 text-center",
    render: (value) => (
      <div className="text-center">
        <div className="font-semibold text-red-600">{value}</div>
      </div>
    ),
  },
  {
    key: "payableDays",
    label: "Payable Days",
    className: "w-28 text-center",
    render: (value) => (
      <div className="text-center">
        <div className="font-semibold text-foreground">{value}</div>
      </div>
    ),
  },
  {
    key: "attendancePercentage",
    label: "Attendance %",
    className: "w-32 text-center",
    render: (value) => (
      <div className="text-center">
        <Badge
          variant={
            value >= 95
              ? "default"
              : value >= 90
                ? "secondary"
                : value >= 80
                  ? "outline"
                  : "destructive"
          }
          className={
            value >= 95
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
              : value >= 90
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                : value >= 80
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }
        >
          {value.toFixed(1)}%
        </Badge>
      </div>
    ),
  },
];

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("December");
  const [fiscalYearFilter, setFiscalYearFilter] = useState("FY 2024-25");
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced statistics
  const stats = {
    totalEmployees: attendanceData.length,
    averageAttendance: Math.round(
      attendanceData.reduce((sum, e) => sum + e.attendancePercentage, 0) /
        attendanceData.length,
    ),
    totalWorkingDays: attendanceData.reduce(
      (sum, e) => sum + e.totalWorkingDays,
      0,
    ),
    totalPresentDays: attendanceData.reduce((sum, e) => sum + e.daysPresent, 0),
    totalPaidLeaves: attendanceData.reduce(
      (sum, e) => sum + e.approvedPaidLeaves,
      0,
    ),
    totalLOPDays: attendanceData.reduce((sum, e) => sum + e.lopDays, 0),
    totalPayableDays: attendanceData.reduce((sum, e) => sum + e.payableDays, 0),
    perfectAttendance: attendanceData.filter(
      (e) => e.attendancePercentage === 100,
    ).length,
    lowAttendance: attendanceData.filter((e) => e.attendancePercentage < 90)
      .length,
    // Add missing properties for the statistics cards
    totalDays: attendanceData.reduce((sum, e) => sum + e.totalWorkingDays, 0),
    presentDays: attendanceData.reduce((sum, e) => sum + e.daysPresent, 0),
    absentDays: attendanceData.reduce((sum, e) => sum + e.lopDays, 0),
    attendanceRate: Math.round(
      (attendanceData.reduce((sum, e) => sum + e.daysPresent, 0) /
        attendanceData.reduce((sum, e) => sum + e.totalWorkingDays, 0)) *
        100,
    ),
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const handleMonthYearFilter = (month: string, fiscalYear: string) => {
    setMonthFilter(month);
    setFiscalYearFilter(fiscalYear);
  };

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
    setShowViewDialog(true);
  };

  const handleEdit = (employee: any) => {
    // Handle edit logic
    console.log("Edit employee:", employee);
  };

  const handleAdd = () => {
    // Handle add logic
    console.log("Add new attendance record");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const filters: Filter[] = [
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
      key: "month",
      label: "Month",
      type: "select",
      options: [
        { value: "December", label: "December 2024" },
        { value: "November", label: "November 2024" },
        { value: "October", label: "October 2024" },
      ],
    },
  ];

  const filteredData = attendanceData;

  return (
    <div className="space-y-6 animate-fade-in">
      {showBulkUpload ? (
        <BulkUploadAttendance onClose={() => setShowBulkUpload(false)} />
      ) : (
        <>
          {/* Modern Page Header with Forest Gradient */}
          <PageHeader
            title="Attendance Management"
            description="Track and manage employee attendance, leaves, and working hours"
            gradient="forest"
          >
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="transition-all duration-300 hover:scale-105"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkUpload(true)}
                className="transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white transition-all duration-300 hover:scale-105"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </PageHeader>

          {/* Enhanced Statistics Cards */}
          <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Days
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(stats.totalDays)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+{stats.totalDays - 22}</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Present Days
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(stats.presentDays)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">
                    +{stats.presentDays - 20}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Absent Days
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-150">
                  <UserX className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(stats.absentDays)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">+{stats.absentDays - 2}</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Attendance Rate
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all duration-150">
                  <Percent className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.attendanceRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">
                    +{stats.attendanceRate - 90}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Data Table */}
          <Card className="hover:shadow-lg transition-all duration-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Attendance Records - {monthFilter} {fiscalYearFilter}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search attendance records..."
                onAdd={handleAdd}
                onView={handleView}
                onEdit={handleEdit}
                className="backdrop-blur-sm"
              />
            </CardContent>
          </Card>

          {/* Attendance Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Working Days Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Working Days</span>
                    <span className="font-semibold">
                      {formatNumber(stats.totalWorkingDays)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Days Present</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(stats.totalPresentDays)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(stats.totalPresentDays / stats.totalWorkingDays) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Paid Leaves</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(stats.totalPaidLeaves)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(stats.totalPaidLeaves / stats.totalWorkingDays) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Attendance Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Excellent (95%+)</span>
                    <span className="font-semibold text-blue-600">
                      {
                        attendanceData.filter(
                          (e) => e.attendancePercentage >= 95,
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(attendanceData.filter((e) => e.attendancePercentage >= 95).length / stats.totalEmployees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Good (90-94%)</span>
                    <span className="font-semibold text-blue-600">
                      {
                        attendanceData.filter(
                          (e) =>
                            e.attendancePercentage >= 90 &&
                            e.attendancePercentage < 95,
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(attendanceData.filter((e) => e.attendancePercentage >= 90 && e.attendancePercentage < 95).length / stats.totalEmployees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Needs Improvement (&lt;90%)</span>
                    <span className="font-semibold text-orange-600">
                      {
                        attendanceData.filter(
                          (e) => e.attendancePercentage < 90,
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(attendanceData.filter((e) => e.attendancePercentage < 90).length / stats.totalEmployees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology</span>
                    <span className="font-semibold">
                      {Math.round(
                        attendanceData
                          .filter((e) => e.department === "Technology")
                          .reduce((sum, e) => sum + e.attendancePercentage, 0) /
                          attendanceData.filter(
                            (e) => e.department === "Technology",
                          ).length,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${attendanceData.filter((e) => e.department === "Technology").reduce((sum, e) => sum + e.attendancePercentage, 0) / attendanceData.filter((e) => e.department === "Technology").length}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sales</span>
                    <span className="font-semibold">
                      {Math.round(
                        attendanceData
                          .filter((e) => e.department === "Sales")
                          .reduce((sum, e) => sum + e.attendancePercentage, 0) /
                          attendanceData.filter((e) => e.department === "Sales")
                            .length,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${attendanceData.filter((e) => e.department === "Sales").reduce((sum, e) => sum + e.attendancePercentage, 0) / attendanceData.filter((e) => e.department === "Sales").length}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operations</span>
                    <span className="font-semibold">
                      {Math.round(
                        attendanceData
                          .filter((e) => e.department === "Operations")
                          .reduce((sum, e) => sum + e.attendancePercentage, 0) /
                          attendanceData.filter(
                            (e) => e.department === "Operations",
                          ).length,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${attendanceData.filter((e) => e.department === "Operations").reduce((sum, e) => sum + e.attendancePercentage, 0) / attendanceData.filter((e) => e.department === "Operations").length}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View Employee Dialog */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="max-w-2xl backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Attendance Details
                </DialogTitle>
              </DialogHeader>
              {selectedEmployee && (
                <div className="space-y-6">
                  {/* Employee Header */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`/placeholder-avatar-${selectedEmployee.empId}.jpg`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg">
                        {selectedEmployee.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedEmployee.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedEmployee.designation}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEmployee.department} •{" "}
                        {selectedEmployee.businessUnit}
                      </p>
                    </div>
                    <Badge
                      variant={
                        selectedEmployee.attendancePercentage >= 95
                          ? "default"
                          : selectedEmployee.attendancePercentage >= 90
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        selectedEmployee.attendancePercentage >= 95
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : selectedEmployee.attendancePercentage >= 90
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {selectedEmployee.attendancePercentage.toFixed(1)}%
                    </Badge>
                  </div>

                  {/* Attendance Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Working Days</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm">Total Working Days</span>
                          <span className="font-semibold">
                            {selectedEmployee.totalWorkingDays}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            Days Present
                          </span>
                          <span className="font-semibold text-blue-700 dark:text-blue-300">
                            {selectedEmployee.daysPresent}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            Paid Leaves
                          </span>
                          <span className="font-semibold text-blue-700 dark:text-blue-300">
                            {selectedEmployee.approvedPaidLeaves}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                          <span className="text-sm text-red-700 dark:text-red-300">
                            LOP Days
                          </span>
                          <span className="font-semibold text-red-700 dark:text-red-300">
                            {selectedEmployee.lopDays}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Other Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm">Weekly Offs</span>
                          <span className="font-semibold">
                            {selectedEmployee.weeklyOffs}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm">Holidays</span>
                          <span className="font-semibold">
                            {selectedEmployee.holidays}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm">Payable Days</span>
                          <span className="font-semibold">
                            {selectedEmployee.payableDays}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm">Reporting Manager</span>
                          <span className="font-semibold">
                            {selectedEmployee.reportingManager}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Percentage Visualization */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">
                      Attendance Performance
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Attendance Percentage</span>
                        <span className="font-semibold">
                          {selectedEmployee.attendancePercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            selectedEmployee.attendancePercentage >= 95
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : selectedEmployee.attendancePercentage >= 90
                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                : selectedEmployee.attendancePercentage >= 80
                                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                  : "bg-gradient-to-r from-red-500 to-red-600"
                          }`}
                          style={{
                            width: `${selectedEmployee.attendancePercentage}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
