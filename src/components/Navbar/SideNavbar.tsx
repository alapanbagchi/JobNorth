"use client";
import { twMergeImproved } from "@/lib/utils";
import { Check, ChevronsUpDown, Home, LogOut, Settings, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { SignOutAction } from "@/actions/UserAuthActions";

export const SideNavbar = ({ hospitals }: { hospitals: { id: string; adminId: string; name: string }[] }) => {
    const pathname = usePathname();
    const router = useRouter();
    const size = 24;
    const links = [
        {
            name: "Dashboard",
            icon: <Home size={size} />,
            link: `/hospitals/${pathname.split("/").slice(2)[0]}/dashboard`,
        },
        {
            name: "Patients",
            icon: <User size={size} />,
            link: `/hospitals/${pathname.split("/").slice(2)[0]}/patients`,
        },
        {
            name: "Doctors",
            icon: <Stethoscope size={size} />,
            link: `/hospitals/${pathname.split("/").slice(2)[0]}/doctors`,
        },
    ];
    const [open, setOpen] = useState(false);
    const hospitalList = hospitals.map((hospital) => ({
        label: hospital.name,
        value: hospital.id,
    }));

    const [value, setValue] = useState(hospitalList.find((hospital) => hospital.value === pathname.split("/").slice(2)[0])?.value || "");
    console.log(pathname.split("/").slice(1).join("/"));
    return (
        <ul className="bg-white h-full w-full relative flex flex-col">
            <li className="w-full border-b py-3 px-4 mb-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="px-4 w-full flex justify-between">
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                            {value ? hospitalList.find((framework) => framework.value === value)?.label : "Select for hospitals"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search hospitals" />
                            <CommandEmpty>No hospitals found.</CommandEmpty>
                            <CommandGroup>
                                {hospitalList.map((hospital) => (
                                    <CommandItem
                                        key={hospital.value}
                                        value={hospital.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={twMergeImproved(
                                                "mr-2 h-4 w-4",
                                                value === hospital.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {hospital.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </li>
            {links.map(
                (link, i) => (
                    console.log(pathname.split("/").slice(1).join("/"), "/" + link.link),
                    (
                        <li key={i}>
                            <Link
                                className={twMergeImproved(
                                    "hover:bg-secondary text-[14px] transition-all mx-4 px-3 rounded-lg border-l-4 border-transparent text-muted-foreground active:scale-95 py-2 mb-1 cursor-pointer font-medium flex gap-3 items-center",
                                    "/" + pathname.split("/").slice(1).join("/") === link.link &&
                                        "bg-primary/10 text-primary border-primary"
                                )}
                                href={link.link}
                            >
                                {link.icon}
                                <p>{link.name}</p>
                            </Link>
                        </li>
                    )
                )
            )}
            <li className="mt-auto">
                <Link
                    className="hover:bg-secondary text-[14px] transition-all mx-4 px-3 rounded-lg border-l-4 border-transparent text-muted-foreground active:scale-95 py-2 mb-1 cursor-pointer font-medium flex gap-3 items-center"
                    href="/hospital/settings"
                >
                    <Settings size={size} />
                    <p>Settings</p>
                </Link>
            </li>
            <li>
                <div
                    onClick={async () => {
                        await SignOutAction();
                        router.push("/login");
                    }}
                    className="hover:bg-secondary text-[14px] transition-all mx-4 px-3 rounded-lg border-l-4 border-transparent text-muted-foreground active:scale-95 py-2 mb-1 cursor-pointer font-medium flex gap-3 items-center"
                >
                    <LogOut size={size} />
                    <p>Logout</p>
                </div>
            </li>
        </ul>
    );
};
