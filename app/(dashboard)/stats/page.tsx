"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Calendar,
  Brain,
  Award,
  Zap
} from "lucide-react"

export default function StatsPage() {
  const weekData = [
    { day: "Seg", tasks: 8, pomodoros: 6, hours: 4.5 },
    { day: "Ter", tasks: 12, pomodoros: 8, hours: 5.2 },
    { day: "Qua", tasks: 6, pomodoros: 5, hours: 3.8 },
    { day: "Qui", tasks: 10, pomodoros: 9, hours: 6.1 },
    { day: "Sex", tasks: 7, pomodoros: 4, hours: 3.2 },
    { day: "Sáb", tasks: 5, pomodoros: 3, hours: 2.5 },
    { day: "Dom", tasks: 3, pomodoros: 2, hours: 1.8 }
  ]

  const categories = [
    { name: "Estudo", tasks: 23, percentage: 35, color: "bg-blue-500" },
    { name: "Trabalho", tasks: 18, percentage: 28, color: "bg-green-500" },
    { name: "Saúde", tasks: 12, percentage: 18, color: "bg-purple-500" },
    { name: "Pessoal", tasks: 8, percentage: 12, color: "bg-orange-500" },
    { name: "Outros", tasks: 5, percentage: 7, color: "bg-gray-500" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
        <p className="text-muted-foreground">
          Acompanhe seu progresso e produtividade
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Produtividade Semanal</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+12% vs semana passada</p>
            <Progress value={87} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Horas Focadas</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27.1h</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">51</div>
            <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <Zap className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 dias 🔥</div>
            <p className="text-xs text-muted-foreground">Seu recorde: 21 dias</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade da Semana</CardTitle>
                <CardDescription>Tarefas e sessões Pomodoro por dia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weekData.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium w-8">{day.day}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {day.tasks} tarefas
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {day.pomodoros} pomodoros
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{day.hours}h</span>
                        <Progress 
                          value={(day.hours / 8) * 100} 
                          className="w-24 h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Onde você está focando seu tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {category.tasks} tarefas ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas Recentes</CardTitle>
              <CardDescription>Continue assim! Você está indo muito bem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-medium text-sm">Madrugador</h3>
                  <p className="text-xs text-muted-foreground">5 dias acordando antes das 6h</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm">Foco Total</h3>
                  <p className="text-xs text-muted-foreground">10 pomodoros em um dia</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-medium text-sm">Meta Batida</h3>
                  <p className="text-xs text-muted-foreground">100% das metas semanais</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-sm">Consistente</h3>
                  <p className="text-xs text-muted-foreground">14 dias de sequência</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="mt-0.5">Dica</Badge>
                <p className="text-sm">
                  Seu melhor horário de produtividade é entre 9h e 11h. Tente agendar suas tarefas mais importantes para este período.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="mt-0.5">Padrão</Badge>
                <p className="text-sm">
                  Você completa em média 7 tarefas por dia. Nas quartas-feiras sua produtividade cai 20%. Considere fazer pausas mais longas neste dia.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="mt-0.5">Sugestão</Badge>
                <p className="text-sm">
                  Você está dedicando pouco tempo para atividades de saúde. Que tal adicionar mais exercícios na sua rotina?
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-12">
                Estatísticas mensais em breve...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-12">
                Estatísticas anuais em breve...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}