"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Plus, ThumbsUp } from "lucide-react"
import { Content } from "@/lib/types/streaming"
import { Progress } from "@/components/ui/progress"

interface SimpleHoverProps {
  content: Content
  showProgress?: boolean
}

export function SimpleHover({ content, showProgress }: SimpleHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setPosition({
          top: rect.top - 50,
          left: rect.left - 35
        })
      }
      setIsHovered(true)
    }, 500)
  }
  
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsHovered(false)
  }

  return (
    <div 
      ref={cardRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal Card */}
      <div 
        className="w-full rounded overflow-hidden cursor-pointer"
        onClick={() => window.location.href = `/watch/${content.id}`}
      >
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full aspect-[16/9] object-cover"
        />
        {showProgress && content.continueWatching && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
            <Progress value={content.continueWatching.progress} className="h-1" />
          </div>
        )}
      </div>

      {/* Hover Overlay - POSITIONED ABOVE CARD */}
      {isHovered && (
        <div 
          className="fixed z-[99999] w-[320px] bg-[#181818] rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <img
            src={content.backdropUrl || content.thumbnailUrl}
            alt={content.title}
            className="w-full aspect-video object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-white font-bold mb-2">{content.title}</h3>
            <div className="flex gap-2 mb-3">
              <button className="flex-1 bg-white text-black py-2 rounded font-bold hover:bg-gray-200">
                ▶ Assistir
              </button>
              <button className="p-2 border border-gray-600 rounded text-white hover:bg-gray-800">
                +
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500 font-bold">{content.match}% relevante</span>
              <span className="border border-gray-600 px-1 text-gray-300">{content.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {content.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="text-xs text-gray-400">{genre} •</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}