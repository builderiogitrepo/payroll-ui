import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  // Sample login function using Redux
  const handleLogin = () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };
    dispatch(loginSuccess(mockUser));
    toast({
      title: "Login successful",
      description: `Welcome back, ${mockUser.name}!`,
    });
  };

  // Sample logout function using Redux
  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Login Success Message */}
      {isAuthenticated && user ? (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-400">
              <Check className="h-5 w-5" />
              Login Successful! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-600">
                Authenticated
              </Badge>
              <span className="text-sm text-green-700 dark:text-green-400">
                Welcome back, <strong>{user.name}</strong>! You are logged in as{" "}
                {user.role}.
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your login credentials have been successfully validated and stored
              in Redux state. You can now access all features of the payroll
              system.
            </p>
            <div className="flex space-x-2">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Redux Toolkit Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Not Authenticated</Badge>
              <span className="text-sm text-muted-foreground">
                Please login to see the success message
              </span>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleLogin}>Login</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Redux DevTools Info */}
      <Card>
        <CardHeader>
          <CardTitle>Redux DevTools Extension</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Open your browser's DevTools and look for the Redux tab to see:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Action history and state changes</li>
            <li>Time-travel debugging</li>
            <li>State inspection</li>
            <li>Action dispatching (in development)</li>
          </ul>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Current State:</p>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify({ user, isAuthenticated }, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* TanStack Query Info */}
      <Card>
        <CardHeader>
          <CardTitle>TanStack Query Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            TanStack Query is configured and ready for API calls. The setup
            includes:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Query client with retry logic</li>
            <li>Stale time and garbage collection</li>
            <li>Window focus refetch (production only)</li>
            <li>Error handling for different HTTP status codes</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            API hooks are available in <code>src/lib/api.ts</code> for when
            you're ready to make API calls.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
