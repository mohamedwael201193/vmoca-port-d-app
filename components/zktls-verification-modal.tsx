"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, CheckCircle, ExternalLink } from "lucide-react"

interface ZkTLSVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  credentialType: string
  onVerificationComplete: (result: any) => void
}

export function ZkTLSVerificationModal({
  isOpen,
  onClose,
  credentialType,
  onVerificationComplete,
}: ZkTLSVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const steps = [
    {
      title: "Initialize zkTLS Session",
      description: "Setting up secure connection to external service",
      duration: 2000,
    },
    {
      title: "Authenticate with Service",
      description: "Logging into your account securely",
      duration: 3000,
    },
    {
      title: "Generate Zero-Knowledge Proof",
      description: "Creating cryptographic proof without revealing data",
      duration: 4000,
    },
    {
      title: "Verify Proof",
      description: "Validating the proof on Moca Network",
      duration: 2000,
    },
  ]

  const handleStartVerification = async () => {
    setIsVerifying(true)
    setCurrentStep(0)

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration))
    }

    // Simulate verification result
    const result = {
      success: true,
      proofHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      verifiedData: {
        commits: Math.floor(Math.random() * 500) + 100,
        repositories: Math.floor(Math.random() * 20) + 5,
        accountAge: Math.floor(Math.random() * 1000) + 365,
      },
      timestamp: new Date().toISOString(),
    }

    setVerificationResult(result)
    setIsVerifying(false)
    onVerificationComplete(result)
  }

  const getCredentialInfo = (type: string) => {
    const info = {
      "github-contributor": {
        service: "GitHub",
        icon: "💻",
        description: "Verify your GitHub contributions without revealing your username",
        requirements: "100+ commits, active account",
      },
      "social-verified": {
        service: "Twitter/X",
        icon: "🐦",
        description: "Verify your social media presence privately",
        requirements: "Verified account, 100+ followers",
      },
    }

    return (
      info[type as keyof typeof info] || {
        service: "Unknown",
        icon: "🔒",
        description: "Verify your credentials privately",
        requirements: "Meet service requirements",
      }
    )
  }

  const credentialInfo = getCredentialInfo(credentialType)
  const progress = isVerifying ? ((currentStep + 1) / steps.length) * 100 : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            zkTLS Verification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Credential Info */}
          <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{credentialInfo.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">Verifying {credentialInfo.service} Credentials</h3>
                <p className="text-sm text-muted-foreground">{credentialInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Requirements: {credentialInfo.requirements}
              </Badge>
            </div>
          </Card>

          {/* Privacy Notice */}
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Privacy Guaranteed</h4>
                <p className="text-sm text-blue-800">
                  zkTLS technology allows us to verify your credentials without accessing your personal data. Only the
                  proof of meeting requirements is generated.
                </p>
              </div>
            </div>
          </Card>

          {/* Verification Process */}
          {!verificationResult && (
            <div className="space-y-4">
              {isVerifying && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Verification Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {steps[currentStep]?.title}: {steps[currentStep]?.description}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      index < currentStep
                        ? "bg-green-50 text-green-800"
                        : index === currentStep && isVerifying
                          ? "bg-blue-50 text-blue-800"
                          : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : index === currentStep && isVerifying ? (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                    )}
                    <span className="text-sm">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Result */}
          {verificationResult && (
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-2">Verification Successful!</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="flex items-center justify-between">
                      <span>Proof Hash:</span>
                      <code className="text-xs bg-green-100 px-2 py-1 rounded">
                        {verificationResult.proofHash.slice(0, 16)}...
                      </code>
                    </div>
                    {verificationResult.verifiedData && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-100 rounded">
                          <div className="font-semibold">{verificationResult.verifiedData.commits}</div>
                          <div className="text-xs">Commits</div>
                        </div>
                        <div className="text-center p-2 bg-green-100 rounded">
                          <div className="font-semibold">{verificationResult.verifiedData.repositories}</div>
                          <div className="text-xs">Repositories</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {verificationResult ? "Close" : "Cancel"}
            </Button>
            {!verificationResult && (
              <Button
                onClick={handleStartVerification}
                disabled={isVerifying}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isVerifying ? "Verifying..." : "Start Verification"}
              </Button>
            )}
          </div>

          {/* Learn More */}
          <div className="text-center">
            <Button variant="link" className="text-xs text-muted-foreground">
              <ExternalLink className="w-3 h-3 mr-1" />
              Learn more about zkTLS technology
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
