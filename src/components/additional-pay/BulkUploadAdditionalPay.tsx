import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Save,
  FileText,
  Info,
  Plus,
  Minus,
  Calendar,
  User,
  Building,
  DollarSign,
  Target,
  X,
} from "lucide-react";

interface BulkUploadAdditionalPayProps {
  onClose: () => void;
}

interface AdditionalPayData {
  id: string;
  empId: string;
  name: string;
  designation: string;
  department: string;
  businessUnit: string;
  month: string;
  fiscalYear: string;
  adjustmentType: string;
  payheadName: string;
  units: number;
  amount: number;
  reason: string;
  approvedBy: string;
  status: string;
  taxable: boolean;
  createdDate: string;
  errors: string[];
  isValid: boolean;
}

export function BulkUploadAdditionalPay({
  onClose,
}: BulkUploadAdditionalPayProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [additionalPayData, setAdditionalPayData] = useState<
    AdditionalPayData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "valid" | "error">(
    "all",
  );
  const recordsPerPage = 10;

  // Mock data for demonstration
  const mockAdditionalPayData: AdditionalPayData[] = [
    {
      id: "ADJ001",
      empId: "E1001",
      name: "John Smith",
      designation: "Software Engineer",
      department: "Technology",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Overtime Allowance",
      units: 8,
      amount: 1200,
      reason: "Weekend project work",
      approvedBy: "Sarah Wilson",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-01",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ002",
      empId: "E1002",
      name: "Priya Sharma",
      designation: "Senior Developer",
      department: "Technology",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Special Incentive",
      units: 1,
      amount: 5000,
      reason: "Excellent performance on Q4 project",
      approvedBy: "Sarah Wilson",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-02",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ003",
      empId: "T1001",
      name: "Rajesh Kumar",
      designation: "Sales Executive",
      department: "Sales",
      businessUnit: "Telecom",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Deduction",
      payheadName: "Loss of Pay",
      units: 2,
      amount: 1500,
      reason: "Unauthorized absence on Dec 15-16",
      approvedBy: "Michael Chen",
      status: "Finalized",
      taxable: false,
      createdDate: "2024-12-03",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ004",
      empId: "E1003",
      name: "Sarah Wilson",
      designation: "Team Lead",
      department: "Technology",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Referral Bonus",
      units: 1,
      amount: 5000,
      reason: "Successful referral - hired Ravi Patel",
      approvedBy: "David Brown",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-04",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ005",
      empId: "E1004",
      name: "Michael Chen",
      designation: "Sales Manager",
      department: "Sales",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Deduction",
      payheadName: "Late Coming Fine",
      units: 5,
      amount: 250,
      reason: "Late arrivals on 5 occasions",
      approvedBy: "David Brown",
      status: "Draft",
      taxable: false,
      createdDate: "2024-12-05",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ006",
      empId: "T1002",
      name: "Anita Desai",
      designation: "Telecaller",
      department: "Operations",
      businessUnit: "Telecom",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Holiday Pay Allowance",
      units: 2,
      amount: 800,
      reason: "Worked on Dec 25 & 26 holidays",
      approvedBy: "Rajesh Kumar",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-06",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ007",
      empId: "E1005",
      name: "Ravi Patel",
      designation: "QA Engineer",
      department: "Technology",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Deduction",
      payheadName: "Advance Salary Deduction",
      units: 1,
      amount: 10000,
      reason: "Recovery of advance taken in November",
      approvedBy: "Sarah Wilson",
      status: "Finalized",
      taxable: false,
      createdDate: "2024-12-07",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ008",
      empId: "E1006",
      name: "Lisa Chen",
      designation: "Operations Manager",
      department: "Operations",
      businessUnit: "Telecom",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Performance Bonus",
      units: 1,
      amount: 7500,
      reason: "Outstanding performance in Q4",
      approvedBy: "David Brown",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-08",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ009",
      empId: "E1007",
      name: "Amit Patel",
      designation: "DevOps Engineer",
      department: "Technology",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Transport Allowance",
      units: 1,
      amount: 1800,
      reason: "Additional transport for late shifts",
      approvedBy: "Sarah Wilson",
      status: "Draft",
      taxable: false,
      createdDate: "2024-12-09",
      errors: [],
      isValid: true,
    },
    {
      id: "ADJ010",
      empId: "T1003",
      name: "Maria Garcia",
      designation: "Support Specialist",
      department: "Customer Support",
      businessUnit: "Telecom",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Deduction",
      payheadName: "Professional Development",
      units: 1,
      amount: 3000,
      reason: "Course fee deduction for certification",
      approvedBy: "Rajesh Kumar",
      status: "Finalized",
      taxable: false,
      createdDate: "2024-12-10",
      errors: [],
      isValid: true,
    },
    // Invalid records for demonstration
    {
      id: "ADJ011",
      empId: "E1008",
      name: "Invalid Employee",
      designation: "Developer",
      department: "Technology",
      businessUnit: "IT", // Invalid business unit
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Overtime Allowance",
      units: 8,
      amount: 1200,
      reason: "Weekend project work",
      approvedBy: "Sarah Wilson",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-01",
      errors: ["Business Unit must be either 'JNET' or 'Telecom'"],
      isValid: false,
    },
    {
      id: "ADJ012",
      empId: "E1009",
      name: "Invalid Adjustment Type",
      designation: "Analyst",
      department: "Finance",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Bonus", // Invalid adjustment type
      payheadName: "Special Incentive",
      units: 1,
      amount: 5000,
      reason: "Performance bonus",
      approvedBy: "David Brown",
      status: "Finalized",
      taxable: true,
      createdDate: "2024-12-02",
      errors: ["Adjustment Type must be either 'Earning' or 'Deduction'"],
      isValid: false,
    },
    {
      id: "ADJ013",
      empId: "E1010",
      name: "Negative Amount",
      designation: "Manager",
      department: "Sales",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Deduction",
      payheadName: "Fine",
      units: 1,
      amount: -500, // Invalid negative amount
      reason: "Policy violation",
      approvedBy: "David Brown",
      status: "Finalized",
      taxable: false,
      createdDate: "2024-12-03",
      errors: ["Amount cannot be negative"],
      isValid: false,
    },
    {
      id: "ADJ014",
      empId: "E1011",
      name: "Invalid Status",
      designation: "Specialist",
      department: "HR",
      businessUnit: "JNET",
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Earning",
      payheadName: "Allowance",
      units: 1,
      amount: 1000,
      reason: "Monthly allowance",
      approvedBy: "Sarah Wilson",
      status: "Invalid Status", // Invalid status
      taxable: true,
      createdDate: "2024-12-04",
      errors: ["Status must be one of: Finalized, Draft, Pending"],
      isValid: false,
    },
    {
      id: "ADJ015",
      empId: "E1012",
      name: "Multiple Errors",
      designation: "Engineer",
      department: "Technology",
      businessUnit: "Finance", // Invalid
      month: "Dec 2024",
      fiscalYear: "FY 2024-25",
      adjustmentType: "Bonus", // Invalid
      payheadName: "Incentive",
      units: 1,
      amount: -1000, // Invalid negative
      reason: "Performance incentive",
      approvedBy: "David Brown",
      status: "Invalid Status", // Invalid
      taxable: true,
      createdDate: "2024-12-05",
      errors: [
        "Business Unit must be either 'JNET' or 'Telecom'",
        "Adjustment Type must be either 'Earning' or 'Deduction'",
        "Amount cannot be negative",
        "Status must be one of: Finalized, Draft, Pending",
      ],
      isValid: false,
    },
  ];

  const handleDownloadTemplate = () => {
    // Create CSV template with sample data including some invalid examples
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Month,Fiscal Year,Adjustment Type,Payhead Name,Units,Amount,Reason,Approved By,Status,Taxable,Created Date
E1001,John Smith,Software Engineer,Technology,JNET,Dec 2024,FY 2024-25,Earning,Overtime Allowance,8,1200,Weekend project work,Sarah Wilson,Finalized,true,2024-12-01
E1002,Priya Sharma,Senior Developer,Technology,JNET,Dec 2024,FY 2024-25,Earning,Special Incentive,1,5000,Excellent performance on Q4 project,Sarah Wilson,Finalized,true,2024-12-02
T1001,Rajesh Kumar,Sales Executive,Sales,Telecom,Dec 2024,FY 2024-25,Deduction,Loss of Pay,2,1500,Unauthorized absence on Dec 15-16,Michael Chen,Finalized,false,2024-12-03
E1003,Sarah Wilson,Team Lead,Technology,JNET,Dec 2024,FY 2024-25,Earning,Referral Bonus,1,5000,Successful referral - hired Ravi Patel,David Brown,Finalized,true,2024-12-04
E1004,Michael Chen,Sales Manager,Sales,JNET,Dec 2024,FY 2024-25,Deduction,Late Coming Fine,5,250,Late arrivals on 5 occasions,David Brown,Draft,false,2024-12-05
T1002,Anita Desai,Telecaller,Operations,Telecom,Dec 2024,FY 2024-25,Earning,Holiday Pay Allowance,2,800,Worked on Dec 25 & 26 holidays,Rajesh Kumar,Finalized,true,2024-12-06
E1005,Ravi Patel,QA Engineer,Technology,JNET,Dec 2024,FY 2024-25,Deduction,Advance Salary Deduction,1,10000,Recovery of advance taken in November,Sarah Wilson,Finalized,false,2024-12-07
Invalid Employee,Invalid Employee,Developer,Technology,IT,Dec 2024,FY 2024-25,Earning,Overtime Allowance,8,1200,Weekend project work,Sarah Wilson,Finalized,true,2024-12-01
Invalid Adjustment Type,Invalid Adjustment Type,Analyst,Finance,JNET,Dec 2024,FY 2024-25,Bonus,Special Incentive,1,5000,Performance bonus,David Brown,Finalized,true,2024-12-02
Negative Amount,Negative Amount,Manager,Sales,JNET,Dec 2024,FY 2024-25,Deduction,Fine,1,-500,Policy violation,David Brown,Finalized,false,2024-12-03`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "additional_pay_upload_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);

      // Process the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const processedData = processCSVData(text);
        setAdditionalPayData(processedData);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string): AdditionalPayData[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: AdditionalPayData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const additionalPay: AdditionalPayData = {
        id: `ADJ${i.toString().padStart(3, "0")}`,
        empId: values[0] || "",
        name: values[1] || "",
        designation: values[2] || "",
        department: values[3] || "",
        businessUnit: values[4] || "",
        month: values[5] || "",
        fiscalYear: values[6] || "",
        adjustmentType: values[7] || "",
        payheadName: values[8] || "",
        units: parseInt(values[9]) || 0,
        amount: parseInt(values[10]) || 0,
        reason: values[11] || "",
        approvedBy: values[12] || "",
        status: values[13] || "",
        taxable: values[14] === "true",
        createdDate: values[15] || "",
        errors: [],
        isValid: true,
      };

      // Validate the data
      const errors: string[] = [];

      if (!additionalPay.empId) {
        errors.push("Employee ID is required");
      }

      if (!additionalPay.name) {
        errors.push("Name is required");
      }

      if (!additionalPay.designation) {
        errors.push("Designation is required");
      }

      if (!additionalPay.department) {
        errors.push("Department is required");
      }

      if (!additionalPay.businessUnit) {
        errors.push("Business Unit is required");
      } else if (!["JNET", "Telecom"].includes(additionalPay.businessUnit)) {
        errors.push("Business Unit must be either 'JNET' or 'Telecom'");
      }

      if (!additionalPay.month) {
        errors.push("Month is required");
      }

      if (!additionalPay.fiscalYear) {
        errors.push("Fiscal Year is required");
      }

      if (!additionalPay.adjustmentType) {
        errors.push("Adjustment Type is required");
      } else if (
        !["Earning", "Deduction"].includes(additionalPay.adjustmentType)
      ) {
        errors.push("Adjustment Type must be either 'Earning' or 'Deduction'");
      }

      if (!additionalPay.payheadName) {
        errors.push("Payhead Name is required");
      }

      if (additionalPay.units < 0) {
        errors.push("Units cannot be negative");
      }

      if (additionalPay.amount < 0) {
        errors.push("Amount cannot be negative");
      }

      if (!additionalPay.reason) {
        errors.push("Reason is required");
      }

      if (!additionalPay.approvedBy) {
        errors.push("Approved By is required");
      }

      if (!additionalPay.status) {
        errors.push("Status is required");
      } else if (
        !["Finalized", "Draft", "Pending"].includes(additionalPay.status)
      ) {
        errors.push("Status must be one of: Finalized, Draft, Pending");
      }

      if (!additionalPay.createdDate) {
        errors.push("Created Date is required");
      }

      additionalPay.errors = errors;
      additionalPay.isValid = errors.length === 0;
      data.push(additionalPay);
    }

    return data;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveValidRows = () => {
    const validAdditionalPay = additionalPayData.filter((ap) => ap.isValid);
    console.log("Saving valid additional pay records:", validAdditionalPay);
    onClose();
  };

  const handleDownloadErrorRecords = () => {
    const errorAdditionalPay = additionalPayData.filter((ap) => !ap.isValid);

    if (errorAdditionalPay.length === 0) {
      alert("No error records to download");
      return;
    }

    // Create CSV with error records
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Month,Fiscal Year,Adjustment Type,Payhead Name,Units,Amount,Reason,Approved By,Status,Taxable,Created Date,Errors
${errorAdditionalPay
  .map(
    (ap) =>
      `"${ap.empId}","${ap.name}","${ap.designation}","${ap.department}","${ap.businessUnit}","${ap.month}","${ap.fiscalYear}","${ap.adjustmentType}","${ap.payheadName}","${ap.units}","${ap.amount}","${ap.reason}","${ap.approvedBy}","${ap.status}","${ap.taxable}","${ap.createdDate}","${ap.errors.join("; ")}"`,
  )
  .join("\n")}`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `additional_pay_error_records_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "current";
    return "pending";
  };

  const filteredAdditionalPayData = (() => {
    switch (filterType) {
      case "valid":
        return additionalPayData.filter((ap) => ap.isValid);
      case "error":
        return additionalPayData.filter((ap) => !ap.isValid);
      default:
        return additionalPayData;
    }
  })();

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAdditionalPayData.length / recordsPerPage,
  );
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredAdditionalPayData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when filtering changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterType, additionalPayData.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">
                Bulk Upload Additional Pay
              </h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-center space-x-8">
          {[
            { step: 1, title: "Download Template", icon: Download },
            { step: 2, title: "Upload File", icon: Upload },
            { step: 3, title: "Preview & Confirm", icon: Eye },
          ].map(({ step, title, icon: Icon }) => {
            const status = getStepStatus(step);
            return (
              <div
                key={step}
                className={`flex items-center space-x-2 ${
                  status === "completed"
                    ? "text-green-600"
                    : status === "current"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === "completed"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : status === "current"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-sm font-medium">{title}</span>
                {step < 3 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Step 1: Download Template */}
        {currentStep === 1 && (
          <div className="w-full mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                  Step 1: Download Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Download the standard additional pay upload template and fill
                  in the required details.
                </p>

                <Button
                  onClick={handleDownloadTemplate}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template (.csv)
                </Button>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <div className="text-blue-700 text-sm">
                      <strong>Important:</strong> Do not rename or remove any
                      columns. Sample data is provided in row 2.
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Upload File */}
        {currentStep === 2 && (
          <div className="w-full mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Step 2: Upload File
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Filled Template</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      Choose File
                    </Button>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">
                      {uploadedFile.name} (
                      {(uploadedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}

                {!uploadedFile && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        No file uploaded yet. You can upload a CSV file or use
                        the demo data below.
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setAdditionalPayData(mockAdditionalPayData)
                      }
                      className="w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Load Demo Data for Preview
                    </Button>
                  </div>
                )}

                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    <div className="text-orange-700 text-sm">
                      <strong>Supported formats:</strong> .xlsx, .csv files only
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Preview & Confirm */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Step 3: Preview & Confirm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {filteredAdditionalPayData.length}{" "}
                      {filterType === "all"
                        ? "Total"
                        : filterType === "valid"
                          ? "Valid"
                          : "Error"}{" "}
                      Records
                    </Badge>
                    {filterType === "all" && (
                      <>
                        <Badge variant="destructive">
                          {additionalPayData.filter((ap) => !ap.isValid).length}{" "}
                          Errors
                        </Badge>
                        <Badge variant="default">
                          {additionalPayData.filter((ap) => ap.isValid).length}{" "}
                          Valid
                        </Badge>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="filter-type"
                      className="text-sm font-medium text-slate-700"
                    >
                      Filter:
                    </Label>
                    <select
                      id="filter-type"
                      value={filterType}
                      onChange={(e) =>
                        setFilterType(
                          e.target.value as "all" | "valid" | "error",
                        )
                      }
                      className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
                    >
                      <option value="all">All Records</option>
                      <option value="valid">Valid Records</option>
                      <option value="error">Error Records</option>
                    </select>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead>Emp ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Designation</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Business Unit</TableHead>
                          <TableHead>Month</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Payhead</TableHead>
                          <TableHead>Units</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Errors</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentRecords.map((additionalPay) => (
                          <TableRow
                            key={additionalPay.id}
                            className={
                              !additionalPay.isValid ? "bg-red-50" : ""
                            }
                          >
                            <TableCell className=" text-sm">
                              {additionalPay.empId}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        !additionalPay.name
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {additionalPay.name || "Missing"}
                                    </span>
                                  </TooltipTrigger>
                                  {!additionalPay.name && (
                                    <TooltipContent>
                                      <p>Name is required</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{additionalPay.designation}</TableCell>
                            <TableCell>{additionalPay.department}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        additionalPay.errors.some(
                                          (error) =>
                                            error.includes("Business Unit") ||
                                            error.includes("business unit"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {additionalPay.businessUnit}
                                    </span>
                                  </TooltipTrigger>
                                  {additionalPay.errors.some(
                                    (error) =>
                                      error.includes("Business Unit") ||
                                      error.includes("business unit"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Business Unit must be either 'JNET' or
                                        'Telecom'
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{additionalPay.month}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        additionalPay.errors.some(
                                          (error) =>
                                            error.includes("Adjustment Type") ||
                                            error.includes("adjustment type"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {additionalPay.adjustmentType}
                                    </span>
                                  </TooltipTrigger>
                                  {additionalPay.errors.some(
                                    (error) =>
                                      error.includes("Adjustment Type") ||
                                      error.includes("adjustment type"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Adjustment Type must be either 'Earning'
                                        or 'Deduction'
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{additionalPay.payheadName}</TableCell>
                            <TableCell>{additionalPay.units}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        additionalPay.errors.some(
                                          (error) =>
                                            error.includes("Amount") ||
                                            error.includes("negative"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      ₹{additionalPay.amount.toLocaleString()}
                                    </span>
                                  </TooltipTrigger>
                                  {additionalPay.errors.some(
                                    (error) =>
                                      error.includes("Amount") ||
                                      error.includes("negative"),
                                  ) && (
                                    <TooltipContent>
                                      <p>Amount cannot be negative</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        additionalPay.errors.some(
                                          (error) =>
                                            error.includes("Status") ||
                                            error.includes("status"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {additionalPay.status}
                                    </span>
                                  </TooltipTrigger>
                                  {additionalPay.errors.some(
                                    (error) =>
                                      error.includes("Status") ||
                                      error.includes("status"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Status must be one of: Finalized, Draft,
                                        Pending
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              {additionalPay.errors.length > 0 ? (
                                <div className="space-y-1">
                                  {additionalPay.errors.map((error, index) => (
                                    <div
                                      key={index}
                                      className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded"
                                    >
                                      {error}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-xs text-green-600">
                                  ✓ Valid
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {additionalPay.isValid ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Pagination Controls */}
                {filteredAdditionalPayData.length > recordsPerPage && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredAdditionalPayData.length)} of{" "}
                      {filteredAdditionalPayData.length} records
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="bg-white border-t border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {currentStep === 1 && (
              <Button onClick={handleNext} size="lg">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {currentStep === 2 && (
              <Button
                onClick={handleNext}
                size="lg"
                disabled={!uploadedFile && additionalPayData.length === 0}
              >
                Next: Preview Data
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {currentStep === 3 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleDownloadErrorRecords}
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Error Records
                </Button>
                <Button
                  onClick={handleSaveValidRows}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Valid Rows
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
