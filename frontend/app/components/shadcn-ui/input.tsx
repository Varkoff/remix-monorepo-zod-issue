import * as React from "react";
import { cn } from "utils/utils.ts";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-iron bg-light-iron px-4 py-3 text-sm text-midnightblue ring-0 ring-offset-iron file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dark-iron focus:outline-0 focus-visible:border-teal  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 active:border-teal active:outline-0 active:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          // disabled:opacity-75 block bg-light-iron placeholder:text-dark-iron placeholder:text-xs border-2 border-iron w-full appearance-none rounded-md focus:border-dark-iron focus:outline-none text-midnightblue focus:outline-teal focus:ring-0 text-sm outline-0 ring-0 focus:outline-0  active:border-teal active:outline-0 active:outline-teal active:ring-0
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
