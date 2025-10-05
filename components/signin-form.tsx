'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "react-toastify"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase-client"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()

    const formSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password is required"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const supabase = createClient()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            console.log("Login successful:", data.user)
            toast.success("Login successful!")
            router.push("/dashboard")
        } catch (err) {
            toast.error("Login failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your-email@example.com"
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.email.message}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...form.register("password")}
                                />
                                {form.formState.errors.password && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.password.message}
                                    </div>
                                )}
                            </div>
                            {form.formState.errors.root && (
                                <div className="text-red-500 text-sm">
                                    {form.formState.errors.root.message}
                                </div>
                            )}
                            <Button type="submit" disabled={loading} className="w-full text-white font-semibold">
                                {loading ? <Spinner /> : "Login"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <a href="/sign-up" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}