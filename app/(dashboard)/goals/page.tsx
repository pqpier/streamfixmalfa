"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus,
  Target,
  TrendingUp,
  Calendar,
  ChevronRight,
  Trophy,
  Zap,
  Award
} from "lucide-react"
import { Goal, Milestone } from "@/lib/types/productivity"

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Aprender React Native",
    description: "Dominar desenvolvimento mobile com React Native",
    targetDate: new Date("2024-12-31"),
    progress: 75,
    category: "Carreira",
    milestones: [
      { id: "m1", title: "Concluir curso básico", completed: true, completedAt: new Date("2024-01-15") },
      { id: "m2", title: "Criar primeiro app", completed: true, completedAt: new Date("2024-01-30") },
      { id: "m3", title: "Publicar na Play Store", completed: false },
      { id: "m4", title: "Alcançar 100 downloads", completed: false }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Emagrecer 10kg",
    description: "Alcançar peso ideal com saúde",
    targetDate: new Date("2024-06-30"),
    progress: 35,
    category: "Saúde",
    milestones: [
      { id: "m5", title: "Perder 2.5kg", completed: true, completedAt: new Date("2024-01-10") },
      { id: "m6", title: "Perder 5kg", completed: true, completedAt: new Date("2024-01-25") },
      { id: "m7", title: "Perder 7.5kg", completed: false },
      { id: "m8", title: "Atingir meta de 10kg", completed: false }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Economizar R$ 10.000",
    description: "Criar reserva de emergência",
    targetDate: new Date("2024-12-31"),
    progress: 60,
    category: "Financeiro",
    milestones: [
      { id: "m9", title: "Economizar R$ 2.500", completed: true, completedAt: new Date("2024-01-05") },
      { id: "m10", title: "Economizar R$ 5.000", completed: true, completedAt: new Date("2024-01-20") },
      { id: "m11", title: "Economizar R$ 7.500", completed: false },
      { id: "m12", title: "Atingir R$ 10.000", completed: false }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const categoryColors = {
  "Carreira": "bg-blue-100 text-blue-700",
  "Saúde": "bg-green-100 text-green-700",
  "Desenvolvimento Pessoal": "bg-purple-100 text-purple-700",
  "Financeiro": "bg-yellow-100 text-yellow-700"
}

const categoryIcons = {
  "Carreira": <Zap className="h-4 w-4" />,
  "Saúde": <TrendingUp className="h-4 w-4" />,
  "Desenvolvimento Pessoal": <Award className="h-4 w-4" />,
  "Financeiro": <Trophy className="h-4 w-4" />
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(goals[0])

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              completed: !milestone.completed,
              completedAt: !milestone.completed ? new Date() : undefined
            }
          }
          return milestone
        })
        
        const completedCount = updatedMilestones.filter(m => m.completed).length
        const progress = Math.round((completedCount / updatedMilestones.length) * 100)
        
        const updatedGoal = {
          ...goal,
          milestones: updatedMilestones,
          progress
        }
        
        if (selectedGoal?.id === goalId) {
          setSelectedGoal(updatedGoal)
        }
        
        return updatedGoal
      }
      return goal
    }))
  }

  const getDaysRemaining = (targetDate: Date) => {
    const now = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "text-green-600"
    if (progress >= 50) return "text-blue-600"
    if (progress >= 25) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Metas</h1>
          <p className="text-muted-foreground">
            Acompanhe seus objetivos e conquistas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Marcos Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {goals.reduce((acc, goal) => 
                acc + goal.milestones.filter(m => m.completed).length, 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
            </div>
            <p className="text-xs text-muted-foreground">De todas as metas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Próximo Prazo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.min(...goals.map(g => getDaysRemaining(g.targetDate)))}
            </div>
            <p className="text-xs text-muted-foreground">Dias restantes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Suas Metas</h2>
          {goals.map(goal => {
            const daysRemaining = getDaysRemaining(goal.targetDate)
            const isSelected = selectedGoal?.id === goal.id
            
            return (
              <Card 
                key={goal.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {goal.title}
                      </CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge className={categoryColors[goal.category as keyof typeof categoryColors] || "bg-gray-100"}>
                      {categoryIcons[goal.category as keyof typeof categoryIcons]}
                      <span className="ml-1">{goal.category}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className={`font-medium ${getProgressColor(goal.progress)}`}>
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Prazo: {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                    </div>
                    <Badge variant={daysRemaining > 30 ? "secondary" : daysRemaining > 7 ? "outline" : "destructive"}>
                      {daysRemaining > 0 ? `${daysRemaining} dias restantes` : "Atrasado"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    {goal.milestones.filter(m => m.completed).length} de {goal.milestones.length} marcos concluídos
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Marcos</h2>
          {selectedGoal ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedGoal.title}</CardTitle>
                <CardDescription>
                  Acompanhe o progresso dos marcos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedGoal.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-start gap-3">
                      <Checkbox
                        checked={milestone.completed}
                        onCheckedChange={() => toggleMilestone(selectedGoal.id, milestone.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                          {milestone.title}
                        </p>
                        {milestone.completedAt && (
                          <p className="text-xs text-muted-foreground">
                            Concluído em {new Date(milestone.completedAt).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                      {milestone.completed && (
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progresso Total</span>
                    <span className={`text-2xl font-bold ${getProgressColor(selectedGoal.progress)}`}>
                      {selectedGoal.progress}%
                    </span>
                  </div>
                  <Progress value={selectedGoal.progress} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Selecione uma meta para ver os marcos
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}