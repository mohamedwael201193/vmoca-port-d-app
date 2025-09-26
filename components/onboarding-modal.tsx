"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Chrome, Twitter, Mail, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    setLoadingProvider(provider)

    try {
      await login(provider)
      onClose()
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
      setLoadingProvider(null)
    }
  }

  const socialProviders = [
    {
      id: "google",
      name: "Google",
      icon: <Chrome className="w-5 h-5" />,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: <Twitter className="w-5 h-5" />,
      color: "bg-black hover:bg-gray-800",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-primary hover:bg-primary/90",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Welcome to MocaPort</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">M</span>
            </div>
            <p className="text-muted-foreground">
              Sign in with your preferred method to create your universal Web3 passport
            </p>
          </div>

          <Card className="p-4 bg-muted/20">
            <div className="text-sm text-muted-foreground text-center">
              <strong>Powered by Moca AIR Kit</strong>
              <br />
              Account abstraction with social login
            </div>
          </Card>

          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <Button
                key={provider.id}
                onClick={() => handleSocialLogin(provider.id)}
                disabled={isLoading}
                className={`w-full ${provider.color} text-white flex items-center justify-center gap-3 py-3`}
              >
                {loadingProvider === provider.id ? <Loader2 className="w-5 h-5 animate-spin" /> : provider.icon}
                {loadingProvider === provider.id ? "Connecting..." : `Continue with ${provider.name}`}
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            By continuing, you agree to create a decentralized identity on the Moca Network. Your credentials are stored
            securely and you maintain full control.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
