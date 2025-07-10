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
  workWeekDays: string[];
  salaryCalculationType: string;
  payFrequency: string;
  payDay: string;
  timeZone: string;
  lastUpdated: string;
}

// Default settings for each business unit
const defaultSettings: Record<string, PayScheduleSettings> = {
  "IT Business Unit": {
    workWeekDays: ["MON", "TUE", "WED", "THU", "FRI"],
    salaryCalculationType: "Actual days in a month",
    payFrequency: "22",
    payDay: "the last working day of every month",
    timeZone: "April-2025",
    lastUpdated: new Date().toLocaleString(),
  },
  "Telecom Business Unit": {
    workWeekDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
    salaryCalculationType: "Actual days in a month",
    payFrequency: "26",
    payDay: "the last working day of every month",
    timeZone: "April-2025",
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

  // Toggle work week day
  const toggleWorkWeekDay = (day: string) => {
    setSettings((prev) => {
      const currentSettings =
        prev[selectedBusinessUnit] || defaultSettings[selectedBusinessUnit];
      const workWeekDays = [...currentSettings.workWeekDays];

      if (workWeekDays.includes(day)) {
        // Remove day
        const index = workWeekDays.indexOf(day);
        workWeekDays.splice(index, 1);
      } else {
        // Add day
        workWeekDays.push(day);
      }

      return {
        ...prev,
        [selectedBusinessUnit]: {
          ...currentSettings,
          workWeekDays,
          lastUpdated: new Date().toLocaleString(),
        },
      };
    });
  };

  // Update settings for current business unit
  const updateSetting = (
    key: keyof PayScheduleSettings,
    value: string | string[],
  ) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [selectedBusinessUnit]: {
          ...prev[selectedBusinessUnit],
          [key]: value,
          lastUpdated: new Date().toLocaleString(),
        },
      };

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

              {/* Section 2: Work Week Configuration */}
              <Card className="shadow-sm border-slate-200">
                <CardContent className="pt-6 space-y-6">
                  {/* Select your work week */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">
                        Select your work week
                        <span className="text-red-500">*</span>
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        The days worked in a calendar week
                      </p>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (day) => {
                          const isSelected =
                            currentSettings.workWeekDays.includes(day);

                          return (
                            <button
                              key={day}
                              type="button"
                              className={cn(
                                "px-3 py-2 text-sm font-medium rounded border transition-colors",
                                isSelected
                                  ? "bg-blue-100 border-blue-300 text-blue-700"
                                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                              )}
                              onClick={() => toggleWorkWeekDay(day)}
                            >
                              {day}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>

                  {/* Calculate monthly salary based on */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-slate-900">
                        Calculate monthly salary based on
                        <span className="text-red-500">*</span>
                      </h3>
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="salaryCalculation"
                          value="actual"
                          checked={
                            currentSettings.salaryCalculationType ===
                            "Actual days in a month"
                          }
                          onChange={() =>
                            updateSetting(
                              "salaryCalculationType",
                              "Actual days in a month",
                            )
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-900">
                          Actual days in a month
                        </span>
                      </label>

                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="salaryCalculation"
                          value="organisation"
                          checked={
                            currentSettings.salaryCalculationType ===
                            "Organisation working days"
                          }
                          onChange={() =>
                            updateSetting(
                              "salaryCalculationType",
                              "Organisation working days",
                            )
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-900">
                          Organisation working days -
                        </span>
                        <Select
                          value={currentSettings.payFrequency}
                          onValueChange={(value) =>
                            updateSetting("payFrequency", value)
                          }
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="22">22</SelectItem>
                            <SelectItem value="24">24</SelectItem>
                            <SelectItem value="26">26</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-slate-900">
                          days per month
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pay on */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-900">
                      Pay on
                      <span className="text-red-500">*</span>
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payOn"
                          value="lastWorkingDay"
                          checked={
                            currentSettings.payDay ===
                            "the last working day of every month"
                          }
                          onChange={() =>
                            updateSetting(
                              "payDay",
                              "the last working day of every month",
                            )
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-900">
                          the last working day of every month
                        </span>
                      </label>

                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payOn"
                          value="specificDay"
                          checked={
                            currentSettings.payDay !==
                            "the last working day of every month"
                          }
                          onChange={() =>
                            updateSetting("payDay", "1 of every month")
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-900">day</span>
                        <Input
                          type="number"
                          min="1"
                          max="31"
                          defaultValue="1"
                          className="w-16 h-8 text-center"
                          onChange={(e) =>
                            updateSetting(
                              "payDay",
                              `${e.target.value} of every month`,
                            )
                          }
                        />
                        <span className="text-sm text-slate-900">
                          of every month
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                      <strong>Note:</strong> When payday falls on a non-working
                      day or a holiday, employees will get paid on the previous
                      working day.
                    </p>
                  </div>

                  {/* Start your first payroll from */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-900">
                      Start your first payroll from
                      <span className="text-red-500">*</span>
                    </h3>

                    <Select
                      value={currentSettings.timeZone}
                      onValueChange={(value) =>
                        updateSetting("timeZone", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="April-2025" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="April-2025">April-2025</SelectItem>
                        <SelectItem value="May-2025">May-2025</SelectItem>
                        <SelectItem value="June-2025">June-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Select a pay date for your first payroll */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-900">
                      Select a pay date for your first payroll
                      <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-sm text-slate-600">
                      Pay Period: April-2025
                    </p>

                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-slate-900">
                          April 2025
                        </h4>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        <div className="font-medium text-slate-600 py-2">
                          SUN
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          MON
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          TUE
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          WED
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          THU
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          FRI
                        </div>
                        <div className="font-medium text-slate-600 py-2">
                          SAT
                        </div>

                        {/* Calendar days */}
                        <div className="py-2 text-slate-400">30</div>
                        <div className="py-2 text-slate-400">31</div>
                        <div className="py-2 text-slate-900">1</div>
                        <div className="py-2 text-slate-900">2</div>
                        <div className="py-2 text-slate-900">3</div>
                        <div className="py-2 text-slate-900">4</div>
                        <div className="py-2 text-slate-900">5</div>

                        <div className="py-2 text-slate-900">6</div>
                        <div className="py-2 text-slate-900">7</div>
                        <div className="py-2 text-slate-900">8</div>
                        <div className="py-2 text-slate-900">9</div>
                        <div className="py-2 text-slate-900">10</div>
                        <div className="py-2 text-slate-900">11</div>
                        <div className="py-2 text-slate-900">12</div>

                        <div className="py-2 text-slate-900">13</div>
                        <div className="py-2 text-slate-900">14</div>
                        <div className="py-2 text-slate-900">15</div>
                        <div className="py-2 text-slate-900">16</div>
                        <div className="py-2 text-slate-900">17</div>
                        <div className="py-2 text-slate-900">18</div>
                        <div className="py-2 text-slate-900">19</div>

                        <div className="py-2 text-slate-900">20</div>
                        <div className="py-2 text-slate-900">21</div>
                        <div className="py-2 text-slate-900">22</div>
                        <div className="py-2 text-slate-900">23</div>
                        <div className="py-2 text-slate-900">24</div>
                        <div className="py-2 text-slate-900">25</div>
                        <div className="py-2 text-slate-900">26</div>

                        <div className="py-2 text-slate-900">27</div>
                        <div className="py-2 text-slate-900">28</div>
                        <div className="py-2 text-slate-900">29</div>
                        <div className="py-2 bg-green-500 text-white rounded">
                          30
                        </div>
                        <div className="py-2 text-slate-900">1</div>
                        <div className="py-2 text-slate-900">2</div>
                        <div className="py-2 text-slate-900">3</div>
                      </div>
                    </div>

                    <Select value="30/04/2025" onValueChange={() => {}}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="30/04/2025" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30/04/2025">30/04/2025</SelectItem>
                      </SelectContent>
                    </Select>
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
