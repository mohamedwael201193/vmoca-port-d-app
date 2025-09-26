"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface CredentialCardProps {
  title: string
  icon: React.ReactNode
  issuer: string
  issuanceDate: string
  isVerified: boolean
  points?: number
  category?: string
  className?: string
}

export function CredentialCard({
  title,
  icon,
  issuer,
  issuanceDate,
  isVerified,
  points,
  category,
  className,
}: CredentialCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-lg transition-all duration-200 border-2",
        isVerified ? "border-green-200 bg-green-50/50" : "border-orange-200 bg-orange-50/50",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{issuer}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {points && (
            <Badge variant="secondary" className="text-xs">
              +{points} pts
            </Badge>
          )}
          {isVerified ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Clock className="w-5 h-5 text-orange-500" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {category && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}
          <span className="text-muted-foreground">Issued {formatDate(issuanceDate)}</span>
        </div>

        <div className="flex items-center gap-1">
          {isVerified ? (
            <span className="text-green-600 font-medium">Verified</span>
          ) : (
            <span className="text-orange-500 font-medium">Pending</span>
          )}
        </div>
      </div>
    </Card>
  )
}
