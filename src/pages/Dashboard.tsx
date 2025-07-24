import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building,
  Target,
  Award,
  Clock,
  UserCheck,
  UserX,
  IndianRupee,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  RefreshCw,
  Filter,
  MoreHorizontal,
  Star,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Zap,
  Lightbulb,
  Rocket,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Calculator,
} from "lucide-react";

// Mock dashboard data
const dashboardData = {
  overview: {
    totalEmployees: 1250,
    activeEmployees: 1180,
    totalPayroll: 45000000,
    averageSalary: 360000,
    departments: 8,
    locations: 6,
  },
  payrollStats: {
    currentMonth: {
      totalGross: 45000000,
      totalNet: 31500000,
      totalDeductions: 13500000,
      averagePerEmployee: 360000,
    },
    previousMonth: {
      totalGross: 43500000,
      totalNet: 30450000,
      totalDeductions: 13050000,
      averagePerEmployee: 348000,
    },
  },
  attendanceStats: {
    currentMonth: {
      averageAttendance: 94.5,
      totalPresentDays: 24850,
      totalAbsentDays: 1450,
      overtimeHours: 1250,
    },
    previousMonth: {
      averageAttendance: 92.8,
      totalPresentDays: 24350,
      totalAbsentDays: 1850,
      overtimeHours: 1100,
    },
  },
  departmentStats: [
    {
      name: "Technology",
      employees: 450,
      avgSalary: 420000,
      attendance: 96.2,
      growth: 12.5,
    },
    {
      name: "Sales",
      employees: 280,
      avgSalary: 380000,
      attendance: 91.8,
      growth: 8.3,
    },
    {
      name: "Operations",
      employees: 200,
      avgSalary: 320000,
      attendance: 94.1,
      growth: 15.2,
    },
    {
      name: "HR",
      employees: 80,
      avgSalary: 350000,
      attendance: 95.5,
      growth: 5.7,
    },
    {
      name: "Finance",
      employees: 120,
      avgSalary: 400000,
      attendance: 93.8,
      growth: 9.1,
    },
    {
      name: "Marketing",
      employees: 120,
      avgSalary: 360000,
      attendance: 92.4,
      growth: 11.3,
    },
  ],
  topPerformers: [
    {
      id: "E1001",
      name: "Sarah Wilson",
      designation: "Team Lead",
      department: "Technology",
      performance: 98.5,
      salary: 2200000,
      avatar: "/placeholder-avatar-E1001.jpg",
    },
    {
      id: "E1002",
      name: "Priya Sharma",
      designation: "Senior Developer",
      department: "Technology",
      performance: 96.8,
      salary: 1600000,
      avatar: "/placeholder-avatar-E1002.jpg",
    },
    {
      id: "E1003",
      name: "Michael Chen",
      designation: "Sales Manager",
      department: "Sales",
      performance: 95.2,
      salary: 1800000,
      avatar: "/placeholder-avatar-E1003.jpg",
    },
    {
      id: "E1004",
      name: "Rajesh Kumar",
      designation: "Sales Executive",
      department: "Sales",
      performance: 94.7,
      salary: 800000,
      avatar: "/placeholder-avatar-E1004.jpg",
    },
    {
      id: "E1005",
      name: "Anita Desai",
      designation: "Telecaller",
      department: "Operations",
      performance: 93.9,
      salary: 400000,
      avatar: "/placeholder-avatar-E1005.jpg",
    },
  ],
  recentActivities: [
    {
      id: 1,
      type: "payroll",
      message: "December 2024 payroll processed successfully",
      timestamp: "2024-12-31T10:30:00Z",
      status: "completed",
    },
    {
      id: 2,
      type: "employee",
      message: "New employee John Smith joined Technology team",
      timestamp: "2024-12-30T14:20:00Z",
      status: "completed",
    },
    {
      id: 3,
      type: "attendance",
      message: "Attendance report generated for December 2024",
      timestamp: "2024-12-30T09:15:00Z",
      status: "completed",
    },
    {
      id: 4,
      type: "payroll",
      message: "Salary adjustments processed for 15 employees",
      timestamp: "2024-12-29T16:45:00Z",
      status: "completed",
    },
    {
      id: 5,
      type: "employee",
      message: "Employee profile updated: Sarah Wilson",
      timestamp: "2024-12-29T11:30:00Z",
      status: "completed",
    },
  ],
  kpis: {
    employeeRetention: 94.2,
    averageTenure: 3.8,
    satisfactionScore: 4.2,
    productivityIndex: 87.5,
    costPerEmployee: 420000,
    revenuePerEmployee: 2800000,
  },
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedView, setSelectedView] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "payroll":
        return <DollarSign className="h-4 w-4" />;
      case "employee":
        return <Users className="h-4 w-4" />;
      case "attendance":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Modern Page Header */}
      <PageHeader
        title="Dashboard"
        description="Comprehensive overview of your payroll system and employee analytics"
        gradient="primary"
      >
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="previous">Previous Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </PageHeader>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Payroll
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardData.overview.totalPayroll)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">
                +{dashboardData.overview.totalPayroll - 43500000}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Employees
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
              <UserCheck className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(dashboardData.overview.activeEmployees)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">
                +{dashboardData.overview.activeEmployees - 1150}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Salary
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardData.overview.averageSalary)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">
                +{dashboardData.overview.averageSalary - 348000}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tax Deductions
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
              <Calculator className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                dashboardData.payrollStats.currentMonth.totalDeductions,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">
                +
                {dashboardData.payrollStats.currentMonth.totalDeductions -
                  13050000}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 backdrop-blur-sm">
          <TabsTrigger value="overview" className="transition-all duration-300">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="departments"
            className="transition-all duration-300"
          >
            Departments
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="transition-all duration-300"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="transition-all duration-300"
          >
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payroll Statistics */}
            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Payroll Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Gross Pay</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        dashboardData.payrollStats.currentMonth.totalGross,
                      )}
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-blue-600">+3.4%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Net Pay</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        dashboardData.payrollStats.currentMonth.totalNet,
                      )}
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-blue-600">+3.4%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Deductions</span>
                    <span>
                      {formatCurrency(
                        dashboardData.payrollStats.currentMonth.totalDeductions,
                      )}
                    </span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Attendance Statistics */}
            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Attendance Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Attendance</span>
                    <span>
                      {
                        dashboardData.attendanceStats.currentMonth
                          .averageAttendance
                      }
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      dashboardData.attendanceStats.currentMonth
                        .averageAttendance
                    }
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Present Days</p>
                    <p className="font-semibold">
                      {formatNumber(
                        dashboardData.attendanceStats.currentMonth
                          .totalPresentDays,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Overtime Hours</p>
                    <p className="font-semibold">
                      {formatNumber(
                        dashboardData.attendanceStats.currentMonth
                          .overtimeHours,
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.departmentStats.map((dept, index) => (
              <Card
                key={dept.name}
                className="hover:shadow-lg transition-all duration-150"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{dept.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {dept.employees} employees
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Avg Salary</p>
                      <p className="font-semibold">
                        {formatCurrency(dept.avgSalary)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Attendance</p>
                      <p className="font-semibold">{dept.attendance}%</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-blue-600">
                      +{dept.growth}% growth
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="hover:shadow-lg transition-all duration-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.topPerformers.map((performer, index) => (
                  <div
                    key={performer.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={performer.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                            {performer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {performer.designation} • {performer.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{performer.performance}%</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(performer.salary)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="hover:shadow-lg transition-all duration-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getStatusIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={getStatusBadgeClass(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
