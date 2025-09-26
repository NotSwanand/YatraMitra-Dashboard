"use client"

import { Info, BarChart3, TrendingUp, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ReportsView() {
  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive data insights and trend analysis for tourist safety operations
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="border-primary/50 bg-primary/10">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            This page will feature historical data, trend analysis, and customizable report generation.
          </AlertDescription>
        </Alert>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">Real-time metrics and KPI tracking</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Trend Analysis</h3>
              <p className="text-sm text-muted-foreground">Historical patterns and predictions</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Custom Reports</h3>
              <p className="text-sm text-muted-foreground">Generate detailed operational reports</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
