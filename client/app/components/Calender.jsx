"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";

export default function CalendarDemo({
  date,
  setDate,
  containerRef,
  iconRef,
  setShowCalendar,
}) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (iconRef.current && !iconRef.current.contains(event.target)) {
          setShowCalendar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}

// responsive
