"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ChevronDown, Settings } from "lucide-react"

export const NavbarCTAGroup = ({ authenticated = false, name, email }: { authenticated: boolean, name: string | undefined, email: string | undefined }) =>
    !authenticated ? (
        <>
            <li className="ml-auto mr-2">
                <Button variant="ghost">
                    <Link href="/login">Log in</Link>
                </Button>
            </li>
            <li>
                <Button>
                    <Link href="/signup">Sign up</Link>
                </Button>
            </li>
        </>
    ) : (
        <>
            <li className="ml-10 flex font-medium opacity-80 border-b-2 border-transparent hover:opacity-100 hover:border-foreground h-full items-center transition-all">
                <Link href="/dashboard/jobs" className="h-full items-center flex">Find Jobs</Link>
            </li>
            <li className="ml-5 flex font-medium opacity-80 border-transparent hover:opacity-100 border-b-2  hover:border-foreground h-full items-center transition-all">
                <Link href="/dashboard/jobs/post" className="h-full items-center flex">Post a Job</Link>
            </li>
            <li className="ml-5 flex font-medium opacity-80 border-transparent hover:opacity-100 border-b-2  hover:border-foreground h-full items-center transition-all">
                <Link href="/dashboard/jobs/manage" className="h-full items-center flex">Manage Jobs</Link>
            </li>
            <li className="ml-5 flex font-medium opacity-80 border-transparent hover:opacity-100 border-b-2  hover:border-foreground h-full items-center transition-all">
                <Link href="/dashboard/jobs/messages" className="h-full items-center flex">Messages</Link>
            </li>
        </>
    )
