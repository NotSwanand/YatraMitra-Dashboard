"use client"

import { TriangleAlert, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Alert, Tourist } from "@/components/dashboard-view"

interface LiveAlertsCardProps {
  alerts: Alert[]
  tourists: Tourist[]
  onAlertClick: (alert: Alert) => void
}

export function LiveAlertsCard({ alerts, tourists, onAlertClick }: LiveAlertsCardProps) {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "sos":
        return <TriangleAlert className="w-4 h-4 text-destructive" />
      case "inactivity":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "zone-breach":
        return <MapPin className="w-4 h-4 text-primary" />
    }
  }

  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "sos":
        return <Badge variant="destructive">SOS</Badge>
      case "inactivity":
        return <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">Inactivity</Badge>
      case "zone-breach":
        return (
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            Zone Breach
          </Badge>
        )
    }
  }

  const getTouristName = (touristId: string) => {
    return tourists.find((t) => t.id === touristId)?.name || "Unknown"
  }

  const getAlertTextColors = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return {
          nameColor: "text-white",
          messageColor: "text-red-100",
          timestampColor: "text-red-200",
        }
      case "warning":
        return {
          nameColor: "text-white",
          messageColor: "text-yellow-100",
          timestampColor: "text-yellow-200",
        }
      case "info":
        return {
          nameColor: "text-white",
          messageColor: "text-blue-100",
          timestampColor: "text-blue-200",
        }
      default:
        return {
          nameColor: "text-card-foreground",
          messageColor: "text-muted-foreground",
          timestampColor: "text-muted-foreground",
        }
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-card-foreground">Live Alerts</span>
          <Badge variant="destructive" className="text-xs">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] md:h-[300px]">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const textColors = getAlertTextColors(alert.severity)
              return (
                <div
                  key={alert.id}
                  onClick={() => onAlertClick(alert)}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50",
                    alert.severity === "critical" && "pulse-red border-destructive/50",
                    alert.severity === "warning" && "border-yellow-500/50",
                    alert.severity === "info" && "border-primary/50",
                  )}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-1">
                        <p className={cn("font-semibold text-sm truncate", textColors.nameColor)}>
                          {getTouristName(alert.touristId)}
                        </p>
                        {getAlertBadge(alert.type)}
                      </div>
                      <p className={cn("text-sm mb-1", textColors.messageColor)}>{alert.message}</p>
                      <p className={cn("text-xs", textColors.timestampColor)}>{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
