// =============================================================================
// SERVICES INDEX
// =============================================================================
// This file exports all services for easy importing throughout the application

// =============================================================================
// CORE SERVICES
// =============================================================================

// API Service (axios-based)
export {
  apiService,
  apiClient,
  createApiUrl,
  createTenantApiUrl,
  isApiError,
  getErrorMessage,
  type ApiResponse,
  type ApiError,
} from "./api";

// TanStack Query Client
export {
  queryClient,
  queryKeys,
  queryOptions,
  mutationOptions,
  invalidateQueries,
} from "./queryClient";

// =============================================================================
// BUSINESS SERVICES
// =============================================================================

// Employee Service
export {
  employeeService,
  useEmployees,
  useEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  useBulkUploadEmployees,
  useExportEmployees,
  useEmployeesByDepartment,
  useActiveEmployees,
  useSearchEmployees,
  getEmployeeErrorMessage,
  employeeCacheUtils,
  type Employee,
  type CreateEmployeeRequest,
  type UpdateEmployeeRequest,
  type EmployeeFilters,
  type EmployeeListResponse,
} from "./employees";

// Dashboard Service
export {
  dashboardService,
  useDashboardData,
  useDashboardStats,
  usePayrollStats,
  useAttendanceStats,
  useDepartmentStats,
  useTopPerformers,
  useRecentActivities,
  useKPIMetrics,
  useDepartmentPerformance,
  useEmployeeCountTrends,
  usePayrollTrends,
  getDashboardErrorMessage,
  dashboardCacheUtils,
  type DashboardData,
  type DashboardStats,
  type PayrollStats,
  type AttendanceStats,
  type DepartmentStats,
  type TopPerformer,
  type RecentActivity,
  type KPIMetrics,
} from "./dashboard";

// =============================================================================
// SERVICE UTILITIES
// =============================================================================

// Common error handling
export const handleServiceError = (error: unknown, context: string): string => {
  console.error(`Error in ${context}:`, error);

  // Import the functions we need
  const { isApiError, getErrorMessage } = require("./api");

  if (isApiError(error)) {
    return (error as any).message;
  }

  return getErrorMessage(error);
};

// Service status utilities
export const getServiceStatus = (
  isLoading: boolean,
  error: unknown,
  data: any,
) => {
  if (isLoading) return "loading";
  if (error) return "error";
  if (!data) return "empty";
  return "success";
};

// =============================================================================
// SERVICE CONFIGURATION
// =============================================================================

// Service configuration for different environments
export const serviceConfig = {
  // API timeout settings
  timeouts: {
    short: 5000, // 5 seconds
    medium: 15000, // 15 seconds
    long: 30000, // 30 seconds
  },

  // Retry settings
  retries: {
    default: 3,
    critical: 5,
    none: 0,
  },

  // Cache settings
  cache: {
    short: 1 * 60 * 1000, // 1 minute
    medium: 5 * 60 * 1000, // 5 minutes
    long: 15 * 60 * 1000, // 15 minutes
  },
} as const;

// =============================================================================
// SERVICE HELPERS
// =============================================================================

// Helper to create service hooks with consistent error handling
export const createServiceHook = <T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: any,
) => {
  return {
    queryKey,
    queryFn,
    ...options,
    onError: (error: unknown) => {
      console.error("Service error:", error);
      // You can add global error handling here
      // e.g., show toast notification, log to monitoring service, etc.
    },
  };
};

// Helper to create mutation hooks with consistent success/error handling
export const createMutationHook = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: any,
) => {
  return {
    mutationFn,
    ...options,
    onSuccess: (data: TData, variables: TVariables, context: any) => {
      console.log("Mutation successful:", { data, variables });
      // You can add global success handling here
      // e.g., show success toast, update cache, etc.
    },
    onError: (error: unknown, variables: TVariables, context: any) => {
      console.error("Mutation failed:", { error, variables });
      // You can add global error handling here
      // e.g., show error toast, log to monitoring service, etc.
    },
  };
};
