import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Building,
  Settings,
  Save,
  Info,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Phone,
  Clock,
  Calculator,
  DollarSign,
  CalendarDays,
  Users,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Calendar helper functions
const getMonthName = (monthIndex: number) => {
  const months = [
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
  ];
  return months[monthIndex];
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const generateCalendar = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
};

export default function PaySchedule() {
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("IT");
  const [workingDaysMode, setWorkingDaysMode] = useState("actual");
  const [payOnMode, setPayOnMode] = useState("lastWorkingDay");
  const [customPayDay, setCustomPayDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState(3); // April = 3 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [tab, setTab] = useState("business-unit");

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="w-full px-6">
        <PageHeader title="Pay Schedule" />
        <div className="mt-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex border-b border-slate-200 bg-white p-0 gap-8">
              <TabsTrigger
                value="business-unit"
                className="relative px-0 pb-2 text-base font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
              >
                Business Unit
              </TabsTrigger>
              <TabsTrigger
                value="work-week"
                className="relative px-0 pb-2 text-base font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
              >
                Work Week
              </TabsTrigger>
              <TabsTrigger
                value="salary-calculation"
                className="relative px-0 pb-2 text-base font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
              >
                Salary Calculation
              </TabsTrigger>
              <TabsTrigger
                value="pay-on"
                className="relative px-0 pb-2 text-base font-medium text-slate-700 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-1 data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-full focus:outline-none"
              >
                Pay On
              </TabsTrigger>
            </TabsList>
            <TabsContent value="business-unit" className="pt-6">
              {/* Business Unit Selection */}
              <Card className="rounded-xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Business Unit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <label
                        className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border transition-colors flex-1 ${selectedBusinessUnit === "IT" ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                      >
                        <input
                          type="radio"
                          name="businessUnit"
                          value="IT"
                          checked={selectedBusinessUnit === "IT"}
                          onChange={(e) =>
                            setSelectedBusinessUnit(e.target.value)
                          }
                          className="accent-blue-600 w-4 h-4"
                        />
                        <Monitor className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          IT Business Unit
                        </span>
                      </label>
                      <label
                        className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border transition-colors flex-1 ${selectedBusinessUnit === "Telecom" ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                      >
                        <input
                          type="radio"
                          name="businessUnit"
                          value="Telecom"
                          checked={selectedBusinessUnit === "Telecom"}
                          onChange={(e) =>
                            setSelectedBusinessUnit(e.target.value)
                          }
                          className="accent-blue-600 w-4 h-4"
                        />
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          Telecom Business Unit
                        </span>
                      </label>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-slate-100 text-slate-700 w-fit flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {selectedBusinessUnit === "IT"
                        ? "5-day work week, 22 standard working days per month"
                        : "6-day work week, 26 standard working days per month"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="work-week" className="pt-6">
              {/* Work Week Selection */}
              <Card className="rounded-xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-purple-600" />
                    Work Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm text-slate-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    Select your work week*
                  </div>
                  <div className="grid grid-cols-7 gap-3 text-center w-full">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                      (day) => {
                        const isSelected =
                          selectedBusinessUnit === "IT"
                            ? ["MON", "TUE", "WED", "THU", "FRI"].includes(day)
                            : [
                                "MON",
                                "TUE",
                                "WED",
                                "THU",
                                "FRI",
                                "SAT",
                              ].includes(day);
                        return (
                          <div key={day} className="flex flex-col items-center">
                            <div className="text-xs font-medium text-slate-600 mb-2">
                              {day}
                            </div>
                            <div
                              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-purple-500 border-purple-500" : "border-slate-300 bg-white"}`}
                            >
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                  <div className="mt-4 text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedBusinessUnit === "IT"
                      ? "Weekends: Saturday & Sunday"
                      : "Weekend: Sunday only"}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="salary-calculation" className="pt-6">
              {/* Salary Calculation Mode */}
              <Card className="rounded-xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    <span>Salary Calculation</span>
                    <Info className="h-4 w-4 text-blue-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="space-y-4 flex-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="workingDays"
                          value="actual"
                          checked={workingDaysMode === "actual"}
                          onChange={(e) => setWorkingDaysMode(e.target.value)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Actual days in a month</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="workingDays"
                          value="organization"
                          checked={workingDaysMode === "organization"}
                          onChange={(e) => setWorkingDaysMode(e.target.value)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Organisation working days - varies by month
                        </span>
                      </label>
                    </div>
                    {workingDaysMode === "organization" && (
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-blue-600" />
                          Monthly Working Days Breakdown -{" "}
                          {selectedBusinessUnit}:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-slate-600">
                          {selectedBusinessUnit === "IT" ? (
                            <>
                              <div className="flex items-center gap-1">
                                • January 2025: 23 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • February 2025: 20 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • March 2025: 21 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • April 2025: 22 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • May 2025: 22 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • June 2025: 21 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • July 2025: 23 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • August 2025: 21 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • September 2025: 22 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • October 2025: 23 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • November 2025: 20 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • December 2025: 22 working days
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-1">
                                • January 2025: 27 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • February 2025: 24 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • March 2025: 26 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • April 2025: 26 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • May 2025: 26 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • June 2025: 25 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • July 2025: 27 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • August 2025: 26 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • September 2025: 26 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • October 2025: 27 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • November 2025: 25 working days
                              </div>
                              <div className="flex items-center gap-1">
                                • December 2025: 26 working days
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <strong>Note:</strong>{" "}
                          {selectedBusinessUnit === "IT"
                            ? "Excludes weekends (Sat/Sun)"
                            : "Excludes only Sundays"}{" "}
                          and public holidays.
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pay-on" className="pt-6">
              {/* Pay On Section */}
              <Card className="rounded-xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Pay On
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedBusinessUnit === "Telecom" && (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payOn"
                          value="bimonthly"
                          checked={payOnMode === "bimonthly"}
                          onChange={(e) => setPayOnMode(e.target.value)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          15th and last working day of every month
                        </span>
                      </label>
                    )}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payOn"
                        value="lastWorkingDay"
                        checked={payOnMode === "lastWorkingDay"}
                        onChange={(e) => setPayOnMode(e.target.value)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <CalendarDays className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        the last working day of every month
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payOn"
                        value="customDay"
                        checked={payOnMode === "customDay"}
                        onChange={(e) => setPayOnMode(e.target.value)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <Settings className="h-4 w-4 text-orange-500" />
                      <span className="flex items-center gap-2 text-sm">
                        day
                        <input
                          type="number"
                          min="1"
                          max="31"
                          className="w-16 h-8 px-2 border border-slate-300 rounded-xl text-sm text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                          value={customPayDay}
                          onChange={(e) => setCustomPayDay(e.target.value)}
                          disabled={payOnMode !== "customDay"}
                        />
                        of every month
                      </span>
                    </label>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 w-fit flex items-center gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      When payday falls on a non-working day or a holiday,
                      employees will get paid on the previous working day.
                    </Badge>
                    {selectedBusinessUnit === "Telecom" && (
                      <div className="text-xs text-blue-700 bg-blue-50 rounded-xl px-3 py-2 w-fit flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <strong>Telecom:</strong> Bi-monthly payments help with
                        cash flow management for field operations.
                      </div>
                    )}
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
