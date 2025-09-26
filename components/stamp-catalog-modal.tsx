"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Loader2, CheckCircle, Clock } from "lucide-react"
import { useCredentials } from "@/lib/credentials-context"
import stampsData from "@/lib/stamps.json"

interface StampCatalogModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StampCatalogModal({ isOpen, onClose }: StampCatalogModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [verifyingStamp, setVerifyingStamp] = useState<string | null>(null)
  const { credentials, addCredential } = useCredentials()

  const categories = ["all", "Web3", "Web2", "Platform"]
  const stamps = stampsData.stamps

  const filteredStamps = stamps.filter((stamp) => {
    const matchesSearch =
      stamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stamp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || stamp.category === selectedCategory
    const notAlreadyClaimed = !credentials.some((cred) => cred.title === stamp.title)

    return matchesSearch && matchesCategory && notAlreadyClaimed
  })

  const handleVerifyStamp = async (stamp: any) => {
    setVerifyingStamp(stamp.id)

    try {
      // Simulate verification process based on method
      await simulateVerification(stamp.verificationMethod, stamp.id)

      // Add credential to user's collection
      addCredential({
        title: stamp.title,
        description: stamp.description,
        icon: stamp.icon,
        category: stamp.category,
        points: stamp.points,
        issuer: "MocaPort Verification Service",
        isVerified: true,
        verificationMethod: stamp.verificationMethod,
        metadata: {
          requirements: stamp.requirements,
          verifiedAt: new Date().toISOString(),
        },
      })

      // Close modal after successful verification
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setVerifyingStamp(null)
    }
  }

  const simulateVerification = async (method: string, stampId: string) => {
    const delay = method === "zktls" ? 4000 : method === "smart-contract" ? 3000 : 2000

    await new Promise((resolve) => setTimeout(resolve, delay))

    // Simulate different verification outcomes
    if (Math.random() > 0.1) {
      // 90% success rate
      return { success: true, data: { verified: true } }
    } else {
      throw new Error("Verification failed")
    }
  }

  const getVerificationMethodBadge = (method: string) => {
    const methods = {
      "smart-contract": { label: "On-Chain", color: "bg-blue-100 text-blue-800" },
      zktls: { label: "zkTLS", color: "bg-purple-100 text-purple-800" },
      api: { label: "API", color: "bg-green-100 text-green-800" },
      platform: { label: "Platform", color: "bg-orange-100 text-orange-800" },
    }

    const methodInfo = methods[method as keyof typeof methods] || { label: method, color: "bg-gray-100 text-gray-800" }

    return <Badge className={`text-xs ${methodInfo.color}`}>{methodInfo.label}</Badge>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Stamp Catalog</DialogTitle>
          <p className="text-muted-foreground">Browse and claim credentials to build your reputation</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stamps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-4">
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {filteredStamps.length > 0 ? (
                  filteredStamps.map((stamp) => (
                    <Card key={stamp.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-3xl">{stamp.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{stamp.title}</h3>
                              {getVerificationMethodBadge(stamp.verificationMethod)}
                              <Badge variant="secondary" className="text-xs">
                                +{stamp.points} pts
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{stamp.description}</p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Requirements:</strong> {stamp.requirements}
                            </p>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleVerifyStamp(stamp)}
                          disabled={verifyingStamp === stamp.id}
                          className="bg-primary hover:bg-primary/90 min-w-[100px]"
                        >
                          {verifyingStamp === stamp.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Claim
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No stamps available</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || selectedCategory !== "all"
                        ? "Try adjusting your search or category filter"
                        : "You've claimed all available stamps!"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
