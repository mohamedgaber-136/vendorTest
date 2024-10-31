import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const Input = React.forwardRef(({ className, type, isInvalid, ...props }, ref) => {
    return (_jsx("input", { type: type, ref: ref, className: cn("flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50", isInvalid ? "border-red-500 focus-visible:ring-red-500" : "border-input bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring", className), ...props }));
});
Input.displayName = "Input";
export { Input };
