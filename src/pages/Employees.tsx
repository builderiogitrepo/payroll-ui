import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { BulkUploadEmployees } from "@/components/employees/BulkUploadEmployees";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  FileText,
  Plus,
  UserCheck,
  UserX,
  Clock,
  Star,
  User,
  CreditCard,
  DollarSign,
  Info,
  Save,
  X,
  Briefcase,
  TrendingUp,
  Award,
  Target,
  Zap,
  Monitor,
  Upload,
  Filter as FilterIcon,
  RefreshCw,
} from "lucide-react";

// Mock data for employees with enhanced fields
const mockEmployees = [
  {
    id: "E1001",
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    location: "Mumbai",
    businessUnit: "JNET",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2023-01-15",
    salary: 1200000,
    email: "john.smith@company.com",
    phone: "+91 9876543210",
    reportingManager: "Sarah Wilson",
    officeLocation: "Andheri East",
    experienceYears: 3,
    skills: ["React", "Node.js", "MongoDB"],
    ctcBreakdown: {
      basic: 600000,
      hra: 240000,
      medical: 50000,
      conveyance: 30000,
      special: 280000,
    },
  },
  {
    id: "E1002",
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    location: "Bangalore",
    businessUnit: "JNET",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2022-03-10",
    salary: 1600000,
    email: "priya.sharma@company.com",
    phone: "+91 9876543211",
    reportingManager: "Sarah Wilson",
    officeLocation: "Koramangala",
    experienceYears: 5,
    skills: ["Python", "Django", "AWS"],
    ctcBreakdown: {
      basic: 800000,
      hra: 320000,
      medical: 60000,
      conveyance: 40000,
      special: 380000,
    },
  },
  {
    id: "T1001",
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    location: "Delhi",
    businessUnit: "Telecom",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2023-06-01",
    salary: 800000,
    email: "rajesh.kumar@company.com",
    phone: "+91 9876543212",
    reportingManager: "Michael Chen",
    officeLocation: "Connaught Place",
    experienceYears: 2,
    skills: ["Sales", "Customer Relations", "CRM"],
    ctcBreakdown: {
      basic: 400000,
      hra: 160000,
      medical: 40000,
      conveyance: 25000,
      special: 175000,
    },
  },
  {
    id: "E1003",
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    location: "Mumbai",
    businessUnit: "JNET",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2021-01-20",
    salary: 2200000,
    email: "sarah.wilson@company.com",
    phone: "+91 9876543213",
    reportingManager: "David Brown",
    officeLocation: "Andheri East",
    experienceYears: 8,
    skills: ["Leadership", "React", "Architecture"],
    ctcBreakdown: {
      basic: 1100000,
      hra: 440000,
      medical: 80000,
      conveyance: 50000,
      special: 530000,
    },
  },
  {
    id: "E1004",
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    location: "Chennai",
    businessUnit: "Telecom",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2020-09-15",
    salary: 1800000,
    email: "michael.chen@company.com",
    phone: "+91 9876543214",
    reportingManager: "David Brown",
    officeLocation: "T. Nagar",
    experienceYears: 6,
    skills: ["Sales Management", "Team Leadership", "Strategy"],
    ctcBreakdown: {
      basic: 900000,
      hra: 360000,
      medical: 70000,
      conveyance: 45000,
      special: 445000,
    },
  },
  {
    id: "E1005",
    empId: "E1005",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    location: "Mumbai",
    businessUnit: "Telecom",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2023-08-01",
    salary: 400000,
    email: "anita.desai@company.com",
    phone: "+91 9876543215",
    reportingManager: "Priya Patel",
    officeLocation: "Andheri West",
    experienceYears: 1,
    skills: ["Communication", "Customer Service", "CRM"],
    ctcBreakdown: {
      basic: 200000,
      hra: 80000,
      medical: 30000,
      conveyance: 20000,
      special: 70000,
    },
  },
  {
    id: "E1006",
    empId: "E1006",
    name: "David Brown",
    designation: "Senior Manager",
    department: "Technology",
    location: "Bangalore",
    businessUnit: "JNET",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2019-05-10",
    salary: 3000000,
    email: "david.brown@company.com",
    phone: "+91 9876543216",
    reportingManager: "CEO",
    officeLocation: "Koramangala",
    experienceYears: 12,
    skills: ["Leadership", "Strategy", "Architecture"],
    ctcBreakdown: {
      basic: 1500000,
      hra: 600000,
      medical: 100000,
      conveyance: 60000,
      special: 740000,
    },
  },
  {
    id: "E1007",
    empId: "E1007",
    name: "Priya Patel",
    designation: "Operations Manager",
    department: "Operations",
    location: "Mumbai",
    businessUnit: "Telecom",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2021-11-01",
    salary: 1500000,
    email: "priya.patel@company.com",
    phone: "+91 9876543217",
    reportingManager: "David Brown",
    officeLocation: "Andheri West",
    experienceYears: 7,
    skills: ["Operations", "Team Management", "Process Improvement"],
    ctcBreakdown: {
      basic: 750000,
      hra: 300000,
      medical: 60000,
      conveyance: 40000,
      special: 355000,
    },
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Enhanced statistics
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "Active").length,
    technology: employees.filter((e) => e.department === "Technology").length,
    sales: employees.filter((e) => e.department === "Sales").length,
    operations: employees.filter((e) => e.department === "Operations").length,
    averageSalary: Math.round(
      employees.reduce((sum, e) => sum + e.salary, 0) / employees.length,
    ),
    totalSalary: employees.reduce((sum, e) => sum + e.salary, 0),
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

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
    setShowViewDialog(true);
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEditDialog(true);
  };

  const handleDelete = (employee: any) => {
    setEmployees(employees.filter((e) => e.id !== employee.id));
  };

  const handleAdd = () => {
    setShowAddDialog(true);
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    if (selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        [field]: value,
      });
    }
  };

  const handleSubmitEmployee = () => {
    if (selectedEmployee) {
      if (showEditDialog) {
        setEmployees(
          employees.map((e) =>
            e.id === selectedEmployee.id ? selectedEmployee : e,
          ),
        );
      } else {
        const newEmployee = {
          ...selectedEmployee,
          id: `E${Date.now()}`,
          empId: `E${Date.now()}`,
        };
        setEmployees([...employees, newEmployee]);
      }
    }
    setShowAddDialog(false);
    setShowEditDialog(false);
    setSelectedEmployee(null);
  };

  const handleCancelEmployee = () => {
    setShowAddDialog(false);
    setShowEditDialog(false);
    setSelectedEmployee(null);
  };

  const handleBulkAction = (action: string, selectedItems: any[]) => {
    switch (action) {
      case "delete":
        setEmployees(employees.filter((e) => !selectedItems.includes(e.id)));
        break;
      case "export":
        // Handle export logic
        console.log("Exporting employees:", selectedItems);
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const columns: Column[] = [
    {
      key: "employee",
      label: "Employee",
      render: (value, employee: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/avatars/${employee.empId}.jpg`} />
            <AvatarFallback className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              {employee.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">
              {employee.empId}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "designation",
      label: "Designation",
      render: (value, employee: any) => (
        <div>
          <div className="font-medium">{employee.designation}</div>
          <div className="text-sm text-muted-foreground">
            {employee.department}
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (value, employee: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{employee.location}</span>
        </div>
      ),
    },
    {
      key: "salary",
      label: "Salary",
      render: (value, employee: any) => (
        <div className="font-medium">{formatCurrency(employee.salary)}</div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value, employee: any) => (
        <Badge
          variant={employee.status === "Active" ? "default" : "secondary"}
          className={
            employee.status === "Active"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
          }
        >
          {employee.status}
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
    {
      key: "location",
      label: "Location",
      type: "select",
      options: [
        { value: "Mumbai", label: "Mumbai" },
        { value: "Bangalore", label: "Bangalore" },
        { value: "Delhi", label: "Delhi" },
        { value: "Chennai", label: "Chennai" },
      ],
    },
  ];

  const filteredEmployees = employees;

  return (
    <div className="space-y-6 animate-fade-in">
      {showBulkUpload ? (
        <BulkUploadEmployees onClose={() => setShowBulkUpload(false)} />
      ) : (
        <>
          {/* Modern Page Header with Ocean Gradient */}
          <PageHeader
            title="Employee Management"
            description="Comprehensive employee information and management system"
            gradient="ocean"
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
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </PageHeader>

          {/* Enhanced Statistics Cards */}
          <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-150">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(stats.total)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+{stats.total - 1200}</span>{" "}
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
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+{stats.active - 1150}</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Salary
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all duration-150">
                  <IndianRupee className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(stats.averageSalary)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+3.4%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-150">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Payroll
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-600/10 group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all duration-150">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(stats.totalSalary)}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">+3.4%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
          {/* Enhanced Data Table */}
          <Card className="hover:shadow-lg transition-all duration-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Employee List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredEmployees}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search employees..."
                onAdd={handleAdd}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBulkAction={handleBulkAction}
                showBulkActions={true}
                className="backdrop-blur-sm"
              />
            </CardContent>
          </Card>
          {/* Department Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Department Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology</span>
                    <span className="font-semibold">{stats.technology}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(stats.technology / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sales</span>
                    <span className="font-semibold">{stats.sales}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.sales / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operations</span>
                    <span className="font-semibold">{stats.operations}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(stats.operations / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-150">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mumbai</span>
                    <span className="font-semibold">
                      {employees.filter((e) => e.location === "Mumbai").length}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => e.location === "Mumbai").length / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bangalore</span>
                    <span className="font-semibold">
                      {
                        employees.filter((e) => e.location === "Bangalore")
                          .length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => e.location === "Bangalore").length / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other Cities</span>
                    <span className="font-semibold">
                      {
                        employees.filter(
                          (e) => !["Mumbai", "Bangalore"].includes(e.location),
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => !["Mumbai", "Bangalore"].includes(e.location)).length / stats.total) * 100}%`,
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
                  Salary Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High (15L+)</span>
                    <span className="font-semibold">
                      {employees.filter((e) => e.salary > 1500000).length}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => e.salary > 1500000).length / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mid (8-15L)</span>
                    <span className="font-semibold">
                      {
                        employees.filter(
                          (e) => e.salary >= 800000 && e.salary <= 1500000,
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => e.salary >= 800000 && e.salary <= 1500000).length / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Entry (&lt;8L)</span>
                    <span className="font-semibold">
                      {employees.filter((e) => e.salary < 800000).length}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(employees.filter((e) => e.salary < 800000).length / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Dialogs */}
          <AddEmployeeDialog
            open={showAddDialog}
            onOpenChange={setShowAddDialog}
            formData={
              selectedEmployee || {
                businessUnit: "",
                empId: "",
                name: "",
                dateOfBirth: "",
                gender: "",
                maritalStatus: "",
                bloodGroup: "",
                fathersName: "",
                educationQualification: "",
                contactNumber: "",
                personalEmail: "",
                workEmail: "",
                offerType: "",
                employmentType: "",
                designation: "",
                department: "",
                reportingManager: "",
                dateOfJoining: "",
                category: "",
                circle: "",
                costingCircle: "",
                baseLocation: "",
                location: "",
                panCard: "",
                aadharCard: "",
                bankAccountNumber: "",
                bankName: "",
                ifscCode: "",
                previousCompanyESICNumber: "",
                previousCompanyEPFUANNumber: "",
                pfRuleType: "",
                eligibleForEPS: false,
                annualGross: 0,
                variablePay: 0,
                salaryStructure: "",
                basic: 0,
                hra: 0,
                otherAllowance: 0,
              }
            }
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitEmployee}
            onCancel={handleCancelEmployee}
          />

          {/* View Employee Dialog */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="max-w-2xl backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Employee Details
                </DialogTitle>
              </DialogHeader>
              {selectedEmployee && (
                <div className="space-y-6">
                  {/* Employee Header */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`/avatars/${selectedEmployee.empId}.jpg`}
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
                        {selectedEmployee.location}
                      </p>
                    </div>
                    <Badge
                      variant={
                        selectedEmployee.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        selectedEmployee.status === "Active"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }
                    >
                      {selectedEmployee.status}
                    </Badge>
                  </div>

                  {/* Employee Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">
                        Personal Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedEmployee.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedEmployee.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedEmployee.officeLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Joined:{" "}
                            {new Date(
                              selectedEmployee.joiningDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">
                        Professional Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedEmployee.employmentType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Manager: {selectedEmployee.reportingManager}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedEmployee.experienceYears} years experience
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formatCurrency(selectedEmployee.salary)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map(
                        (skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  {/* CTC Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">CTC Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground">
                          Basic
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(selectedEmployee.ctcBreakdown.basic)}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground">HRA</div>
                        <div className="font-semibold">
                          {formatCurrency(selectedEmployee.ctcBreakdown.hra)}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground">
                          Medical
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(
                            selectedEmployee.ctcBreakdown.medical,
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground">
                          Conveyance
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(
                            selectedEmployee.ctcBreakdown.conveyance,
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground">
                          Special
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(
                            selectedEmployee.ctcBreakdown.special,
                          )}
                        </div>
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
