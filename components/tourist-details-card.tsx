"use client"

import { Info, QrCode, Phone, Heart, Locate } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Tourist } from "@/components/dashboard-view"

interface TouristDetailsCardProps {
  tourist: Tourist | null
}

export function TouristDetailsCard({ tourist }: TouristDetailsCardProps) {
  if (!tourist) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Selected Tourist Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Click an alert on the map or in the feed to view details here.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: Tourist["status"]) => {
    switch (status) {
      case "distress":
        return <Badge variant="destructive">Distress</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">Warning</Badge>
      case "active":
        return <Badge className="bg-green-500 text-green-900 hover:bg-green-600">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Selected Tourist Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground">{tourist.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-card-foreground">{tourist.name}</h3>
            {getStatusBadge(tourist.status)}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Digital ID:</span>
            </div>
            <Badge variant="outline" className="border-primary text-primary self-start">
              {tourist.digitalId}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Contact:</span>
            </div>
            <span className="text-sm text-card-foreground">{tourist.phone}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Emergency:</span>
            </div>
            <span className="text-sm text-card-foreground break-all">{tourist.emergencyContact}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Locate className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location:</span>
            </div>
            <p className="text-sm text-card-foreground ml-6 break-all">{tourist.location}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button variant="destructive" size="sm" className="flex-1">
            Acknowledge Alert
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
