"use client"
import { SignupForm } from "@/components/signup-form"
import { Header } from "@/components/Header"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
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
            <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">

                    <SignupForm />
                </div>
            </div>
        </>
    )
}