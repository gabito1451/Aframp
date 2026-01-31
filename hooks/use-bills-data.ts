"use client"

import { useState, useEffect } from "react"

// Types
interface BillCategory {
  id: string
  name: string
  icon: string
  billerCount: number
  color: string
  popular: boolean
}

interface Biller {
  id: string
  name: string
  category: string
  logo: string
  description: string
  popular: boolean
}

interface Transaction {
  id: string
  biller: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
  category: string
}

interface ScheduledPayment {
  id: string
  biller: string
  amount: number
  nextDate: string
  frequency: 'monthly' | 'weekly' | 'daily'
  status: 'active' | 'paused'
}

// Mock data based on country
const mockCategories: Record<string, BillCategory[]> = {
  NG: [
    { id: 'utilities', name: 'Utilities', icon: '🏠', billerCount: 45, color: 'blue', popular: true },
    { id: 'airtime', name: 'Airtime & Data', icon: '📱', billerCount: 28, color: 'green', popular: true },
    { id: 'cable', name: 'Cable TV', icon: '📺', billerCount: 12, color: 'purple', popular: false },
    { id: 'internet', name: 'Internet', icon: '🌐', billerCount: 18, color: 'orange', popular: true },
    { id: 'government', name: 'Government', icon: '🏛️', billerCount: 8, color: 'red', popular: false },
    { id: 'education', name: 'Education', icon: '🎓', billerCount: 15, color: 'indigo', popular: false },
  ],
  KE: [
    { id: 'utilities', name: 'Utilities', icon: '🏠', billerCount: 32, color: 'blue', popular: true },
    { id: 'airtime', name: 'Airtime & Data', icon: '📱', billerCount: 24, color: 'green', popular: true },
    { id: 'cable', name: 'Cable TV', icon: '📺', billerCount: 9, color: 'purple', popular: false },
    { id: 'internet', name: 'Internet', icon: '🌐', billerCount: 15, color: 'orange', popular: true },
    { id: 'government', name: 'Government', icon: '🏛️', billerCount: 6, color: 'red', popular: false },
    { id: 'education', name: 'Education', icon: '🎓', billerCount: 11, color: 'indigo', popular: false },
  ],
  GH: [
    { id: 'utilities', name: 'Utilities', icon: '🏠', billerCount: 28, color: 'blue', popular: true },
    { id: 'airtime', name: 'Airtime & Data', icon: '📱', billerCount: 21, color: 'green', popular: true },
    { id: 'cable', name: 'Cable TV', icon: '📺', billerCount: 7, color: 'purple', popular: false },
    { id: 'internet', name: 'Internet', icon: '🌐', billerCount: 12, color: 'orange', popular: true },
    { id: 'government', name: 'Government', icon: '🏛️', billerCount: 5, color: 'red', popular: false },
    { id: 'education', name: 'Education', icon: '🎓', billerCount: 9, color: 'indigo', popular: false },
  ]
}

const mockBillers: Record<string, Biller[]> = {
  NG: [
    { id: 'dstv', name: 'DSTV', category: 'cable', logo: '📺', description: 'Satellite TV subscription', popular: true },
    { id: 'gotv', name: 'GOTV', category: 'cable', logo: '📡', description: 'Digital satellite TV', popular: true },
    { id: 'startimes', name: 'StarTimes', category: 'cable', logo: '⭐', description: 'Digital TV service', popular: false },
    { id: 'spectranet', name: 'Spectranet', category: 'internet', logo: '📶', description: 'Broadband internet', popular: true },
    { id: 'swift', name: 'Swift', category: 'internet', logo: '⚡', description: 'Fiber internet', popular: false },
    { id: 'aedc', name: 'AEDC', category: 'utilities', logo: '💡', description: 'Electricity distribution', popular: true },
    { id: 'ikedc', name: 'IKEDC', category: 'utilities', logo: '🔌', description: 'Electricity distribution', popular: true },
    { id: 'phed', name: 'PHED', category: 'utilities', logo: '💧', description: 'Water distribution', popular: false },
    { id: 'mtn', name: 'MTN', category: 'airtime', logo: '🟨', description: 'Mobile network', popular: true },
    { id: 'airtel', name: 'Airtel', category: 'airtime', logo: '🟥', description: 'Mobile network', popular: true },
    { id: 'glo', name: 'Glo', category: 'airtime', logo: '🟩', description: 'Mobile network', popular: true },
    { id: '9mobile', name: '9mobile', category: 'airtime', logo: '🟦', description: 'Mobile network', popular: false },
  ],
  KE: [
    { id: 'dstv-ke', name: 'DSTV Kenya', category: 'cable', logo: '📺', description: 'Satellite TV', popular: true },
    { id: 'zuku', name: 'Zuku', category: 'internet', logo: '🌐', description: 'Fiber internet', popular: true },
    { id: 'safaricom', name: 'Safaricom', category: 'airtime', logo: '🟨', description: 'Mobile network', popular: true },
    { id: 'kplc', name: 'KPLC', category: 'utilities', logo: '💡', description: 'Electricity provider', popular: true },
  ],
  GH: [
    { id: 'dstv-gh', name: 'DSTV Ghana', category: 'cable', logo: '📺', description: 'Satellite TV', popular: true },
    { id: 'mtn-gh', name: 'MTN Ghana', category: 'airtime', logo: '🟨', description: 'Mobile network', popular: true },
    { id: 'vodafone-gh', name: 'Vodafone Ghana', category: 'airtime', logo: '🟥', description: 'Mobile network', popular: true },
    { id: 'ecg', name: 'ECG', category: 'utilities', logo: '💡', description: 'Electricity company', popular: true },
  ]
}

export function useBillsData(countryCode: string) {
  const [categories, setCategories] = useState<BillCategory[]>([])
  const [recentBillers, setRecentBillers] = useState<Biller[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [scheduledPayments, setScheduledPayments] = useState<ScheduledPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setCategories(mockCategories[countryCode] || [])
      setRecentBillers(mockBillers[countryCode] || [])
      
      // Mock recent transactions
      const mockTransactions: Transaction[] = [
        { id: '1', biller: 'DSTV', amount: 5000, date: '2024-01-15', status: 'completed', category: 'cable' },
        { id: '2', biller: 'AEDC', amount: 12000, date: '2024-01-14', status: 'completed', category: 'utilities' },
        { id: '3', biller: 'MTN', amount: 2000, date: '2024-01-13', status: 'pending', category: 'airtime' },
        { id: '4', biller: 'Spectranet', amount: 8000, date: '2024-01-12', status: 'completed', category: 'internet' },
        { id: '5', biller: 'IKEDC', amount: 15000, date: '2024-01-11', status: 'failed', category: 'utilities' },
      ]
      
      // Mock scheduled payments
      const mockScheduled: ScheduledPayment[] = [
        { id: '1', biller: 'DSTV', amount: 5000, nextDate: '2024-02-01', frequency: 'monthly', status: 'active' },
        { id: '2', biller: 'Spectranet', amount: 8000, nextDate: '2024-02-05', frequency: 'monthly', status: 'active' },
        { id: '3', biller: 'MTN Data', amount: 1500, nextDate: '2024-01-25', frequency: 'weekly', status: 'paused' },
      ]
      
      setTransactions(mockTransactions)
      setScheduledPayments(mockScheduled)
      setLoading(false)
    }
    
    fetchData()
  }, [countryCode])

  return {
    categories,
    recentBillers,
    transactions,
    scheduledPayments,
    loading
  }
}