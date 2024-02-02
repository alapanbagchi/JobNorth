import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    return <div className={twMerge("", className)}></div>;
};

export default Sidebar;
