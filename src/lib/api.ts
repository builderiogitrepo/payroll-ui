import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config, getApiUrl, getTenantApiUrl } from "./config";

// Base API configuration
const API_BASE_URL = config.apiBaseUrl;

// Generic API client
const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

// Employee types
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
}

// Employee API hooks
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => apiClient.get<Employee[]>("/employees"),
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiClient.get<Employee>(`/employees/${id}`),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: Omit<Employee, "id">) =>
      apiClient.post<Employee>("/employees", employee),
    onSuccess: () => {
      // Invalidate and refetch employees list
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...employee }: Employee) =>
      apiClient.put<Employee>(`/employees/${id}`, employee),
    onSuccess: (data) => {
      // Update the cache with the new data
      queryClient.setQueryData(["employee", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/employees/${id}`),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ["employee", id] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

// Dashboard types
export interface DashboardStats {
  totalEmployees: number;
  totalPayroll: number;
  pendingApprovals: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => apiClient.get<DashboardStats>("/dashboard/stats"),
  });
};

// Attendance types
export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late" | "half-day";
}

export const useAttendance = (date?: string) => {
  return useQuery({
    queryKey: ["attendance", date],
    queryFn: () =>
      apiClient.get<Attendance[]>(`/attendance${date ? `?date=${date}` : ""}`),
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attendance: Omit<Attendance, "id">) =>
      apiClient.post<Attendance>("/attendance", attendance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
};

// Export the API client for direct use if needed
export { apiClient };
