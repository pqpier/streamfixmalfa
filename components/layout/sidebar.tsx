"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Settings, 
  CheckSquare,
  Calendar,
  Target,
  FileText,
  Timer
} from "lucide-react"

const sidebarNavItems = [
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
  {
    title: "Notas",
    href: "/notes",
    icon: FileText,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-8 px-3">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              FocusFlow
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Seu assistente de produtividade</p>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    pathname === item.href && "bg-secondary"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}