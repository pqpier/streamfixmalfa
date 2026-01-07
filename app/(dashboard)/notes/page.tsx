"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus,
  Search,
  Pin,
  FileText,
  Tag,
  Calendar,
  Edit,
  Trash2,
  X
} from "lucide-react"
import { Note } from "@/lib/types/productivity"

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Resumo de Estudos - JavaScript",
    content: "# JavaScript Avançado\n\n## Tópicos Importantes\n- Promises e Async/Await\n- Closures e Escopo\n- Event Loop\n\n## Próximos Passos\n- [ ] Estudar TypeScript\n- [ ] Praticar com projetos\n- [ ] Fazer exercícios diários\n\n## Links Úteis\n- MDN Web Docs\n- JavaScript.info\n- FreeCodeCamp",
    tags: ["estudo", "programação", "javascript"],
    isPinned: true,
    projectId: "1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    title: "Lista de Livros para Ler",
    content: "## Desenvolvimento Pessoal\n- Hábitos Atômicos - James Clear\n- O Poder do Hábito - Charles Duhigg\n- Mindset - Carol Dweck\n\n## Técnicos\n- Clean Code - Robert Martin\n- Design Patterns - Gang of Four\n- The Pragmatic Programmer\n\n## Ficção\n- 1984 - George Orwell\n- Duna - Frank Herbert\n- Neuromancer - William Gibson",
    tags: ["leitura", "livros", "estudos"],
    isPinned: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "3",
    title: "Ideias para Projetos Pessoais",
    content: "## Projetos de Programação\n\n1. **App de Finanças**\n   - Controle de gastos\n   - Gráficos e relatórios\n   - Metas de economia\n\n2. **Blog Pessoal**\n   - Markdown para posts\n   - Sistema de tags\n   - Comentários\n\n3. **Automação Casa**\n   - Controle de luzes\n   - Temperatura\n   - Segurança\n\n4. **App de Saúde**\n   - Rastreador de exercícios\n   - Contador de água\n   - Lembretes",
    tags: ["ideias", "projetos", "programação"],
    isPinned: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-14")
  },
  {
    id: "4",
    title: "Rotina Diária Ideal",
    content: "## Manhã (6h - 12h)\n- 6h00: Acordar\n- 6h30: Exercícios\n- 7h30: Café da manhã\n- 8h00: Sessão de foco (Pomodoro)\n- 10h30: Pausa\n- 11h00: Estudos\n\n## Tarde (12h - 18h)\n- 12h30: Almoço\n- 14h00: Trabalho/Projetos\n- 16h00: Pausa para café\n- 16h30: Tarefas leves\n\n## Noite (18h - 22h)\n- 18h30: Tempo livre\n- 20h00: Jantar\n- 21h00: Leitura\n- 22h00: Dormir",
    tags: ["rotina", "produtividade", "organização"],
    isPinned: false,
    taskId: "2",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  }
]

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState("")

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const pinnedNotes = filteredNotes.filter(n => n.isPinned)
  const unpinnedNotes = filteredNotes.filter(n => !n.isPinned)
  const sortedNotes = [...pinnedNotes, ...unpinnedNotes]

  const togglePin = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ))
  }

  const startEditing = () => {
    if (selectedNote) {
      setEditingContent(selectedNote.content)
      setIsEditing(true)
    }
  }

  const saveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id 
          ? { ...note, content: editingContent, updatedAt: new Date() }
          : note
      )
      setNotes(updatedNotes)
      setSelectedNote({ ...selectedNote, content: editingContent, updatedAt: new Date() })
      setIsEditing(false)
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditingContent("")
  }

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId))
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const noteDate = new Date(date)
    const diffTime = now.getTime() - noteDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays < 7) return `${diffDays} dias atrás`
    return noteDate.toLocaleDateString('pt-BR')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notas</h1>
          <p className="text-muted-foreground">
            Capture ideias e informações importantes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Nota
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar notas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
            {sortedNotes.map(note => {
              const isSelected = selectedNote?.id === note.id
              
              return (
                <Card
                  key={note.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => {
                    setSelectedNote(note)
                    setIsEditing(false)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm line-clamp-1">
                        {note.title}
                      </h3>
                      {note.isPinned && (
                        <Pin className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {note.content.replace(/[#*`]/g, "")}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {note.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {note.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{note.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedNote ? (
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{selectedNote.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Atualizado {formatDate(selectedNote.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(selectedNote.id)}
                    >
                      <Pin className={`h-4 w-4 ${selectedNote.isPinned ? "fill-current" : ""}`} />
                    </Button>
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={saveNote}>
                          Salvar
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={startEditing}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNote(selectedNote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {selectedNote.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto h-[calc(100%-120px)]">
                {isEditing ? (
                  <Textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                  />
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap font-sans">
                      {selectedNote.content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={i} className="text-xl font-semibold mt-3 mb-2">{line.substring(3)}</h2>
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={i} className="text-lg font-medium mt-2 mb-1">{line.substring(4)}</h3>
                        }
                        if (line.startsWith('- ')) {
                          return <li key={i} className="ml-4">{line.substring(2)}</li>
                        }
                        if (line.startsWith('```')) {
                          return <code key={i} className="block bg-muted p-2 rounded text-xs">{line}</code>
                        }
                        return <p key={i} className="mb-1">{line || '\u00A0'}</p>
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[calc(100vh-200px)]">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Selecione uma nota para visualizar ou editar
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}