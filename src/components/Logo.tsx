import { Compass, Moon } from "lucide-react"
import Link from "next/link"

export const Logo = ({expanded=true}:{expanded?: boolean}) => {
    return (
        <Link href="/">
            <div className="flex gap-3 items-center">
                <div className="border-2 p-1 rounded-lg border-inherit bg-primary/2">
                    <Moon size={24} className="fill-inherit" />
                </div>
                {expanded && <p className="font-semibold text-xl">JobNorth</p>}
            </div>
        </Link>
    )
}