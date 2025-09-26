"use client"

import { BellRing, User, Settings, LogOut, Menu } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Image from "next/image"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
}

export function Header({ currentPage, onPageChange, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <Image src="/yatramitra-logo.png" alt="YatraMitra Logo" width={120} height={32} className="h-8 w-auto" />
          <div className="hidden sm:block w-px h-6 bg-border/50" />
          <h1 className="text-sm md:text-base font-semibold text-muted-foreground">
            <span className="hidden md:inline">Command & Control Center</span>
            <span className="md:hidden">Control Center</span>
          </h1>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            onClick={() => onPageChange("dashboard")}
            className="text-sm"
          >
            Dashboard
          </Button>
          <Button
            variant={currentPage === "reports" ? "default" : "ghost"}
            onClick={() => onPageChange("reports")}
            className="text-sm"
          >
            Reports
          </Button>
          <Button
            variant={currentPage === "settings" ? "default" : "ghost"}
            onClick={() => onPageChange("settings")}
            className="text-sm"
          >
            Settings
          </Button>
        </nav>

        {/* Right: Notifications and Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="lg:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    onPageChange("dashboard")
                    setMobileMenuOpen(false)
                  }}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onPageChange("reports")
                    setMobileMenuOpen(false)
                  }}
                >
                  Reports
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onPageChange("settings")
                    setMobileMenuOpen(false)
                  }}
                >
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <BellRing className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 md:w-80">
              <div className="p-2">
                <h4 className="font-semibold text-sm mb-2">Notifications</h4>
                <div className="space-y-2">
                  <div className="p-2 rounded-md bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-400">System Update Complete</p>
                    <p className="text-xs text-muted-foreground">2024-03-09</p>
                  </div>
                  <div className="p-2 rounded-md bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-sm text-yellow-400">Database Sync Warning</p>
                    <p className="text-xs text-muted-foreground">Low Disk Space</p>
                  </div>
                  <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
                    <p className="text-sm text-primary">Officer Alex Logged In</p>
                    <p className="text-xs text-muted-foreground">Delhi Sector</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">OM</AvatarFallback>
                </Avatar>
                <span className="text-sm hidden md:inline">Officer Mehta</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
