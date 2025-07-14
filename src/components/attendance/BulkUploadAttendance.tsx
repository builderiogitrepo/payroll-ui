import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Users,
  Building,
  Calendar,
  X,
} from "lucide-react";

interface BulkUploadAttendanceProps {
  onClose: () => void;
}

interface AttendanceData {
  id: string;
  empId: string;
  name: string;
  department: string;
  designation: string;
  month: string;
  fiscalYear: string;
  totalWorkingDays: number;
  daysPresent: number;
  weeklyOffs: number;
  holidays: number;
  paidLeaves: number;
  lopDays: number;
  payableDays: number;
  businessUnit: string;
  attendancePercentage: number;
  errors: string[];
  isValid: boolean;
}

export function BulkUploadAttendance({ onClose }: BulkUploadAttendanceProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "valid" | "error">(
    "all",
  );
  const recordsPerPage = 10;

  // Mock data for demonstration
  const mockAttendanceData: AttendanceData[] = [
    {
      id: "1",
      empId: "E1001",
      name: "John Smith",
      department: "Technology",
      designation: "Software Engineer",
      month: "December",
      fiscalYear: "FY 2024-25",
      totalWorkingDays: 22,
      daysPresent: 21,
      weeklyOffs: 8,
      holidays: 1,
      paidLeaves: 1,
      lopDays: 0,
      payableDays: 22,
      businessUnit: "JNET",
      attendancePercentage: 95.45,
      errors: [],
      isValid: true,
    },
    {
      id: "2",
      empId: "E1002",
      name: "Priya Sharma",
      department: "Technology",
      designation: "Senior Developer",
      month: "December",
      fiscalYear: "FY 2024-25",
      totalWorkingDays: 22,
      daysPresent: 20,
      weeklyOffs: 8,
      holidays: 1,
      paidLeaves: 2,
      lopDays: 0,
      payableDays: 22,
      businessUnit: "JNET",
      attendancePercentage: 90.91,
      errors: [],
      isValid: true,
    },
    {
      id: "3",
      empId: "E1003",
      name: "Invalid Employee",
      department: "Sales",
      designation: "Sales Executive",
      month: "December",
      fiscalYear: "FY 2024-25",
      totalWorkingDays: 0,
      daysPresent: 25,
      weeklyOffs: 8,
      holidays: 1,
      paidLeaves: 0,
      lopDays: 0,
      payableDays: 22,
      businessUnit: "Invalid Unit",
      attendancePercentage: 0,
      errors: [
        "Total working days cannot be 0",
        "Days present cannot exceed total working days",
        "Invalid business unit",
      ],
      isValid: false,
    },
    {
      id: "4",
      empId: "E1004",
      name: "Michael Chen",
      department: "Sales",
      designation: "Sales Manager",
      month: "December",
      fiscalYear: "FY 2024-25",
      totalWorkingDays: 22,
      daysPresent: 19,
      weeklyOffs: 8,
      holidays: 1,
      paidLeaves: 0,
      lopDays: 3,
      payableDays: 19,
      businessUnit: "JNET",
      attendancePercentage: 86.36,
      errors: [],
      isValid: true,
    },
  ];

  const handleDownloadTemplate = () => {
    // Create CSV template with sample data including some invalid examples
    const csvContent = `Emp ID,Name,Department,Designation,Month,Fiscal Year,Total Working Days,Days Present,Weekly Offs,Holidays,Paid Leaves,LOP Days,Payable Days,Business Unit,Attendance %\nE1001,John Smith,Technology,Software Engineer,December,FY 2024-25,22,21,8,1,1,0,22,JNET,95.45\nE1002,Priya Sharma,Technology,Senior Developer,December,FY 2024-25,22,20,8,1,2,0,22,JNET,90.91\nE1003,Invalid Employee,Sales,Sales Executive,December,FY 2024-25,0,25,8,1,0,0,22,Invalid Unit,0"`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_upload_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const processedData = processCSVData(text);
        setAttendanceData(processedData);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string): AttendanceData[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: AttendanceData[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;
      const values = lines[i].split(",").map((v) => v.trim());
      const record: AttendanceData = {
        id: i.toString(),
        empId: values[0] || "",
        name: values[1] || "",
        department: values[2] || "",
        designation: values[3] || "",
        month: values[4] || "",
        fiscalYear: values[5] || "",
        totalWorkingDays: parseInt(values[6]) || 0,
        daysPresent: parseInt(values[7]) || 0,
        weeklyOffs: parseInt(values[8]) || 0,
        holidays: parseInt(values[9]) || 0,
        paidLeaves: parseInt(values[10]) || 0,
        lopDays: parseInt(values[11]) || 0,
        payableDays: parseInt(values[12]) || 0,
        businessUnit: values[13] || "",
        attendancePercentage: parseFloat(values[14]) || 0,
        errors: [],
        isValid: true,
      };
      // Validation
      const errors: string[] = [];
      if (!record.empId) errors.push("Emp ID is required");
      if (!record.name) errors.push("Name is required");
      if (!record.department) errors.push("Department is required");
      if (!record.designation) errors.push("Designation is required");
      if (!record.month) errors.push("Month is required");
      if (!record.fiscalYear) errors.push("Fiscal Year is required");
      if (record.totalWorkingDays <= 0)
        errors.push("Total working days cannot be 0");
      if (record.daysPresent > record.totalWorkingDays)
        errors.push("Days present cannot exceed total working days");
      if (
        !record.businessUnit ||
        !["JNET", "Telecom"].includes(record.businessUnit)
      )
        errors.push("Invalid business unit");
      // Calculate attendance %
      if (record.totalWorkingDays > 0) {
        record.attendancePercentage = parseFloat(
          ((record.daysPresent / record.totalWorkingDays) * 100).toFixed(2),
        );
      } else {
        record.attendancePercentage = 0;
      }
      record.errors = errors;
      record.isValid = errors.length === 0;
      data.push(record);
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
    const validRows = attendanceData.filter((row) => row.isValid);
    console.log("Saving valid attendance records:", validRows);
    onClose();
  };
  const handleDownloadErrorRecords = () => {
    const errorRows = attendanceData.filter((row) => !row.isValid);
    if (errorRows.length === 0) {
      alert("No error records to download");
      return;
    }
    const csvContent = `Emp ID,Name,Department,Designation,Month,Fiscal Year,Total Working Days,Days Present,Weekly Offs,Holidays,Paid Leaves,LOP Days,Payable Days,Business Unit,Attendance %,Errors\n${errorRows
      .map(
        (row) =>
          `"${row.empId}","${row.name}","${row.department}","${row.designation}","${row.month}","${row.fiscalYear}","${row.totalWorkingDays}","${row.daysPresent}","${row.weeklyOffs}","${row.holidays}","${row.paidLeaves}","${row.lopDays}","${row.payableDays}","${row.businessUnit}","${row.attendancePercentage}","${row.errors.join("; ")}"`,
      )
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_error_records_${new Date().toISOString().split("T")[0]}.csv`;
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
  const filteredAttendanceData = (() => {
    switch (filterType) {
      case "valid":
        return attendanceData.filter((row) => row.isValid);
      case "error":
        return attendanceData.filter((row) => !row.isValid);
      default:
        return attendanceData;
    }
  })();
  const totalPages = Math.ceil(filteredAttendanceData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredAttendanceData.slice(startIndex, endIndex);
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
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterType, attendanceData.length]);

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
              <Users className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Bulk Upload Attendance</h1>
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
                  Download the standard attendance upload template and fill in
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
                      accept=".csv"
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
                      onClick={() => setAttendanceData(mockAttendanceData)}
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
                      <strong>Supported formats:</strong> .csv files only
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
                      {filteredAttendanceData.length}{" "}
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
                          {attendanceData.filter((row) => !row.isValid).length}{" "}
                          Errors
                        </Badge>
                        <Badge variant="default">
                          {attendanceData.filter((row) => row.isValid).length}{" "}
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
                          <TableHead>Department</TableHead>
                          <TableHead>Designation</TableHead>
                          <TableHead>Month</TableHead>
                          <TableHead>Fiscal Year</TableHead>
                          <TableHead>Working Days</TableHead>
                          <TableHead>Present</TableHead>
                          <TableHead>Weekly Offs</TableHead>
                          <TableHead>Holidays</TableHead>
                          <TableHead>Paid Leaves</TableHead>
                          <TableHead>LOP Days</TableHead>
                          <TableHead>Payable Days</TableHead>
                          <TableHead>Business Unit</TableHead>
                          <TableHead>Attendance %</TableHead>
                          <TableHead>Errors</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentRecords.map((row) => (
                          <TableRow
                            key={row.id}
                            className={!row.isValid ? "bg-red-50" : ""}
                          >
                            <TableCell>{row.empId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.designation}</TableCell>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>{row.fiscalYear}</TableCell>
                            <TableCell>{row.totalWorkingDays}</TableCell>
                            <TableCell>{row.daysPresent}</TableCell>
                            <TableCell>{row.weeklyOffs}</TableCell>
                            <TableCell>{row.holidays}</TableCell>
                            <TableCell>{row.paidLeaves}</TableCell>
                            <TableCell>{row.lopDays}</TableCell>
                            <TableCell>{row.payableDays}</TableCell>
                            <TableCell>{row.businessUnit}</TableCell>
                            <TableCell>{row.attendancePercentage}%</TableCell>
                            <TableCell>
                              {row.errors.length > 0 ? (
                                <div className="space-y-1">
                                  {row.errors.map((error, index) => (
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
                              {row.isValid ? (
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
                {filteredAttendanceData.length > recordsPerPage && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredAttendanceData.length)} of{" "}
                      {filteredAttendanceData.length} records
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
                disabled={!uploadedFile && attendanceData.length === 0}
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
