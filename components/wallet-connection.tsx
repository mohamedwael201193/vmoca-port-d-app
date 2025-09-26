"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, Zap } from "lucide-react"
import { mocaAIRKit } from "@/lib/moca-air-kit"
import { useToast } from "@/hooks/use-toast"

interface WalletConnectionProps {
  onConnectionChange?: (connected: boolean) => void
}

export function WalletConnection({ onConnectionChange }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [mocaId, setMocaId] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if already connected
    if (mocaAIRKit.isConnected()) {
      setIsConnected(true)
      setAddress(mocaAIRKit.getAddress())
      setMocaId(mocaAIRKit.getMocaId())
      loadBalance()
    }
  }, [])

  const loadBalance = async () => {
    if (!mocaAIRKit.isConnected()) return

    setIsLoadingBalance(true)
    try {
      const balance = await mocaAIRKit.getBalance()
      setBalance(balance)
    } catch (error) {
      console.error("[v0] Error loading balance:", error)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const result = await mocaAIRKit.connect()
      setIsConnected(true)
      setAddress(result.address)
      setMocaId(result.mocaId)

      toast({
        title: "Wallet Connected",
        description: `Connected to Moca Network with ID: ${result.mocaId}`,
      })

      await loadBalance()
      onConnectionChange?.(true)
    } catch (error) {
      console.error("[v0] Connection error:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Moca AIR Kit",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await mocaAIRKit.disconnect()
      setIsConnected(false)
      setAddress(null)
      setMocaId(null)
      setBalance(null)

      toast({
        title: "Wallet Disconnected",
        description: "Successfully disconnected from Moca Network",
      })

      onConnectionChange?.(false)
    } catch (error) {
      console.error("[v0] Disconnect error:", error)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    })
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Connect your wallet to access MocaPort features</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConnect} disabled={isConnecting} className="w-full" size="lg">
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Connect with Moca AIR Kit
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div>
              <CardTitle className="text-lg">Connected</CardTitle>
              <CardDescription>Moca Network</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Moca ID</span>
            <div className="flex items-center space-x-1">
              <code className="text-sm bg-muted px-2 py-1 rounded">{mocaId}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mocaId!, "Moca ID")}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Address</span>
            <div className="flex items-center space-x-1">
              <code className="text-sm bg-muted px-2 py-1 rounded">{formatAddress(address!)}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(address!, "Address")}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Balance</span>
            <div className="flex items-center space-x-1">
              {isLoadingBalance ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              ) : (
                <span className="text-sm font-mono">{balance} ETH</span>
              )}
              <Button variant="ghost" size="sm" onClick={loadBalance} disabled={isLoadingBalance}>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={handleDisconnect} className="w-full bg-transparent">
          Disconnect
        </Button>
      </CardContent>
    </Card>
  )
}
