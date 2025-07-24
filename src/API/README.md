# API Documentation

This directory contains the API payload and response structures for the Payroll UI application.

## Structure

```
src/API/
├── index.js                 # Central export file
├── README.md               # This documentation
└── employee/
    └── employee.js         # Employee API payloads and responses
```

## Employee API

### Overview

The Employee API handles all employee-related operations including CRUD operations, bulk actions, search, and validation.

### Key Features

- **Comprehensive Payloads**: Complete request/response structures for all operations
- **Validation Schemas**: Built-in validation rules and business logic
- **Error Handling**: Standardized error response formats
- **Business Unit Support**: Different validation rules for JNET and Telecom employees
- **Utility Functions**: Helper functions for data transformation and validation

### Request Payloads

#### Create Employee

```javascript
import { createEmployeePayload } from "@/API/employee/employee.js";

const payload = {
  name: "John Smith",
  businessUnit: "JNET",
  employmentType: "Full-time",
  designation: "Software Engineer",
  department: "Technology",
  // ... other fields
};
```

#### Search/Filter Employees

```javascript
import { searchEmployeesPayload } from "@/API/employee/employee.js";

const searchPayload = {
  page: 1,
  limit: 20,
  search: "john tech mumbai",
  filters: {
    businessUnit: ["JNET"],
    department: ["Technology"],
    status: ["Active"],
  },
  sortBy: "name",
  sortOrder: "asc",
};
```

#### Bulk Actions

```javascript
import { bulkActionsPayload } from "@/API/employee/employee.js";

const bulkPayload = {
  action: "activate",
  employeeIds: ["E1001", "E1002", "E1003"],
  updateData: {
    department: "Technology",
    status: "Active",
  },
};
```

### Response Formats

All API responses follow a standardized format:

```javascript
{
  status: "success" | "error",
  message: "Human readable message",
  data: { /* response data */ },
  errors: { /* validation errors */ }
}
```

#### Success Response Example

```javascript
{
  status: "success",
  message: "Employee created successfully",
  data: {
    id: "E1001",
    empId: "E1001",
    name: "John Smith",
    // ... other employee data
  },
  errors: null
}
```

#### Error Response Example

```javascript
{
  status: "error",
  message: "Validation failed",
  data: null,
  errors: {
    name: ["Name is required"],
    email: ["Invalid email format"]
  }
}
```

### Validation

The API includes comprehensive validation schemas:

#### Required Fields

- `name`: Employee full name
- `contactNumber`: Phone number (+91 format)
- `workEmail`: Company email address
- `businessUnit`: JNET or Telecom
- `employmentType`: Full-time, Part-time, Contract, Intern
- `designation`: Job title
- `department`: Department name
- `dateOfJoining`: Joining date (YYYY-MM-DD)
- `salary`: Annual salary (100K - 10M)

#### Business Unit Specific Validations

**JNET Employees:**

- Required: `location`
- Optional: `category`, `circle`, `costingCircle`, `baseLocation`

**Telecom Employees:**

- Required: `category`, `circle`, `costingCircle`, `baseLocation`
- Optional: `location`

### API Endpoints

```javascript
import { employeeEndpoints } from '@/API/employee/employee.js';

// CRUD Operations
POST   /api/employees              // Create employee
GET    /api/employees/:id          // Get employee by ID
PUT    /api/employees/:id          // Update employee
DELETE /api/employees/:id          // Delete employee
GET    /api/employees              // List employees

// Bulk Operations
POST   /api/employees/bulk         // Bulk create
PUT    /api/employees/bulk         // Bulk update
DELETE /api/employees/bulk         // Bulk delete

// Special Operations
GET    /api/employees/search       // Search employees
GET    /api/employees/export       // Export employees
POST   /api/employees/import       // Import employees

// Employee Specific
GET    /api/employees/:id/profile  // Get employee profile
PUT    /api/employees/:id/profile  // Update employee profile
GET    /api/employees/:id/salary   // Get employee salary
PUT    /api/employees/:id/salary   // Update employee salary

// Lookups
GET    /api/employees/lookups      // Get all lookups
GET    /api/employees/departments  // Get departments
GET    /api/employees/designations // Get designations
GET    /api/employees/locations    // Get locations
```

### Utility Functions

#### Validate Employee Data

```javascript
import { validateEmployeeData } from "@/API/employee/employee.js";

const validation = validateEmployeeData(employeeData);
if (!validation.isValid) {
  console.log("Validation errors:", validation.errors);
}
```

#### Generate Employee ID

```javascript
import { generateEmployeeId } from "@/API/employee/employee.js";

const empId = generateEmployeeId("JNET", 1001); // Returns "E1001"
const telecomId = generateEmployeeId("Telecom", 1001); // Returns "T1001"
```

#### Transform Data

```javascript
import {
  transformEmployeeForAPI,
  transformAPIResponseForUI,
} from "@/API/employee/employee.js";

// Transform for API
const apiData = transformEmployeeForAPI(employeeData);

// Transform API response for UI
const uiData = transformAPIResponseForUI(apiResponse);
```

### Usage Examples

#### Creating an Employee

```javascript
import {
  createEmployeePayload,
  validateEmployeeData,
} from "@/API/employee/employee.js";

const newEmployee = {
  name: "Jane Doe",
  businessUnit: "JNET",
  employmentType: "Full-time",
  designation: "Senior Developer",
  department: "Technology",
  location: "Mumbai",
  dateOfJoining: "2024-01-15",
  salary: 1500000,
  contactNumber: "+91 9876543210",
  workEmail: "jane.doe@company.com",
};

// Validate before sending
const validation = validateEmployeeData(newEmployee);
if (validation.isValid) {
  // Send to API
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEmployee),
  });
}
```

#### Searching Employees

```javascript
import { searchEmployeesPayload } from "@/API/employee/employee.js";

const searchParams = {
  page: 1,
  limit: 20,
  search: "tech mumbai",
  filters: {
    businessUnit: ["JNET"],
    department: ["Technology"],
    status: ["Active"],
  },
  sortBy: "salary",
  sortOrder: "desc",
};

const response = await fetch(
  "/api/employees/search?" + new URLSearchParams(searchParams),
);
```

### Error Handling

The API provides standardized error responses for different scenarios:

- **Validation Errors**: Field-specific validation failures
- **Not Found**: Employee not found
- **Server Errors**: Internal server errors
- **Business Logic Errors**: Domain-specific errors

### Future Enhancements

- Add TypeScript definitions
- Include more API modules (Payroll, Attendance, etc.)
- Add request/response interceptors
- Implement caching strategies
- Add API versioning support

## Contributing

When adding new API modules:

1. Create a new directory under `src/API/`
2. Follow the same structure as the employee module
3. Include comprehensive payload and response examples
4. Add validation schemas
5. Update the main index.js file
6. Update this README with documentation

## Notes

- All monetary values are in Indian Rupees (INR)
- Dates should be in ISO 8601 format (YYYY-MM-DD)
- Phone numbers should follow Indian format (+91 XXXXXXXXXX)
- Employee IDs are auto-generated based on business unit
