import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-mode";

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
                    <Button variant="ghost" className="hidden sm:inline-flex">
                        <Link href="/sign-in">
                            Sign In
                        </Link>
                    </Button>
                    <Button variant="secondary" className="rounded-md bg-primary font-semibold  text-white hover:bg-primary/90">
                        <Link href="/sign-up">
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}