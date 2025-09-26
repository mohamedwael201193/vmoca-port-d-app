"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  mocaId: string
  email: string
  name: string
  avatar?: string
  provider: string
  createdAt: string
  isFirstTime: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (provider: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem("mocaport_user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error("Failed to restore session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (provider: string) => {
    setIsLoading(true)

    try {
      // Simulate Moca AIR Kit authentication
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock user data
      const mockUser: User = {
        id: `user_${Date.now()}`,
        mocaId: `user${Math.floor(Math.random() * 10000)}.moca`,
        email: provider === "email" ? "user@example.com" : `user@${provider}.com`,
        name: provider === "google" ? "John Doe" : provider === "twitter" ? "John (@johndoe)" : "John Doe",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        provider,
        createdAt: new Date().toISOString(),
        isFirstTime: true,
      }

      setUser(mockUser)
      localStorage.setItem("mocaport_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mocaport_user")
    localStorage.removeItem("mocaport_credentials")
    localStorage.removeItem("mocaport_reputation")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("mocaport_user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
