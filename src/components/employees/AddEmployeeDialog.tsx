import React from "react";
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

interface FormData {
  // Business Unit
  businessUnit: string;

  // Personal Information
  empId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  fathersName: string;
  educationQualification: string;
  contactNumber: string;
  personalEmail: string;
  workEmail: string;

  // Employment Information
  offerType: string;
  employmentType: string;
  designation: string;
  department: string;
  reportingManager: string;
  dateOfJoining: string;

  // Telecom specific fields
  category: string;
  circle: string;
  costingCircle: string;
  baseLocation: string;

  // JNET specific fields
  location: string;

  // Bank & Identity Details
  panCard: string;
  aadharCard: string;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;

  // Statutory Details
  previousCompanyESICNumber: string;
  previousCompanyEPFUANNumber: string;
  pfRuleType: string;
  eligibleForEPS: boolean;

  // Salary Setup
  annualGross: number;
  variablePay: number;
  salaryStructure: string;
  basic: number;
  hra: number;
  otherAllowance: number;
}

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: FormData;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onInputChange: (field: string, value: string | number | boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

// Helper for Indian currency formatting
function formatINR(num) {
  if (isNaN(num)) return "";
  return num.toLocaleString("en-IN");
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
  formData,
  activeTab,
  onActiveTabChange,
  onInputChange,
  onSubmit,
  onCancel,
}: AddEmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-none h-[98vh] max-h-[98vh] flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 border-b border-slate-200 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-6 w-6 text-blue-600" />
            Create New Employee
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <TooltipProvider delayDuration={0}>
            <Tabs
              value={activeTab}
              onValueChange={onActiveTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="employment"
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Employment
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Bank & ID
                </TabsTrigger>
                <TabsTrigger
                  value="statutory"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Statutory
                </TabsTrigger>
                <TabsTrigger value="salary" className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Salary
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4">
                {/* Business Unit Selection */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="empId">Employee ID *</Label>
                    <Input
                      id="empId"
                      value={formData.empId}
                      onChange={(e) => onInputChange("empId", e.target.value)}
                      placeholder="Enter employee ID (e.g., E1001, T1001)"
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessUnit">Business Unit *</Label>
                    <Select
                      value={formData.businessUnit}
                      onValueChange={(value) =>
                        onInputChange("businessUnit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Telecom">Telecom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => onInputChange("name", e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        onInputChange("dateOfBirth", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => onInputChange("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) =>
                        onInputChange("maritalStatus", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(value) =>
                        onInputChange("bloodGroup", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fathersName">Father's Name</Label>
                    <Input
                      id="fathersName"
                      value={formData.fathersName}
                      onChange={(e) =>
                        onInputChange("fathersName", e.target.value)
                      }
                      placeholder="Enter father's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationQualification">
                      Education Qualification
                    </Label>
                    <Input
                      id="educationQualification"
                      value={formData.educationQualification}
                      onChange={(e) =>
                        onInputChange("educationQualification", e.target.value)
                      }
                      placeholder="Enter education qualification"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        onInputChange("contactNumber", e.target.value)
                      }
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalEmail">Personal Email *</Label>
                    <Input
                      id="personalEmail"
                      type="email"
                      value={formData.personalEmail}
                      onChange={(e) =>
                        onInputChange("personalEmail", e.target.value)
                      }
                      placeholder="Enter personal email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workEmail">
                      {formData.businessUnit === "JNET"
                        ? "Email JNET *"
                        : "Work Email *"}
                    </Label>
                    <Input
                      id="workEmail"
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) =>
                        onInputChange("workEmail", e.target.value)
                      }
                      placeholder={
                        formData.businessUnit === "JNET"
                          ? "Enter JNET email"
                          : "Enter work email"
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Employment Information Tab */}
              <TabsContent value="employment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="offerType">Offer Type *</Label>
                    <Select
                      value={formData.offerType}
                      onValueChange={(value) =>
                        onInputChange("offerType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select offer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="intern">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type *</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) =>
                        onInputChange("employmentType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                        <SelectItem value="probation">Probation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Select
                      value={formData.designation}
                      onValueChange={(value) =>
                        onInputChange("designation", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">
                          Software Engineer
                        </SelectItem>
                        <SelectItem value="senior-software-engineer">
                          Senior Software Engineer
                        </SelectItem>
                        <SelectItem value="tech-lead">Tech Lead</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="sales-executive">
                          Sales Executive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        onInputChange("department", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportingManager">
                      Reporting Manager *
                    </Label>
                    <Select
                      value={formData.reportingManager}
                      onValueChange={(value) =>
                        onInputChange("reportingManager", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporting manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        <SelectItem value="mike-johnson">
                          Mike Johnson
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfJoining">Date of Joining *</Label>
                    <Input
                      id="dateOfJoining"
                      type="date"
                      value={formData.dateOfJoining}
                      onChange={(e) =>
                        onInputChange("dateOfJoining", e.target.value)
                      }
                    />
                  </div>

                  {/* Conditional fields based on Business Unit */}
                  {formData.businessUnit === "Telecom" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            onInputChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="field-executive">
                              Field Executive
                            </SelectItem>
                            <SelectItem value="sales-executive">
                              Sales Executive
                            </SelectItem>
                            <SelectItem value="supervisor">
                              Supervisor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="circle">Circle *</Label>
                        <Select
                          value={formData.circle}
                          onValueChange={(value) =>
                            onInputChange("circle", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select circle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="chennai">Chennai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="costingCircle">Costing Circle *</Label>
                        <Select
                          value={formData.costingCircle}
                          onValueChange={(value) =>
                            onInputChange("costingCircle", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select costing circle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="west">West</SelectItem>
                            <SelectItem value="north">North</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="east">East</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="baseLocation">Base Location *</Label>
                        <Input
                          id="baseLocation"
                          value={formData.baseLocation}
                          onChange={(e) =>
                            onInputChange("baseLocation", e.target.value)
                          }
                          placeholder="Enter base location"
                        />
                      </div>
                    </>
                  )}

                  {formData.businessUnit === "JNET" && (
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          onInputChange("location", e.target.value)
                        }
                        placeholder="Enter location"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Bank & Identity Details Tab */}
              <TabsContent value="bank" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panCard">PAN Card *</Label>
                    <Input
                      id="panCard"
                      value={formData.panCard}
                      onChange={(e) => onInputChange("panCard", e.target.value)}
                      placeholder="Enter PAN number"
                      className="uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharCard">Aadhar Card *</Label>
                    <Input
                      id="aadharCard"
                      value={formData.aadharCard}
                      onChange={(e) =>
                        onInputChange("aadharCard", e.target.value)
                      }
                      placeholder="Enter Aadhar number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNumber">
                      Bank Account Number *
                    </Label>
                    <Input
                      id="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={(e) =>
                        onInputChange("bankAccountNumber", e.target.value)
                      }
                      placeholder="Enter bank account number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Select
                      value={formData.bankName}
                      onValueChange={(value) =>
                        onInputChange("bankName", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="pnb">
                          Punjab National Bank
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code *</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) =>
                        onInputChange("ifscCode", e.target.value)
                      }
                      placeholder="Enter IFSC code"
                      className="uppercase"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Statutory Details Tab */}
              <TabsContent value="statutory" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousCompanyESICNumber">
                      Previous Company ESIC Number
                    </Label>
                    <Input
                      id="previousCompanyESICNumber"
                      value={formData.previousCompanyESICNumber}
                      onChange={(e) =>
                        onInputChange(
                          "previousCompanyESICNumber",
                          e.target.value,
                        )
                      }
                      placeholder="Enter previous ESIC number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousCompanyEPFUANNumber">
                      Previous Company EPF UAN Number
                    </Label>
                    <Input
                      id="previousCompanyEPFUANNumber"
                      value={formData.previousCompanyEPFUANNumber}
                      onChange={(e) =>
                        onInputChange(
                          "previousCompanyEPFUANNumber",
                          e.target.value,
                        )
                      }
                      placeholder="Enter previous EPF UAN"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="pfRuleType">PF Rule Type *</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Select the PF calculation rule for this employee
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={formData.pfRuleType}
                      onValueChange={(value) =>
                        onInputChange("pfRuleType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select PF rule type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="with-minimum-wage">
                          With Minimum Wage Rule
                        </SelectItem>
                        <SelectItem value="without-minimum-wage">
                          Without Minimum Wage Rule
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="eligibleForEPS"
                      checked={formData.eligibleForEPS}
                      onCheckedChange={(checked) =>
                        onInputChange("eligibleForEPS", !!checked)
                      }
                    />
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="eligibleForEPS"
                        className="text-sm font-normal"
                      >
                        Eligible for EPS?
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Employee Pension Scheme eligibility</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Salary Setup Tab */}
              <TabsContent value="salary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualGross">Annual Gross (₹) *</Label>
                    <Input
                      id="annualGross"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={
                        formData.annualGross
                          ? formatINR(formData.annualGross)
                          : ""
                      }
                      onChange={(e) => {
                        // Remove non-digits, parse as number
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        onInputChange(
                          "annualGross",
                          raw ? parseInt(raw, 10) : 0,
                        );
                      }}
                      placeholder="Enter annual gross salary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variablePay">Variable Pay (%) *</Label>
                    <Input
                      id="variablePay"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9.]*"
                      value={
                        formData.variablePay !== undefined &&
                        formData.variablePay !== null
                          ? formData.variablePay
                          : ""
                      }
                      onChange={(e) => {
                        // Allow only numbers and dot
                        const raw = e.target.value.replace(/[^0-9.]/g, "");
                        onInputChange("variablePay", raw ? parseFloat(raw) : 0);
                      }}
                      placeholder="Enter variable pay percentage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryStructure">Salary Structure</Label>
                    <Input
                      id="salaryStructure"
                      value={`Auto-generated based on ${formData.businessUnit} ${formData.offerType}`}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  {formData.businessUnit === "JNET" && (
                    <div className="space-y-2">
                      <Label htmlFor="hra">HRA (₹)</Label>
                      <Input
                        id="hra"
                        type="number"
                        value={formData.hra}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  )}
                </div>

                {/* Salary Structure Breakdown Card */}
                {(() => {
                  // Local state for edit mode (not needed since all values are derived)
                  const gross = formData.annualGross || 0;
                  const basic = Math.round(gross * 0.5);
                  const hra = Math.round(basic * 0.4);
                  const medical = Math.round(basic * 0.2);
                  const conveyance = Math.round(basic * 0.2);
                  const special = Math.round(basic * 0.1);
                  const other = Math.round(basic * 0.1);
                  const total =
                    basic + hra + medical + conveyance + special + other;

                  // Helper for tooltips
                  const InfoTip = ({ text }) => (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 align-middle cursor-pointer text-blue-500">
                            <Info className="inline h-4 w-4" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{text}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );

                  return (
                    <Card className="bg-white shadow-lg rounded-2xl border border-slate-200 p-0">
                      <CardHeader className="pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                          <IndianRupee className="h-5 w-5 text-green-600" />
                          <span>Salary Structure Breakdown</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span>
                                  Basic Pay
                                  <InfoTip text="50% of Annual Gross" />
                                </span>
                                <span className="font-bold text-lg text-slate-900">
                                  ₹{basic.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>
                                  HRA
                                  <InfoTip text="40% of Basic" />
                                </span>
                                <span className="font-bold text-slate-900">
                                  ₹{hra.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>
                                  Medical Allowance
                                  <InfoTip text="20% of Basic" />
                                </span>
                                <span className="font-bold text-slate-900">
                                  ₹{medical.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span>
                                  Conveyance Allowance
                                  <InfoTip text="20% of Basic" />
                                </span>
                                <span className="font-bold text-slate-900">
                                  ₹{conveyance.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>
                                  Special Allowance
                                  <InfoTip text="10% of Basic" />
                                </span>
                                <span className="font-bold text-slate-900">
                                  ₹{special.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>
                                  Other Allowance
                                  <InfoTip text="10% of Basic" />
                                </span>
                                <span className="font-bold text-slate-900">
                                  ₹{other.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <hr className="my-4 border-slate-200" />
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-lg font-semibold">
                            <span className="flex items-center gap-2 text-slate-700">
                              <IndianRupee className="h-5 w-5 text-green-600" />
                              Total Annual Gross
                            </span>
                            <span className="text-green-600 text-2xl font-bold">
                              ₹{total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <div className="text-blue-700 text-sm">
                      <strong>Info:</strong> Deductions and tax rules are
                      auto-applied based on payroll configuration.
                    </div>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </TooltipProvider>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 border-t border-slate-200 p-6 bg-slate-50">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel} size="lg">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onSubmit}
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Employee
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
