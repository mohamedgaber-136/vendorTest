import * as React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
