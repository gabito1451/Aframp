"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletName, setWalletName] = useState<string>("")
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Check if wallet is connected from URL params or localStorage
    const wallet = searchParams.get("wallet")
    const address = searchParams.get("address")
    
    if (wallet && address) {
      setWalletName(wallet)
      setWalletAddress(address)
      setConnected(true)
      // Store in localStorage for persistence
      localStorage.setItem("walletName", wallet)
      localStorage.setItem("walletAddress", address)
    } else {
      // Check localStorage
      const storedWallet = localStorage.getItem("walletName")
      const storedAddress = localStorage.getItem("walletAddress")
      
      if (storedWallet && storedAddress) {
        setWalletName(storedWallet)
        setWalletAddress(storedAddress)
        setConnected(true)
      } else {
        // Redirect to home if not connected
        router.push("/")
      }
    }
  }, [searchParams, router])

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <DashboardContent walletName={walletName} walletAddress={walletAddress} />
    </DashboardLayout>
  )
}

