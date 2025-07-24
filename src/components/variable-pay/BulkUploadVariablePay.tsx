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
  TrendingUp,
  Target,
  Award,
  DollarSign,
  Percent,
  X,
} from "lucide-react";

interface BulkUploadVariablePayProps {
  onClose: () => void;
}

interface VariablePayData {
  id: string;
  empId: string;
  name: string;
  designation: string;
  department: string;
  businessUnit: string;
  grossCTC: number;
  variablePercent: number;
  annualVariablePay: number;
  quarterlyAmount: number;
  fyPeriod: string;
  fiscalYear: string;
  payablePercent: number;
  payableAmount: number;
  manager: string;
  performance: string;
  errors: string[];
  isValid: boolean;
}

export function BulkUploadVariablePay({ onClose }: BulkUploadVariablePayProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [variablePayData, setVariablePayData] = useState<VariablePayData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "valid" | "error">(
    "all",
  );
  const recordsPerPage = 10;

  // Mock data for demonstration
  const mockVariablePayData: VariablePayData[] = [
    {
      id: "1",
      empId: "E1001",
      name: "John Smith",
      designation: "Software Engineer",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 1200000,
      variablePercent: 10,
      annualVariablePay: 120000,
      quarterlyAmount: 30000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 85,
      payableAmount: 25500,
      manager: "Sarah Wilson",
      performance: "Exceeded Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "2",
      empId: "E1002",
      name: "Priya Sharma",
      designation: "Senior Developer",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 1500000,
      variablePercent: 12,
      annualVariablePay: 180000,
      quarterlyAmount: 45000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 90,
      payableAmount: 40500,
      manager: "Sarah Wilson",
      performance: "Outstanding",
      errors: [],
      isValid: true,
    },
    {
      id: "3",
      empId: "T1001",
      name: "Rajesh Kumar",
      designation: "Sales Executive",
      department: "Sales",
      businessUnit: "Telecom",
      grossCTC: 800000,
      variablePercent: 15,
      annualVariablePay: 120000,
      quarterlyAmount: 30000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 75,
      payableAmount: 22500,
      manager: "Michael Chen",
      performance: "Met Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "4",
      empId: "E1003",
      name: "Sarah Wilson",
      designation: "Team Lead",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 2000000,
      variablePercent: 20,
      annualVariablePay: 400000,
      quarterlyAmount: 100000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 95,
      payableAmount: 95000,
      manager: "David Brown",
      performance: "Outstanding",
      errors: [],
      isValid: true,
    },
    {
      id: "5",
      empId: "E1004",
      name: "Michael Chen",
      designation: "Sales Manager",
      department: "Sales",
      businessUnit: "JNET",
      grossCTC: 1800000,
      variablePercent: 18,
      annualVariablePay: 324000,
      quarterlyAmount: 81000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 80,
      payableAmount: 64800,
      manager: "David Brown",
      performance: "Exceeded Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "6",
      empId: "T1002",
      name: "Anita Desai",
      designation: "Telecaller",
      department: "Operations",
      businessUnit: "Telecom",
      grossCTC: 400000,
      variablePercent: 8,
      annualVariablePay: 32000,
      quarterlyAmount: 8000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 70,
      payableAmount: 5600,
      manager: "Rajesh Kumar",
      performance: "Met Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "7",
      empId: "E1005",
      name: "Ravi Patel",
      designation: "QA Engineer",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 1000000,
      variablePercent: 10,
      annualVariablePay: 100000,
      quarterlyAmount: 25000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 60,
      payableAmount: 15000,
      manager: "Sarah Wilson",
      performance: "Below Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "8",
      empId: "E1006",
      name: "Lisa Chen",
      designation: "Operations Manager",
      department: "Operations",
      businessUnit: "Telecom",
      grossCTC: 1600000,
      variablePercent: 15,
      annualVariablePay: 240000,
      quarterlyAmount: 60000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 85,
      payableAmount: 51000,
      manager: "David Brown",
      performance: "Exceeded Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "9",
      empId: "E1007",
      name: "Amit Patel",
      designation: "DevOps Engineer",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 1300000,
      variablePercent: 12,
      annualVariablePay: 156000,
      quarterlyAmount: 39000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 88,
      payableAmount: 34320,
      manager: "Sarah Wilson",
      performance: "Exceeded Expectations",
      errors: [],
      isValid: true,
    },
    {
      id: "10",
      empId: "T1003",
      name: "Maria Garcia",
      designation: "Support Specialist",
      department: "Customer Support",
      businessUnit: "Telecom",
      grossCTC: 700000,
      variablePercent: 10,
      annualVariablePay: 70000,
      quarterlyAmount: 17500,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 75,
      payableAmount: 13125,
      manager: "Rajesh Kumar",
      performance: "Met Expectations",
      errors: [],
      isValid: true,
    },
    // Invalid records for demonstration
    {
      id: "11",
      empId: "E1008",
      name: "Invalid Employee",
      designation: "Developer",
      department: "Technology",
      businessUnit: "JNET",
      grossCTC: 1200000,
      variablePercent: 25, // Invalid: too high
      annualVariablePay: 300000,
      quarterlyAmount: 75000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 85,
      payableAmount: 63750,
      manager: "Sarah Wilson",
      performance: "Exceeded Expectations",
      errors: ["Variable pay percentage cannot exceed 20%"],
      isValid: false,
    },
    {
      id: "12",
      empId: "E1009",
      name: "Low Performance",
      designation: "Analyst",
      department: "Finance",
      businessUnit: "JNET",
      grossCTC: 900000,
      variablePercent: 8,
      annualVariablePay: 72000,
      quarterlyAmount: 18000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 120, // Invalid: cannot exceed 100%
      payableAmount: 21600,
      manager: "David Brown",
      performance: "Below Expectations",
      errors: ["Payable percentage cannot exceed 100%"],
      isValid: false,
    },
    {
      id: "13",
      empId: "E1010",
      name: "Wrong Business Unit",
      designation: "Manager",
      department: "Sales",
      businessUnit: "IT", // Invalid business unit
      grossCTC: 1500000,
      variablePercent: 15,
      annualVariablePay: 225000,
      quarterlyAmount: 56250,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 80,
      payableAmount: 45000,
      manager: "David Brown",
      performance: "Met Expectations",
      errors: ["Business Unit must be either 'JNET' or 'Telecom'"],
      isValid: false,
    },
    {
      id: "14",
      empId: "E1011",
      name: "Invalid Performance",
      designation: "Specialist",
      department: "HR",
      businessUnit: "JNET",
      grossCTC: 800000,
      variablePercent: 10,
      annualVariablePay: 80000,
      quarterlyAmount: 20000,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 75,
      payableAmount: 15000,
      manager: "Sarah Wilson",
      performance: "Invalid Rating", // Invalid performance rating
      errors: [
        "Performance rating must be one of: Outstanding, Exceeded Expectations, Met Expectations, Below Expectations",
      ],
      isValid: false,
    },
    {
      id: "15",
      empId: "E1012",
      name: "Multiple Errors",
      designation: "Engineer",
      department: "Technology",
      businessUnit: "Finance", // Invalid
      grossCTC: 1100000,
      variablePercent: 25, // Invalid: too high
      annualVariablePay: 275000,
      quarterlyAmount: 68750,
      fyPeriod: "FY 24-25 – Q3",
      fiscalYear: "FY 2024-25",
      payablePercent: 110, // Invalid: exceeds 100%
      payableAmount: 75625,
      manager: "David Brown",
      performance: "Invalid Rating", // Invalid
      errors: [
        "Business Unit must be either 'JNET' or 'Telecom'",
        "Variable pay percentage cannot exceed 20%",
        "Payable percentage cannot exceed 100%",
        "Performance rating must be one of: Outstanding, Exceeded Expectations, Met Expectations, Below Expectations",
      ],
      isValid: false,
    },
  ];

  const handleDownloadTemplate = () => {
    // Create CSV template with sample data including some invalid examples
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Gross CTC,Variable Percent,Annual Variable Pay,Quarterly Amount,FY Period,Fiscal Year,Payable Percent,Payable Amount,Manager,Performance
E1001,John Smith,Software Engineer,Technology,JNET,1200000,10,120000,30000,FY 24-25 – Q3,FY 2024-25,85,25500,Sarah Wilson,Exceeded Expectations
E1002,Priya Sharma,Senior Developer,Technology,JNET,1500000,12,180000,45000,FY 24-25 – Q3,FY 2024-25,90,40500,Sarah Wilson,Outstanding
T1001,Rajesh Kumar,Sales Executive,Sales,Telecom,800000,15,120000,30000,FY 24-25 – Q3,FY 2024-25,75,22500,Michael Chen,Met Expectations
E1003,Sarah Wilson,Team Lead,Technology,JNET,2000000,20,400000,100000,FY 24-25 – Q3,FY 2024-25,95,95000,David Brown,Outstanding
E1004,Michael Chen,Sales Manager,Sales,JNET,1800000,18,324000,81000,FY 24-25 – Q3,FY 2024-25,80,64800,David Brown,Exceeded Expectations
T1002,Anita Desai,Telecaller,Operations,Telecom,400000,8,32000,8000,FY 24-25 – Q3,FY 2024-25,70,5600,Rajesh Kumar,Met Expectations
E1005,Ravi Patel,QA Engineer,Technology,JNET,1000000,10,100000,25000,FY 24-25 – Q3,FY 2024-25,60,15000,Sarah Wilson,Below Expectations
Invalid Employee,Invalid Employee,Developer,Technology,JNET,1200000,25,300000,75000,FY 24-25 – Q3,FY 2024-25,85,63750,Sarah Wilson,Exceeded Expectations
Low Performance,Low Performance,Analyst,Finance,JNET,900000,8,72000,18000,FY 24-25 – Q3,FY 2024-25,120,21600,David Brown,Below Expectations
Wrong Business Unit,Wrong Business Unit,Manager,Sales,IT,1500000,15,225000,56250,FY 24-25 – Q3,FY 2024-25,80,45000,David Brown,Met Expectations`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "variable_pay_upload_template.csv";
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
        setVariablePayData(processedData);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string): VariablePayData[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: VariablePayData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const variablePay: VariablePayData = {
        id: i.toString(),
        empId: values[0] || "",
        name: values[1] || "",
        designation: values[2] || "",
        department: values[3] || "",
        businessUnit: values[4] || "",
        grossCTC: parseInt(values[5]) || 0,
        variablePercent: parseFloat(values[6]) || 0,
        annualVariablePay: parseInt(values[7]) || 0,
        quarterlyAmount: parseInt(values[8]) || 0,
        fyPeriod: values[9] || "",
        fiscalYear: values[10] || "",
        payablePercent: parseFloat(values[11]) || 0,
        payableAmount: parseInt(values[12]) || 0,
        manager: values[13] || "",
        performance: values[14] || "",
        errors: [],
        isValid: true,
      };

      // Validate the data
      const errors: string[] = [];

      if (!variablePay.empId) {
        errors.push("Employee ID is required");
      }

      if (!variablePay.name) {
        errors.push("Name is required");
      }

      if (!variablePay.designation) {
        errors.push("Designation is required");
      }

      if (!variablePay.department) {
        errors.push("Department is required");
      }

      if (!variablePay.businessUnit) {
        errors.push("Business Unit is required");
      } else if (!["JNET", "Telecom"].includes(variablePay.businessUnit)) {
        errors.push("Business Unit must be either 'JNET' or 'Telecom'");
      }

      if (variablePay.grossCTC < 300000) {
        errors.push("Gross CTC must be at least ₹300,000");
      }

      if (variablePay.variablePercent < 0 || variablePay.variablePercent > 20) {
        errors.push("Variable pay percentage must be between 0% and 20%");
      }

      if (variablePay.payablePercent < 0 || variablePay.payablePercent > 100) {
        errors.push("Payable percentage must be between 0% and 100%");
      }

      if (!variablePay.fyPeriod) {
        errors.push("FY Period is required");
      }

      if (!variablePay.fiscalYear) {
        errors.push("Fiscal Year is required");
      }

      if (!variablePay.manager) {
        errors.push("Manager is required");
      }

      const validPerformanceRatings = [
        "Outstanding",
        "Exceeded Expectations",
        "Met Expectations",
        "Below Expectations",
      ];
      if (
        !variablePay.performance ||
        !validPerformanceRatings.includes(variablePay.performance)
      ) {
        errors.push(
          "Performance rating must be one of: Outstanding, Exceeded Expectations, Met Expectations, Below Expectations",
        );
      }

      variablePay.errors = errors;
      variablePay.isValid = errors.length === 0;
      data.push(variablePay);
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
    const validVariablePay = variablePayData.filter((vp) => vp.isValid);
    console.log("Saving valid variable pay records:", validVariablePay);
    onClose();
  };

  const handleDownloadErrorRecords = () => {
    const errorVariablePay = variablePayData.filter((vp) => !vp.isValid);

    if (errorVariablePay.length === 0) {
      alert("No error records to download");
      return;
    }

    // Create CSV with error records
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Gross CTC,Variable Percent,Annual Variable Pay,Quarterly Amount,FY Period,Fiscal Year,Payable Percent,Payable Amount,Manager,Performance,Errors
${errorVariablePay
  .map(
    (vp) =>
      `"${vp.empId}","${vp.name}","${vp.designation}","${vp.department}","${vp.businessUnit}","${vp.grossCTC}","${vp.variablePercent}","${vp.annualVariablePay}","${vp.quarterlyAmount}","${vp.fyPeriod}","${vp.fiscalYear}","${vp.payablePercent}","${vp.payableAmount}","${vp.manager}","${vp.performance}","${vp.errors.join("; ")}"`,
  )
  .join("\n")}`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `variable_pay_error_records_${new Date().toISOString().split("T")[0]}.csv`;
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

  const filteredVariablePayData = (() => {
    switch (filterType) {
      case "valid":
        return variablePayData.filter((vp) => vp.isValid);
      case "error":
        return variablePayData.filter((vp) => !vp.isValid);
      default:
        return variablePayData;
    }
  })();

  // Pagination logic
  const totalPages = Math.ceil(filteredVariablePayData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredVariablePayData.slice(startIndex, endIndex);

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
  }, [filterType, variablePayData.length]);

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
              <TrendingUp className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">
                Bulk Upload Variable Pay
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
                  Download the standard variable pay upload template and fill in
                  the required details.
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
                      onClick={() => setVariablePayData(mockVariablePayData)}
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
                      {filteredVariablePayData.length}{" "}
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
                          {variablePayData.filter((vp) => !vp.isValid).length}{" "}
                          Errors
                        </Badge>
                        <Badge variant="default">
                          {variablePayData.filter((vp) => vp.isValid).length}{" "}
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
                          <TableHead>Gross CTC</TableHead>
                          <TableHead>Variable %</TableHead>
                          <TableHead>Quarterly Amount</TableHead>
                          <TableHead>Payable %</TableHead>
                          <TableHead>Payable Amount</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Errors</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentRecords.map((variablePay) => (
                          <TableRow
                            key={variablePay.id}
                            className={!variablePay.isValid ? "bg-red-50" : ""}
                          >
                            <TableCell className=" text-sm">
                              {variablePay.empId}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        !variablePay.name
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {variablePay.name || "Missing"}
                                    </span>
                                  </TooltipTrigger>
                                  {!variablePay.name && (
                                    <TooltipContent>
                                      <p>Name is required</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{variablePay.designation}</TableCell>
                            <TableCell>{variablePay.department}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        variablePay.errors.some(
                                          (error) =>
                                            error.includes("Business Unit") ||
                                            error.includes("business unit"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {variablePay.businessUnit}
                                    </span>
                                  </TooltipTrigger>
                                  {variablePay.errors.some(
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
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        variablePay.errors.some(
                                          (error) =>
                                            error.includes("Gross CTC") ||
                                            error.includes("gross"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      ₹
                                      {(variablePay.grossCTC / 100000).toFixed(
                                        1,
                                      )}
                                      L
                                    </span>
                                  </TooltipTrigger>
                                  {variablePay.errors.some(
                                    (error) =>
                                      error.includes("Gross CTC") ||
                                      error.includes("gross"),
                                  ) && (
                                    <TooltipContent>
                                      <p>Gross CTC must be at least ₹300,000</p>
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
                                        variablePay.errors.some(
                                          (error) =>
                                            error.includes(
                                              "Variable pay percentage",
                                            ) || error.includes("variable"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {variablePay.variablePercent}%
                                    </span>
                                  </TooltipTrigger>
                                  {variablePay.errors.some(
                                    (error) =>
                                      error.includes(
                                        "Variable pay percentage",
                                      ) || error.includes("variable"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Variable pay percentage must be between
                                        0% and 20%
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              ₹{variablePay.quarterlyAmount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        variablePay.errors.some(
                                          (error) =>
                                            error.includes(
                                              "Payable percentage",
                                            ) || error.includes("payable"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {variablePay.payablePercent}%
                                    </span>
                                  </TooltipTrigger>
                                  {variablePay.errors.some(
                                    (error) =>
                                      error.includes("Payable percentage") ||
                                      error.includes("payable"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Payable percentage must be between 0%
                                        and 100%
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              ₹{variablePay.payableAmount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        variablePay.errors.some(
                                          (error) =>
                                            error.includes(
                                              "Performance rating",
                                            ) || error.includes("performance"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {variablePay.performance}
                                    </span>
                                  </TooltipTrigger>
                                  {variablePay.errors.some(
                                    (error) =>
                                      error.includes("Performance rating") ||
                                      error.includes("performance"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Performance rating must be one of:
                                        Outstanding, Exceeded Expectations, Met
                                        Expectations, Below Expectations
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              {variablePay.errors.length > 0 ? (
                                <div className="space-y-1">
                                  {variablePay.errors.map((error, index) => (
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
                              {variablePay.isValid ? (
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
                {filteredVariablePayData.length > recordsPerPage && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredVariablePayData.length)} of{" "}
                      {filteredVariablePayData.length} records
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
                disabled={!uploadedFile && variablePayData.length === 0}
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
