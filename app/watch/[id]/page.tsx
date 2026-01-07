"use client"

import { useState, useRef, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Volume2, VolumeX, Maximize, Minimize, Play, Pause, Settings, Subtitles, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { mockContents } from "@/lib/data/mock-content"

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  
  const { id } = use(params)
  const content = mockContents.find(c => c.id === id) || mockContents[0]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  const handlePlayPause = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return
    videoRef.current.volume = value[0]
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={content.videoUrl}
        className="w-full h-full object-contain"
        autoPlay
      />

      {/* Click to play/pause area */}
      <div 
        className="absolute inset-0 z-10"
        onClick={(e) => {
          // Only trigger if clicking on the video area, not on controls
          if ((e.target as HTMLElement).classList.contains('z-10')) {
            handlePlayPause()
          }
        }}
      />

      {/* Controls Overlay */}
      <div className={`absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-8 pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <Button
              size="icon"
              variant="ghost"
              className="h-20 w-20 rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
              onClick={handlePlayPause}
            >
              <Play className="h-10 w-10 text-white fill-white" />
            </Button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4 pointer-events-auto">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/80">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-white" />}
              </Button>

              {/* Skip Forward */}
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-6 w-6" />
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleMute}
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="text-white">
                <h3 className="text-lg font-semibold">{content.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Subtitles */}
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Subtitles className="h-6 w-6" />
              </Button>

              {/* Settings */}
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-6 w-6" />
              </Button>

              {/* Fullscreen */}
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}