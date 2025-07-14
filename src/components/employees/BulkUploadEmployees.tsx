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
  Users,
  Building,
  Mail,
  Phone,
  Calendar,
  IndianRupee,
  X,
} from "lucide-react";

interface BulkUploadEmployeesProps {
  onClose: () => void;
}

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  businessUnit: string;
  joiningDate: string;
  salary: number;
  errors: string[];
  isValid: boolean;
}

export function BulkUploadEmployees({ onClose }: BulkUploadEmployeesProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "valid" | "error">(
    "all",
  );
  const recordsPerPage = 10;

  // Mock data for demonstration
  const mockEmployeeData: EmployeeData[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+91 9876543210",
      department: "Technology",
      designation: "Software Engineer",
      businessUnit: "JNET",
      joiningDate: "2024-01-15",
      salary: 1200000,
      errors: [],
      isValid: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "invalid-email",
      phone: "+91 9876543211",
      department: "Sales",
      designation: "Sales Executive",
      businessUnit: "Telecom",
      joiningDate: "2024-02-01",
      salary: 800000,
      errors: ["Invalid email format"],
      isValid: false,
    },
    {
      id: "3",
      name: "",
      email: "mike.johnson@company.com",
      phone: "+91 9876543212",
      department: "Marketing",
      designation: "Marketing Manager",
      businessUnit: "JNET",
      joiningDate: "2024-03-01",
      salary: 1500000,
      errors: ["Name is required"],
      isValid: false,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "+91 9876543213",
      department: "Technology",
      designation: "Team Lead",
      businessUnit: "JNET",
      joiningDate: "2024-01-20",
      salary: 1800000,
      errors: [],
      isValid: true,
    },
    {
      id: "5",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@company.com",
      phone: "9876543214",
      department: "Sales",
      designation: "Sales Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-02-15",
      salary: 1400000,
      errors: ["Phone number must include country code (+91)"],
      isValid: false,
    },
    {
      id: "6",
      name: "Priya Sharma",
      email: "priya.sharma@company.com",
      phone: "+91 9876543215",
      department: "Human Resources",
      designation: "HR Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-03-10",
      salary: 900000,
      errors: [],
      isValid: true,
    },
    {
      id: "7",
      name: "David Brown",
      email: "david.brown@company.com",
      phone: "+91 9876543216",
      department: "Finance",
      designation: "Financial Analyst",
      businessUnit: "JNET",
      joiningDate: "2024-01-25",
      salary: 1100000,
      errors: [],
      isValid: true,
    },
    {
      id: "8",
      name: "Lisa Chen",
      email: "lisa.chen@company.com",
      phone: "+91 9876543217",
      department: "Operations",
      designation: "Operations Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-02-28",
      salary: 1600000,
      errors: [],
      isValid: true,
    },
    {
      id: "9",
      name: "Amit Patel",
      email: "amit.patel@company.com",
      phone: "+91 9876543218",
      department: "Technology",
      designation: "DevOps Engineer",
      businessUnit: "JNET",
      joiningDate: "2024-03-05",
      salary: 1300000,
      errors: [],
      isValid: true,
    },
    {
      id: "10",
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      phone: "+91 9876543219",
      department: "Customer Support",
      designation: "Support Specialist",
      businessUnit: "Telecom",
      joiningDate: "2024-01-30",
      salary: 700000,
      errors: [],
      isValid: true,
    },
    {
      id: "11",
      name: "Kumar Singh",
      email: "kumar.singh@company.com",
      phone: "+91 9876543220",
      department: "Technology",
      designation: "QA Engineer",
      businessUnit: "JNET",
      joiningDate: "2024-02-10",
      salary: 1000000,
      errors: [],
      isValid: true,
    },
    {
      id: "12",
      name: "Emily Johnson",
      email: "emily.johnson@company.com",
      phone: "+91 9876543221",
      department: "Marketing",
      designation: "Digital Marketing Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-03-15",
      salary: 950000,
      errors: [],
      isValid: true,
    },
    {
      id: "13",
      name: "Rahul Verma",
      email: "rahul.verma@company.com",
      phone: "+91 9876543222",
      department: "Sales",
      designation: "Business Development Executive",
      businessUnit: "Telecom",
      joiningDate: "2024-01-12",
      salary: 850000,
      errors: [],
      isValid: true,
    },
    {
      id: "14",
      name: "Sophie Turner",
      email: "sophie.turner@company.com",
      phone: "+91 9876543223",
      department: "Technology",
      designation: "UI/UX Designer",
      businessUnit: "JNET",
      joiningDate: "2024-02-20",
      salary: 1200000,
      errors: [],
      isValid: true,
    },
    {
      id: "15",
      name: "Vikram Malhotra",
      email: "vikram.malhotra@company.com",
      phone: "+91 9876543224",
      department: "Finance",
      designation: "Senior Accountant",
      businessUnit: "JNET",
      joiningDate: "2024-03-08",
      salary: 1050000,
      errors: [],
      isValid: true,
    },
    {
      id: "16",
      name: "Jessica Lee",
      email: "jessica.lee@company.com",
      phone: "+91 9876543225",
      department: "Human Resources",
      designation: "Recruitment Specialist",
      businessUnit: "Telecom",
      joiningDate: "2024-01-18",
      salary: 800000,
      errors: [],
      isValid: true,
    },
    {
      id: "17",
      name: "Arun Kumar",
      email: "arun.kumar@company.com",
      phone: "+91 9876543226",
      department: "Operations",
      designation: "Logistics Coordinator",
      businessUnit: "Telecom",
      joiningDate: "2024-02-25",
      salary: 750000,
      errors: [],
      isValid: true,
    },
    {
      id: "18",
      name: "Nina Rodriguez",
      email: "nina.rodriguez@company.com",
      phone: "+91 9876543227",
      department: "Customer Support",
      designation: "Team Lead",
      businessUnit: "Telecom",
      joiningDate: "2024-03-12",
      salary: 1100000,
      errors: [],
      isValid: true,
    },
    {
      id: "19",
      name: "Suresh Reddy",
      email: "suresh.reddy@company.com",
      phone: "+91 9876543228",
      department: "Technology",
      designation: "System Administrator",
      businessUnit: "JNET",
      joiningDate: "2024-01-22",
      salary: 1150000,
      errors: [],
      isValid: true,
    },
    {
      id: "20",
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      phone: "+91 9876543229",
      department: "Marketing",
      designation: "Content Strategist",
      businessUnit: "JNET",
      joiningDate: "2024-02-14",
      salary: 1000000,
      errors: [],
      isValid: true,
    },
    {
      id: "21",
      name: "Meera Iyer",
      email: "meera.iyer@company.com",
      phone: "+91 9876543230",
      department: "Finance",
      designation: "Tax Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-03-18",
      salary: 1250000,
      errors: [],
      isValid: true,
    },
    {
      id: "22",
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      phone: "+91 9876543231",
      department: "Sales",
      designation: "Regional Sales Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-01-08",
      salary: 1700000,
      errors: [],
      isValid: true,
    },
    {
      id: "23",
      name: "Anjali Desai",
      email: "anjali.desai@company.com",
      phone: "+91 9876543232",
      department: "Technology",
      designation: "Data Scientist",
      businessUnit: "JNET",
      joiningDate: "2024-02-16",
      salary: 1400000,
      errors: [],
      isValid: true,
    },
    {
      id: "24",
      name: "Michael Chang",
      email: "michael.chang@company.com",
      phone: "+91 9876543233",
      department: "Operations",
      designation: "Supply Chain Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-03-22",
      salary: 1350000,
      errors: [],
      isValid: true,
    },
    {
      id: "25",
      name: "Kavya Nair",
      email: "kavya.nair@company.com",
      phone: "+91 9876543234",
      department: "Human Resources",
      designation: "HR Manager",
      businessUnit: "JNET",
      joiningDate: "2024-01-30",
      salary: 1500000,
      errors: [],
      isValid: true,
    },
    {
      id: "26",
      name: "Daniel Kim",
      email: "daniel.kim@company.com",
      phone: "+91 9876543235",
      department: "Customer Support",
      designation: "Customer Success Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-02-28",
      salary: 1200000,
      errors: [],
      isValid: true,
    },
    {
      id: "27",
      name: "Sunita Gupta",
      email: "sunita.gupta@company.com",
      phone: "+91 9876543236",
      department: "Finance",
      designation: "Financial Controller",
      businessUnit: "JNET",
      joiningDate: "2024-03-25",
      salary: 1600000,
      errors: [],
      isValid: true,
    },
    {
      id: "28",
      name: "Chris Anderson",
      email: "chris.anderson@company.com",
      phone: "+91 9876543237",
      department: "Technology",
      designation: "Product Manager",
      businessUnit: "JNET",
      joiningDate: "2024-01-14",
      salary: 1800000,
      errors: [],
      isValid: true,
    },
    {
      id: "29",
      name: "Pooja Sharma",
      email: "pooja.sharma@company.com",
      phone: "+91 9876543238",
      department: "Marketing",
      designation: "Brand Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-02-20",
      salary: 1300000,
      errors: [],
      isValid: true,
    },
    {
      id: "30",
      name: "James Miller",
      email: "james.miller@company.com",
      phone: "+91 9876543239",
      department: "Sales",
      designation: "Enterprise Sales Executive",
      businessUnit: "Telecom",
      joiningDate: "2024-03-30",
      salary: 1450000,
      errors: [],
      isValid: true,
    },
    {
      id: "31",
      name: "Riya Kapoor",
      email: "riya.kapoor@company.com",
      phone: "+91 9876543240",
      department: "Technology",
      designation: "Frontend Developer",
      businessUnit: "JNET",
      joiningDate: "2024-01-25",
      salary: 1100000,
      errors: [],
      isValid: true,
    },
    {
      id: "32",
      name: "Tom Davis",
      email: "tom.davis@company.com",
      phone: "+91 9876543241",
      department: "Operations",
      designation: "Process Improvement Specialist",
      businessUnit: "Telecom",
      joiningDate: "2024-02-12",
      salary: 1150000,
      errors: [],
      isValid: true,
    },
    {
      id: "33",
      name: "Zara Khan",
      email: "zara.khan@company.com",
      phone: "+91 9876543242",
      department: "Human Resources",
      designation: "Learning & Development Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-03-15",
      salary: 950000,
      errors: [],
      isValid: true,
    },
    {
      id: "34",
      name: "Aditya Joshi",
      email: "aditya.joshi@company.com",
      phone: "+91 9876543243",
      department: "Customer Support",
      designation: "Technical Support Engineer",
      businessUnit: "Telecom",
      joiningDate: "2024-01-20",
      salary: 1050000,
      errors: [],
      isValid: true,
    },
    {
      id: "35",
      name: "Emma Wilson",
      email: "emma.wilson@company.com",
      phone: "+91 9876543244",
      department: "Finance",
      designation: "Investment Analyst",
      businessUnit: "JNET",
      joiningDate: "2024-02-18",
      salary: 1400000,
      errors: [],
      isValid: true,
    },
    {
      id: "36",
      name: "Rohan Mehta",
      email: "rohan.mehta@company.com",
      phone: "+91 9876543245",
      department: "Technology",
      designation: "Backend Developer",
      businessUnit: "JNET",
      joiningDate: "2024-03-28",
      salary: 1250000,
      errors: [],
      isValid: true,
    },
    {
      id: "37",
      name: "Laura Martinez",
      email: "laura.martinez@company.com",
      phone: "+91 9876543246",
      department: "Marketing",
      designation: "Social Media Manager",
      businessUnit: "Telecom",
      joiningDate: "2024-01-10",
      salary: 900000,
      errors: [],
      isValid: true,
    },
    {
      id: "38",
      name: "Vishal Singh",
      email: "vishal.singh@company.com",
      phone: "+91 9876543247",
      department: "Sales",
      designation: "Inside Sales Representative",
      businessUnit: "Telecom",
      joiningDate: "2024-02-22",
      salary: 750000,
      errors: [],
      isValid: true,
    },
    {
      id: "39",
      name: "Rachel Green",
      email: "rachel.green@company.com",
      phone: "+91 9876543248",
      department: "Operations",
      designation: "Quality Assurance Manager",
      businessUnit: "JNET",
      joiningDate: "2024-03-05",
      salary: 1300000,
      errors: [],
      isValid: true,
    },
    {
      id: "40",
      name: "Aarav Patel",
      email: "aarav.patel@company.com",
      phone: "+91 9876543249",
      department: "Human Resources",
      designation: "Compensation & Benefits Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-01-28",
      salary: 1100000,
      errors: [],
      isValid: true,
    },
    {
      id: "41",
      name: "Invalid Employee 1",
      email: "not-an-email",
      phone: "+91 9876543250",
      department: "Technology",
      designation: "Software Engineer",
      businessUnit: "JNET",
      joiningDate: "2024-02-05",
      salary: 1200000,
      errors: ["Invalid email format"],
      isValid: false,
    },
    {
      id: "42",
      name: "",
      email: "empty.name@company.com",
      phone: "+91 9876543251",
      department: "Sales",
      designation: "Sales Executive",
      businessUnit: "Telecom",
      joiningDate: "2024-03-10",
      salary: 800000,
      errors: ["Name is required"],
      isValid: false,
    },
    {
      id: "43",
      name: "Invalid Phone Employee",
      email: "invalid.phone@company.com",
      phone: "9876543252",
      department: "Marketing",
      designation: "Marketing Specialist",
      businessUnit: "JNET",
      joiningDate: "2024-01-15",
      salary: 950000,
      errors: ["Phone number must include country code (+91)"],
      isValid: false,
    },
    {
      id: "46",
      name: "Phone with Letters",
      email: "phone.letters@company.com",
      phone: "+91 abc123def",
      department: "Technology",
      designation: "Developer",
      businessUnit: "JNET",
      joiningDate: "2024-02-10",
      salary: 1200000,
      errors: [
        "Phone number must be 10 digits after +91 (no letters or special characters)",
      ],
      isValid: false,
    },
    {
      id: "47",
      name: "Invalid Business Unit",
      email: "invalid.bu@company.com",
      phone: "+91 9876543255",
      department: "Sales",
      designation: "Manager",
      businessUnit: "IT",
      joiningDate: "2024-03-15",
      salary: 1000000,
      errors: ["Business Unit must be either 'JNET' or 'Telecom'"],
      isValid: false,
    },
    {
      id: "48",
      name: "Wrong Business Unit",
      email: "wrong.bu@company.com",
      phone: "+91 9876543256",
      department: "Finance",
      designation: "Analyst",
      businessUnit: "Finance",
      joiningDate: "2024-01-20",
      salary: 1100000,
      errors: ["Business Unit must be either 'JNET' or 'Telecom'"],
      isValid: false,
    },
    {
      id: "49",
      name: "Multiple Errors",
      email: "multiple.errors@company.com",
      phone: "+91 abc123",
      department: "HR",
      designation: "Specialist",
      businessUnit: "HR",
      joiningDate: "2024-02-25",
      salary: 800000,
      errors: [
        "Phone number must be 10 digits after +91 (no letters or special characters)",
        "Business Unit must be either 'JNET' or 'Telecom'",
      ],
      isValid: false,
    },
    {
      id: "44",
      name: "Invalid Date Employee",
      email: "invalid.date@company.com",
      phone: "+91 9876543253",
      department: "Finance",
      designation: "Accountant",
      businessUnit: "Telecom",
      joiningDate: "2025-01-01",
      salary: 850000,
      errors: ["Joining date cannot be in the future"],
      isValid: false,
    },
    {
      id: "45",
      name: "Low Salary Employee",
      email: "low.salary@company.com",
      phone: "+91 9876543254",
      department: "Operations",
      designation: "Operations Executive",
      businessUnit: "JNET",
      joiningDate: "2024-02-20",
      salary: 200000,
      errors: ["Salary must be at least ₹300,000 per annum"],
      isValid: false,
    },
  ];

  const handleDownloadTemplate = () => {
    // Create CSV template with sample data including some invalid examples
    const csvContent = `Name,Email,Phone,Department,Designation,Business Unit,Joining Date,Salary
John Smith,john.smith@company.com,+91 9876543210,Technology,Software Engineer,JNET,2024-01-15,1200000
Jane Doe,jane.doe@company.com,+91 9876543211,Sales,Sales Executive,Telecom,2024-02-01,800000
Mike Johnson,mike.johnson@company.com,+91 9876543212,Marketing,Marketing Manager,JNET,2024-03-01,1500000
Sarah Wilson,sarah.wilson@company.com,+91 9876543213,Technology,Team Lead,JNET,2024-01-20,1800000
Rajesh Kumar,rajesh.kumar@company.com,+91 9876543214,Sales,Sales Manager,Telecom,2024-02-15,1400000
Priya Sharma,priya.sharma@company.com,+91 9876543215,Human Resources,HR Specialist,JNET,2024-03-10,900000
David Brown,david.brown@company.com,+91 9876543216,Finance,Financial Analyst,JNET,2024-01-25,1100000
Lisa Chen,lisa.chen@company.com,+91 9876543217,Operations,Operations Manager,Telecom,2024-02-28,1600000
Amit Patel,amit.patel@company.com,+91 9876543218,Technology,DevOps Engineer,JNET,2024-03-05,1300000
Maria Garcia,maria.garcia@company.com,+91 9876543219,Customer Support,Support Specialist,Telecom,2024-01-30,700000
Invalid Phone,invalid.phone@company.com,abc123def,Technology,Developer,JNET,2024-01-15,1200000
Wrong Business Unit,wrong.bu@company.com,+91 9876543220,Sales,Manager,IT,2024-02-01,1000000
Invalid Phone 2,invalid2@company.com,9876543221,Marketing,Specialist,Telecom,2024-03-01,900000
Invalid Business Unit 2,invalid2.bu@company.com,+91 9876543222,Finance,Analyst,Finance,2024-01-20,1100000
Phone with Text,phone.text@company.com,+91 abc123,HR,Specialist,JNET,2024-02-15,800000`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_upload_template.csv";
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
        setEmployeeData(processedData);
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (csvText: string): EmployeeData[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: EmployeeData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",").map((v) => v.trim());
      const employee: EmployeeData = {
        id: i.toString(),
        name: values[0] || "",
        email: values[1] || "",
        phone: values[2] || "",
        department: values[3] || "",
        designation: values[4] || "",
        businessUnit: values[5] || "",
        joiningDate: values[6] || "",
        salary: parseInt(values[7]) || 0,
        errors: [],
        isValid: true,
      };

      // Validate the data
      const errors: string[] = [];

      if (!employee.name) {
        errors.push("Name is required");
      }

      if (!employee.email || !isValidEmail(employee.email)) {
        errors.push("Invalid email format");
      }

      if (!employee.phone) {
        errors.push("Phone number is required");
      } else if (!employee.phone.startsWith("+91")) {
        errors.push("Phone number must include country code (+91)");
      } else if (!/^\+91\s?\d{10}$/.test(employee.phone.replace(/\s/g, ""))) {
        errors.push(
          "Phone number must be 10 digits after +91 (no letters or special characters)",
        );
      }

      if (!employee.department) {
        errors.push("Department is required");
      }

      if (!employee.designation) {
        errors.push("Designation is required");
      }

      if (!employee.businessUnit) {
        errors.push("Business Unit is required");
      } else if (!["JNET", "Telecom"].includes(employee.businessUnit)) {
        errors.push("Business Unit must be either 'JNET' or 'Telecom'");
      }

      if (!employee.joiningDate) {
        errors.push("Joining Date is required");
      } else if (new Date(employee.joiningDate) > new Date()) {
        errors.push("Joining date cannot be in the future");
      }

      if (employee.salary < 300000) {
        errors.push("Salary must be at least ₹300,000 per annum");
      }

      employee.errors = errors;
      employee.isValid = errors.length === 0;
      data.push(employee);
    }

    return data;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    const validEmployees = employeeData.filter((emp) => emp.isValid);
    console.log("Saving valid employees:", validEmployees);
    onClose();
  };

  const handleDownloadErrorRecords = () => {
    const errorEmployees = employeeData.filter((emp) => !emp.isValid);

    if (errorEmployees.length === 0) {
      alert("No error records to download");
      return;
    }

    // Create CSV with error records
    const csvContent = `Name,Email,Phone,Department,Designation,Business Unit,Joining Date,Salary,Errors
${errorEmployees
  .map(
    (emp) =>
      `"${emp.name}","${emp.email}","${emp.phone}","${emp.department}","${emp.designation}","${emp.businessUnit}","${emp.joiningDate}","${emp.salary}","${emp.errors.join("; ")}"`,
  )
  .join("\n")}`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `error_records_${new Date().toISOString().split("T")[0]}.csv`;
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

  const filteredEmployeeData = (() => {
    switch (filterType) {
      case "valid":
        return employeeData.filter((emp) => emp.isValid);
      case "error":
        return employeeData.filter((emp) => !emp.isValid);
      default:
        return employeeData;
    }
  })();

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployeeData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredEmployeeData.slice(startIndex, endIndex);

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
  }, [filterType, employeeData.length]);

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
              <h1 className="text-xl font-semibold">Bulk Upload Employees</h1>
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
                  Download the standard employee upload template and fill in the
                  required details.
                </p>

                <Button
                  onClick={handleDownloadTemplate}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template (.xlsx)
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
                      onClick={() => setEmployeeData(mockEmployeeData)}
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
                      {filteredEmployeeData.length}{" "}
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
                          {employeeData.filter((emp) => !emp.isValid).length}{" "}
                          Errors
                        </Badge>
                        <Badge variant="default">
                          {employeeData.filter((emp) => emp.isValid).length}{" "}
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
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Designation</TableHead>
                          <TableHead>Business Unit</TableHead>
                          <TableHead>Joining Date</TableHead>
                          <TableHead>Salary</TableHead>
                          <TableHead>Errors</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentRecords.map((employee) => (
                          <TableRow
                            key={employee.id}
                            className={!employee.isValid ? "bg-red-50" : ""}
                          >
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        !employee.name
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {employee.name || "Missing"}
                                    </span>
                                  </TooltipTrigger>
                                  {!employee.name && (
                                    <TooltipContent>
                                      <p>Name is required</p>
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
                                        employee.errors.some(
                                          (error) =>
                                            error.includes("email") ||
                                            error.includes("Email"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {employee.email}
                                    </span>
                                  </TooltipTrigger>
                                  {employee.errors.some(
                                    (error) =>
                                      error.includes("email") ||
                                      error.includes("Email"),
                                  ) && (
                                    <TooltipContent>
                                      <p>Invalid email format</p>
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
                                        employee.errors.some(
                                          (error) =>
                                            error.includes("phone") ||
                                            error.includes("Phone"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {employee.phone}
                                    </span>
                                  </TooltipTrigger>
                                  {employee.errors.some(
                                    (error) =>
                                      error.includes("phone") ||
                                      error.includes("Phone"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Phone number must include country code
                                        (+91)
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.designation}</TableCell>
                            <TableCell>{employee.businessUnit}</TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        employee.errors.some(
                                          (error) =>
                                            error.includes("date") ||
                                            error.includes("Date"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      {employee.joiningDate}
                                    </span>
                                  </TooltipTrigger>
                                  {employee.errors.some(
                                    (error) =>
                                      error.includes("date") ||
                                      error.includes("Date"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Joining date cannot be in the future
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
                                        employee.errors.some(
                                          (error) =>
                                            error.includes("salary") ||
                                            error.includes("Salary"),
                                        )
                                          ? "bg-red-200 px-2 py-1 rounded text-sm"
                                          : ""
                                      }
                                    >
                                      ₹{(employee.salary / 100000).toFixed(1)}L
                                    </span>
                                  </TooltipTrigger>
                                  {employee.errors.some(
                                    (error) =>
                                      error.includes("salary") ||
                                      error.includes("Salary"),
                                  ) && (
                                    <TooltipContent>
                                      <p>
                                        Salary must be at least ₹300,000 per
                                        annum
                                      </p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              {employee.errors.length > 0 ? (
                                <div className="space-y-1">
                                  {employee.errors.map((error, index) => (
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
                              {employee.isValid ? (
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
                {filteredEmployeeData.length > recordsPerPage && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredEmployeeData.length)} of{" "}
                      {filteredEmployeeData.length} records
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
                disabled={!uploadedFile && employeeData.length === 0}
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
