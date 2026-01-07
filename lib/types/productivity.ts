export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'archived'
export type ProjectStatus = 'active' | 'on_hold' | 'completed' | 'archived'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  dueDate?: Date
  completedAt?: Date
  projectId?: string
  assigneeId?: string
  labels: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  color: string
  icon?: string
  ownerId: string
  teamMembers: string[]
  startDate?: Date
  endDate?: Date
  progress: number
  createdAt: Date
  updatedAt: Date
}

export interface Label {
  id: string
  name: string
  color: string
  createdAt: Date
}

export interface TimeBlock {
  id: string
  taskId?: string
  projectId?: string
  title: string
  startTime: Date
  endTime: Date
  color?: string
  isRecurring: boolean
  recurrencePattern?: RecurrencePattern
  createdAt: Date
  updatedAt: Date
}

export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly'
  interval: number
  daysOfWeek?: number[]
  endDate?: Date
}

export interface Goal {
  id: string
  title: string
  description?: string
  targetDate: Date
  progress: number
  category: string
  milestones: Milestone[]
  createdAt: Date
  updatedAt: Date
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  completedAt?: Date
}

export interface Note {
  id: string
  title: string
  content: string
  projectId?: string
  taskId?: string
  tags: string[]
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalTasks: number
  completedTasks: number
  activeTasks: number
  overdueTask: number
  totalProjects: number
  activeProjects: number
  weeklyProgress: number
  upcomingDeadlines: Task[]
}

export interface UserPreferences {
  defaultView: 'kanban' | 'list' | 'calendar'
  workingHours: {
    start: string
    end: string
  }
  notifications: {
    email: boolean
    push: boolean
    deadlineReminder: number
  }
  theme: 'light' | 'dark' | 'system'
}