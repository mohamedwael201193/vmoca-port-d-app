"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Users, Zap, CheckCircle, ExternalLink } from "lucide-react"
import { OnboardingModal } from "@/components/onboarding-modal"
import Link from "next/link"

export function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Privacy-First Identity",
      description: "Aggregate your Web2 and Web3 credentials with zero-knowledge proofs",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Sybil Resistance",
      description: "Build verifiable reputation to combat fake accounts and bots",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Seamless Integration",
      description: "One-click verification for airdrops, governance, and community access",
    },
  ]

  const benefits = [
    "Decentralized identity on Moca Network",
    "Social login with account abstraction",
    "zkTLS for trustless Web2 data import",
    "Privacy-preserving credential verification",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-foreground">MocaPort</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/demo">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Demos
              </Link>
            </Button>
            <Button
              onClick={() => setShowOnboarding(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Universal
            <span className="text-primary"> Web3 Passport</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Aggregate your digital credentials into a single, privacy-preserving identity. Build verifiable reputation
            and unlock the full potential of Web3.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 animate-pulse-glow"
            >
              Create My MocaPort
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Try Demo Apps</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose MocaPort?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on Moca Network with cutting-edge Web3 technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Benefits List */}
        <Card className="p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Powered by Moca Network</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Build Your Digital Identity?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join the future of decentralized identity with MocaPort
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4"
            >
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Explore Demos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 MocaPort. Built for Moca Network Hackathon.</p>
        </div>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
