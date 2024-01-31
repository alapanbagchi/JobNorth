import { ChevronDown, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/auth";

export const Header = async () => {
    const session = await auth()
    return (
        <ul className="w-full h-full flex items-center bg-background">
            <li className="flex gap-2 items-center">
                <Moon size={28} className="fill-primary" />
            </li>
            <li className="flex gap-4 items-center ml-auto cursor-pointer p-2 rounded-lg hover:bg-secondary">
                <Avatar>
                    <AvatarImage src={session?.user.avatar} />
                    <AvatarFallback>{
                        session?.user.name.split(" ").map((name) => name[0].toUpperCase()).join("")
                    }</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{session?.user.name}</p>
                    <p className="font-medium text-sm text-muted-foreground">{session?.user.designation}</p>
                </div>
                <ChevronDown size={20} className="text-muted-foreground" />
            </li>
        </ul>
    )
}