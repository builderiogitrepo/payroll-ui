import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiService,
  ApiResponse,
  ApiError,
  isApiError,
  getErrorMessage,
} from "./api";
import {
  queryKeys,
  queryOptions,
  mutationOptions,
  invalidateQueries,
} from "./queryClient";

// =============================================================================
// EMPLOYEE TYPES
// =============================================================================

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: "active" | "inactive" | "terminated";
  managerId?: string;
  employeeId: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  documents?: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  managerId?: string;
  employeeId: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: string;
}

export interface EmployeeFilters {
  department?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================================================================
// EMPLOYEE API ENDPOINTS
// =============================================================================

const EMPLOYEE_ENDPOINTS = {
  list: "/employees",
  detail: (id: string) => `/employees/${id}`,
  create: "/employees",
  update: (id: string) => `/employees/${id}`,
  delete: (id: string) => `/employees/${id}`,
  bulkUpload: "/employees/bulk-upload",
  export: "/employees/export",
} as const;

// =============================================================================
// EMPLOYEE SERVICE FUNCTIONS
// =============================================================================

export const employeeService = {
  // Get all employees with filters
  async getEmployees(
    filters?: EmployeeFilters,
  ): Promise<ApiResponse<EmployeeListResponse>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${EMPLOYEE_ENDPOINTS.list}?${params.toString()}`;
    return apiService.get<EmployeeListResponse>(url);
  },

  // Get single employee by ID
  async getEmployee(id: string): Promise<ApiResponse<Employee>> {
    return apiService.get<Employee>(EMPLOYEE_ENDPOINTS.detail(id));
  },

  // Create new employee
  async createEmployee(
    data: CreateEmployeeRequest,
  ): Promise<ApiResponse<Employee>> {
    return apiService.post<Employee>(EMPLOYEE_ENDPOINTS.create, data);
  },

  // Update employee
  async updateEmployee(
    id: string,
    data: UpdateEmployeeRequest,
  ): Promise<ApiResponse<Employee>> {
    return apiService.put<Employee>(EMPLOYEE_ENDPOINTS.update(id), data);
  },

  // Delete employee
  async deleteEmployee(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(EMPLOYEE_ENDPOINTS.delete(id));
  },

  // Bulk upload employees
  async bulkUploadEmployees(
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<
    ApiResponse<{ success: number; failed: number; errors: string[] }>
  > {
    return apiService.upload<{
      success: number;
      failed: number;
      errors: string[];
    }>(EMPLOYEE_ENDPOINTS.bulkUpload, file, onProgress);
  },

  // Export employees
  async exportEmployees(filters?: EmployeeFilters): Promise<Blob> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${EMPLOYEE_ENDPOINTS.export}?${params.toString()}`;
    const response = await apiService.get(url);
    return new Blob([response.data as BlobPart], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  },
};

// =============================================================================
// TANSTACK QUERY HOOKS
// =============================================================================

// Hook to get all employees with filters
export const useEmployees = (filters?: EmployeeFilters) => {
  return useQuery({
    queryKey: queryKeys.employees.list(filters || {}),
    queryFn: async () => {
      const response = await employeeService.getEmployees(filters);
      return response.data;
    },
    ...queryOptions.list,
  });
};

// Hook to get single employee by ID
export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: queryKeys.employees.detail(id),
    queryFn: async () => {
      const response = await employeeService.getEmployee(id);
      return response.data;
    },
    enabled: !!id,
    ...queryOptions.detail,
  });
};

// Hook to create employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEmployeeRequest) => {
      const response = await employeeService.createEmployee(data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch employees list
      invalidateQueries.employees();

      // Add new employee to cache
      queryClient.setQueryData(queryKeys.employees.detail(data.id), data);
    },
    onError: (error: ApiError) => {
      console.error("Failed to create employee:", error);
    },
  });
};

// Hook to update employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateEmployeeRequest) => {
      const response = await employeeService.updateEmployee(id, {
        id,
        ...data,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Update cache with new data
      queryClient.setQueryData(queryKeys.employees.detail(data.id), data);

      // Invalidate employees list
      invalidateQueries.employees();
    },
    onError: (error: ApiError) => {
      console.error("Failed to update employee:", error);
    },
  });
};

// Hook to delete employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await employeeService.deleteEmployee(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.employees.detail(id) });

      // Invalidate employees list
      invalidateQueries.employees();
    },
    onError: (error: ApiError) => {
      console.error("Failed to delete employee:", error);
    },
  });
};

// Hook to bulk upload employees
export const useBulkUploadEmployees = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => {
      const response = await employeeService.bulkUploadEmployees(
        file,
        onProgress,
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate employees list after bulk upload
      invalidateQueries.employees();
    },
    onError: (error: ApiError) => {
      console.error("Failed to bulk upload employees:", error);
    },
  });
};

// Hook to export employees
export const useExportEmployees = () => {
  return useMutation({
    mutationFn: async (filters?: EmployeeFilters) => {
      return employeeService.exportEmployees(filters);
    },
    onError: (error: ApiError) => {
      console.error("Failed to export employees:", error);
    },
  });
};

// =============================================================================
// UTILITY HOOKS
// =============================================================================

// Hook to get employees by department
export const useEmployeesByDepartment = (department: string) => {
  return useEmployees({ department });
};

// Hook to get active employees
export const useActiveEmployees = () => {
  return useEmployees({ status: "active" });
};

// Hook to search employees
export const useSearchEmployees = (search: string) => {
  return useEmployees({ search });
};

// =============================================================================
// ERROR HANDLING UTILITIES
// =============================================================================

export const getEmployeeErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  return getErrorMessage(error);
};

// =============================================================================
// CACHE UTILITIES
// =============================================================================

export const employeeCacheUtils = {
  // Prefetch employee data
  prefetchEmployee: async (id: string) => {
    const queryClient = useQueryClient();
    await queryClient.prefetchQuery({
      queryKey: queryKeys.employees.detail(id),
      queryFn: async () => {
        const response = await employeeService.getEmployee(id);
        return response.data;
      },
      ...queryOptions.detail,
    });
  },

  // Prefetch employees list
  prefetchEmployees: async (filters?: EmployeeFilters) => {
    const queryClient = useQueryClient();
    await queryClient.prefetchQuery({
      queryKey: queryKeys.employees.list(filters || {}),
      queryFn: async () => {
        const response = await employeeService.getEmployees(filters);
        return response.data;
      },
      ...queryOptions.list,
    });
  },

  // Invalidate employee cache
  invalidateEmployee: (id: string) => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: queryKeys.employees.detail(id) });
  },

  // Invalidate all employee cache
  invalidateAllEmployees: () => {
    invalidateQueries.employees();
  },
};
