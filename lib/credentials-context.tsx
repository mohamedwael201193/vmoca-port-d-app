"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Credential {
  id: string
  title: string
  description: string
  icon: string
  category: string
  points: number
  issuer: string
  issuanceDate: string
  isVerified: boolean
  verificationMethod: string
  metadata?: Record<string, any>
}

interface CredentialsContextType {
  credentials: Credential[]
  addCredential: (credential: Omit<Credential, "id" | "issuanceDate">) => void
  removeCredential: (id: string) => void
  updateCredential: (id: string, updates: Partial<Credential>) => void
  getCredentialsByCategory: (category: string) => Credential[]
  getTotalPoints: () => number
}

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined)

export function CredentialsProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<Credential[]>([])

  // Load credentials from localStorage on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("mocaport_credentials")
    if (savedCredentials) {
      try {
        setCredentials(JSON.parse(savedCredentials))
      } catch (error) {
        console.error("Failed to load credentials:", error)
      }
    }
  }, [])

  // Save credentials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mocaport_credentials", JSON.stringify(credentials))
  }, [credentials])

  const addCredential = (credentialData: Omit<Credential, "id" | "issuanceDate">) => {
    const newCredential: Credential = {
      ...credentialData,
      id: `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      issuanceDate: new Date().toISOString(),
    }

    setCredentials((prev) => [...prev, newCredential])
  }

  const removeCredential = (id: string) => {
    setCredentials((prev) => prev.filter((cred) => cred.id !== id))
  }

  const updateCredential = (id: string, updates: Partial<Credential>) => {
    setCredentials((prev) => prev.map((cred) => (cred.id === id ? { ...cred, ...updates } : cred)))
  }

  const getCredentialsByCategory = (category: string) => {
    return credentials.filter((cred) => cred.category === category)
  }

  const getTotalPoints = () => {
    return credentials.reduce((total, cred) => total + (cred.isVerified ? cred.points : 0), 0)
  }

  return (
    <CredentialsContext.Provider
      value={{
        credentials,
        addCredential,
        removeCredential,
        updateCredential,
        getCredentialsByCategory,
        getTotalPoints,
      }}
    >
      {children}
    </CredentialsContext.Provider>
  )
}

export function useCredentials() {
  const context = useContext(CredentialsContext)
  if (context === undefined) {
    throw new Error("useCredentials must be used within a CredentialsProvider")
  }
  return context
}
