"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trophy, Users, Shield, TrendingUp, Wallet } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { UserMenu } from "@/components/user-menu"
import { CredentialCard } from "@/components/credential-card"
import { ReputationGauge } from "@/components/reputation-gauge"
import { GuidedTour } from "@/components/guided-tour"
import { StampCatalogModal } from "@/components/stamp-catalog-modal"
import { WalletConnection } from "@/components/wallet-connection"
import { dashboardTourSteps } from "@/lib/tour-steps"
import { useCredentials } from "@/lib/credentials-context"
import { useReputation } from "@/lib/reputation-context"

export default function DashboardPage() {
  const { user, updateUser } = useAuth()
  const { credentials } = useCredentials()
  const { score, maxScore, level, updateScore } = useReputation()
  const [showTour, setShowTour] = useState(false)
  const [showStampCatalog, setShowStampCatalog] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    if (user?.isFirstTime) {
      setShowTour(true)
    }
  }, [user])

  const handleTourComplete = () => {
    setShowTour(false)
    if (user) {
      updateUser({ isFirstTime: false })
    }
  }

  const handleTourSkip = () => {
    setShowTour(false)
    if (user) {
      updateUser({ isFirstTime: false })
    }
  }

  const stats = [
    {
      title: "Total Credentials",
      value: credentials.length,
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      title: "Reputation Level",
      value: level,
      icon: <Trophy className="w-5 h-5" />,
      color: "text-yellow-600",
    },
    {
      title: "Verification Requests",
      value: "12",
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      title: "Score Growth",
      value: "+15%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-purple-600",
    },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">MocaPort</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Dashboard
              </Badge>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-muted-foreground">Your Moca ID:</p>
            <Badge variant="outline" className="font-mono" data-tour="moca-id">
              {user.mocaId}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!isWalletConnected && (
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Connect Your Wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect your wallet to enable on-chain credential verification and smart contract interactions.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Credentials Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Your Credentials</h2>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  data-tour="add-stamp-button"
                  onClick={() => setShowStampCatalog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Stamp
                </Button>
              </div>

              {credentials.length > 0 ? (
                <div className="grid gap-4" data-tour="credentials-grid">
                  {credentials.map((credential) => (
                    <CredentialCard
                      key={credential.id}
                      title={credential.title}
                      icon={<span className="text-2xl">{credential.icon}</span>}
                      issuer={credential.issuer}
                      issuanceDate={credential.issuanceDate}
                      isVerified={credential.isVerified}
                      points={credential.points}
                      category={credential.category}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center" data-tour="credentials-grid">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Credentials Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your reputation by adding your first credential stamp.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowStampCatalog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Stamp
                  </Button>
                </Card>
              )}
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Account created successfully</p>
                    <p className="text-xs text-muted-foreground">Welcome to MocaPort!</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Moca ID generated</p>
                    <p className="text-xs text-muted-foreground font-mono">{user.mocaId}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                {isWalletConnected && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Wallet connected</p>
                      <p className="text-xs text-muted-foreground">Ready for on-chain verification</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Recently</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div data-tour="wallet-connection">
              <WalletConnection onConnectionChange={setIsWalletConnected} />
            </div>

            {/* Reputation Gauge */}
            <div data-tour="reputation-gauge">
              <ReputationGauge score={score} maxScore={maxScore} showDetails={true} />
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowStampCatalog(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Verify GitHub Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowStampCatalog(true)}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Check NFT Holdings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowStampCatalog(true)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join DAO Governance
                </Button>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Connect your wallet and verify multiple credentials to increase your reputation score and unlock more
                opportunities in the Web3 ecosystem.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StampCatalogModal isOpen={showStampCatalog} onClose={() => setShowStampCatalog(false)} />

      {/* Guided Tour */}
      <GuidedTour
        steps={dashboardTourSteps}
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </div>
  )
}
