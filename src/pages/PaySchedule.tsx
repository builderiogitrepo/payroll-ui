import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Settings,
  Save,
  Monitor,
  Phone,
  Clock,
  Plus,
  Edit3,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for pay schedule settings
interface PayScheduleSettings {
  id: string;
  businessUnit: string;
  workWeekStart: string;
  workWeekEnd: string;
  payFrequency: string;
  payDay: string;
  lastUpdated: string;
}

// Default business units
const businessUnits = [
  { value: "it-business-unit", label: "IT Business Unit", icon: Monitor },
  {
    value: "telecom-business-unit",
    label: "Telecom Business Unit",
    icon: Phone,
  },
  { value: "hr-business-unit", label: "HR Business Unit", icon: Users },
  {
    value: "finance-business-unit",
    label: "Finance Business Unit",
    icon: Building,
  },
];

const weekDays = [
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
];

const payFrequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function PaySchedule() {
  const [configurations, setConfigurations] = useState<PayScheduleSettings[]>(
    [],
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingConfig, setEditingConfig] =
    useState<PayScheduleSettings | null>(null);
  const [formData, setFormData] = useState({
    businessUnit: "",
    workWeekStart: "",
    workWeekEnd: "",
    payFrequency: "",
    payDay: "",
  });

  // Load configurations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("payScheduleConfigurations");
    if (saved) {
      setConfigurations(JSON.parse(saved));
    }
  }, []);

  // Save configurations to localStorage
  const saveConfigurations = (configs: PayScheduleSettings[]) => {
    localStorage.setItem("payScheduleConfigurations", JSON.stringify(configs));
    setConfigurations(configs);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      businessUnit: "",
      workWeekStart: "",
      workWeekEnd: "",
      payFrequency: "",
      payDay: "",
    });
    setEditingConfig(null);
  };

  // Open panel for adding new configuration
  const openAddPanel = () => {
    resetForm();
    setIsPanelOpen(true);
  };

  // Open panel for editing configuration
  const openEditPanel = (config: PayScheduleSettings) => {
    setFormData({
      businessUnit: config.businessUnit,
      workWeekStart: config.workWeekStart,
      workWeekEnd: config.workWeekEnd,
      payFrequency: config.payFrequency,
      payDay: config.payDay,
    });
    setEditingConfig(config);
    setIsPanelOpen(true);
  };

  // Close panel
  const closePanel = () => {
    setIsPanelOpen(false);
    resetForm();
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (
      !formData.businessUnit ||
      !formData.workWeekStart ||
      !formData.workWeekEnd ||
      !formData.payFrequency ||
      !formData.payDay
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Check for duplicate business unit (except when editing)
    const existingConfig = configurations.find(
      (c) => c.businessUnit === formData.businessUnit,
    );
    if (
      existingConfig &&
      (!editingConfig || editingConfig.id !== existingConfig.id)
    ) {
      alert("Configuration for this business unit already exists");
      return;
    }

    const newConfig: PayScheduleSettings = {
      id: editingConfig?.id || `config-${Date.now()}`,
      businessUnit: formData.businessUnit,
      workWeekStart: formData.workWeekStart,
      workWeekEnd: formData.workWeekEnd,
      payFrequency: formData.payFrequency,
      payDay: formData.payDay,
      lastUpdated: new Date().toLocaleString(),
    };

    let updatedConfigs;
    if (editingConfig) {
      // Update existing configuration
      updatedConfigs = configurations.map((c) =>
        c.id === editingConfig.id ? newConfig : c,
      );
    } else {
      // Add new configuration
      updatedConfigs = [...configurations, newConfig];
    }

    saveConfigurations(updatedConfigs);
    closePanel();
  };

  // Delete configuration
  const deleteConfiguration = (id: string) => {
    if (confirm("Are you sure you want to delete this configuration?")) {
      const updatedConfigs = configurations.filter((c) => c.id !== id);
      saveConfigurations(updatedConfigs);
    }
  };

  // Get business unit display info
  const getBusinessUnitInfo = (businessUnit: string) => {
    return (
      businessUnits.find((unit) => unit.value === businessUnit) ||
      businessUnits[0]
    );
  };

  // Get display label for any option
  const getDisplayLabel = (value: string, options: any[]) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isPanelOpen ? "mr-80" : "mr-0",
        )}
      >
        <div className="w-full px-4 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Pay Schedule Overview
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage payroll configurations for different business units
              </p>
            </div>
            <Button onClick={openAddPanel} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Configuration
            </Button>
          </div>

          {/* Configuration Grid */}
          {configurations.length === 0 ? (
            // Empty State
            <Card className="shadow-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No configurations yet
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6 max-w-md">
                  Get started by creating your first payroll configuration for a
                  business unit.
                </p>
                <Button
                  onClick={openAddPanel}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Configuration
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Configuration Cards Grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {configurations.map((config) => {
                const businessUnitInfo = getBusinessUnitInfo(
                  config.businessUnit,
                );
                const BusinessUnitIcon = businessUnitInfo.icon;

                return (
                  <Card
                    key={config.id}
                    className="shadow-sm border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold text-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BusinessUnitIcon className="h-4 w-4 text-blue-600" />
                          {businessUnitInfo.label}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditPanel(config)}
                            className="h-7 px-2 text-xs"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteConfiguration(config.id)}
                            className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-xs font-medium text-slate-600">
                            Work Week
                          </span>
                          <p className="text-slate-900">
                            {getDisplayLabel(config.workWeekStart, weekDays)} →{" "}
                            {getDisplayLabel(config.workWeekEnd, weekDays)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-slate-600">
                            Pay Frequency
                          </span>
                          <p className="text-slate-900">
                            {getDisplayLabel(
                              config.payFrequency,
                              payFrequencies,
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-slate-600">
                            Pay Day
                          </span>
                          <p className="text-slate-900">
                            {getDisplayLabel(config.payDay, weekDays)}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        Updated: {config.lastUpdated}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-50",
          isPanelOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={closePanel}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingConfig ? "Edit Configuration" : "Add Configuration"}
              </h2>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Business Unit */}
              <div className="space-y-2">
                <Label htmlFor="businessUnit" className="text-sm font-medium">
                  Business Unit *
                </Label>
                <Select
                  value={formData.businessUnit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, businessUnit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        <div className="flex items-center gap-2">
                          <unit.icon className="h-4 w-4" />
                          {unit.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Work Week */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Work Week *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label
                      htmlFor="workWeekStart"
                      className="text-xs text-slate-600"
                    >
                      Start Day
                    </Label>
                    <Select
                      value={formData.workWeekStart}
                      onValueChange={(value) =>
                        setFormData({ ...formData, workWeekStart: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Start day" />
                      </SelectTrigger>
                      <SelectContent>
                        {weekDays.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="workWeekEnd"
                      className="text-xs text-slate-600"
                    >
                      End Day
                    </Label>
                    <Select
                      value={formData.workWeekEnd}
                      onValueChange={(value) =>
                        setFormData({ ...formData, workWeekEnd: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="End day" />
                      </SelectTrigger>
                      <SelectContent>
                        {weekDays.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pay Frequency */}
              <div className="space-y-2">
                <Label htmlFor="payFrequency" className="text-sm font-medium">
                  Pay Frequency *
                </Label>
                <Select
                  value={formData.payFrequency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, payFrequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {payFrequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pay Day */}
              <div className="space-y-2">
                <Label htmlFor="payDay" className="text-sm font-medium">
                  Pay Day *
                </Label>
                <Select
                  value={formData.payDay}
                  onValueChange={(value) =>
                    setFormData({ ...formData, payDay: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-3">
              <Button variant="outline" onClick={closePanel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                {editingConfig ? "Update" : "Create"} Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closePanel}
        />
      )}
    </div>
  );
}
