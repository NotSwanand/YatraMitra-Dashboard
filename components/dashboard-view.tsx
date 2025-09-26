"use client"

import { useState } from "react"
import { LiveAlertsCard } from "@/components/live-alerts-card"
import { TouristDetailsCard } from "@/components/tourist-details-card"
import { SituationalMapCard } from "@/components/situational-map-card"

export interface Tourist {
  id: string
  name: string
  digitalId: string
  phone: string
  emergencyContact: string
  location: string
  status: "distress" | "warning" | "active" | "inactive"
  avatar: string
}

export interface Alert {
  id: string
  touristId: string
  type: "sos" | "inactivity" | "zone-breach"
  message: string
  timestamp: string
  severity: "critical" | "warning" | "info"
}

const mockTourists: Tourist[] = [
  {
    id: "1",
    name: "Riya Sharma",
    digitalId: "YTM-7890-ABCD",
    phone: "98765-XXXXX",
    emergencyContact: "Amit Sharma (99XXXXX)",
    location: "Lat: 28.7, Lon: 77.2 (Delhi Sector)",
    status: "distress",
    avatar: "RS",
  },
  {
    id: "2",
    name: "John Smith",
    digitalId: "YTM-5432-EFGH",
    phone: "87654-XXXXX",
    emergencyContact: "Jane Smith (88XXXXX)",
    location: "Lat: 28.6, Lon: 77.1 (Central Delhi)",
    status: "warning",
    avatar: "JS",
  },
  {
    id: "3",
    name: "Maria Garcia",
    digitalId: "YTM-9876-IJKL",
    phone: "76543-XXXXX",
    emergencyContact: "Carlos Garcia (77XXXXX)",
    location: "Lat: 28.8, Lon: 77.3 (North Delhi)",
    status: "active",
    avatar: "MG",
  },
]

const mockAlerts: Alert[] = [
  {
    id: "1",
    touristId: "1",
    type: "sos",
    message: "Panic Button Activated",
    timestamp: "2 mins ago",
    severity: "critical",
  },
  {
    id: "2",
    touristId: "2",
    type: "inactivity",
    message: "No Movement Detected",
    timestamp: "5 mins ago",
    severity: "warning",
  },
  {
    id: "3",
    touristId: "3",
    type: "zone-breach",
    message: "Entered Restricted Area",
    timestamp: "8 mins ago",
    severity: "info",
  },
]

export function DashboardView() {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null)

  const handleAlertClick = (alert: Alert) => {
    const tourist = mockTourists.find((t) => t.id === alert.touristId)
    if (tourist) {
      setSelectedTourist(tourist)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 min-h-[calc(100vh-4rem)]">
      {/* Left Column - Sidebar */}
      <div className="w-full lg:w-1/3 space-y-4 lg:space-y-6">
        <LiveAlertsCard alerts={mockAlerts} tourists={mockTourists} onAlertClick={handleAlertClick} />
        <TouristDetailsCard tourist={selectedTourist} />
      </div>

      {/* Right Column - Main View */}
      <div className="flex-1 min-h-[400px] lg:min-h-0">
        <SituationalMapCard alerts={mockAlerts} tourists={mockTourists} onMarkerClick={handleAlertClick} />
      </div>
    </div>
  )
}
