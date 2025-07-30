# Redux Toolkit & TanStack Query Setup

This project uses Redux Toolkit for state management and TanStack Query for API calls. The setup includes Redux DevTools Extension with different configurations for development and production environments.

## Redux Toolkit Setup

### Store Configuration

- **Location**: `src/store/index.ts`
- **Features**:
  - Redux DevTools Extension integration
  - Development: Full DevTools access with tracing
  - Production: Restricted DevTools with sensitive data protection
  - RTK Query integration for API calls

### Redux DevTools Extension

#### Development Environment

- Full access to all DevTools features
- Action tracing enabled
- No data encryption

#### Production Environment

- Restricted features for security
- Sensitive data protection
- Disabled features: pause, export, import, dispatch, etc.

### Usage

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, logout } from "@/store/slices/authSlice";

// In your component
const dispatch = useAppDispatch();
const { user, isAuthenticated } = useAppSelector((state) => state.auth);

// Dispatch actions
dispatch(loginSuccess(user));
dispatch(logout());
```

## TanStack Query Setup

### Query Client Configuration

- **Location**: `src/lib/queryClient.ts`
- **Features**:
  - Automatic retry logic
  - Stale time configuration
  - Garbage collection settings
  - Window focus refetch (production only)

### API Service

- **Location**: `src/lib/api.ts`
- **Features**:
  - Centralized API client
  - TypeScript support
  - Pre-built hooks for common operations
  - Error handling

### Usage

```typescript
import { useEmployees, useCreateEmployee } from "@/lib/api";

// In your component
const { data: employees, isLoading, error } = useEmployees();
const createEmployee = useCreateEmployee();

// Create employee
await createEmployee.mutateAsync(newEmployee);
```

## Combined Usage Example

The `EmployeeList.tsx` component demonstrates how to use both Redux and TanStack Query together:

- **Redux**: Authentication state management
- **TanStack Query**: API calls for employee data
- **Toast notifications**: User feedback
- **Loading states**: Proper UX handling

## Environment Variables

Add to your `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Redux DevTools Extension

### Installation

1. Install the Redux DevTools Extension in your browser
2. Open DevTools and look for the Redux tab
3. In development, you'll see full access to all features
4. In production, features are restricted for security

### Development Features

- Action history
- State inspection
- Time-travel debugging
- Action dispatching
- State persistence

### Production Restrictions

- Sensitive data is automatically redacted
- Certain features are disabled for security
- Action dispatching is disabled
- Export/import is disabled

## Best Practices

1. **Use Redux for**:

   - Global application state
   - Authentication
   - User preferences
   - Navigation state

2. **Use TanStack Query for**:

   - API calls
   - Server state management
   - Caching
   - Background updates

3. **Security**:

   - Never store sensitive data in Redux state
   - Use environment variables for API endpoints
   - Implement proper error boundaries

4. **Performance**:
   - Use React.memo for expensive components
   - Implement proper loading states
   - Cache API responses appropriately
