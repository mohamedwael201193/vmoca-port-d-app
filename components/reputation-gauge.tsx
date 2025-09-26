"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ReputationGaugeProps {
  score: number
  maxScore: number
  className?: string
  size?: "sm" | "md" | "lg"
  showDetails?: boolean
}

export function ReputationGauge({ score, maxScore, className, size = "md", showDetails = true }: ReputationGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const percentage = Math.min((score / maxScore) * 100, 100)

  // Size configurations
  const sizeConfig = {
    sm: { radius: 40, strokeWidth: 6, textSize: "text-lg" },
    md: { radius: 60, strokeWidth: 8, textSize: "text-2xl" },
    lg: { radius: 80, strokeWidth: 10, textSize: "text-3xl" },
  }

  const { radius, strokeWidth, textSize } = sizeConfig[size]
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  // Determine color based on score percentage
  const getColor = () => {
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-blue-500"
    if (percentage >= 40) return "text-yellow-500"
    return "text-orange-500"
  }

  const getStrokeColor = () => {
    if (percentage >= 80) return "#10b981"
    if (percentage >= 60) return "#3b82f6"
    if (percentage >= 40) return "#eab308"
    return "#f97316"
  }

  const getLevel = () => {
    if (percentage >= 80) return "Expert"
    if (percentage >= 60) return "Advanced"
    if (percentage >= 40) return "Intermediate"
    return "Beginner"
  }

  return (
    <Card className={cn("p-6 text-center", className)}>
      <div className="flex flex-col items-center gap-4">
        {/* Circular Progress */}
        <div className="relative">
          <svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={getStrokeColor()}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))",
              }}
            />
          </svg>

          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("font-bold", textSize, getColor())}>{animatedScore}</span>
            <span className="text-xs text-muted-foreground">/ {maxScore}</span>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Reputation Level:</span>
              <span className={cn("font-semibold text-sm", getColor())}>{getLevel()}</span>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getStrokeColor(),
                }}
              />
            </div>

            <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}% complete</p>
          </div>
        )}
      </div>
    </Card>
  )
}
