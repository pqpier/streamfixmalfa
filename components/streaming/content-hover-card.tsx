"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Content } from "@/lib/types/streaming"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ContentHoverCardProps {
  content: Content
  showProgress?: boolean
}

export function ContentHoverCard({ content, showProgress }: ContentHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
    }, 800)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative flex-none w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal Card */}
      <div 
        className={`relative rounded overflow-hidden transition-all duration-300 ${
          isHovered ? 'invisible' : 'visible'
        }`}
        onClick={() => !isHovered && (window.location.href = `/watch/${content.id}`)}
      >
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full aspect-[16/9] object-cover"
        />
        
        {/* Progress Bar (if continue watching) */}
        {showProgress && content.continueWatching && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
            <Progress value={content.continueWatching.progress} className="h-1" />
          </div>
        )}
      </div>

      {/* Hover Card */}
      {isHovered && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[320px] bg-[#181818] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-105 duration-300"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Video/Image Preview */}
          <div className="relative aspect-video bg-black">
            <img
              src={content.backdropUrl || content.thumbnailUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
          </div>

          {/* Content Info */}
          <div className="p-4 space-y-3">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                className="flex-1 bg-white text-black hover:bg-white/80 font-semibold h-9"
                onClick={() => window.location.href = `/watch/${content.id}`}
              >
                <Play className="mr-2 h-4 w-4 fill-black" />
                Assistir
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500 font-semibold">{content.match}% relevante</span>
              <Badge variant="outline" className="border-gray-500 text-white h-5">
                {content.rating}
              </Badge>
              {content.seasons ? (
                <span className="text-gray-400">{content.seasons.length} temp.</span>
              ) : content.duration ? (
                <span className="text-gray-400">{Math.floor(content.duration / 60)}h {content.duration % 60}min</span>
              ) : null}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 text-xs text-gray-400">
              {content.genres.slice(0, 3).map((genre, index) => (
                <span key={genre}>
                  {genre}{index < content.genres.slice(0, 3).length - 1 && ' •'}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}