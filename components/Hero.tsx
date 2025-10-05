import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background -mt-8">



            <div className="container relative z-10 px-4 py-20 md:py-32">
                <div className="mx-auto max-w-5xl text-center">
                    {/* Announcement badge */}
                    <div className="mb-8 flex justify-center animate-fade-in">
                        <Badge
                            variant="default"
                            className="gap-2 rounded-full px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-secondary"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Powered by Advanced AI Models</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Badge>
                    </div>

                    {/* Main heading */}
                    <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up text-balance">
                        AI-Powered Market
                        <span className="block text-primary mt-2">Analysis Platform</span>
                    </h1>

                    {/* Subheading */}
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed animate-fade-in-up animation-delay-200 text-pretty">
                        Analyze stocks and crypto markets with cutting-edge artificial intelligence. Make smarter investment
                        decisions with real-time insights and predictive analytics.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-400">
                        <Button
                            size="lg"
                            className="group h-12 gap-2 rounded-md px-8 text-white font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                        >
                            <Link href="/sign-up">
                                Start Analyzing Free
                            </Link>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    {/* Feature highlights */}

                </div>
            </div>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    )
}