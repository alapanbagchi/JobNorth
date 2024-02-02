import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//** NOTE: is this even viable with objectsoutside of many nested arrays? ? */
export function twMergeImproved(...inputs: ClassValue[]) {
    const result = twMerge(clsx(inputs));
    return result;
}
