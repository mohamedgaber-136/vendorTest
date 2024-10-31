import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean; // Add isInvalid prop for error styling
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          isInvalid ? "border-red-500 focus-visible:ring-red-500" : "border-input bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
