import { ThemeToggleButton } from "./theme-toggle"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { User } from "lucide-react"

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 px-4 sm:px-8 md:px-20 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Value4U</h1>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/images/profile.jpg" />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <ThemeToggleButton />
            </div>
        </header>
    )
}
