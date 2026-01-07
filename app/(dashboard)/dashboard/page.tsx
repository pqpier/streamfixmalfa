"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  CheckCircle2,
  Clock,
  Target,
  Brain,
  Calendar,
  Coffee,
  BookOpen,
  Plus,
  Play
} from "lucide-react"
import { Task } from "@/lib/types/productivity"

const tarefasHoje: Task[] = [
  {
    id: "1",
    title: "Estudar JavaScript - Capítulo 5",
    status: "todo",
    priority: "high",
    dueDate: new Date(Date.now() + 3600000),
    labels: ["Estudo", "Programação"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Exercícios de matemática",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date(Date.now() + 7200000),
    labels: ["Estudo"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Revisar anotações da semana",
    status: "todo",
    priority: "low",
    dueDate: new Date(Date.now() + 86400000),
    labels: ["Revisão"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function DashboardPage() {
  const now = new Date()
  const greeting = now.getHours() < 12 ? "Bom dia" : now.getHours() < 18 ? "Boa tarde" : "Boa noite"
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{greeting}! 👋</h1>
        <p className="text-muted-foreground">
          Vamos tornar hoje um dia produtivo!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Hoje</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500">5 concluídas</span>
              <span className="ml-1">• 3 pendentes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Foco</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3h 25m</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>4 sessões Pomodoro</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 dias</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-orange-500">🔥 Continue assim!</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Semanal</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tarefas de Hoje</CardTitle>
                <CardDescription>
                  Foque no que é importante
                </CardDescription>
              </div>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4 mr-1" />
                Nova Tarefa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tarefasHoje.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <Checkbox className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {task.title}
                      </p>
                      <Badge 
                        variant="outline" 
                        className={
                          task.priority === "high" ? "border-red-500 text-red-500" :
                          task.priority === "medium" ? "border-orange-500 text-orange-500" :
                          "border-gray-500 text-gray-500"
                        }
                      >
                        {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(task.dueDate!).toLocaleString('pt-BR', { 
                          hour: 'numeric', 
                          minute: 'numeric'
                        })}
                      </span>
                      {task.labels.map((label) => (
                        <Badge key={label} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" size="sm">
              Ver Todas as Tarefas
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sessão Pomodoro</CardTitle>
                <CardDescription>
                  Mantenha o foco por 25 minutos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="text-5xl font-bold mb-4">25:00</div>
              <div className="flex gap-2">
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Iniciar Foco
                </Button>
                <Button size="lg" variant="outline">
                  <Coffee className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sessões hoje:</span>
                <span className="font-medium">4 / 8</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Tempo total:</span>
                <span className="font-medium">1h 40min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Comece uma nova atividade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
            <Button className="w-full" variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Sessão de Estudo
            </Button>
            <Button className="w-full" variant="outline">
              <Coffee className="h-4 w-4 mr-2" />
              Pausa
            </Button>
            <Button className="w-full" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Definir Meta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}