import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-mode";
import UserButton from "@/components/UserButton";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        <TrendingUp className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        <Link href="/">
                            InvestAI Hub
                        </Link>
                    </span>
                </div>



                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
        </header>
    )
}