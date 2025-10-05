"use client"
import { Header } from "@/components/Header"
import { LoginForm } from "@/components/signin-form"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user && !loading) {
            router.push('/dashboard')
        }
    }, [user, loading, router])
    return (
        <>
            <Header />
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}