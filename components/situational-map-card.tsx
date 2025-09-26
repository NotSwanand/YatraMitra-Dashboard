"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Alert, Tourist } from "@/components/dashboard-view"

interface SituationalMapCardProps {
  alerts: Alert[]
  tourists: Tourist[]
  onMarkerClick: (alert: Alert) => void
}

export function SituationalMapCard({ alerts, tourists, onMarkerClick }: SituationalMapCardProps) {
  const getMarkerColor = (alert: Alert) => {
    switch (alert.severity) {
      case "critical":
        return "bg-destructive animate-pulse"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-primary"
      default:
        return "bg-green-500"
    }
  }

  const getMarkerPosition = (index: number) => {
    // Mock positions for demonstration
    const positions = [
      { top: "30%", left: "40%" }, // Riya Sharma - SOS
      { top: "60%", left: "25%" }, // John Smith - Inactivity
      { top: "20%", left: "70%" }, // Maria Garcia - Zone Breach
      { top: "80%", left: "60%" }, // Active tracking
    ]
    return positions[index] || { top: "50%", left: "50%" }
  }

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-card-foreground">Live Situational Map</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg map-grid overflow-hidden">
          {/* Map Markers */}
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10",
                getMarkerColor(alert),
              )}
              style={getMarkerPosition(index)}
              onClick={() => onMarkerClick(alert)}
            />
          ))}

          {/* Active tracking marker */}
          <div
            className="absolute w-4 h-4 rounded-full bg-green-500 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: "80%", left: "60%" }}
          />

          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 md:p-3 max-w-[200px]">
            <h4 className="text-xs md:text-sm font-semibold text-card-foreground mb-1 md:mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-destructive animate-pulse flex-shrink-0" />
                <span className="text-xs text-muted-foreground">SOS Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Rule-Based Flag</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Zone Breach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Active Tracking</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 text-xs text-muted-foreground hidden md:block">
            Interactive Map Component will render here
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
