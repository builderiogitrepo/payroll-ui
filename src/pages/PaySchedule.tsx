import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for pay schedule settings
interface PayScheduleSettings {
  id: string;
  businessUnit: string;
  workWeek: string[];
  salaryCalcType: string;
  orgWorkingDays?: string;
  payFrequency: string;
  payDayType: string;
  payDayValue: string;
  firstPayrollMonth: string;
  firstPayrollDate: string;
  lastUpdated: string;
}

const businessUnits = [
  { value: "it-business-unit", label: "IT Business Unit", icon: Monitor },
  {
    value: "telecom-business-unit",
    label: "Telecom Business Unit",
    icon: Phone,
  },
  { value: "hr-business-unit", label: "HR Business Unit", icon: Building },
  {
    value: "finance-business-unit",
    label: "Finance Business Unit",
    icon: Building,
  },
];

const weekDays = [
  { value: "SUN", label: "SUN" },
  { value: "MON", label: "MON" },
  { value: "TUE", label: "TUE" },
  { value: "WED", label: "WED" },
  { value: "THU", label: "THU" },
  { value: "FRI", label: "FRI" },
  { value: "SAT", label: "SAT" },
];

const payFrequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "weekly", label: "Weekly" },
];

const payrollMonths = [
  { value: "April-2025", label: "April-2025" },
  { value: "May-2025", label: "May-2025" },
  { value: "June-2025", label: "June-2025" },
];

const orgWorkingDaysOptions = ["22", "24", "26"];

function getLastWorkingDay(
  year: number,
  month: number,
  workWeek: string[],
): Date {
  // month is 1-based (April = 4)
  let d = new Date(year, month, 0); // last day of month
  while (!workWeek.includes(weekDays[d.getDay()].value)) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}

export default function PaySchedule() {
  const [configurations, setConfigurations] = useState<PayScheduleSettings[]>(
    [],
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingConfig, setEditingConfig] =
    useState<PayScheduleSettings | null>(null);
  const [formData, setFormData] = useState({
    businessUnit: "",
    workWeek: ["MON", "TUE", "WED", "THU", "FRI"],
    salaryCalcType: "actual",
    orgWorkingDays: "22",
    payFrequency: "monthly",
    payDayType: "lastWorkingDay",
    payDayValue: "1",
    firstPayrollMonth: "April-2025",
    firstPayrollDate: "",
  });
  const [calendarDates, setCalendarDates] = useState<string[]>([]);

  // Load configurations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("payScheduleConfigurations");
    if (saved) {
      setConfigurations(JSON.parse(saved));
    } else {
      // Add default configs for IT and Telecom
      const defaults = [
        {
          id: `config-it-${Date.now()}`,
          businessUnit: "it-business-unit",
          workWeek: ["MON", "TUE", "WED", "THU", "FRI"],
          salaryCalcType: "actual",
          orgWorkingDays: "22",
          payFrequency: "monthly",
          payDayType: "lastWorkingDay",
          payDayValue: "1",
          firstPayrollMonth: "April-2025",
          firstPayrollDate: "30/04/2025",
          lastUpdated: new Date().toLocaleString(),
        },
        {
          id: `config-telecom-${Date.now() + 1}`,
          businessUnit: "telecom-business-unit",
          workWeek: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
          salaryCalcType: "actual",
          orgWorkingDays: "26",
          payFrequency: "monthly",
          payDayType: "lastWorkingDay",
          payDayValue: "1",
          firstPayrollMonth: "April-2025",
          firstPayrollDate: "30/04/2025",
          lastUpdated: new Date().toLocaleString(),
        },
      ];
      localStorage.setItem(
        "payScheduleConfigurations",
        JSON.stringify(defaults),
      );
      setConfigurations(defaults);
    }
  }, []);

  // Calendar logic for pay date selection
  useEffect(() => {
    // Generate all possible pay dates for the selected month
    const [monthStr, yearStr] = formData.firstPayrollMonth.split("-");
    const month =
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(monthStr) + 1;
    const year = parseInt(yearStr, 10);
    let payDate = "";
    if (formData.payDayType === "lastWorkingDay") {
      const d = getLastWorkingDay(year, month, formData.workWeek);
      payDate = d.toLocaleDateString("en-GB");
      setCalendarDates([payDate]);
      setFormData((f) => ({ ...f, firstPayrollDate: payDate }));
    } else {
      // Specific day of month
      const d = new Date(year, month - 1, parseInt(formData.payDayValue, 10));
      // If not a working day, find previous working day
      while (!formData.workWeek.includes(weekDays[d.getDay()].value)) {
        d.setDate(d.getDate() - 1);
      }
      payDate = d.toLocaleDateString("en-GB");
      setCalendarDates([payDate]);
      setFormData((f) => ({ ...f, firstPayrollDate: payDate }));
    }
  }, [
    formData.firstPayrollMonth,
    formData.payDayType,
    formData.payDayValue,
    formData.workWeek,
  ]);

  // Save configurations to localStorage
  const saveConfigurations = (configs: PayScheduleSettings[]) => {
    localStorage.setItem("payScheduleConfigurations", JSON.stringify(configs));
    setConfigurations(configs);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      businessUnit: "",
      workWeek: ["MON", "TUE", "WED", "THU", "FRI"],
      salaryCalcType: "actual",
      orgWorkingDays: "22",
      payFrequency: "monthly",
      payDayType: "lastWorkingDay",
      payDayValue: "1",
      firstPayrollMonth: "April-2025",
      firstPayrollDate: "",
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
      workWeek: config.workWeek,
      salaryCalcType: config.salaryCalcType,
      orgWorkingDays: config.orgWorkingDays || "22",
      payFrequency: config.payFrequency,
      payDayType: config.payDayType,
      payDayValue: config.payDayValue,
      firstPayrollMonth: config.firstPayrollMonth,
      firstPayrollDate: config.firstPayrollDate,
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
      formData.workWeek.length === 0 ||
      !formData.payFrequency ||
      !formData.firstPayrollMonth ||
      !formData.firstPayrollDate
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
      workWeek: formData.workWeek,
      salaryCalcType: formData.salaryCalcType,
      orgWorkingDays:
        formData.salaryCalcType === "org" ? formData.orgWorkingDays : undefined,
      payFrequency: formData.payFrequency,
      payDayType: formData.payDayType,
      payDayValue: formData.payDayValue,
      firstPayrollMonth: formData.firstPayrollMonth,
      firstPayrollDate: formData.firstPayrollDate,
      lastUpdated: new Date().toLocaleString(),
    };
    let updatedConfigs;
    if (editingConfig) {
      updatedConfigs = configurations.map((c) =>
        c.id === editingConfig.id ? newConfig : c,
      );
    } else {
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

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "transition-all duration-200 ease-out",
          isPanelOpen ? "mr-80" : "mr-0",
        )}
      >
        <div className="w-full px-4 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Pay Schedule Overview
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage payroll configurations for different business units
              </p>
            </div>
            <Button
              onClick={openAddPanel}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add Configuration
            </Button>
          </div>

          {/* Configuration Grid */}
          {configurations.length === 0 ? (
            <Card className="shadow-sm border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No configurations yet
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
                  Get started by creating your first payroll configuration for a
                  business unit.
                </p>
                <Button
                  onClick={openAddPanel}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Add Configuration
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {configurations.map((config) => {
                const businessUnitInfo = getBusinessUnitInfo(
                  config.businessUnit,
                );
                const BusinessUnitIcon = businessUnitInfo.icon;
                return (
                  <Card
                    key={config.id}
                    className="shadow-sm border-border bg-card hover:shadow-md transition-all duration-200 ease-out hover:scale-[1.02]"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BusinessUnitIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          {businessUnitInfo.label}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditPanel(config)}
                            className="h-7 px-2 text-xs border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteConfiguration(config.id)}
                            className="h-7 px-2 text-xs text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">
                            Work Week
                          </span>
                          <p className="text-foreground">
                            {(config.workWeek || []).join(", ")}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">
                            Pay Frequency
                          </span>
                          <p className="text-foreground">
                            {config.payFrequency}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">
                            Pay Day
                          </span>
                          <p className="text-foreground">
                            {config.payDayType === "lastWorkingDay"
                              ? "Last working day"
                              : `Day ${config.payDayValue}`}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">
                            First Payroll
                          </span>
                          <p className="text-foreground">
                            {config.firstPayrollDate}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
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
          "fixed top-0 right-0 h-full w-[32rem] bg-card shadow-xl border-l border-border transform transition-transform duration-200 ease-out z-50",
          isPanelOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={closePanel}
                className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">
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

              {/* Work Week Selection */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Select your work week<span className="text-red-500">*</span>
                </Label>
                <div className="text-xs text-slate-500 mb-1">
                  The days worked in a calendar week
                </div>
                <div className="flex gap-1">
                  {weekDays.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      className={cn(
                        "px-3 py-1.5 rounded border text-xs font-medium transition-all duration-200 ease-out",
                        formData.workWeek.includes(d.value)
                          ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300"
                          : "bg-card border-border text-muted-foreground hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-600",
                      )}
                      onClick={() => {
                        setFormData((f) => {
                          const exists = f.workWeek.includes(d.value);
                          return {
                            ...f,
                            workWeek: exists
                              ? f.workWeek.filter((w) => w !== d.value)
                              : [...f.workWeek, d.value],
                          };
                        });
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Calculation Type */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Calculate monthly salary based on
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="salaryCalcType"
                      value="actual"
                      checked={formData.salaryCalcType === "actual"}
                      onChange={() =>
                        setFormData((f) => ({ ...f, salaryCalcType: "actual" }))
                      }
                    />
                    <span className="text-sm">Actual days in a month</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer ml-4">
                    <input
                      type="radio"
                      name="salaryCalcType"
                      value="org"
                      checked={formData.salaryCalcType === "org"}
                      onChange={() =>
                        setFormData((f) => ({ ...f, salaryCalcType: "org" }))
                      }
                    />
                    <span className="text-sm">Organisation working days -</span>
                    <Select
                      value={formData.orgWorkingDays}
                      onValueChange={(value) =>
                        setFormData((f) => ({ ...f, orgWorkingDays: value }))
                      }
                      disabled={formData.salaryCalcType !== "org"}
                    >
                      <SelectTrigger className="w-16 h-7 text-xs">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {orgWorkingDaysOptions.map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm">days per month</span>
                  </label>
                </div>
              </div>

              {/* Pay On */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Pay on<span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col gap-1 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payDayType"
                      value="lastWorkingDay"
                      checked={formData.payDayType === "lastWorkingDay"}
                      onChange={() =>
                        setFormData((f) => ({
                          ...f,
                          payDayType: "lastWorkingDay",
                        }))
                      }
                    />
                    <span className="text-sm">
                      the last working day of every month
                    </span>
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="radio"
                      name="payDayType"
                      value="specificDay"
                      checked={formData.payDayType === "specificDay"}
                      onChange={() =>
                        setFormData((f) => ({
                          ...f,
                          payDayType: "specificDay",
                        }))
                      }
                    />
                    <span className="text-sm">day</span>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      value={formData.payDayValue}
                      className="w-16 h-7 text-center text-xs"
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          payDayValue: e.target.value,
                        }))
                      }
                      disabled={formData.payDayType !== "specificDay"}
                    />
                    <span className="text-sm">of every month</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2 border border-blue-200 dark:border-blue-700">
                  <b>Note:</b> When payday falls on a non-working day or a
                  holiday, employees will get paid on the previous working day.
                </div>
              </div>

              {/* Start your first payroll from */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Start your first payroll from
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.firstPayrollMonth}
                  onValueChange={(value) =>
                    setFormData((f) => ({ ...f, firstPayrollMonth: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollMonths.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Select a pay date for your first payroll */}
              <div className="hidden space-y-1">
                <Label className="text-sm font-medium">
                  Select a pay date for your first payroll
                  <span className="text-red-500">*</span>
                </Label>
                <div className="text-xs text-slate-600 mb-1">
                  Pay Period: {formData.firstPayrollMonth}
                </div>
                <Select
                  value={formData.firstPayrollDate}
                  onValueChange={(value) =>
                    setFormData((f) => ({ ...f, firstPayrollDate: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay date" />
                  </SelectTrigger>
                  <SelectContent>
                    {calendarDates.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Calendar UI */}
                <div className="mt-2 border border-border rounded p-2 w-full bg-card">
                  {/* Simple calendar for the selected month */}
                  <div className="text-center text-xs font-medium mb-1 text-foreground">
                    {formData.firstPayrollMonth}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                      (d) => (
                        <div key={d}>{d}</div>
                      ),
                    )}
                  </div>
                  {/* Render days */}
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const [monthStr, yearStr] =
                        formData.firstPayrollMonth.split("-");
                      const month =
                        [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].indexOf(monthStr) + 1;
                      const year = parseInt(yearStr, 10);
                      const firstDay = new Date(year, month - 1, 1);
                      const startDay = firstDay.getDay();
                      const daysInMonth = new Date(year, month, 0).getDate();
                      const days: JSX.Element[] = [];
                      for (let i = 0; i < startDay; i++)
                        days.push(<div key={"empty-" + i}></div>);
                      for (let d = 1; d <= daysInMonth; d++) {
                        const dateObj = new Date(year, month - 1, d);
                        const dateStr = dateObj.toLocaleDateString("en-GB");
                        const isSelected =
                          formData.firstPayrollDate === dateStr;
                        const isPayDate = calendarDates.includes(dateStr);
                        days.push(
                          <div
                            key={d}
                            className={cn(
                              "w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-all duration-200 ease-out",
                              isSelected
                                ? "bg-blue-200 border border-blue-600 text-blue-900 font-bold dark:bg-blue-800 dark:border-blue-400 dark:text-blue-100"
                                : "",
                              isPayDate
                                ? "border border-blue-400 dark:border-blue-500"
                                : "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                            )}
                            onClick={() =>
                              setFormData((f) => ({
                                ...f,
                                firstPayrollDate: dateStr,
                              }))
                            }
                          >
                            {d}
                          </div>,
                        );
                      }
                      return days;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={closePanel}
                className="flex-1 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
              >
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
