# Services Architecture

## 🏗️ Overview

This directory contains the complete service layer for the Payroll UI application. It provides a clean, type-safe, and maintainable way to handle API calls, data caching, and state management using TanStack Query and Axios.

## 📁 Directory Structure

```
src/services/
├── api.ts              # Core API service with axios configuration
├── queryClient.ts      # TanStack Query client configuration
├── employees.ts        # Employee-related services and hooks
├── dashboard.ts        # Dashboard-related services and hooks
├── index.ts           # Service exports and utilities
└── README.md          # This documentation
```

## 🔧 Core Services

### API Service (`api.ts`)

The foundation of all API communication using Axios with comprehensive error handling and interceptors.

#### Features:

- **Axios Instance**: Configured with base URL, timeouts, and headers
- **Request Interceptors**: Automatic token injection and tenant headers
- **Response Interceptors**: Error handling and logging
- **Authentication**: Automatic token management and auth error handling
- **Tenant Support**: Multi-tenant API routing
- **File Upload**: Support for file uploads with progress tracking

#### Usage:

```typescript
import { apiService } from "@/services";

// GET request
const response = await apiService.get<User[]>("/users");

// POST request
const newUser = await apiService.post<User>("/users", userData);

// File upload with progress
const uploadResult = await apiService.upload<UploadResponse>(
  "/upload",
  file,
  (progress) => console.log(`Upload: ${progress}%`),
);
```

### Query Client (`queryClient.ts`)

Centralized TanStack Query configuration with environment-specific settings.

#### Features:

- **Smart Retry Logic**: Different retry strategies for different error types
- **Environment Optimization**: Production vs development settings
- **Query Keys Factory**: Type-safe query key management
- **Cache Management**: Optimized cache settings for different data types
- **Debug Logging**: Development-only query cache logging

#### Configuration:

```typescript
// Query keys for type-safe cache management
const queryKeys = {
  employees: {
    all: ["employees"],
    lists: () => [...queryKeys.employees.all, "list"],
    detail: (id: string) => [...queryKeys.employees.details(), id],
  },
};

// Query options for different data types
const queryOptions = {
  list: { staleTime: 2 * 60 * 1000, gcTime: 5 * 60 * 1000 },
  detail: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
  dashboard: { staleTime: 1 * 60 * 1000, gcTime: 2 * 60 * 1000 },
};
```

## 🏢 Business Services

### Employee Service (`employees.ts`)

Complete employee management with CRUD operations, bulk operations, and specialized queries.

#### Features:

- **CRUD Operations**: Create, read, update, delete employees
- **Bulk Operations**: Upload and export employee data
- **Filtering & Search**: Advanced filtering and search capabilities
- **Cache Management**: Optimized caching for employee data
- **Type Safety**: Full TypeScript support with comprehensive types

#### Hooks:

```typescript
// Basic CRUD
const { data: employees, isLoading } = useEmployees();
const { data: employee } = useEmployee(id);
const createMutation = useCreateEmployee();
const updateMutation = useUpdateEmployee();
const deleteMutation = useDeleteEmployee();

// Specialized queries
const activeEmployees = useActiveEmployees();
const deptEmployees = useEmployeesByDepartment("Engineering");
const searchResults = useSearchEmployees("john");

// Bulk operations
const uploadMutation = useBulkUploadEmployees();
const exportMutation = useExportEmployees();
```

#### Types:

```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  status: "active" | "inactive" | "terminated";
  // ... more fields
}

interface EmployeeFilters {
  department?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}
```

### Dashboard Service (`dashboard.ts`)

Comprehensive dashboard data management with real-time statistics and analytics.

#### Features:

- **Multi-Section Data**: Stats, payroll, attendance, departments
- **Performance Metrics**: KPI tracking and trends
- **Real-time Updates**: Optimized for dashboard refresh rates
- **Analytics Support**: Support for complex analytics queries

#### Hooks:

```typescript
// Dashboard data
const { data: dashboardData } = useDashboardData();
const { data: stats } = useDashboardStats();
const { data: payroll } = usePayrollStats();
const { data: attendance } = useAttendanceStats();

// Analytics
const { data: kpis } = useKPIMetrics();
const { data: trends } = useEmployeeCountTrends();
const { data: performers } = useTopPerformers(10);
```

#### Types:

```typescript
interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  // ... more metrics
}

interface PayrollStats {
  currentMonth: { totalGross: number; totalNet: number };
  previousMonth: { totalGross: number; totalNet: number };
  growth: { grossGrowth: number; netGrowth: number };
}
```

## 🎯 Usage Patterns

### 1. Basic Data Fetching

```typescript
import { useEmployees } from '@/services';

function EmployeeList() {
  const { data: employees, isLoading, error } = useEmployees();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {employees?.map(employee => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
}
```

### 2. Mutations with Optimistic Updates

```typescript
import { useCreateEmployee, useUpdateEmployee } from '@/services';

function EmployeeForm() {
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();

  const handleSubmit = (data: CreateEmployeeRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Employee created successfully!');
      },
      onError: (error) => {
        toast.error(`Failed to create employee: ${error.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 3. Advanced Filtering

```typescript
import { useEmployees } from '@/services';

function FilteredEmployeeList() {
  const [filters, setFilters] = useState<EmployeeFilters>({
    department: 'Engineering',
    status: 'active',
    search: '',
    page: 1,
    limit: 20
  });

  const { data, isLoading } = useEmployees(filters);

  return (
    <div>
      {/* Filter controls */}
      <FilterControls filters={filters} onChange={setFilters} />

      {/* Employee list */}
      <EmployeeList employees={data?.employees} />

      {/* Pagination */}
      <Pagination
        current={data?.page}
        total={data?.totalPages}
        onChange={(page) => setFilters(prev => ({ ...prev, page }))}
      />
    </div>
  );
}
```

### 4. Bulk Operations

```typescript
import { useBulkUploadEmployees, useExportEmployees } from '@/services';

function BulkOperations() {
  const uploadMutation = useBulkUploadEmployees();
  const exportMutation = useExportEmployees();

  const handleFileUpload = (file: File) => {
    uploadMutation.mutate(
      { file, onProgress: (progress) => console.log(progress) },
      {
        onSuccess: (result) => {
          toast.success(`Uploaded ${result.success} employees`);
        }
      }
    );
  };

  const handleExport = () => {
    exportMutation.mutate(
      { department: 'Engineering' },
      {
        onSuccess: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'employees.xlsx';
          a.click();
        }
      }
    );
  };

  return (
    <div>
      <FileUpload onUpload={handleFileUpload} />
      <Button onClick={handleExport}>Export Employees</Button>
    </div>
  );
}
```

## 🔧 Configuration

### Environment-Specific Settings

The services automatically adapt to different environments:

```typescript
// Development: Full debugging, longer cache times
if (config.isDevelopment) {
  // Enable debug logging
  // Longer cache times for development
  // More detailed error messages
}

// Production: Optimized for performance
if (config.isProduction) {
  // Disable debug logging
  // Shorter cache times for fresh data
  // Minimal error details
}
```

### Multi-Tenant Support

All services support multi-tenant configurations:

```typescript
// Automatic tenant headers
config.headers["X-Tenant-ID"] = config.tenantId;

// Tenant-specific API URLs
const tenantUrl = createTenantApiUrl("/employees");
```

## 🛡️ Error Handling

### Comprehensive Error Management

```typescript
// Automatic error handling in hooks
const { data, error } = useEmployees();

// Manual error handling
try {
  const result = await employeeService.createEmployee(data);
} catch (error) {
  if (isApiError(error)) {
    console.error("API Error:", error.message);
  } else {
    console.error("Unknown Error:", error);
  }
}
```

### Error Types

```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}
```

## 📊 Performance Optimization

### Caching Strategy

- **List Queries**: 2-minute stale time, 5-minute garbage collection
- **Detail Queries**: 5-minute stale time, 10-minute garbage collection
- **Dashboard Queries**: 1-minute stale time, 2-minute garbage collection
- **User Queries**: 10-minute stale time, 15-minute garbage collection

### Smart Retry Logic

- **4xx Errors**: No retry (client errors)
- **5xx Errors**: Retry up to 3 times with exponential backoff
- **Network Errors**: Retry with exponential backoff

### Background Refetching

- **Window Focus**: Only in production for performance
- **Network Reconnect**: Always enabled
- **Stale Data**: Automatic background refetching

## 🔄 Cache Management

### Manual Cache Control

```typescript
import { invalidateQueries, employeeCacheUtils } from "@/services";

// Invalidate specific queries
invalidateQueries.employees();

// Prefetch data
await employeeCacheUtils.prefetchEmployee("123");

// Update cache manually
queryClient.setQueryData(queryKeys.employees.detail("123"), updatedEmployee);
```

### Automatic Cache Updates

- **Create**: Invalidate list queries, add to detail cache
- **Update**: Update detail cache, invalidate list queries
- **Delete**: Remove from detail cache, invalidate list queries

## 🧪 Testing

### Mock Service for Testing

```typescript
// In your test files
import { employeeService } from "@/services/employees";

// Mock the service
jest.mock("@/services/employees", () => ({
  employeeService: {
    getEmployees: jest.fn(),
    createEmployee: jest.fn(),
    // ... other methods
  },
}));
```

### Testing Hooks

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useEmployees } from "@/services";

test("useEmployees fetches data", async () => {
  const { result } = renderHook(() => useEmployees());

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.data).toBeDefined();
});
```

## 📈 Monitoring and Debugging

### Development Debugging

```typescript
// Query cache events (development only)
queryClient.getQueryCache().subscribe((event) => {
  console.log("Query Cache Event:", event);
});

// Mutation cache events (development only)
queryClient.getMutationCache().subscribe((event) => {
  console.log("Mutation Cache Event:", event);
});
```

### Performance Monitoring

```typescript
// Track query performance
const { data, isLoading, isFetching } = useEmployees();

// Track mutation performance
const mutation = useCreateEmployee();
console.log(
  "Mutation status:",
  mutation.isPending,
  mutation.isSuccess,
  mutation.isError,
);
```

## 🚀 Best Practices

### 1. Use Type-Safe Hooks

```typescript
// ✅ Good: Type-safe with proper error handling
const { data: employees, isLoading, error } = useEmployees();

// ❌ Bad: Using raw API calls in components
const [employees, setEmployees] = useState([]);
useEffect(() => {
  fetch("/api/employees").then(setEmployees);
}, []);
```

### 2. Leverage Cache Management

```typescript
// ✅ Good: Let TanStack Query handle caching
const employee = useEmployee(id);

// ❌ Bad: Manual cache management
const [employee, setEmployee] = useState(null);
useEffect(() => {
  fetch(`/api/employees/${id}`).then(setEmployee);
}, [id]);
```

### 3. Handle Loading and Error States

```typescript
// ✅ Good: Proper loading and error handling
function EmployeeList() {
  const { data, isLoading, error } = useEmployees();

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <EmployeeGrid employees={data.employees} />;
}
```

### 4. Use Optimistic Updates

```typescript
// ✅ Good: Optimistic updates for better UX
const updateMutation = useUpdateEmployee();

const handleUpdate = (id: string, data: UpdateEmployeeRequest) => {
  updateMutation.mutate(
    { id, ...data },
    {
      onSuccess: () => toast.success("Updated successfully"),
      onError: () => toast.error("Update failed"),
    },
  );
};
```

## 🔮 Future Enhancements

### Planned Features

1. **Real-time Updates**: WebSocket integration for live data
2. **Offline Support**: Service worker for offline functionality
3. **Advanced Caching**: Redis-like cache strategies
4. **Analytics Integration**: Usage tracking and performance monitoring
5. **GraphQL Support**: Optional GraphQL service layer

### Extension Points

The service architecture is designed to be easily extensible:

```typescript
// Adding new services
export const newService = {
  // Service methods
};

export const useNewData = () => {
  return useQuery({
    queryKey: queryKeys.newData.all,
    queryFn: () => newService.getData(),
    ...queryOptions.list,
  });
};
```

---

This service architecture provides a robust, scalable, and maintainable foundation for the Payroll UI application with full TypeScript support, comprehensive error handling, and optimized performance.
