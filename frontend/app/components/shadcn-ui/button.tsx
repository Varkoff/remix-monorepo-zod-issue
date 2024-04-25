import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoadingSpinner } from "components/LoadingSpinner";
import * as React from "react";
import { cn } from "utils/utils.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 whitespace-nowrap rounded-lg border-2 border-transparent text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-75",
  {
    variants: {
      variant: {
        teal: "bg-teal text-white hover:bg-teal/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        progress: "bg-progress text-white hover:bg-progress/90",
        outline: "bg-light-iron text-midnightblue",
        "dark-iron": "bg-transparent text-dark-iron",
        midnightblue: "bg-midnightblue text-white hover:bg-midnightblue/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-teal underline-offset-4 hover:underline",
        marketplaceLight:
          "border-iron bg-light-iron text-dark-iron placeholder:text-xs focus:border-teal focus:outline-none focus:ring-0 active:ring-0 sm:text-sm",
        marketplaceTransparent:
          "border-iron bg-white/10 text-dark-iron placeholder:text-xs focus:border-teal focus:outline-none focus:ring-0 active:ring-0 sm:text-sm",
      },
      size: {
        default: "h-10 py-4 pl-3 pr-2",
        sm: "h-8 rounded-md px-2 text-xs",
        lg: "text-md h-11 rounded-md px-8",
        icon: "size-10",
        none: "",
        marketplace: "p-4",
      },
    },
    defaultVariants: {
      variant: "teal",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export const LoadingButton = ({
  isLoading,
  disabled = false,
  children,
  type,
  name,
  value,
  variant = "teal",
  size = "default",
  className = "",
  formId = undefined,
  onClick,
}: {
  className?: string;
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  name?: string;
  value?: string;
  type: "button" | "submit" | "reset";
  formId?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
} & VariantProps<typeof buttonVariants>) => {
  ("");
  return (
    <Button
      type={type}
      name={name}
      form={formId}
      value={value}
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={variant}
      size={size}
      className={cn(className, "z-0 disabled:opacity-50")}
    >
      <div className="flex flex-row items-center gap-2">
        {children}
        <LoadingSpinner className="ml-auto" loading={isLoading} />
      </div>
    </Button>
  );
};

export { Button, buttonVariants };
