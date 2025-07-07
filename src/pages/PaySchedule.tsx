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
  const [organizationDays, setOrganizationDays] = useState("22");
  const [currentMonth, setCurrentMonth] = useState(3); // April = 3 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedPayDate, setSelectedPayDate] = useState<number | null>(null);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const calendarDays = generateCalendar(currentYear, currentMonth);
  const monthName = getMonthName(currentMonth);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Pay Schedule
          </h1>
        </div>

        <div className="space-y-8">
          {/* Business Unit Selection */}
          <div>
            <h2 className="text-base font-medium text-slate-900 mb-4">
              Select Business Unit*
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="businessUnit"
                  value="IT"
                  checked={selectedBusinessUnit === "IT"}
                  onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium">IT Business Unit</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="businessUnit"
                  value="Telecom"
                  checked={selectedBusinessUnit === "Telecom"}
                  onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium">
                  Telecom Business Unit
                </span>
              </label>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              {selectedBusinessUnit === "IT"
                ? "5-day work week, 22 standard working days per month"
                : "6-day work week, 26 standard working days per month"}
            </p>
          </div>

          {/* Select your work week */}
          <div>
            <h2 className="text-base font-medium text-slate-900 mb-2">
              Select your work week*
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The days marked in a calendar week
            </p>

            <div className="grid grid-cols-7 gap-6 text-center max-w-lg">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
                const isSelected =
                  selectedBusinessUnit === "IT"
                    ? ["MON", "TUE", "WED", "THU", "FRI"].includes(day)
                    : ["MON", "TUE", "WED", "THU", "FRI", "SAT"].includes(day);

                return (
                  <div key={day} className="flex flex-col items-center">
                    <div className="text-xs font-medium text-slate-600 mb-3">
                      {day}
                    </div>
                    <div
                      className={`w-6 h-6 rounded border-2 ${
                        isSelected
                          ? "bg-blue-500 border-blue-500"
                          : "border-slate-300"
                      }`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculate monthly salary based on */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-medium text-slate-900">
                Calculate monthly salary based on*
              </h2>
              <Info className="h-4 w-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="workingDays"
                  value="actual"
                  checked={workingDaysMode === "actual"}
                  onChange={(e) => setWorkingDaysMode(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Actual days in a month</span>
              </label>

              <div className="ml-7">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="workingDays"
                    value="organization"
                    checked={workingDaysMode === "organization"}
                    onChange={(e) => setWorkingDaysMode(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">
                    Organisation working days - varies by month
                  </span>
                </label>

                {workingDaysMode === "organization" && (
                  <div className="ml-7 mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Monthly Working Days Breakdown - {selectedBusinessUnit}:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      {selectedBusinessUnit === "IT" ? (
                        <>
                          <div>• January 2025: 23 working days</div>
                          <div>• February 2025: 20 working days</div>
                          <div>• March 2025: 21 working days</div>
                          <div>• April 2025: 22 working days</div>
                          <div>• May 2025: 22 working days</div>
                          <div>• June 2025: 21 working days</div>
                          <div>• July 2025: 23 working days</div>
                          <div>• August 2025: 21 working days</div>
                          <div>• September 2025: 22 working days</div>
                          <div>• October 2025: 23 working days</div>
                          <div>• November 2025: 20 working days</div>
                          <div>• December 2025: 22 working days</div>
                        </>
                      ) : (
                        <>
                          <div>• January 2025: 27 working days</div>
                          <div>• February 2025: 24 working days</div>
                          <div>• March 2025: 26 working days</div>
                          <div>• April 2025: 26 working days</div>
                          <div>• May 2025: 26 working days</div>
                          <div>• June 2025: 25 working days</div>
                          <div>• July 2025: 27 working days</div>
                          <div>• August 2025: 26 working days</div>
                          <div>• September 2025: 26 working days</div>
                          <div>• October 2025: 27 working days</div>
                          <div>• November 2025: 25 working days</div>
                          <div>• December 2025: 26 working days</div>
                        </>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      <strong>Note:</strong>{" "}
                      {selectedBusinessUnit === "IT"
                        ? "Excludes weekends (Sat/Sun)"
                        : "Excludes only Sundays"}{" "}
                      and public holidays.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pay on */}
          <div>
            <h2 className="text-base font-medium text-slate-900 mb-4">
              Pay on*
            </h2>

            <div className="space-y-3">
              {selectedBusinessUnit === "Telecom" && (
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payOn"
                    value="bimonthly"
                    checked={payOnMode === "bimonthly"}
                    onChange={(e) => setPayOnMode(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">
                    15th and last working day of every month
                  </span>
                </label>
              )}

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payOn"
                  value="lastWorkingDay"
                  checked={payOnMode === "lastWorkingDay"}
                  onChange={(e) => setPayOnMode(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">
                  the last working day of every month
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payOn"
                  value="customDay"
                  checked={payOnMode === "customDay"}
                  onChange={(e) => setPayOnMode(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="flex items-center gap-2 text-sm">
                  day
                  <input
                    type="number"
                    min="1"
                    max="31"
                    className="w-12 h-7 px-2 border border-gray-300 rounded text-sm text-center"
                    value={customPayDay}
                    onChange={(e) => setCustomPayDay(e.target.value)}
                    disabled={payOnMode !== "customDay"}
                  />
                  of every month
                </span>
              </label>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              <strong>Note:</strong> When payday falls on a non-working day or a
              holiday, employees will get paid on the previous working day.
              {selectedBusinessUnit === "Telecom" && (
                <div className="mt-1">
                  <strong>Telecom:</strong> Bi-monthly payments help with cash
                  flow management for field operations.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
