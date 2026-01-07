"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Target,
  Volume2,
  VolumeX,
  Settings
} from "lucide-react"

type TimerMode = "focus" | "shortBreak" | "longBreak"

const defaultTimes = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
}

export default function PomodoroPage() {
  const [mode, setMode] = useState<TimerMode>("focus")
  const [time, setTime] = useState(defaultTimes.focus)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [todaySessions, setTodaySessions] = useState(4)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [customTimes, setCustomTimes] = useState(defaultTimes)
  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(t => t - 1)
      }, 1000)
    } else if (time === 0) {
      handleTimerComplete()
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, time])

  const handleTimerComplete = () => {
    setIsRunning(false)
    if (soundEnabled) {
      // Play notification sound
      const audio = new Audio('/notification.mp3')
      audio.play().catch(() => {})
    }

    if (mode === "focus") {
      setSessions(s => s + 1)
      setTodaySessions(t => t + 1)
      
      // After 4 focus sessions, suggest a long break
      if ((sessions + 1) % 4 === 0) {
        setMode("longBreak")
        setTime(customTimes.longBreak)
      } else {
        setMode("shortBreak")
        setTime(customTimes.shortBreak)
      }
    } else {
      setMode("focus")
      setTime(customTimes.focus)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(customTimes[mode])
  }

  const changeMode = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    setTime(customTimes[newMode])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    const total = customTimes[mode]
    const elapsed = total - time
    return (elapsed / total) * 100
  }

  const getModeColor = () => {
    switch(mode) {
      case "focus": return "text-red-500"
      case "shortBreak": return "text-green-500"
      case "longBreak": return "text-blue-500"
    }
  }

  const getModeEmoji = () => {
    switch(mode) {
      case "focus": return "🎯"
      case "shortBreak": return "☕"
      case "longBreak": return "🌴"
    }
  }

  const getModeText = () => {
    switch(mode) {
      case "focus": return "Tempo de Foco"
      case "shortBreak": return "Pausa Curta"
      case "longBreak": return "Pausa Longa"
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pomodoro Timer</h1>
        <p className="text-muted-foreground">
          Mantenha o foco e aumente sua produtividade
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{getModeText()} {getModeEmoji()}</CardTitle>
                <CardDescription>
                  {mode === "focus" 
                    ? "Concentre-se completamente na tarefa"
                    : "Relaxe e recarregue as energias"}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Timer Display */}
              <div className="text-center">
                <div className={`text-7xl font-bold ${getModeColor()}`}>
                  {formatTime(time)}
                </div>
                <Progress value={getProgress()} className="mt-4" />
              </div>

              {/* Mode Selector */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={mode === "focus" ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeMode("focus")}
                >
                  <Brain className="h-4 w-4 mr-1" />
                  Foco
                </Button>
                <Button
                  variant={mode === "shortBreak" ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeMode("shortBreak")}
                >
                  <Coffee className="h-4 w-4 mr-1" />
                  Pausa Curta
                </Button>
                <Button
                  variant={mode === "longBreak" ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeMode("longBreak")}
                >
                  <Coffee className="h-4 w-4 mr-1" />
                  Pausa Longa
                </Button>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className="min-w-[120px]"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Iniciar
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={resetTimer}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reiniciar
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Personalizar Tempos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Tempo de Foco: {Math.floor(customTimes.focus / 60)} min
                      </label>
                      <Slider
                        value={[customTimes.focus / 60]}
                        onValueChange={(value) => 
                          setCustomTimes({...customTimes, focus: value[0] * 60})
                        }
                        min={1}
                        max={60}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Pausa Curta: {Math.floor(customTimes.shortBreak / 60)} min
                      </label>
                      <Slider
                        value={[customTimes.shortBreak / 60]}
                        onValueChange={(value) => 
                          setCustomTimes({...customTimes, shortBreak: value[0] * 60})
                        }
                        min={1}
                        max={15}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Pausa Longa: {Math.floor(customTimes.longBreak / 60)} min
                      </label>
                      <Slider
                        value={[customTimes.longBreak / 60]}
                        onValueChange={(value) => 
                          setCustomTimes({...customTimes, longBreak: value[0] * 60})
                        }
                        min={5}
                        max={30}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas de Hoje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sessões Completas</span>
                <span className="text-2xl font-bold">{todaySessions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tempo Total de Foco</span>
                <span className="font-medium">{Math.floor(todaySessions * 25 / 60)}h {todaySessions * 25 % 60}m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Meta Diária</span>
                <div className="flex items-center gap-2">
                  <Progress value={(todaySessions / 8) * 100} className="w-20" />
                  <span className="text-sm">{todaySessions}/8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Task Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tarefa Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Estudar JavaScript - Capítulo 5</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Programação</Badge>
                  <Badge variant="outline">Alta Prioridade</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Sessões para esta tarefa: 3
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Trocar Tarefa
              </Button>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Dica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Durante o tempo de foco, evite distrações. Coloque o celular no modo silencioso e feche abas desnecessárias do navegador.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}