'use client'
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  return (
    <div className="">
      <Header />
      <Hero />
    </div>
  );
}