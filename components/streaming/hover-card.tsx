"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Play, Plus, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Content } from "@/lib/types/streaming"

interface HoverCardProps {
  content: Content
  targetRect: DOMRect
  onClose: () => void
}

export function HoverCard({ content, targetRect, onClose }: HoverCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const cardWidth = 320
  const cardHeight = 400
  
  // Calculate position
  let left = targetRect.left + (targetRect.width / 2) - (cardWidth / 2)
  let top = targetRect.top - 20
  
  // Keep within viewport
  if (left < 10) left = 10
  if (left + cardWidth > window.innerWidth - 10) {
    left = window.innerWidth - cardWidth - 10
  }
  
  if (top < 10) top = targetRect.bottom + 10

  return createPortal(
    <div
      data-hover-card
      className="fixed"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${cardWidth}px`,
        zIndex: 999999,
        pointerEvents: 'auto'
      }}
      onMouseLeave={onClose}
    >
      <div className="bg-[#181818] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Preview Image */}
        <div className="relative aspect-video bg-black">
          <img
            src={content.backdropUrl || content.thumbnailUrl}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-white font-semibold text-lg">{content.title}</h3>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              className="flex-1 bg-white text-black hover:bg-white/80 h-9 font-semibold"
              onClick={() => window.location.href = `/watch/${content.id}`}
            >
              <Play className="mr-1.5 h-4 w-4 fill-black" />
              Assistir
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-9 w-9 rounded-full border-gray-600 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-9 w-9 rounded-full border-gray-600 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 font-bold">{content.match}% relevante</span>
            <Badge variant="outline" className="border-gray-600 text-white">
              {content.rating}
            </Badge>
            {content.seasons ? (
              <span className="text-gray-400">{content.seasons.length} temporada{content.seasons.length > 1 ? 's' : ''}</span>
            ) : content.duration ? (
              <span className="text-gray-400">{Math.floor(content.duration / 60)}h {content.duration % 60}min</span>
            ) : null}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5">
            {content.genres.map((genre) => (
              <span key={genre} className="text-xs text-gray-400">
                {genre} •
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}