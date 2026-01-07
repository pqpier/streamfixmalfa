"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="text-[#e50914] text-lg md:text-2xl font-bold tracking-wider">
            STREAMFLIX
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Início
            </Link>
            <Link href="/series" className="text-white/70 hover:text-white transition">
              Séries
            </Link>
            <Link href="/movies" className="text-white/70 hover:text-white transition">
              Filmes
            </Link>
            <Link href="/new" className="text-white/70 hover:text-white transition">
              Bombando
            </Link>
            <Link href="/my-list" className="text-white/70 hover:text-white transition">
              Minha Lista
            </Link>
            <Link href="/browse" className="text-white/70 hover:text-white transition">
              Navegar por idiomas
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-transparent hover:text-gray-300 md:block"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Kids - Hidden on mobile */}
          <Link href="/kids" className="hidden md:block text-white/70 hover:text-white text-sm transition">
            Infantil
          </Link>

          {/* Notifications - Hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-white hover:bg-transparent hover:text-gray-300 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#e50914] rounded-full" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-transparent p-0"
              >
                <div className="h-8 w-8 rounded bg-[#e50914] flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-black/90 backdrop-blur border-gray-800"
            >
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Gerenciar Perfis
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Transferir Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Conta
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Centro de Ajuda
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}