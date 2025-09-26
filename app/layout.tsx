import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { CredentialsProvider } from "@/lib/credentials-context"
import { ReputationProvider } from "@/lib/reputation-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "MocaPort - Universal Web3 Passport",
  description: "Aggregate your Web2 and Web3 credentials into a single, privacy-preserving Moca ID",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <AuthProvider>
          <CredentialsProvider>
            <ReputationProvider>{children}</ReputationProvider>
          </CredentialsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
