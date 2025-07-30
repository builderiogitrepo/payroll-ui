import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiService,
  ApiResponse,
  ApiError,
  isApiError,
  getErrorMessage,
} from "./api";
import { queryKeys, queryOptions } from "./queryClient";

// =============================================================================
// DASHBOARD TYPES
// =============================================================================

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  departments: number;
  locations: number;
  pendingApprovals: number;
  recentHires: number;
  upcomingRetirements: number;
  turnoverRate: number;
}

export interface PayrollStats {
  currentMonth: {
    totalGross: number;
    totalNet: number;
    totalDeductions: number;
    averagePerEmployee: number;
  };
  previousMonth: {
    totalGross: number;
    totalNet: number;
    totalDeductions: number;
    averagePerEmployee: number;
  };
  growth: {
    grossGrowth: number;
    netGrowth: number;
    employeeGrowth: number;
  };
}

export interface AttendanceStats {
  currentMonth: {
    averageAttendance: number;
    totalPresentDays: number;
    totalAbsentDays: number;
    overtimeHours: number;
    lateArrivals: number;
  };
  previousMonth: {
    averageAttendance: number;
    totalPresentDays: number;
    totalAbsentDays: number;
    overtimeHours: number;
    lateArrivals: number;
  };
  trends: {
    attendanceTrend: number;
    overtimeTrend: number;
    lateArrivalTrend: number;
  };
}

export interface DepartmentStats {
  name: string;
  employees: number;
  avgSalary: number;
  attendance: number;
  growth: number;
  budget: number;
  budgetUtilization: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  designation: string;
  department: string;
  performance: number;
  salary: number;
  avatar?: string;
  achievements: string[];
  lastReviewDate: string;
}

export interface RecentActivity {
  id: string;
  type: "payroll" | "employee" | "attendance" | "system" | "approval";
  message: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  userId?: string;
  userName?: string;
  details?: any;
}

export interface KPIMetrics {
  employeeRetention: number;
  averageTenure: number;
  satisfactionScore: number;
  productivityIndex: number;
  costPerEmployee: number;
  revenuePerEmployee: number;
  trainingCompletion: number;
  safetyIncidents: number;
}

export interface DashboardData {
  stats: DashboardStats;
  payroll: PayrollStats;
  attendance: AttendanceStats;
  departments: DepartmentStats[];
  topPerformers: TopPerformer[];
  recentActivities: RecentActivity[];
  kpis: KPIMetrics;
  lastUpdated: string;
}

// =============================================================================
// DASHBOARD API ENDPOINTS
// =============================================================================

const DASHBOARD_ENDPOINTS = {
  overview: "/dashboard/overview",
  stats: "/dashboard/stats",
  payroll: "/dashboard/payroll",
  attendance: "/dashboard/attendance",
  departments: "/dashboard/departments",
  performers: "/dashboard/top-performers",
  activities: "/dashboard/recent-activities",
  kpis: "/dashboard/kpis",
} as const;

// =============================================================================
// DASHBOARD SERVICE FUNCTIONS
// =============================================================================

export const dashboardService = {
  // Get complete dashboard data
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return apiService.get<DashboardData>(DASHBOARD_ENDPOINTS.overview);
  },

  // Get dashboard statistics
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiService.get<DashboardStats>(DASHBOARD_ENDPOINTS.stats);
  },

  // Get payroll statistics
  async getPayrollStats(): Promise<ApiResponse<PayrollStats>> {
    return apiService.get<PayrollStats>(DASHBOARD_ENDPOINTS.payroll);
  },

  // Get attendance statistics
  async getAttendanceStats(): Promise<ApiResponse<AttendanceStats>> {
    return apiService.get<AttendanceStats>(DASHBOARD_ENDPOINTS.attendance);
  },

  // Get department statistics
  async getDepartmentStats(): Promise<ApiResponse<DepartmentStats[]>> {
    return apiService.get<DepartmentStats[]>(DASHBOARD_ENDPOINTS.departments);
  },

  // Get top performers
  async getTopPerformers(
    limit: number = 10,
  ): Promise<ApiResponse<TopPerformer[]>> {
    return apiService.get<TopPerformer[]>(
      `${DASHBOARD_ENDPOINTS.performers}?limit=${limit}`,
    );
  },

  // Get recent activities
  async getRecentActivities(
    limit: number = 20,
  ): Promise<ApiResponse<RecentActivity[]>> {
    return apiService.get<RecentActivity[]>(
      `${DASHBOARD_ENDPOINTS.activities}?limit=${limit}`,
    );
  },

  // Get KPI metrics
  async getKPIMetrics(): Promise<ApiResponse<KPIMetrics>> {
    return apiService.get<KPIMetrics>(DASHBOARD_ENDPOINTS.kpis);
  },
};

// =============================================================================
// TANSTACK QUERY HOOKS
// =============================================================================

// Hook to get complete dashboard data
export const useDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: async () => {
      const response = await dashboardService.getDashboardData();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: async () => {
      const response = await dashboardService.getDashboardStats();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get payroll statistics
export const usePayrollStats = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "payroll"],
    queryFn: async () => {
      const response = await dashboardService.getPayrollStats();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get attendance statistics
export const useAttendanceStats = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "attendance"],
    queryFn: async () => {
      const response = await dashboardService.getAttendanceStats();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get department statistics
export const useDepartmentStats = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "departments"],
    queryFn: async () => {
      const response = await dashboardService.getDepartmentStats();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get top performers
export const useTopPerformers = (limit: number = 10) => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "performers", limit],
    queryFn: async () => {
      const response = await dashboardService.getTopPerformers(limit);
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get recent activities
export const useRecentActivities = (limit: number = 20) => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "activities", limit],
    queryFn: async () => {
      const response = await dashboardService.getRecentActivities(limit);
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get KPI metrics
export const useKPIMetrics = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.reports(),
    queryFn: async () => {
      const response = await dashboardService.getKPIMetrics();
      return response.data;
    },
    ...queryOptions.dashboard,
  });
};

// =============================================================================
// UTILITY HOOKS
// =============================================================================

// Hook to get department performance
export const useDepartmentPerformance = (departmentName: string) => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "department", departmentName],
    queryFn: async () => {
      const response = await dashboardService.getDepartmentStats();
      const department = response.data.find(
        (dept) => dept.name === departmentName,
      );
      return department;
    },
    enabled: !!departmentName,
    ...queryOptions.detail,
  });
};

// Hook to get employee count trends
export const useEmployeeCountTrends = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "employee-trends"],
    queryFn: async () => {
      const response = await dashboardService.getDashboardStats();
      return {
        total: response.data.totalEmployees,
        active: response.data.activeEmployees,
        growth: response.data.totalEmployees - response.data.activeEmployees,
      };
    },
    ...queryOptions.dashboard,
  });
};

// Hook to get payroll trends
export const usePayrollTrends = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.all, "payroll-trends"],
    queryFn: async () => {
      const response = await dashboardService.getPayrollStats();
      return {
        current: response.data.currentMonth.totalGross,
        previous: response.data.previousMonth.totalGross,
        growth: response.data.growth.grossGrowth,
      };
    },
    ...queryOptions.dashboard,
  });
};

// =============================================================================
// ERROR HANDLING UTILITIES
// =============================================================================

export const getDashboardErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  return getErrorMessage(error);
};

// =============================================================================
// CACHE UTILITIES
// =============================================================================

export const dashboardCacheUtils = {
  // Prefetch dashboard data
  prefetchDashboard: async () => {
    const queryClient = useQueryClient();
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.all,
      queryFn: async () => {
        const response = await dashboardService.getDashboardData();
        return response.data;
      },
      ...queryOptions.dashboard,
    });
  },

  // Prefetch dashboard stats
  prefetchDashboardStats: async () => {
    const queryClient = useQueryClient();
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.stats(),
      queryFn: async () => {
        const response = await dashboardService.getDashboardStats();
        return response.data;
      },
      ...queryOptions.dashboard,
    });
  },

  // Invalidate dashboard cache
  invalidateDashboard: () => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
  },

  // Invalidate specific dashboard section
  invalidateDashboardSection: (section: string) => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({
      queryKey: [...queryKeys.dashboard.all, section],
    });
  },
};
