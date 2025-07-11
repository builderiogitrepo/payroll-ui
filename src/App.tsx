import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import SalaryConfiguration from "./pages/SalaryConfiguration";
import PayheadMaster from "./pages/PayheadMaster";
import Adjustments from "./pages/Adjustments";
import VariablePay from "./pages/VariablePay";
import PTConfig from "./pages/PTConfig";
import StatutorySettings from "./pages/StatutorySettings";
import PaySchedule from "./pages/PaySchedule";
import TDSUpload from "./pages/TDSUpload";
import PayrollRuns from "./pages/PayrollRuns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/employees" replace />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route
              path="salary-configuration"
              element={<SalaryConfiguration />}
            />
            <Route path="payheads" element={<PayheadMaster />} />
            <Route path="adjustments" element={<Adjustments />} />
            <Route path="variable-pay" element={<VariablePay />} />
            <Route path="pt-config" element={<PTConfig />} />
            <Route path="statutory-settings" element={<StatutorySettings />} />
            <Route path="pay-schedule" element={<PaySchedule />} />
            <Route path="tds-upload" element={<TDSUpload />} />
            <Route path="payroll" element={<PayrollRuns />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
