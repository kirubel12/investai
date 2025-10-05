'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

const USER_STORAGE_KEY = 'user'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    // Save user to localStorage
    const saveUserToStorage = (user: User | null) => {
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        } else {
            localStorage.removeItem(USER_STORAGE_KEY)
        }
    }

    // Get user from localStorage
    const getUserFromStorage = (): User | null => {
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY)
            return storedUser ? JSON.parse(storedUser) : null
        } catch (error) {
            console.error('Error parsing user from localStorage:', error)
            localStorage.removeItem(USER_STORAGE_KEY)
            return null
        }
    }

    useEffect(() => {
        // First, try to get user from localStorage
        const storedUser = getUserFromStorage()
        if (storedUser) {
            setUser(storedUser)
            setLoading(false)
        } else {
            // If no stored user, check with Supabase once
            const getUser = async () => {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)
                saveUserToStorage(user)
                setLoading(false)
            }
            getUser()
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const newUser = session?.user ?? null
                setUser(newUser)
                saveUserToStorage(newUser)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
            setUser(null)
            localStorage.removeItem(USER_STORAGE_KEY)
            return { success: true }
        } catch (error) {
            console.error('Error signing out:', error)
            return { success: false, error }
        }
    }

    return {
        user,
        loading,
        signOut,
        isAuthenticated: !!user
    }
}
