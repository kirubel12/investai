import { Header } from '@/components/Header'
import React from 'react'

const Page = () => {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-card-foreground mb-6">Dashboard</h1>
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                    <p className="text-muted-foreground">Welcome to your investment dashboard</p>
                </div>
            </div>
        </div>
    )
}

export default Page