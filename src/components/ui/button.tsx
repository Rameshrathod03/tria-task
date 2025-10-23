import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 text-foreground hover:from-muted/80 hover:to-background/80",
        destructive:
          "shadow-xs bg-gradient-to-t hover:to-tria-error/20 to-background from-tria-error/10 dark:from-tria-error/20 dark:border-tria-error/30 border border-tria-error/20 shadow-tria-error/10 text-tria-error hover:from-tria-error/30 hover:to-background/80",
        outline:
          "shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 text-foreground hover:from-muted/80 hover:to-background/80",
        secondary:
          "shadow-xs bg-gradient-to-t hover:to-tria-secondary/20 to-background from-tria-secondary/10 dark:from-tria-secondary/20 dark:border-tria-secondary/30 border border-tria-secondary/20 shadow-tria-secondary/10 text-tria-secondary hover:from-tria-secondary/30 hover:to-background/80",
        ghost: "shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 text-foreground hover:from-muted/80 hover:to-background/80",
        link: "text-tria-primary underline-offset-4 hover:underline focus:text-tria-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
