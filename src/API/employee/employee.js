/**
 * Employee API - Request/Response Payloads and Schemas
 * This file defines the structure for all employee-related API endpoints
 */

// ============================================================================
// REQUEST PAYLOADS
// ============================================================================

/**
 * Create Employee Request Payload
 */
export const createEmployeePayload = {
  // Basic Information
  name: "John Smith",
  dateOfBirth: "1990-05-15",
  gender: "Male", // Male, Female, Other
  maritalStatus: "Single", // Single, Married, Divorced, Widowed
  bloodGroup: "O+",
  fathersName: "Robert Smith",
  educationQualification: "Bachelor's in Computer Science",

  // Contact Information
  contactNumber: "+91 9876543210",
  personalEmail: "john.smith.personal@gmail.com",
  workEmail: "john.smith@company.com",

  // Employment Information
  businessUnit: "JNET", // JNET, Telecom
  offerType: "Direct", // Direct, Referral, Campus
  employmentType: "Full-time", // Full-time, Part-time, Contract, Intern
  designation: "Software Engineer",
  department: "Technology",
  reportingManager: "Sarah Wilson",
  dateOfJoining: "2023-01-15",

  // Telecom-specific fields (only for Telecom business unit)
  category: "Sales", // Sales, Support, Technical
  circle: "Mumbai",
  costingCircle: "Mumbai",
  baseLocation: "Andheri East",

  // JNET-specific fields (only for JNET business unit)
  location: "Mumbai",

  // Bank & Identity Details
  panCard: "ABCDE1234F",
  aadharCard: "123456789012",
  bankAccountNumber: "1234567890",
  bankName: "HDFC Bank",
  ifscCode: "HDFC0001234",

  // Statutory Details
  previousCompanyESICNumber: "123456789012345",
  previousCompanyEPFUANNumber: "123456789012",
  pfRuleType: "EPF", // EPF, VPF, NPS
  eligibleForEPS: true,

  // Salary Setup
  annualGross: 1200000,
  variablePay: 100000,
  salaryStructure: "Standard",
  basic: 600000,
  hra: 240000,
  otherAllowance: 260000,
};

/**
 * Update Employee Request Payload
 */
export const updateEmployeePayload = {
  id: "E1001", // Required for updates
  // All fields from createEmployeePayload are optional for updates
  name: "John Smith Updated",
  designation: "Senior Software Engineer",
  salary: 1400000,
  // ... other fields as needed
};

/**
 * Bulk Create Employees Request Payload
 */
export const bulkCreateEmployeesPayload = {
  employees: [
    createEmployeePayload,
    // ... more employee objects
  ],
  options: {
    skipDuplicates: true,
    validateOnly: false,
    notifyOnCompletion: true,
  },
};

/**
 * Employee Search/Filter Request Payload
 */
export const searchEmployeesPayload = {
  // Pagination
  page: 1,
  limit: 10,
  // Search
  search: "john tech mumbai", // Smart search across multiple fields
  // Filters
  filters: {
    businessUnit: ["JNET", "Telecom"],
    department: ["Technology", "Sales"],
    location: ["Mumbai", "Bangalore"],
    status: ["Active"],
    employmentType: ["Full-time"],
    joiningDateRange: {
      from: "2023-01-01",
      to: "2023-12-31",
    },
    salaryRange: {
      min: 500000,
      max: 2000000,
    },
  },
  // Sorting
  sortBy: "name", // name, joiningDate, salary, designation
  sortOrder: "asc", // asc, desc
  // Column selection
  columns: [
    "empId",
    "name",
    "designation",
    "department",
    "location",
    "status",
    "salary",
  ],
};

/**
 * Employee Bulk Actions Request Payload
 */
export const bulkActionsPayload = {
  action: "activate", // activate, deactivate, delete, export, update
  employeeIds: ["E1001", "E1002", "E1003"],

  // For update action
  updateData: {
    department: "Technology",
    status: "Active",
  },

  // For export action
  exportFormat: "excel", // excel, csv, pdf
  exportColumns: ["empId", "name", "designation", "department", "salary"],
};

// ============================================================================
// RESPONSE PAYLOADS
// ============================================================================

/**
 * Create Employee Response
 */
export const createEmployeeResponse = {
  status: "success",
  message: "Employee created successfully",
  data: {
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
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  errors: null,
};

/**
 * Get Employee Response
 */
export const getEmployeeResponse = {
  status: "success",
  message: "Employee retrieved successfully",
  data: {
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
    // Additional detailed fields
    personalInfo: {
      dateOfBirth: "1990-05-15",
      gender: "Male",
      maritalStatus: "Single",
      bloodGroup: "O+",
      fathersName: "Robert Smith",
      educationQualification: "Bachelor's in Computer Science",
    },
    contactInfo: {
      personalEmail: "john.smith.personal@gmail.com",
      workEmail: "john.smith@company.com",
    },
    bankInfo: {
      panCard: "ABCDE1234F",
      aadharCard: "123456789012",
      bankAccountNumber: "1234567890",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
    },
    statutoryInfo: {
      previousCompanyESICNumber: "123456789012345",
      previousCompanyEPFUANNumber: "123456789012",
      pfRuleType: "EPF",
      eligibleForEPS: true,
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  errors: null,
};

/**
 * List Employees Response
 */
export const listEmployeesResponse = {
  status: "success",
  message: "Employees retrieved successfully",
  data: {
    employees: [
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
      // ... more employees
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 150,
      totalPages: 8,
      hasNext: true,
      hasPrev: false,
    },
    filters: {
      applied: {
        businessUnit: ["JNET"],
        department: ["Technology"],
      },
      available: {
        businessUnits: ["JNET", "Telecom"],
        departments: ["Technology", "Sales", "Operations", "HR", "Finance"],
        locations: ["Mumbai", "Bangalore", "Delhi", "Chennai", "Pune"],
        statuses: ["Active", "Inactive", "Terminated", "On Leave"],
      },
    },
    summary: {
      totalEmployees: 150,
      activeEmployees: 142,
      inactiveEmployees: 8,
      averageSalary: 1250000,
      totalSalary: 187500000,
    },
  },
  errors: null,
};

/**
 * Update Employee Response
 */
export const updateEmployeeResponse = {
  status: "success",
  message: "Employee updated successfully",
  data: {
    id: "E1001",
    empId: "E1001",
    name: "John Smith Updated",
    designation: "Senior Software Engineer",
    // ... other updated fields
    updatedAt: "2024-01-15T11:30:00Z",
  },
  errors: null,
};

/**
 * Delete Employee Response
 */
export const deleteEmployeeResponse = {
  status: "success",
  message: "Employee deleted successfully",
  data: {
    id: "E1001",
    empId: "E1001",
    deletedAt: "2024-01-15T12:30:00Z",
  },
  errors: null,
};

/**
 * Bulk Actions Response
 */
export const bulkActionsResponse = {
  status: "success",
  message: "Bulk action completed successfully",
  data: {
    action: "activate",
    totalProcessed: 3,
    successful: 3,
    failed: 0,
    results: [
      { id: "E1001", status: "success", message: "Employee activated" },
      { id: "E1002", status: "success", message: "Employee activated" },
      { id: "E1003", status: "success", message: "Employee activated" },
    ],
    summary: {
      totalEmployees: 3,
      activatedEmployees: 3,
      errors: 0,
    },
  },
  errors: null,
};

// ============================================================================
// ERROR RESPONSES
// ============================================================================

/**
 * Validation Error Response
 */
export const validationErrorResponse = {
  status: "error",
  message: "Validation failed",
  data: null,
  errors: {
    name: ["Name is required"],
    email: ["Invalid email format", "Email already exists"],
    phone: ["Phone number is required"],
    businessUnit: ["Business unit is required"],
    department: ["Department is required"],
    designation: ["Designation is required"],
    dateOfJoining: ["Joining date is required"],
    salary: ["Salary must be greater than 0"],
  },
};

/**
 * Not Found Error Response
 */
export const notFoundErrorResponse = {
  status: "error",
  message: "Employee not found",
  data: null,
  errors: {
    id: "Employee with ID E1001 not found",
  },
};

/**
 * Server Error Response
 */
export const serverErrorResponse = {
  status: "error",
  message: "Internal server error",
  data: null,
  errors: {
    server: "An unexpected error occurred. Please try again later.",
  },
};

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

/**
 * Employee Validation Schema
 */
export const employeeValidationSchema = {
  // Required fields
  required: [
    "name",
    "contactNumber",
    "workEmail",
    "businessUnit",
    "employmentType",
    "designation",
    "department",
    "dateOfJoining",
    "salary",
  ],

  // Field validations
  validations: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
      pattern: "^[a-zA-Z\\s]+$",
    },
    email: {
      type: "email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    phone: {
      type: "string",
      pattern: "^\\+91\\s[0-9]{10}$",
    },
    panCard: {
      type: "string",
      pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    },
    aadharCard: {
      type: "string",
      pattern: "^[0-9]{12}$",
    },
    salary: {
      type: "number",
      min: 100000,
      max: 10000000,
    },
    dateOfJoining: {
      type: "date",
      format: "YYYY-MM-DD",
    },
  },

  // Business unit specific validations
  businessUnitValidations: {
    JNET: {
      required: ["location"],
      optional: ["category", "circle", "costingCircle", "baseLocation"],
    },
    Telecom: {
      required: ["category", "circle", "costingCircle", "baseLocation"],
      optional: ["location"],
    },
  },
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

/**
 * Employee API Endpoints
 */
export const employeeEndpoints = {
  // CRUD Operations
  create: "POST /api/employees",
  getById: "GET /api/employees/:id",
  update: "PUT /api/employees/:id",
  delete: "DELETE /api/employees/:id",
  list: "GET /api/employees",

  // Bulk Operations
  bulkCreate: "POST /api/employees/bulk",
  bulkUpdate: "PUT /api/employees/bulk",
  bulkDelete: "DELETE /api/employees/bulk",

  // Special Operations
  search: "GET /api/employees/search",
  export: "GET /api/employees/export",
  import: "POST /api/employees/import",

  // Employee Specific
  getProfile: "GET /api/employees/:id/profile",
  updateProfile: "PUT /api/employees/:id/profile",
  getSalary: "GET /api/employees/:id/salary",
  updateSalary: "PUT /api/employees/:id/salary",

  // Lookups
  getLookups: "GET /api/employees/lookups",
  getDepartments: "GET /api/employees/departments",
  getDesignations: "GET /api/employees/designations",
  getLocations: "GET /api/employees/locations",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate Employee ID
 */
export const generateEmployeeId = (businessUnit, sequence) => {
  const prefix = businessUnit === "JNET" ? "E" : "T";
  return `${prefix}${String(sequence).padStart(4, "0")}`;
};

/**
 * Validate Employee Data
 */
export const validateEmployeeData = (data) => {
  const errors = {};

  // Check required fields
  employeeValidationSchema.required.forEach((field) => {
    if (!data[field]) {
      errors[field] = [`${field} is required`];
    }
  });

  // Check business unit specific validations
  if (data.businessUnit) {
    const validations =
      employeeValidationSchema.businessUnitValidations[data.businessUnit];
    if (validations) {
      validations.required.forEach((field) => {
        if (!data[field]) {
          errors[field] = [
            `${field} is required for ${data.businessUnit} employees`,
          ];
        }
      });
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Transform Employee Data for API
 */
export const transformEmployeeForAPI = (employeeData) => {
  return {
    ...employeeData,
    empId:
      employeeData.empId ||
      generateEmployeeId(employeeData.businessUnit, Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Transform API Response for UI
 */
export const transformAPIResponseForUI = (apiResponse) => {
  if (apiResponse.status === "success") {
    return {
      data: apiResponse.data,
      error: null,
    };
  } else {
    return {
      data: null,
      error: {
        message: apiResponse.message,
        details: apiResponse.errors,
      },
    };
  }
};

export default {
  // Payloads
  createEmployeePayload,
  updateEmployeePayload,
  bulkCreateEmployeesPayload,
  searchEmployeesPayload,
  bulkActionsPayload,

  // Responses
  createEmployeeResponse,
  getEmployeeResponse,
  listEmployeesResponse,
  updateEmployeeResponse,
  deleteEmployeeResponse,
  bulkActionsResponse,

  // Error Responses
  validationErrorResponse,
  notFoundErrorResponse,
  serverErrorResponse,

  // Schemas
  employeeValidationSchema,

  // Endpoints
  employeeEndpoints,

  // Utilities
  generateEmployeeId,
  validateEmployeeData,
  transformEmployeeForAPI,
  transformAPIResponseForUI,
};
