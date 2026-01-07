"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Filter, 
  Search,
  Calendar,
  Clock,
  Flag,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react"
import { Priority, TaskStatus, Task } from "@/lib/types/productivity"
import { KanbanBoard } from "@/components/kanban/KanbanBoard"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Estudar React Hooks",
    description: "Revisar useEffect, useState e useContext",
    status: "in_progress",
    priority: "high",
    dueDate: new Date(Date.now() + 86400000),
    labels: ["Estudo", "Programação"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Exercícios de matemática",
    description: "Resolver lista de cálculo diferencial",
    status: "todo",
    priority: "medium",
    dueDate: new Date(Date.now() + 172800000),
    labels: ["Faculdade", "Matemática"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Entregar trabalho de inglês",
    status: "todo",
    priority: "urgent",
    dueDate: new Date(Date.now() + 3600000),
    labels: ["Curso", "Inglês"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    title: "Meditação matinal",
    description: "15 minutos de meditação guiada",
    status: "done",
    priority: "low",
    completedAt: new Date(Date.now() - 3600000),
    labels: ["Saúde", "Bem-estar"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const priorityStyles = {
  low: {
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    icon: <Circle className="h-3 w-3" />,
    label: "Baixa"
  },
  medium: {
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    icon: <Flag className="h-3 w-3" />,
    label: "Média"
  },
  high: {
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: <AlertCircle className="h-3 w-3" />,
    label: "Alta"
  },
  urgent: {
    badge: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
    icon: <AlertCircle className="h-3 w-3 animate-pulse" />,
    label: "Urgente"
  }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<TaskStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "all" || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "done" ? "todo" : "done"
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === "done" ? new Date() : undefined
        }
      }
      return task
    }))
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === "done").length
    const inProgress = tasks.filter(t => t.status === "in_progress").length
    const overdue = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length

    return { total, completed, inProgress, overdue }
  }

  const stats = getTaskStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe suas atividades diárias
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="todo">A Fazer</SelectItem>
            <SelectItem value="in_progress">Em Andamento</SelectItem>
            <SelectItem value="done">Concluídas</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-2">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.status === "done"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className={`font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                        <div className="flex gap-2 items-center text-xs">
                          <Badge 
                            variant="outline" 
                            className={`${priorityStyles[task.priority].badge} border font-medium`}
                          >
                            {priorityStyles[task.priority].icon}
                            <span className="ml-1">{priorityStyles[task.priority].label}</span>
                          </Badge>
                          {task.dueDate && (
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          {task.labels.map((label) => (
                            <Badge key={label} variant="secondary" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kanban">
          <KanbanBoard 
            tasks={filteredTasks} 
            onTaskUpdate={(updatedTasks) => {
              // Create a map for quick lookup of updated tasks
              const updatedTasksMap = new Map(updatedTasks.map(t => [t.id, t]))
              
              // Update the main tasks list preserving the order from updatedTasks
              const newTasks = tasks.map(task => {
                if (updatedTasksMap.has(task.id)) {
                  return updatedTasksMap.get(task.id)!
                }
                return task
              })
              
              // Reorder based on the order in updatedTasks
              const finalTasks = [...newTasks].sort((a, b) => {
                const aIndex = updatedTasks.findIndex(t => t.id === a.id)
                const bIndex = updatedTasks.findIndex(t => t.id === b.id)
                
                if (aIndex === -1 && bIndex === -1) return 0
                if (aIndex === -1) return 1
                if (bIndex === -1) return -1
                
                return aIndex - bIndex
              })
              
              setTasks(finalTasks)
            }}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-12">
                Calendar view coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}