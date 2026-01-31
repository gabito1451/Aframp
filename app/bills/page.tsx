import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BillsPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-border bg-card p-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Pay Bills</h1>
        <p className="mt-2 text-sm text-muted-foreground">Bills flow is coming next.</p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="/bills/receipt/tx-demo-001">See Receipts</Link>
          </Button>
          <Button asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
