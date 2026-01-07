"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Timer,
  CheckSquare,
  Calendar,
  Target
} from "lucide-react"

const mainNavItems = [
  {
    title: "Início",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pomodoro",
    href: "/pomodoro",
    icon: Timer,
  },
  {
    title: "Tarefas",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Calendário",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Metas",
    href: "/goals",
    icon: Target,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full px-2 text-xs transition-colors",
              pathname === item.href
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}