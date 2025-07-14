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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Eye,
  Edit,
  Trash2,
  Download,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Award,
  Target,
  Zap,
  Monitor,
  Upload,
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
      special: 425000,
    },
  },
  {
    id: "T1002",
    empId: "T1002",
    name: "Anita Desai",
    designation: "Telecaller",
    department: "Operations",
    location: "Pune",
    businessUnit: "Telecom",
    employmentType: "Full-time",
    status: "Active",
    joiningDate: "2024-05-10",
    salary: 400000,
    email: "anita.desai@company.com",
    phone: "+91 9876543215",
    reportingManager: "Rajesh Kumar",
    officeLocation: "Hinjewadi",
    experienceYears: 1,
    skills: ["Communication", "Customer Service", "CRM"],
    ctcBreakdown: {
      basic: 200000,
      hra: 80000,
      medical: 25000,
      conveyance: 15000,
      special: 80000,
    },
  },
  {
    id: "E1005",
    empId: "E1005",
    name: "Ravi Patel",
    designation: "QA Engineer",
    department: "Technology",
    location: "Bangalore",
    businessUnit: "JNET",
    employmentType: "Contract",
    status: "Active",
    joiningDate: "2024-11-15",
    salary: 900000,
    email: "ravi.patel@company.com",
    phone: "+91 9876543216",
    reportingManager: "Sarah Wilson",
    officeLocation: "Koramangala",
    experienceYears: 2,
    skills: ["Testing", "Automation", "Selenium"],
    ctcBreakdown: {
      basic: 450000,
      hra: 180000,
      medical: 45000,
      conveyance: 30000,
      special: 195000,
    },
  },
];

const columns: Column[] = [
  {
    key: "empId",
    label: "Emp ID",
    className: "font-mono text-xs",
    sticky: true,
  },
  {
    key: "name",
    label: "Employee",
    sticky: true,
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarImage src={`/placeholder-avatar-${row.empId}.jpg`} />
          <AvatarFallback className="text-xs">
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="font-medium text-sm truncate">{value}</div>
          <div className="text-xs text-slate-500 truncate">
            {row.designation}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (value) => (
      <div className="flex items-center gap-1">
        <Building className="h-3 w-3 text-slate-400" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "location",
    label: "Location",
    hiddenOnMobile: true,
    render: (value) => (
      <div className="flex items-center gap-1">
        <MapPin className="h-3 w-3 text-slate-400" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "businessUnit",
    label: "Business Unit",
    render: (value) => (
      <div className="flex items-center gap-1">
        {value === "JNET" ? (
          <Monitor className="h-3 w-3 text-blue-600" />
        ) : (
          <Phone className="h-3 w-3 text-green-600" />
        )}
        <span className="text-sm font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "employmentType",
    label: "Type",
    hiddenOnMobile: true,
    render: (value) => (
      <div className="flex items-center gap-1">
        {value === "Full-time" ? (
          <UserCheck className="h-3 w-3 text-green-600" />
        ) : value === "Contract" ? (
          <Clock className="h-3 w-3 text-orange-600" />
        ) : (
          <UserX className="h-3 w-3 text-red-600" />
        )}
        <span className="text-sm font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`status-tag flex items-center gap-1 ${
          value === "Active" ? "status-active" : "status-inactive"
        }`}
      >
        {value === "Active" ? (
          <CheckCircle className="h-3 w-3" />
        ) : (
          <XCircle className="h-3 w-3" />
        )}
        {value}
      </span>
    ),
  },
  {
    key: "joiningDate",
    label: "Joining Date",
    hiddenOnMobile: true,
    render: (value) => (
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3 text-slate-400" />
        <span className="text-xs">{new Date(value).toLocaleDateString()}</span>
      </div>
    ),
  },
  {
    key: "salary",
    label: "CTC",
    className: "text-right",
    render: (value) => (
      <div className="flex items-center justify-end gap-1">
        <IndianRupee className="h-3 w-3 text-green-600" />
        <span className="font-medium text-sm">
          ₹{(value / 100000).toFixed(1)}L
        </span>
      </div>
    ),
  },
];

const filters: Filter[] = [
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
    key: "location",
    label: "Location",
    type: "select",
    options: [
      { value: "Mumbai", label: "Mumbai" },
      { value: "Delhi", label: "Delhi" },
      { value: "Bangalore", label: "Bangalore" },
      { value: "Chennai", label: "Chennai" },
      { value: "Pune", label: "Pune" },
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

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Employee Creation Form State
  const [formData, setFormData] = useState({
    // Business Unit
    businessUnit: "",

    // Personal Information
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

    // Employment Information
    offerType: "",
    employmentType: "",
    designation: "",
    department: "",
    reportingManager: "",
    dateOfJoining: "",

    // Telecom specific fields
    category: "",
    circle: "",
    costingCircle: "",
    baseLocation: "",

    // JNET specific fields
    location: "",

    // Bank & Identity Details
    panCard: "",
    aadharCard: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",

    // Statutory Details
    previousCompanyESICNumber: "",
    previousCompanyEPFUANNumber: "",
    pfRuleType: "",
    eligibleForEPS: false,

    // Salary Setup
    annualGross: 0,
    variablePay: 0,
    salaryStructure: "",
    basic: 0,
    hra: 0,
    otherAllowance: 0,
  });

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: any) => {
    console.log("Edit employee:", employee);
  };

  const handleDelete = (employee: any) => {
    console.log("Delete employee:", employee);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-calculate salary components when gross changes
    if (field === "annualGross" && typeof value === "number") {
      const gross = value;
      const basic = gross * 0.5; // 50% basic
      const hra = formData.businessUnit === "JNET" ? basic * 0.4 : 0; // 40% of basic for JNET
      const otherAllowance =
        formData.businessUnit === "JNET" ? gross - basic - hra : gross - basic; // For Telecom: Gross - Wage Rate

      setFormData((prev) => ({
        ...prev,
        basic,
        hra,
        otherAllowance,
      }));
    }
  };

  const handleSubmitEmployee = () => {
    console.log("Employee Creation Data:", formData);
    // Handle form submission
    setIsAddDialogOpen(false);
    // Reset form
    setFormData({
      businessUnit: "",
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
    });
    setActiveTab("personal");
  };

  const handleCancelEmployee = () => {
    setIsAddDialogOpen(false);
    // Reset form
    setFormData({
      businessUnit: "",
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
    });
    setActiveTab("personal");
  };

  const handleBulkAction = (action: string, employees: any[]) => {
    console.log(`Bulk ${action} on ${employees.length} employees`);
  };

  // If bulk upload is open, show the bulk upload screen
  if (isBulkUploadOpen) {
    return <BulkUploadEmployees onClose={() => setIsBulkUploadOpen(false)} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Management"
        description="Manage employee information, profiles, and organizational structure"
        icon={<Users className="h-6 w-6 text-blue-600" />}
      >
        <Button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2"
          onClick={() => setIsBulkUploadOpen(true)}
        >
          <Upload className="h-4 w-4" />
          Upload Employees
        </Button>
      </PageHeader>
      <div className="px-6 space-y-6">
        {/* Enhanced Data Table */}
        <DataTable
          data={mockEmployees}
          columns={columns}
          filters={filters}
          searchPlaceholder="Smart search: 'Tech Mumbai', 'Active Employees', 'High CTC'"
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Add Employee"
          showBulkActions={true}
          onBulkAction={handleBulkAction}
          enableMobileCards={true}
          className="bg-white rounded-lg border"
        />
      </div>

      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
        >
          <DialogContent className="w-full max-w-xl h-auto max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder-avatar-${selectedEmployee.empId}.jpg`}
                  />
                  <AvatarFallback>
                    {selectedEmployee.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{selectedEmployee.name}</div>
                  <div className="text-sm text-slate-600">
                    {selectedEmployee.designation}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="salary">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Salary
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Employment Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-slate-600">Employee ID</Label>
                          <p className="font-mono">{selectedEmployee.empId}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Department</Label>
                          <p>{selectedEmployee.department}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">
                            Business Unit
                          </Label>
                          <p>{selectedEmployee.businessUnit}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">
                            Employment Type
                          </Label>
                          <p>{selectedEmployee.employmentType}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">
                            Reporting Manager
                          </Label>
                          <p>{selectedEmployee.reportingManager}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Experience</Label>
                          <p>{selectedEmployee.experienceYears} years</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-3 text-sm">
                        <div>
                          <Label className="text-slate-600">City</Label>
                          <p>{selectedEmployee.location}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">
                            Office Location
                          </Label>
                          <p>{selectedEmployee.officeLocation}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Joining Date</Label>
                          <p>
                            {new Date(
                              selectedEmployee.joiningDate,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Status</Label>
                          <span
                            className={`status-tag ${
                              selectedEmployee.status === "Active"
                                ? "status-active"
                                : "status-inactive"
                            }`}
                          >
                            {selectedEmployee.status === "Active" ? "✅" : "❌"}{" "}
                            {selectedEmployee.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills?.map(
                        (skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="salary" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        CTC Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Total CTC</span>
                          <span className="text-xl font-bold text-green-600">
                            ₹{(selectedEmployee.salary / 100000).toFixed(1)}L
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Basic Salary</span>
                            <span>
                              ₹
                              {(
                                selectedEmployee.ctcBreakdown.basic / 100000
                              ).toFixed(1)}
                              L
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>HRA</span>
                            <span>
                              ₹
                              {(
                                selectedEmployee.ctcBreakdown.hra / 100000
                              ).toFixed(1)}
                              L
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Medical Allowance</span>
                            <span>
                              ₹
                              {(
                                selectedEmployee.ctcBreakdown.medical / 1000
                              ).toFixed(0)}
                              K
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conveyance</span>
                            <span>
                              ₹
                              {(
                                selectedEmployee.ctcBreakdown.conveyance / 1000
                              ).toFixed(0)}
                              K
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Special Allowance</span>
                            <span>
                              ₹
                              {(
                                selectedEmployee.ctcBreakdown.special / 100000
                              ).toFixed(1)}
                              L
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <div>
                          <Label className="text-slate-600">Email</Label>
                          <p>{selectedEmployee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <div>
                          <Label className="text-slate-600">Phone</Label>
                          <p>{selectedEmployee.phone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                      <p>No documents uploaded yet</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Employee Dialog */}
      <AddEmployeeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        formData={formData}
        activeTab={activeTab}
        onActiveTabChange={setActiveTab}
        onInputChange={handleInputChange}
        onSubmit={handleSubmitEmployee}
        onCancel={handleCancelEmployee}
      />
    </div>
  );
}
