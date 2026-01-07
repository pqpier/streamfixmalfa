"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Video
} from "lucide-react"
import { TimeBlock } from "@/lib/types/productivity"

const mockEvents: TimeBlock[] = [
  {
    id: "1",
    title: "Sessão de Estudos",
    startTime: new Date("2024-01-29T09:00:00"),
    endTime: new Date("2024-01-29T11:00:00"),
    color: "#3B82F6",
    isRecurring: true,
    recurrencePattern: {
      frequency: "daily",
      interval: 1,
      daysOfWeek: [1, 2, 3, 4, 5]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Academia",
    startTime: new Date("2024-01-29T18:00:00"),
    endTime: new Date("2024-01-29T19:30:00"),
    color: "#10B981",
    isRecurring: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Leitura",
    startTime: new Date("2024-01-29T20:00:00"),
    endTime: new Date("2024-01-29T21:00:00"),
    color: "#F59E0B",
    isRecurring: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i)
      days.push({ date: day, isCurrentMonth: true })
    }
    
    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear()
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendário</h1>
          <p className="text-muted-foreground">
            Organize sua agenda e compromissos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Hoje
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Evento
          </Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="day">Dia</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold min-w-[150px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="month" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-7">
                {weekDays.map(day => (
                  <div
                    key={day}
                    className="p-4 text-center text-sm font-medium text-muted-foreground border-b"
                  >
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const events = getEventsForDate(day.date)
                  const isSelected = selectedDate.toDateString() === day.date.toDateString()
                  
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[100px] p-2 border-b border-r cursor-pointer
                        hover:bg-muted/50 transition-colors
                        ${!day.isCurrentMonth ? "bg-muted/20" : ""}
                        ${isSelected ? "bg-primary/10" : ""}
                      `}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className={`
                          text-sm font-medium
                          ${!day.isCurrentMonth ? "text-muted-foreground" : ""}
                          ${isToday(day.date) ? "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center" : ""}
                        `}>
                          {day.date.getDate()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {events.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate"
                            style={{ backgroundColor: event.color + "20", color: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{events.length - 2} mais
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                Visualização semanal em breve...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum evento agendado para este dia
                    </p>
                  ) : (
                    getEventsForDate(selectedDate).map(event => (
                      <Card key={event.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: event.color }}
                                />
                                <h3 className="font-medium">{event.title}</h3>
                                {event.isRecurring && (
                                  <Badge variant="outline" className="text-xs">
                                    Recorrente
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </span>
                                {event.projectId && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    Conference Room A
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5"
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(event.startTime)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}