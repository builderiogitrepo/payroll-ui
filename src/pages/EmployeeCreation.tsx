import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  User,
  Building,
  CreditCard,
  FileText,
  DollarSign,
  Info,
  Save,
  X,
} from "lucide-react";

export default function EmployeeCreation() {
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

  const handleSubmit = () => {
    console.log("Employee Creation Data:", formData);
    // Handle form submission
  };

  const handleCancel = () => {
    // Reset form or navigate back
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
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <PageHeader
          title="Employee Creation"
          description="Create a new employee profile with complete details for payroll setup"
        />

        <div className="space-y-6">
          {/* Top Section - Business Unit */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Building className="h-5 w-5" />
                Business Unit Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-md">
                <Label htmlFor="businessUnit">Business Unit *</Label>
                <Select
                  value={formData.businessUnit}
                  onValueChange={(value) =>
                    handleInputChange("businessUnit", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JNET">JNET</SelectItem>
                    <SelectItem value="Telecom">Telecom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
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
                      handleInputChange("maritalStatus", value)
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
                      handleInputChange("bloodGroup", value)
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
                      handleInputChange("fathersName", e.target.value)
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
                      handleInputChange(
                        "educationQualification",
                        e.target.value,
                      )
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
                      handleInputChange("contactNumber", e.target.value)
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
                      handleInputChange("personalEmail", e.target.value)
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
                      handleInputChange("workEmail", e.target.value)
                    }
                    placeholder={
                      formData.businessUnit === "JNET"
                        ? "Enter JNET email"
                        : "Enter work email"
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Employment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="offerType">Offer Type *</Label>
                  <Select
                    value={formData.offerType}
                    onValueChange={(value) =>
                      handleInputChange("offerType", value)
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
                      handleInputChange("employmentType", value)
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
                      handleInputChange("designation", value)
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
                      handleInputChange("department", value)
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
                  <Label htmlFor="reportingManager">Reporting Manager *</Label>
                  <Select
                    value={formData.reportingManager}
                    onValueChange={(value) =>
                      handleInputChange("reportingManager", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reporting manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
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
                      handleInputChange("dateOfJoining", e.target.value)
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
                          handleInputChange("category", value)
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
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="circle">Circle *</Label>
                      <Select
                        value={formData.circle}
                        onValueChange={(value) =>
                          handleInputChange("circle", value)
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
                          handleInputChange("costingCircle", value)
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
                          handleInputChange("baseLocation", e.target.value)
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
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="Enter location"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bank & Identity Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Bank & Identity Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panCard">PAN Card *</Label>
                  <Input
                    id="panCard"
                    value={formData.panCard}
                    onChange={(e) =>
                      handleInputChange("panCard", e.target.value)
                    }
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
                      handleInputChange("aadharCard", e.target.value)
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
                      handleInputChange("bankAccountNumber", e.target.value)
                    }
                    placeholder="Enter bank account number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select
                    value={formData.bankName}
                    onValueChange={(value) =>
                      handleInputChange("bankName", value)
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
                      <SelectItem value="pnb">Punjab National Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) =>
                      handleInputChange("ifscCode", e.target.value)
                    }
                    placeholder="Enter IFSC code"
                    className="uppercase"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statutory Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Statutory Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="previousCompanyESICNumber">
                    Previous Company ESIC Number
                  </Label>
                  <Input
                    id="previousCompanyESICNumber"
                    value={formData.previousCompanyESICNumber}
                    onChange={(e) =>
                      handleInputChange(
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
                      handleInputChange(
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
                        <p>Select the PF calculation rule for this employee</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={formData.pfRuleType}
                    onValueChange={(value) =>
                      handleInputChange("pfRuleType", value)
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
                      handleInputChange("eligibleForEPS", !!checked)
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
            </CardContent>
          </Card>

          {/* Salary Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Salary Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualGross">Annual Gross (₹) *</Label>
                  <Input
                    id="annualGross"
                    type="number"
                    min="0"
                    value={formData.annualGross}
                    onChange={(e) =>
                      handleInputChange(
                        "annualGross",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="Enter annual gross salary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variablePay">Variable Pay (%) *</Label>
                  <Input
                    id="variablePay"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.variablePay}
                    onChange={(e) =>
                      handleInputChange(
                        "variablePay",
                        parseFloat(e.target.value) || 0,
                      )
                    }
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

                <div className="space-y-2">
                  <Label htmlFor="basic">Basic (₹)</Label>
                  <Input
                    id="basic"
                    type="number"
                    value={formData.basic}
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

                <div className="space-y-2">
                  <Label htmlFor="otherAllowance">
                    Other Allowance (₹)
                    {formData.businessUnit === "Telecom" &&
                      " (Gross - Wage Rate)"}
                  </Label>
                  <Input
                    id="otherAllowance"
                    type="number"
                    value={formData.otherAllowance}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <div className="text-blue-700 text-sm">
                    <strong>Info:</strong> Deductions and tax rules are
                    auto-applied based on payroll configuration.
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Employee
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
