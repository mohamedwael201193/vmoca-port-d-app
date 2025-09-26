"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Users, Shield, ExternalLink, ArrowRight, Zap, Lock } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const demoApps = [
    {
      id: "moca-airdrop",
      name: "MocaAirdrop",
      description: "Exclusive token airdrop for verified developers",
      icon: <Gift className="w-8 h-8 text-green-500" />,
      category: "DeFi",
      requirements: ["GitHub Contributor"],
      reward: "1,000 MOCA tokens",
      href: "/demo/moca-airdrop",
    },
    {
      id: "dao-governance",
      name: "MocaDAO",
      description: "Participate in decentralized governance",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      category: "Governance",
      requirements: ["DAO Governance Participant"],
      reward: "Voting power",
      href: "#",
      comingSoon: true,
    },
    {
      id: "nft-marketplace",
      name: "MocaNFT",
      description: "Exclusive NFT marketplace access",
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      category: "NFT",
      requirements: ["Moca NFT Holder"],
      reward: "Early access",
      href: "#",
      comingSoon: true,
    },
  ]

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Privacy-First",
      description: "Zero-knowledge proofs protect your personal data",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Instant Verification",
      description: "Real-time credential verification without delays",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Sybil Resistant",
      description: "Prevent fake accounts and ensure fair distribution",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">MocaPort</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Demo Ecosystem
              </Badge>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">MocaPort Integration Demos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience how third-party dApps integrate with MocaPort for seamless, privacy-preserving credential
            verification.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Demo Apps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Try These Demo Applications</h2>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {demoApps.map((app) => (
              <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">{app.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{app.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {app.category}
                        </Badge>
                        {app.comingSoon && (
                          <Badge variant="secondary" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{app.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Requirements:</span>
                          <div className="flex gap-1">
                            {app.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Reward:</span>
                          <Badge className="text-xs bg-green-100 text-green-800">{app.reward}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {app.comingSoon ? (
                      <Button disabled variant="outline">
                        Coming Soon
                      </Button>
                    ) : (
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={app.href} className="flex items-center gap-2">
                          Try Demo
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Guide */}
        <Card className="p-8 mt-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Build Your Own Integration</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Learn how to integrate MocaPort verification into your dApp and provide seamless, privacy-preserving
              authentication for your users.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ExternalLink className="w-4 h-4" />
                View Documentation
              </Button>
              <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Get API Keys
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
