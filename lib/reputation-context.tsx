"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useCredentials } from "./credentials-context"

interface ReputationContextType {
  score: number
  maxScore: number
  level: string
  percentile: number
  updateScore: () => void
  getScoreBreakdown: () => Record<string, number>
}

const ReputationContext = createContext<ReputationContextType | undefined>(undefined)

export function ReputationProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0)
  const [maxScore] = useState(500) // Maximum possible score
  const { credentials, getTotalPoints } = useCredentials()

  // Calculate reputation level based on score
  const getLevel = (currentScore: number) => {
    const percentage = (currentScore / maxScore) * 100
    if (percentage >= 80) return "Expert"
    if (percentage >= 60) return "Advanced"
    if (percentage >= 40) return "Intermediate"
    if (percentage >= 20) return "Beginner"
    return "Newcomer"
  }

  // Calculate percentile (mock data for demo)
  const getPercentile = (currentScore: number) => {
    return Math.min(Math.floor((currentScore / maxScore) * 100), 95)
  }

  const updateScore = () => {
    const newScore = getTotalPoints()
    setScore(newScore)
    localStorage.setItem("mocaport_reputation", JSON.stringify({ score: newScore, lastUpdated: Date.now() }))
  }

  const getScoreBreakdown = () => {
    const breakdown: Record<string, number> = {}
    credentials.forEach((cred) => {
      if (cred.isVerified) {
        breakdown[cred.category] = (breakdown[cred.category] || 0) + cred.points
      }
    })
    return breakdown
  }

  // Load reputation from localStorage on mount
  useEffect(() => {
    const savedReputation = localStorage.getItem("mocaport_reputation")
    if (savedReputation) {
      try {
        const { score: savedScore } = JSON.parse(savedReputation)
        setScore(savedScore)
      } catch (error) {
        console.error("Failed to load reputation:", error)
      }
    }
  }, [])

  // Update score when credentials change
  useEffect(() => {
    updateScore()
  }, [credentials])

  const level = getLevel(score)
  const percentile = getPercentile(score)

  return (
    <ReputationContext.Provider
      value={{
        score,
        maxScore,
        level,
        percentile,
        updateScore,
        getScoreBreakdown,
      }}
    >
      {children}
    </ReputationContext.Provider>
  )
}

export function useReputation() {
  const context = useContext(ReputationContext)
  if (context === undefined) {
    throw new Error("useReputation must be used within a ReputationProvider")
  }
  return context
}
