"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  FolderOpen, 
  Clock, 
  Users,
  MoreVertical,
  Star,
  TrendingUp,
  Calendar,
  Search,
  Grid3x3,
  List,
  Archive
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Project, ProjectStatus } from "@/lib/types/productivity"

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Aprender React Native",
    description: "Desenvolver habilidades em desenvolvimento mobile",
    status: "active",
    color: "#3B82F6",
    icon: "📱",
    ownerId: "user1",
    teamMembers: ["user1"],
    progress: 65,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Blog Pessoal",
    description: "Criar blog para compartilhar conhecimentos de programação",
    status: "active",
    color: "#10B981",
    icon: "✍️",
    ownerId: "user1",
    teamMembers: ["user1"],
    progress: 35,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-05-31"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Curso de Inglês",
    description: "Alcançar fluência em inglês para oportunidades internacionais",
    status: "active",
    color: "#F59E0B",
    icon: "🌎",
    ownerId: "user1",
    teamMembers: ["user1"],
    progress: 45,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Projeto Saúde",
    description: "Melhorar condicionamento físico e alimentação",
    status: "on_hold",
    color: "#EF4444",
    icon: "💪",
    ownerId: "user1",
    teamMembers: ["user1"],
    progress: 20,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-30"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const statusColors = {
  active: "bg-green-100 text-green-700",
  on_hold: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
  archived: "bg-gray-100 text-gray-700"
}

const statusLabels = {
  active: "Ativo",
  on_hold: "Pausado",
  completed: "Concluído",
  archived: "Arquivado"
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getProjectStats = () => {
    const total = projects.length
    const active = projects.filter(p => p.status === "active").length
    const completed = projects.filter(p => p.status === "completed").length
    const onHold = projects.filter(p => p.status === "on_hold").length

    return { total, active, completed, onHold }
  }

  const stats = getProjectStats()

  const getTimeRemaining = (endDate?: Date) => {
    if (!endDate) return "Sem prazo"
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Atrasado"
    if (diffDays === 0) return "Vence hoje"
    if (diffDays === 1) return "Vence amanhã"
    if (diffDays <= 7) return `${diffDays} dias restantes`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} semanas restantes`
    return `${Math.ceil(diffDays / 30)} meses restantes`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie seus projetos pessoais e metas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todos os projetos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Ativos</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Este trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pausados</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.onHold}</div>
            <p className="text-xs text-muted-foreground">Em espera</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="text-2xl"
                          style={{ backgroundColor: project.color + "20", padding: "8px", borderRadius: "8px" }}
                        >
                          {project.icon || "📁"}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <Badge className={`mt-1 ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member, i) => (
                          <Avatar key={i} className="h-7 w-7 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {member.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                            +{project.teamMembers.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {getTimeRemaining(project.endDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="text-xl"
                          style={{ backgroundColor: project.color + "20", padding: "6px", borderRadius: "6px" }}
                        >
                          {project.icon || "📁"}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{project.name}</h3>
                            <Badge className={statusColors[project.status]}>
                              {statusLabels[project.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-medium">{project.progress}%</div>
                          <Progress value={project.progress} className="h-1 w-20" />
                        </div>
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 3).map((member, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getTimeRemaining(project.endDate)}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}