import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Calendar({ selected, onSelect, onClose }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(selected ? new Date(selected) : today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(year, month, day);
    onSelect(selectedDate);
    if (onClose) onClose();
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    if (!selected) return false;
    const selectedDate = new Date(selected);
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const isPastDate = (day) => {
    const date = new Date(year, month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPast: true
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPast: isPastDate(day)
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPast: false
    });
  }

  return (
    <div className="w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="text-sm font-semibold text-slate-900">
          {MONTHS[month]} {year}
        </div>
        <button
          onClick={handleNextMonth}
          className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Days of week */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item, index) => {
          const isCurrentMonth = item.isCurrentMonth;
          const day = item.day;
          const isPast = item.isPast;
          const todayDate = isToday(day) && isCurrentMonth;
          const selectedDate = isSelected(day) && isCurrentMonth;

          return (
            <button
              key={index}
              onClick={() => isCurrentMonth && !isPast && handleDateClick(day)}
              disabled={!isCurrentMonth || isPast}
              className={`
                grid size-9 place-items-center rounded-lg text-sm transition
                ${!isCurrentMonth ? "text-slate-300" : ""}
                ${isPast && isCurrentMonth ? "text-slate-300 cursor-not-allowed" : ""}
                ${!isPast && isCurrentMonth ? "hover:bg-[color:var(--brand-mist)] cursor-pointer" : ""}
                ${todayDate ? "border border-[color:var(--brand-green)] text-[color:var(--brand-green)] font-semibold" : ""}
                ${selectedDate ? "bg-[color:var(--brand-green)] text-white font-semibold hover:bg-[color:var(--brand-green-2)]" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onSelect(today);
            if (onClose) onClose();
          }}
          className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Today
        </Button>
        {onClose && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
}
