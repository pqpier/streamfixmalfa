"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Plus } from "lucide-react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task, TaskStatus } from "@/lib/types/productivity"

const priorityStyles = {
  low: {
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    label: "Baixa"
  },
  medium: {
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    label: "Média"
  },
  high: {
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    label: "Alta"
  },
  urgent: {
    badge: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
    label: "Urgente"
  }
} as const

interface KanbanBoardProps {
  tasks: Task[]
  onTaskUpdate: (tasks: Task[]) => void
}

interface KanbanColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  onAddTask?: () => void
}

interface KanbanCardProps {
  task: Task
  isDragging?: boolean
}

function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-none ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="cursor-move hover:shadow-md transition-all hover:scale-[1.02] bg-background">
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 -mr-1"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs ${priorityStyles[task.priority].badge} border`}
            >
              {priorityStyles[task.priority].label}
            </Badge>
            {task.labels && task.labels.length > 0 && (
              <div className="flex gap-1">
                {task.labels.slice(0, 2).map((label) => (
                  <Badge key={label} variant="secondary" className="text-xs px-1">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KanbanColumn({ title, status, tasks, onAddTask }: KanbanColumnProps) {
  const {
    setNodeRef,
    isOver,
  } = useSortable({
    id: status,
    data: {
      type: "Column",
      status,
    },
  })

  return (
    <Card className={`flex flex-col h-full ${isOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {tasks.length}
            </Badge>
          </div>
          {onAddTask && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onAddTask}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent 
        ref={setNodeRef}
        className="flex-1 space-y-2 min-h-[400px] overflow-y-auto"
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Arraste tarefas para cá
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function KanbanBoard({ tasks, onTaskUpdate }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const columns: { status: TaskStatus; title: string }[] = [
    { status: "todo", title: "A Fazer" },
    { status: "in_progress", title: "Em Andamento" },
    { status: "done", title: "Concluídas" },
  ]

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeTask = tasks.find(task => task.id === active.id)
    setActiveTask(activeTask || null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the task being dragged
    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    // Check if we're over a column
    const overColumn = columns.find(col => col.status === overId)
    if (overColumn && activeTask.status !== overColumn.status) {
      const updatedTasks = tasks.map(task =>
        task.id === activeId
          ? { ...task, status: overColumn.status }
          : task
      )
      onTaskUpdate(updatedTasks)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTask(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) {
      setActiveTask(null)
      return
    }

    // Find tasks
    const activeTask = tasks.find(t => t.id === activeId)
    const overTask = tasks.find(t => t.id === overId)

    if (!activeTask) {
      setActiveTask(null)
      return
    }

    // If dropped over another task, reorder within the same column
    if (overTask && activeTask.status === overTask.status) {
      const activeIndex = tasks.findIndex(t => t.id === activeId)
      const overIndex = tasks.findIndex(t => t.id === overId)
      
      const reorderedTasks = arrayMove(tasks, activeIndex, overIndex)
      onTaskUpdate(reorderedTasks)
    }

    setActiveTask(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column.status)
          return (
            <SortableContext
              key={column.status}
              items={[column.status]}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                title={column.title}
                status={column.status}
                tasks={columnTasks}
              />
            </SortableContext>
          )
        })}
      </div>
      
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-90">
            <KanbanCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}