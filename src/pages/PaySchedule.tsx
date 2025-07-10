import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calculator,
  DollarSign,
  CalendarDays,
  Users,
  Edit3,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for pay schedule settings
interface PayScheduleSettings {
  workWeekStartDay: string;
  workWeekEndDay: string;
  salaryCalculationType: string;
  payFrequency: string;
  payDay: string;
  timeZone: string;
  lastUpdated: string;
}

// Default settings for each business unit
const defaultSettings: Record<string, PayScheduleSettings> = {
  "IT Business Unit": {
    workWeekStartDay: "Monday",
    workWeekEndDay: "Friday",
    salaryCalculationType: "Fixed",
    payFrequency: "Monthly",
    payDay: "Friday",
    timeZone: "America/New_York",
    lastUpdated: new Date().toLocaleString(),
  },
  "Telecom Business Unit": {
    workWeekStartDay: "Monday",
    workWeekEndDay: "Saturday",
    salaryCalculationType: "Hourly",
    payFrequency: "Bi-weekly",
    payDay: "Friday",
    timeZone: "America/New_York",
    lastUpdated: new Date().toLocaleString(),
  },
};

export default function PaySchedule() {
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState("IT Business Unit");
  const [settings, setSettings] = useState<Record<string, PayScheduleSettings>>(
    () => {
      const saved = localStorage.getItem("payScheduleSettings");
      return saved ? JSON.parse(saved) : defaultSettings;
    },
  );
  const [activeTab, setActiveTab] = useState("configuration");
  const [isEditing, setIsEditing] = useState(false);

  // Auto-calculate work week end day based on start day
  const calculateEndDay = (startDay: string, unit: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startIndex = days.indexOf(startDay);
    if (unit === "IT Business Unit") {
      // 5-day work week (Monday-Friday typically)
      return days[(startIndex + 4) % 7];
    } else {
      // 6-day work week (Monday-Saturday typically)
      return days[(startIndex + 5) % 7];
    }
  };

  // Update settings for current business unit
  const updateSetting = (key: keyof PayScheduleSettings, value: string) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [selectedBusinessUnit]: {
          ...prev[selectedBusinessUnit],
          [key]: value,
          lastUpdated: new Date().toLocaleString(),
        },
      };

      // Auto-calculate end day when start day changes
      if (key === "workWeekStartDay") {
        newSettings[selectedBusinessUnit].workWeekEndDay = calculateEndDay(
          value,
          selectedBusinessUnit,
        );
      }

      return newSettings;
    });
  };

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("payScheduleSettings", JSON.stringify(settings));
    setIsEditing(false);
  };

  // Load settings when business unit changes
  useEffect(() => {
    if (!settings[selectedBusinessUnit]) {
      setSettings((prev) => ({
        ...prev,
        [selectedBusinessUnit]:
          defaultSettings[selectedBusinessUnit] ||
          defaultSettings["IT Business Unit"],
      }));
    }
  }, [selectedBusinessUnit, settings]);

  const currentSettings =
    settings[selectedBusinessUnit] || defaultSettings[selectedBusinessUnit];

  const businessUnits = ["IT Business Unit", "Telecom Business Unit"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const salaryTypes = ["Fixed", "Hourly", "Performance-based"];
  const payFrequencies = ["Weekly", "Bi-weekly", "Monthly"];
  const timeZones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Kolkata",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full px-6 py-8">
        <PageHeader title="Pay Schedule Configuration" />

        <div className="mt-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger
                value="configuration"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configuration
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Overview
              </TabsTrigger>
            </TabsList>

            {/* Configuration Tab */}
            <TabsContent value="configuration" className="mt-6 space-y-6">
              {/* Section 1: Business Unit Selection */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Select Business Unit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select
                      value={selectedBusinessUnit}
                      onValueChange={setSelectedBusinessUnit}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a business unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            <div className="flex items-center gap-2">
                              {unit === "IT Business Unit" ? (
                                <Monitor className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Phone className="h-4 w-4 text-green-600" />
                              )}
                              {unit}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {selectedBusinessUnit === "IT Business Unit" ? (
                          <Monitor className="h-5 w-5 text-blue-600 mt-0.5" />
                        ) : (
                          <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {selectedBusinessUnit}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            {selectedBusinessUnit === "IT Business Unit"
                              ? "Technology services and software development teams with standard 5-day work week."
                              : "Telecommunications operations with extended 6-day work coverage for field services."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Work Week and Salary Settings */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Work Week and Salary Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Work Week Start Day */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="workWeekStart"
                        className="text-sm font-medium text-slate-700"
                      >
                        Work Week Start Day
                      </Label>
                      <Select
                        value={currentSettings.workWeekStartDay}
                        onValueChange={(value) =>
                          updateSetting("workWeekStartDay", value)
                        }
                      >
                        <SelectTrigger id="workWeekStart">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Work Week End Day (Auto-calculated) */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Work Week End Day
                      </Label>
                      <div className="h-10 px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 flex items-center text-sm text-slate-600">
                        {currentSettings.workWeekEndDay} (Auto-calculated)
                      </div>
                    </div>

                    {/* Salary Calculation Type */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="salaryType"
                        className="text-sm font-medium text-slate-700"
                      >
                        Salary Calculation Type
                      </Label>
                      <Select
                        value={currentSettings.salaryCalculationType}
                        onValueChange={(value) =>
                          updateSetting("salaryCalculationType", value)
                        }
                      >
                        <SelectTrigger id="salaryType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {salaryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Calculator className="h-4 w-4" />
                                {type}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pay Frequency */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="payFreq"
                        className="text-sm font-medium text-slate-700"
                      >
                        Pay Frequency
                      </Label>
                      <Select
                        value={currentSettings.payFrequency}
                        onValueChange={(value) =>
                          updateSetting("payFrequency", value)
                        }
                      >
                        <SelectTrigger id="payFreq">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {payFrequencies.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                {freq}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pay Day */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="payDay"
                        className="text-sm font-medium text-slate-700"
                      >
                        Pay Day
                      </Label>
                      <Select
                        value={currentSettings.payDay}
                        onValueChange={(value) =>
                          updateSetting("payDay", value)
                        }
                      >
                        <SelectTrigger id="payDay">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                {day}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time Zone */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="timeZone"
                        className="text-sm font-medium text-slate-700"
                      >
                        Time Zone
                      </Label>
                      <Select
                        value={currentSettings.timeZone}
                        onValueChange={(value) =>
                          updateSetting("timeZone", value)
                        }
                      >
                        <SelectTrigger id="timeZone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                {zone}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      Last updated: {currentSettings.lastUpdated}
                    </div>
                    <Button
                      onClick={saveSettings}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {businessUnits.map((unit) => {
                  const unitSettings = settings[unit] || defaultSettings[unit];
                  return (
                    <Card key={unit} className="shadow-sm border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {unit === "IT Business Unit" ? (
                              <Monitor className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Phone className="h-5 w-5 text-green-600" />
                            )}
                            {unit}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBusinessUnit(unit);
                              setActiveTab("configuration");
                            }}
                            className="flex items-center gap-1"
                          >
                            <Edit3 className="h-3 w-3" />
                            Edit
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                              Work Week
                            </span>
                            <span className="text-sm text-slate-900">
                              {unitSettings.workWeekStartDay} -{" "}
                              {unitSettings.workWeekEndDay}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                              Salary Type
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {unitSettings.salaryCalculationType}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                              Pay Frequency
                            </span>
                            <span className="text-sm text-slate-900">
                              {unitSettings.payFrequency}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                              Pay Day
                            </span>
                            <span className="text-sm text-slate-900">
                              {unitSettings.payDay}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                              Time Zone
                            </span>
                            <span className="text-sm text-slate-900">
                              {unitSettings.timeZone}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Last updated: {unitSettings.lastUpdated}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Additional Information */}
              <Card className="mt-6 shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Settings are saved locally and applied independently for
                        each business unit.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Work week end day is automatically calculated based on
                        the start day and business unit type.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Changes take effect immediately after saving and apply
                        to future payroll calculations.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>
                        When pay day falls on a weekend or holiday, payment will
                        be processed on the previous working day.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
