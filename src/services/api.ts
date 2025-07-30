import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "@/lib/config";

// =============================================================================
// API SERVICE CONFIGURATION
// =============================================================================

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// =============================================================================
// AXIOS INSTANCE CONFIGURATION
// =============================================================================

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.apiTimeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // =============================================================================
  // REQUEST INTERCEPTOR
  // =============================================================================
  instance.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add tenant information
      config.headers["X-Tenant-ID"] = config.tenantId || "default";

      // Log request in development
      if (config.isDevelopment && config.features.debugMode) {
        console.log("🚀 API Request:", {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          headers: config.headers,
        });
      }

      return config;
    },
    (error) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    },
  );

  // =============================================================================
  // RESPONSE INTERCEPTOR
  // =============================================================================
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (config.isDevelopment && config.features.debugMode) {
        console.log("✅ API Response:", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    (error) => {
      // Handle different types of errors
      const apiError: ApiError = {
        message: "An unexpected error occurred",
        status: error.response?.status || 500,
        code: error.code,
        details: error.response?.data,
      };

      // Handle specific error types
      if (error.response) {
        // Server responded with error status
        apiError.message =
          error.response.data?.message || `HTTP ${error.response.status}`;
        apiError.status = error.response.status;
        apiError.details = error.response.data;

        // Handle specific status codes
        switch (error.response.status) {
          case 401:
            apiError.message = "Authentication required";
            // Redirect to login or refresh token
            handleAuthError();
            break;
          case 403:
            apiError.message = "Access denied";
            break;
          case 404:
            apiError.message = "Resource not found";
            break;
          case 422:
            apiError.message = "Validation error";
            break;
          case 500:
            apiError.message = "Server error";
            break;
        }
      } else if (error.request) {
        // Network error
        apiError.message = "Network error - please check your connection";
        apiError.status = 0;
      } else {
        // Other error
        apiError.message = error.message || "Request failed";
      }

      console.error("❌ API Error:", apiError);
      return Promise.reject(apiError);
    },
  );

  return instance;
};

// =============================================================================
// AUTHENTICATION ERROR HANDLER
// =============================================================================

const handleAuthError = () => {
  // Clear stored authentication
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");

  // Redirect to login page
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// =============================================================================
// API INSTANCE
// =============================================================================

export const apiClient = createApiInstance();

// =============================================================================
// API METHODS
// =============================================================================

export const apiService = {
  // GET request
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  // POST request
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PUT request
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PATCH request
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // DELETE request
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },

  // Upload file
  async upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<T>>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(progress);
        }
      },
    });

    return response.data;
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const createApiUrl = (endpoint: string): string => {
  return endpoint.startsWith("http")
    ? endpoint
    : `${config.apiBaseUrl}${endpoint}`;
};

export const createTenantApiUrl = (endpoint: string): string => {
  const tenantEndpoint = `/tenant/${config.tenantId}${endpoint}`;
  return createApiUrl(tenantEndpoint);
};

// =============================================================================
// ERROR HELPERS
// =============================================================================

export const isApiError = (error: any): error is ApiError => {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.status === "number"
  );
};

export const getErrorMessage = (error: any): string => {
  if (isApiError(error)) {
    return error.message;
  }
  return error?.message || "An unexpected error occurred";
};
