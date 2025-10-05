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
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "react-toastify"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        try {
            // TODO: Implement signup
            console.log("Signup values:", values)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success("Account created successfully!")
            router.push("/sign-in")
        } catch (err) {
            // TODO: Handle error
            toast.error("Signup failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 mt-4", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...form.register("name")}
                                />
                                {form.formState.errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.name.message}
                                    </div>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
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
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
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
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirm Password
                                        </FieldLabel>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            {...form.register("confirmPassword")}
                                        />
                                        {form.formState.errors.confirmPassword && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {form.formState.errors.confirmPassword.message}
                                            </div>
                                        )}
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                {form.formState.errors.root && (
                                    <div className="text-red-500 text-sm mb-2">
                                        {form.formState.errors.root.message}
                                    </div>
                                )}
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? <Spinner /> : "Create Account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/sign-in">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}