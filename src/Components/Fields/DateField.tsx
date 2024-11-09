import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormikProps } from "formik";

interface DateFieldProps {
  formik: FormikProps<any>;
  name: string;
  title: string;
}

export function DateField({ formik, name, title }: DateFieldProps) {
  const selectedDate = formik.values[name]; // Get the current date from Formik

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const newDate = date.toLocaleString();
      formik.setFieldValue(name, newDate); // Update Formik's state with the selected date
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-white",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selectedDate ? format(new Date(selectedDate), "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white border-red-400 p-0">
        <Calendar
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
