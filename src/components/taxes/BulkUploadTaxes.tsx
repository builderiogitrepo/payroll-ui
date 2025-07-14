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
  IndianRupee,
  Calendar,
  User,
  Building,
  Percent,
  Zap,
  X,
} from "lucide-react";

interface BulkUploadTaxesProps {
  onClose: () => void;
}

interface TaxData {
  id: string;
  empId: string;
  name: string;
  designation: string;
  department: string;
  businessUnit: string;
  fiscalYear: string;
  month: string;
  taxRegime: string;
  tdsAmount: number;
  notes: string;
  uploadedBy: string;
  uploadedDate: string;
  status: string;
  errors: string[];
  isValid: boolean;
}

export function BulkUploadTaxes({ onClose }: BulkUploadTaxesProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [taxData, setTaxData] = useState<TaxData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "valid" | "error">(
    "all",
  );
  const recordsPerPage = 10;

  // Mock data for demonstration
  const mockTaxData: TaxData[] = [
    {
      id: "TDS_J001",
      empId: "E1001",
      name: "John Smith",
      designation: "Software Engineer",
      department: "Technology",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 9500,
      notes: "Monthly TDS as per new tax regime for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J002",
      empId: "E1002",
      name: "Priya Sharma",
      designation: "Senior Developer",
      department: "Technology",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 14000,
      notes: "Monthly TDS including performance bonus for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J003",
      empId: "T1001",
      name: "Rajesh Kumar",
      designation: "Sales Executive",
      department: "Sales",
      businessUnit: "Telecom",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "Old",
      tdsAmount: 3500,
      notes: "Monthly TDS as per old tax regime for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J004",
      empId: "E1003",
      name: "Sarah Wilson",
      designation: "Team Lead",
      department: "Technology",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 22000,
      notes: "Monthly TDS for senior role June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J005",
      empId: "E1004",
      name: "Michael Chen",
      designation: "Sales Manager",
      department: "Sales",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "Old",
      tdsAmount: 17000,
      notes: "Monthly TDS including management allowance June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J006",
      empId: "T1002",
      name: "Anita Desai",
      designation: "Telecaller",
      department: "Operations",
      businessUnit: "Telecom",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 900,
      notes: "Lower TDS due to income slab June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J007",
      empId: "E1005",
      name: "Ravi Patel",
      designation: "QA Engineer",
      department: "Technology",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 5800,
      notes: "Monthly TDS for mid-level position June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-02",
      status: "Pending",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J008",
      empId: "E1006",
      name: "Lisa Chen",
      designation: "Operations Manager",
      department: "Operations",
      businessUnit: "Telecom",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "Old",
      tdsAmount: 18500,
      notes: "Monthly TDS for management role June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-02",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J009",
      empId: "E1007",
      name: "Amit Patel",
      designation: "DevOps Engineer",
      department: "Technology",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 7200,
      notes: "Monthly TDS for technical role June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-02",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    {
      id: "TDS_J010",
      empId: "T1003",
      name: "Maria Garcia",
      designation: "Support Specialist",
      department: "Customer Support",
      businessUnit: "Telecom",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 2800,
      notes: "Monthly TDS for support role June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-02",
      status: "Processed",
      errors: [],
      isValid: true,
    },
    // Invalid records for demonstration
    {
      id: "TDS_J011",
      empId: "E1008",
      name: "Invalid Employee",
      designation: "Developer",
      department: "Technology",
      businessUnit: "IT", // Invalid business unit
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 9500,
      notes: "Monthly TDS for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: ["Business Unit must be either 'JNET' or 'Telecom'"],
      isValid: false,
    },
    {
      id: "TDS_J012",
      empId: "E1009",
      name: "Invalid Tax Regime",
      designation: "Analyst",
      department: "Finance",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "Hybrid", // Invalid tax regime
      tdsAmount: 8000,
      notes: "Monthly TDS for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: ["Tax Regime must be either 'New' or 'Old'"],
      isValid: false,
    },
    {
      id: "TDS_J013",
      empId: "E1010",
      name: "Negative TDS",
      designation: "Manager",
      department: "Sales",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: -500, // Invalid negative amount
      notes: "Monthly TDS for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Processed",
      errors: ["TDS Amount cannot be negative"],
      isValid: false,
    },
    {
      id: "TDS_J014",
      empId: "E1011",
      name: "Invalid Status",
      designation: "Specialist",
      department: "HR",
      businessUnit: "JNET",
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "New",
      tdsAmount: 6000,
      notes: "Monthly TDS for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Invalid Status", // Invalid status
      errors: ["Status must be one of: Processed, Pending, Failed"],
      isValid: false,
    },
    {
      id: "TDS_J015",
      empId: "E1012",
      name: "Multiple Errors",
      designation: "Engineer",
      department: "Technology",
      businessUnit: "Finance", // Invalid
      fiscalYear: "FY 2025-26",
      month: "June",
      taxRegime: "Hybrid", // Invalid
      tdsAmount: -1000, // Invalid negative
      notes: "Monthly TDS for June 2025",
      uploadedBy: "HR Admin",
      uploadedDate: "2025-06-01",
      status: "Invalid Status", // Invalid
      errors: [
        "Business Unit must be either 'JNET' or 'Telecom'",
        "Tax Regime must be either 'New' or 'Old'",
        "TDS Amount cannot be negative",
        "Status must be one of: Processed, Pending, Failed",
      ],
      isValid: false,
    },
  ];

  const handleDownloadTemplate = () => {
    // Create CSV template with sample data including some invalid examples
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Fiscal Year,Month,Tax Regime,TDS Amount,Notes,Uploaded By,Uploaded Date,Status
E1001,John Smith,Software Engineer,Technology,JNET,FY 2025-26,June,New,9500,Monthly TDS as per new tax regime for June 2025,HR Admin,2025-06-01,Processed
E1002,Priya Sharma,Senior Developer,Technology,JNET,FY 2025-26,June,New,14000,Monthly TDS including performance bonus for June 2025,HR Admin,2025-06-01,Processed
T1001,Rajesh Kumar,Sales Executive,Sales,Telecom,FY 2025-26,June,Old,3500,Monthly TDS as per old tax regime for June 2025,HR Admin,2025-06-01,Processed
E1003,Sarah Wilson,Team Lead,Technology,JNET,FY 2025-26,June,New,22000,Monthly TDS for senior role June 2025,HR Admin,2025-06-01,Processed
E1004,Michael Chen,Sales Manager,Sales,JNET,FY 2025-26,June,Old,17000,Monthly TDS including management allowance June 2025,HR Admin,2025-06-01,Processed
T1002,Anita Desai,Telecaller,Operations,Telecom,FY 2025-26,June,New,900,Lower TDS due to income slab June 2025,HR Admin,2025-06-01,Processed
E1005,Ravi Patel,QA Engineer,Technology,JNET,FY 2025-26,June,New,5800,Monthly TDS for mid-level position June 2025,HR Admin,2025-06-02,Pending
Invalid Employee,Invalid Employee,Developer,Technology,IT,FY 2025-26,June,New,9500,Monthly TDS for June 2025,HR Admin,2025-06-01,Processed
Invalid Tax Regime,Invalid Tax Regime,Analyst,Finance,JNET,FY 2025-26,June,Hybrid,8000,Monthly TDS for June 2025,HR Admin,2025-06-01,Processed
Negative TDS,Negative TDS,Manager,Sales,JNET,FY 2025-26,June,New,-500,Monthly TDS for June 2025,HR Admin,2025-06-01,Processed`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taxes_upload_template.csv";
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
        setTaxData(processedData);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string): TaxData[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: TaxData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const tax: TaxData = {
        id: `TDS_${i.toString().padStart(3, "0")}`,
        empId: values[0] || "",
        name: values[1] || "",
        designation: values[2] || "",
        department: values[3] || "",
        businessUnit: values[4] || "",
        fiscalYear: values[5] || "",
        month: values[6] || "",
        taxRegime: values[7] || "",
        tdsAmount: parseInt(values[8]) || 0,
        notes: values[9] || "",
        uploadedBy: values[10] || "",
        uploadedDate: values[11] || "",
        status: values[12] || "",
        errors: [],
        isValid: true,
      };

      // Validate the data
      const errors: string[] = [];

      if (!tax.empId) {
        errors.push("Employee ID is required");
      }

      if (!tax.name) {
        errors.push("Name is required");
      }

      if (!tax.designation) {
        errors.push("Designation is required");
      }

      if (!tax.department) {
        errors.push("Department is required");
      }

      if (!tax.businessUnit) {
        errors.push("Business Unit is required");
      } else if (!["JNET", "Telecom"].includes(tax.businessUnit)) {
        errors.push("Business Unit must be either 'JNET' or 'Telecom'");
      }

      if (!tax.fiscalYear) {
        errors.push("Fiscal Year is required");
      } else if (!tax.fiscalYear.startsWith("FY ")) {
        errors.push("Fiscal Year must start with 'FY '");
      }

      if (!tax.month) {
        errors.push("Month is required");
      }

      if (!tax.taxRegime) {
        errors.push("Tax Regime is required");
      } else if (!["New", "Old"].includes(tax.taxRegime)) {
        errors.push("Tax Regime must be either 'New' or 'Old'");
      }

      if (tax.tdsAmount < 0) {
        errors.push("TDS Amount cannot be negative");
      }

      if (!tax.uploadedBy) {
        errors.push("Uploaded By is required");
      }

      if (!tax.uploadedDate) {
        errors.push("Uploaded Date is required");
      }

      if (!tax.status) {
        errors.push("Status is required");
      } else if (!["Processed", "Pending", "Failed"].includes(tax.status)) {
        errors.push("Status must be one of: Processed, Pending, Failed");
      }

      tax.errors = errors;
      tax.isValid = errors.length === 0;
      data.push(tax);
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
    const validTaxes = taxData.filter((tax) => tax.isValid);
    console.log("Saving valid tax records:", validTaxes);
    onClose();
  };

  const handleDownloadErrorRecords = () => {
    const errorTaxes = taxData.filter((tax) => !tax.isValid);

    if (errorTaxes.length === 0) {
      alert("No error records to download");
      return;
    }

    // Create CSV with error records
    const csvContent = `Emp ID,Name,Designation,Department,Business Unit,Fiscal Year,Month,Tax Regime,TDS Amount,Notes,Uploaded By,Uploaded Date,Status,Errors
${errorTaxes
  .map(
    (tax) =>
      `"${tax.empId}","${tax.name}","${tax.designation}","${tax.department}","${tax.businessUnit}","${tax.fiscalYear}","${tax.month}","${tax.taxRegime}","${tax.tdsAmount}","${tax.notes}","${tax.uploadedBy}","${tax.uploadedDate}","${tax.status}","${tax.errors.join("; ")}"`,
  )
  .join("\n")}`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taxes_error_records_${new Date().toISOString().split("T")[0]}.csv`;
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

  const filteredTaxData = (() => {
    switch (filterType) {
      case "valid":
        return taxData.filter((tax) => tax.isValid);
      case "error":
        return taxData.filter((tax) => !tax.isValid);
      default:
        return taxData;
    }
  })();

  // Pagination logic
  const totalPages = Math.ceil(filteredTaxData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredTaxData.slice(startIndex, endIndex);

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
  }, [filterType, taxData.length]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Bulk Upload Taxes</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
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
                      ? "text-blue-600 font-semibold"
                      : "text-slate-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === "completed"
                      ? "bg-green-100 text-green-600"
                      : status === "current"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-sm font-medium">{title}</span>
                {step < 3 && <ArrowRight className="h-4 w-4 text-slate-300" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Step 1: Download Template */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                  Step 1: Download Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Download the standard taxes upload template and fill in the
                  required details.
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
          <div className="max-w-2xl mx-auto space-y-6">
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
                      onClick={() => setTaxData(mockTaxData)}
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
                      {filteredTaxData.length}{" "}
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
                          {taxData.filter((tax) => !tax.isValid).length} Errors
                        </Badge>
                        <Badge variant="default">
                          {taxData.filter((tax) => tax.isValid).length} Valid
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
                          <TableHead>Fiscal Year</TableHead>
                          <TableHead>Month</TableHead>
                          <TableHead>Tax Regime</TableHead>
                          <TableHead>TDS Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Errors</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentRecords.map((tax) => (
                          <TableRow
                            key={tax.id}
                            className={!tax.isValid ? "bg-red-50" : ""}
                          >
                            <TableCell className="font-mono text-sm">
                              {tax.empId}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        !tax.name
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {tax.name || "Missing"}
                                    </span>
                                  </TooltipTrigger>
                                  {!tax.name && (
                                    <TooltipContent>
                                      <p>Name is required</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{tax.designation}</TableCell>
                            <TableCell>{tax.department}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        tax.errors.some(
                                          (error) =>
                                            error.includes("Business Unit") ||
                                            error.includes("business unit"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {tax.businessUnit}
                                    </span>
                                  </TooltipTrigger>
                                  {tax.errors.some(
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
                                        tax.errors.some(
                                          (error) =>
                                            error.includes("Fiscal Year") ||
                                            error.includes("fiscal"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {tax.fiscalYear}
                                    </span>
                                  </TooltipTrigger>
                                  {tax.errors.some(
                                    (error) =>
                                      error.includes("Fiscal Year") ||
                                      error.includes("fiscal"),
                                  ) && (
                                    <TooltipContent>
                                      <p>Fiscal Year must start with 'FY '</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{tax.month}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        tax.errors.some(
                                          (error) =>
                                            error.includes("Tax Regime") ||
                                            error.includes("tax regime"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {tax.taxRegime}
                                    </span>
                                  </TooltipTrigger>
                                  {tax.errors.some(
                                    (error) =>
                                      error.includes("Tax Regime") ||
                                      error.includes("tax regime"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Tax Regime must be either 'New' or 'Old'
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
                                        tax.errors.some(
                                          (error) =>
                                            error.includes("TDS Amount") ||
                                            error.includes("negative"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      ₹{tax.tdsAmount.toLocaleString()}
                                    </span>
                                  </TooltipTrigger>
                                  {tax.errors.some(
                                    (error) =>
                                      error.includes("TDS Amount") ||
                                      error.includes("negative"),
                                  ) && (
                                    <TooltipContent>
                                      <p>TDS Amount cannot be negative</p>
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
                                        tax.errors.some(
                                          (error) =>
                                            error.includes("Status") ||
                                            error.includes("status"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {tax.status}
                                    </span>
                                  </TooltipTrigger>
                                  {tax.errors.some(
                                    (error) =>
                                      error.includes("Status") ||
                                      error.includes("status"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Status must be one of: Processed,
                                        Pending, Failed
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              {tax.errors.length > 0 ? (
                                <div className="space-y-1">
                                  {tax.errors.map((error, index) => (
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
                              {tax.isValid ? (
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
                {filteredTaxData.length > recordsPerPage && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredTaxData.length)} of{" "}
                      {filteredTaxData.length} records
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
                disabled={!uploadedFile && taxData.length === 0}
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
