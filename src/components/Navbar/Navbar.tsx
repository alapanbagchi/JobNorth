import { auth } from "@/auth"
import { Logo } from "../Logo"
import { NavbarCTAGroup } from "./NavbarCTAGroup"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChevronDown } from "lucide-react"

export const Navbar = async () => {
    const session = await auth()
    return (
        <div className="h-24 w-full z-10 border-muted border-b-2">
            <ul className="container flex items-center h-full w-full">
                <li><Logo /></li>
                <NavbarCTAGroup name={session?.user.name} email={session?.user.email} authenticated={!!session?.user.id} />
                <li className="flex gap-2 ml-auto mr-2 hover:bg-accent px-6 py-3 rounded-xl cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-medium">{session?.user.name}</p>
                            <ChevronDown size={16} />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">{session?.user.email}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}