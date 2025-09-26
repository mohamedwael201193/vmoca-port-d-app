"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Shield, CheckCircle, AlertTriangle, ExternalLink, Users, Coins, Trophy, Lock } from "lucide-react"
import { VerificationRequestToast } from "@/components/verification-request-toast"

export default function MocaAirdropDemo() {
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "requesting" | "approved" | "denied">("idle")
  const [showToast, setShowToast] = useState(false)
  const [userEligible, setUserEligible] = useState(false)
  const [airdropClaimed, setAirdropClaimed] = useState(false)

  const airdropDetails = {
    name: "MocaAirdrop",
    token: "MOCA",
    amount: "1,000",
    totalPool: "10,000,000",
    participants: "2,847",
    timeLeft: "5 days",
    requirements: ["GitHub Contributor credential", "Minimum 100 commits verified", "Active Moca Network user"],
  }

  const handleVerifyWithMocaPort = () => {
    setVerificationStatus("requesting")
    setShowToast(true)
  }

  const handleApproveVerification = () => {
    setShowToast(false)
    setVerificationStatus("approved")

    // Simulate verification process
    setTimeout(() => {
      setUserEligible(true)
    }, 2000)
  }

  const handleDenyVerification = () => {
    setShowToast(false)
    setVerificationStatus("denied")
  }

  const handleClaimAirdrop = () => {
    setAirdropClaimed(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">MocaAirdrop</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Demo dApp
              </Badge>
            </div>
          </div>
          <Button variant="outline" asChild>
            <a href="/dashboard" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Back to MocaPort
            </a>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coins className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Exclusive MOCA Token Airdrop</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Claim your share of 10M MOCA tokens. Exclusive to verified developers on the Moca Network.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Coins className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{airdropDetails.amount}</div>
            <div className="text-sm text-muted-foreground">MOCA per user</div>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{airdropDetails.totalPool}</div>
            <div className="text-sm text-muted-foreground">Total pool</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{airdropDetails.participants}</div>
            <div className="text-sm text-muted-foreground">Participants</div>
          </Card>
          <Card className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{airdropDetails.timeLeft}</div>
            <div className="text-sm text-muted-foreground">Time left</div>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Requirements */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Eligibility Requirements
            </h3>
            <div className="space-y-3">
              {airdropDetails.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Verification Section */}
          <Card className="p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Verify Your Eligibility</h3>

              {verificationStatus === "idle" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Connect your MocaPort to verify your GitHub Contributor credential and claim your airdrop.
                  </p>
                  <Button
                    onClick={handleVerifyWithMocaPort}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Verify with MocaPort
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Privacy-preserving verification with zero-knowledge proofs
                  </div>
                </div>
              )}

              {verificationStatus === "requesting" && (
                <div className="space-y-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground">Waiting for verification approval from your MocaPort...</p>
                </div>
              )}

              {verificationStatus === "approved" && !userEligible && (
                <div className="space-y-4">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground">Verification approved! Processing your credentials...</p>
                </div>
              )}

              {verificationStatus === "approved" && userEligible && !airdropClaimed && (
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-2">Verification Successful!</h4>
                    <p className="text-muted-foreground mb-4">
                      Your GitHub Contributor credential has been verified. You're eligible for the airdrop!
                    </p>
                    <Button
                      onClick={handleClaimAirdrop}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      size="lg"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Claim {airdropDetails.amount} MOCA
                    </Button>
                  </div>
                </div>
              )}

              {airdropClaimed && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-2">Airdrop Claimed Successfully!</h4>
                    <p className="text-muted-foreground mb-4">
                      {airdropDetails.amount} MOCA tokens have been sent to your wallet.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-sm text-green-800">
                        <strong>Transaction Hash:</strong>
                        <br />
                        <code className="text-xs">0x{Math.random().toString(16).substr(2, 64)}</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {verificationStatus === "denied" && (
                <div className="space-y-4">
                  <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto" />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-700 mb-2">Verification Denied</h4>
                    <p className="text-muted-foreground mb-4">
                      You denied the verification request. You can try again anytime.
                    </p>
                    <Button onClick={() => setVerificationStatus("idle")} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* How it Works */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">How MocaPort Verification Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Request Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    The dApp requests proof of your GitHub Contributor credential
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Approve in MocaPort</h4>
                  <p className="text-sm text-muted-foreground">
                    You receive a notification and can approve or deny the request
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Zero-Knowledge Proof</h4>
                  <p className="text-sm text-muted-foreground">
                    A cryptographic proof is generated without revealing your personal data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Access Granted</h4>
                  <p className="text-sm text-muted-foreground">
                    The dApp verifies the proof and grants you access to the airdrop
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Verification Request Toast */}
      <VerificationRequestToast
        requesterName="MocaAirdrop"
        credentialName="GitHub Contributor"
        onApprove={handleApproveVerification}
        onDeny={handleDenyVerification}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        autoHide={true}
        duration={15000}
      />
    </div>
  )
}
