"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Shield, AlertTriangle } from "lucide-react"

interface VerificationRequestToastProps {
  requesterName: string
  credentialName: string
  onApprove: () => void
  onDeny: () => void
  isVisible?: boolean
  onClose?: () => void
  autoHide?: boolean
  duration?: number
}

export function VerificationRequestToast({
  requesterName,
  credentialName,
  onApprove,
  onDeny,
  isVisible = true,
  onClose,
  autoHide = false,
  duration = 10000,
}: VerificationRequestToastProps) {
  const [show, setShow] = useState(isVisible)
  const [timeLeft, setTimeLeft] = useState(duration / 1000)

  useEffect(() => {
    setShow(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (autoHide && show) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShow(false)
            onClose?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [autoHide, show, onClose])

  const handleApprove = () => {
    onApprove()
    setShow(false)
    onClose?.()
  }

  const handleDeny = () => {
    onDeny()
    setShow(false)
    onClose?.()
  }

  const handleClose = () => {
    setShow(false)
    onClose?.()
  }

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <Card className="w-80 p-4 border-2 border-primary/20 bg-card shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">Verification Request</span>
          </div>

          <div className="flex items-center gap-2">
            {autoHide && (
              <Badge variant="outline" className="text-xs">
                {timeLeft}s
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0 hover:bg-muted">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-foreground">{requesterName}</span>
              <span className="text-muted-foreground"> is requesting access to your </span>
              <span className="font-medium text-primary">{credentialName}</span>
              <span className="text-muted-foreground"> credential.</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-blue-800">
              <strong>Privacy Notice:</strong> Only a zero-knowledge proof will be shared. Your actual credential data
              remains private.
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDeny}
              variant="outline"
              size="sm"
              className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            >
              Deny
            </Button>
            <Button
              onClick={handleApprove}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Approve
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
