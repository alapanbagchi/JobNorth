import * as React from "react";

import { twMergeImproved } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
    // If the input is autofilled, props.value is empty. Fix that
    if (props.value === "") {
        props.value = props.defaultValue || "";
    }
    return (
        <div
            className={twMergeImproved(
                "rounded-full h-12 border focus-within:border-primary py-[4px] relative flex transition-all",
                props["aria-invalid"] && "border-destructive focus-within:border-destructive",
                className
            )}
        >
            <input
                type={type}
                className={twMergeImproved(
                    "peer flex w-full h-full rounded-full top-0 absolute bg-transparent px-[22px] z-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-0 placeholder:text-muted-foreground focus:placeholder:opacity-100 outline-0 disabled:cursor-not-allowed disabled:opacity-50",
                    !label && "placeholder:opacity-100"
                )}
                ref={ref}
                {...props}
            />
            <Label
                className={twMergeImproved(
                    "bg-transparent peer-invalid:visible font-medium h-fit mx-[10px] px-[10px] text-sm text-muted-foreground py-[8px] peer-invalid:text-destructive peer-focus:bg-background peer-focus:text-primary peer-focus:py-0 peer-focus:-my-[16px] peer-focus:z-10 peer-focus:rounded-sm transition-all",
                    props.value && "py-0 -my-[16px] z-10 rounded-sm bg-background",
                    props["aria-invalid"] && "text-destructive peer-focus:text-destructive"
                )}
            >
                {label}
            </Label>
        </div>
    );
});
Input.displayName = "Input";

export { Input };
