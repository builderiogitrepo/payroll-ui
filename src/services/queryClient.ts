import { QueryClient } from "@tanstack/react-query";
import { config } from "@/lib/config";

// =============================================================================
// TANSTACK QUERY CLIENT CONFIGURATION
// =============================================================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before data is considered stale (5 minutes)
      staleTime: 5 * 60 * 1000,

      // Time before inactive queries are garbage collected (10 minutes)
      gcTime: 10 * 60 * 1000,

      // Retry failed requests with smart logic
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }

        // Retry up to 3 times for other errors (network, 5xx, etc.)
        return failureCount < 3;
      },

      // Refetch on window focus (only in production for performance)
      refetchOnWindowFocus: config.isProduction,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },

    mutations: {
      // Retry failed mutations (only once)
      retry: 1,

      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// =============================================================================
// QUERY KEYS FACTORY
// =============================================================================

export const queryKeys = {
  // Employee queries
  employees: {
    all: ["employees"] as const,
    lists: () => [...queryKeys.employees.all, "list"] as const,
    list: (filters: any) => [...queryKeys.employees.lists(), filters] as const,
    details: () => [...queryKeys.employees.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.employees.details(), id] as const,
  },

  // Attendance queries
  attendance: {
    all: ["attendance"] as const,
    lists: () => [...queryKeys.attendance.all, "list"] as const,
    list: (filters: any) => [...queryKeys.attendance.lists(), filters] as const,
    details: () => [...queryKeys.attendance.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.attendance.details(), id] as const,
  },

  // Dashboard queries
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
    activities: () => [...queryKeys.dashboard.all, "activities"] as const,
    reports: () => [...queryKeys.dashboard.all, "reports"] as const,
  },

  // Payroll queries
  payroll: {
    all: ["payroll"] as const,
    runs: () => [...queryKeys.payroll.all, "runs"] as const,
    run: (id: string) => [...queryKeys.payroll.runs(), id] as const,
    reports: () => [...queryKeys.payroll.all, "reports"] as const,
  },

  // User queries
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    settings: () => [...queryKeys.user.all, "settings"] as const,
  },

  // Tenant queries
  tenant: {
    all: ["tenant"] as const,
    info: () => [...queryKeys.tenant.all, "info"] as const,
    settings: () => [...queryKeys.tenant.all, "settings"] as const,
  },
} as const;

// =============================================================================
// QUERY OPTIONS FACTORY
// =============================================================================

export const queryOptions = {
  // Default options for list queries
  list: {
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  },

  // Default options for detail queries
  detail: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  },

  // Default options for dashboard queries
  dashboard: {
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 2 * 60 * 1000, // 2 minutes
  },

  // Default options for user queries
  user: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  },
} as const;

// =============================================================================
// MUTATION OPTIONS FACTORY
// =============================================================================

export const mutationOptions = {
  // Default options for create mutations
  create: {
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
    },
  },

  // Default options for update mutations
  update: {
    onSuccess: (data: any, variables: any, context: any) => {
      // Update cache with new data
      if (data?.id) {
        queryClient.setQueryData(queryKeys.employees.detail(data.id), data);
      }
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
    },
  },

  // Default options for delete mutations
  delete: {
    onSuccess: (data: any, variables: any, context: any) => {
      // Remove from cache
      if (variables?.id) {
        queryClient.removeQueries({
          queryKey: queryKeys.employees.detail(variables.id),
        });
      }
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.lists() });
    },
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const invalidateQueries = {
  // Invalidate all employee queries
  employees: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.employees.all }),

  // Invalidate all attendance queries
  attendance: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all }),

  // Invalidate all dashboard queries
  dashboard: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),

  // Invalidate all payroll queries
  payroll: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.payroll.all }),

  // Invalidate all user queries
  user: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),

  // Invalidate all tenant queries
  tenant: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.tenant.all }),

  // Invalidate all queries
  all: () => queryClient.invalidateQueries(),
} as const;

// =============================================================================
// DEBUG HELPERS (Development Only)
// =============================================================================

if (config.isDevelopment && config.features.debugMode) {
  // Log query cache changes
  queryClient.getQueryCache().subscribe((event) => {
    console.log("🔍 Query Cache Event:", {
      type: event.type,
      queryKey: event.query.queryKey,
      data: event.query.state.data,
    });
  });

  // Log mutation cache changes
  queryClient.getMutationCache().subscribe((event) => {
    console.log("🔄 Mutation Cache Event:", {
      type: event.type,
      mutationKey: event.mutation.options.mutationKey,
      variables: event.mutation.state.variables,
    });
  });
}
