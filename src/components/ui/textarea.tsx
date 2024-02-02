import * as React from "react";

import { twMergeImproved } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, type, label, ...props }, ref) => {
    // If the input is autofilled, props.value is empty. Fix that
    if (props.value === "") {
        props.value = props.defaultValue || "";
    }
    return (
        <div
            className={twMergeImproved(
                "rounded-lg min-h-20 h-fit border focus-within:border-primary py-[4px] relative flex transition-all",
                props["aria-invalid"] && "border-destructive focus-within:border-destructive",
                className
            )}
        >
            <textarea
                className={twMergeImproved(
                    "peer z-[1] flex w-full rounded-lg pt-3 min-h-40 px-[22px] ring-offset-background border-0 bg-transparent text-sm font-medium placeholder:text-muted-foreground focus:placeholder:opacity-100 outline-0 disabled:cursor-not-allowed disabled:opacity-50",
                    !label && "placeholder:opacity-100",
                    !props.value && "placeholder:opacity-0 focus-within:opacity-100"
                )}
                ref={ref}
                {...props}
            />
            {label && (
                <Label
                    className={twMergeImproved(
                        "absolute top-0 z-0 left-0 bg-transparent font-medium mx-[10px] px-[10px] text-sm text-muted-foreground py-[16px] transition-all peer-focus-within:-my-[12px] peer-focus-within:text-foreground peer-focus-within:py-0 peer-focus-within:bg-background peer-focus-within:rounded-sm",
                        props.value && "py-0 -my-[12px] z-10 rounded-sm bg-background",
                        props["aria-invalid"] && "text-destructive peer-focus-within:text-destructive"
                    )}
                >
                    {label}
                </Label>
            )}
        </div>
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
