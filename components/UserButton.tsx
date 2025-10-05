'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Spinner } from './ui/spinner'

const UserButton = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Get initial user
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        getUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            toast.success('Signed out successfully')
            router.push('/')
        } catch (error) {
            toast.error('Error signing out')
        }
    }



    if (!user) {
        return (

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    onClick={() => router.push('/sign-in')}
                >
                    {loading ? <Spinner /> : "Sign In"}
                </Button>
                <Button variant="default" className="rounded-md bg-primary font-semibold  text-white hover:bg-primary/90">
                    <Link href="/sign-up">
                        {loading ? <Spinner /> : "Get Started"}
                    </Link>
                </Button>
            </div>
        )
    }

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
    const userEmail = user.email || ''
    const avatarUrl = user.user_metadata?.avatar_url

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={userName} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(userName)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton