/**
 * API Index - Central export for all API modules
 */

// Employee API
export * from "./employee/employee.js";

// Future API modules can be added here
// export * from './payroll/payroll.js';
// export * from './attendance/attendance.js';
// export * from './salary/salary.js';
// export * from './taxes/taxes.js';
// export * from './adjustments/adjustments.js';

export default {
  // Re-export all modules for convenience
  employee: require("./employee/employee.js").default,
};
