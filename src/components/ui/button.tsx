import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-sky-600 text-white shadow-xs hover:bg-sky-700 active:bg-sky-800",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300",
        secondary:
          "bg-amber-400 text-slate-950 font-bold shadow-xs hover:bg-amber-500 active:bg-amber-600",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-sky-600 underline-offset-4 hover:underline",
        // Tutopia Branded Compact Variants
        "tutopia-blue":
          "bg-sky-600 text-white shadow-xs hover:bg-sky-700 active:bg-sky-800",
        "tutopia-yellow":
          "bg-amber-400 text-slate-950 font-bold shadow-xs hover:bg-amber-500 active:bg-amber-600",
        "tutopia-yellow-outline":
          "border border-amber-400 bg-amber-50/50 text-amber-900 font-semibold hover:bg-amber-100/70 hover:border-amber-500",
        "tutopia-blue-outline":
          "border border-sky-300 bg-sky-50/50 text-sky-700 font-semibold hover:bg-sky-100/70 hover:border-sky-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-5 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
