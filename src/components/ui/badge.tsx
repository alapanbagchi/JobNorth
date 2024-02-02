import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { twMergeImproved } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary/20 text-primary hover:bg-primary/80",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                success: "border-transparent bg-green-600/20 text-green-800 fnt-semibold",
                destructive: "border-transparent bg-destructive/20 text-destructive",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={twMergeImproved(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
