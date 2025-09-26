"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DashboardView } from "@/components/dashboard-view"
import { ReportsView } from "@/components/reports-view"
import { LoginPage } from "@/components/login-page"

export default function YatraMitraApp() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("dashboard") // Reset to dashboard on logout
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout} />
      <main className="pt-16">
        {currentPage === "dashboard" && <DashboardView />}
        {currentPage === "reports" && <ReportsView />}
      </main>
    </div>
  )
}
