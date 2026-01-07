"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlaySquare, Download, User } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Início" },
    { href: "/search", icon: Search, label: "Buscar" },
    { href: "/new", icon: PlaySquare, label: "Em Alta" },
    { href: "/downloads", icon: Download, label: "Downloads" },
    { href: "/profile", icon: User, label: "Meu Perfil" }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#141414] border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive 
                  ? "text-white" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${isActive ? "text-white" : ""}`} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}