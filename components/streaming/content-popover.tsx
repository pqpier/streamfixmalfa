"use client"

import { Play, Plus, ThumbsUp, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Content } from "@/lib/types/streaming"
import { Badge } from "@/components/ui/badge"

interface ContentPopoverProps {
  content: Content
  onClose: () => void
  position: { x: number; y: number }
}

export function ContentPopover({ content, onClose, position }: ContentPopoverProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Popover */}
      <div
        className="fixed z-50 w-[350px] bg-[#181818] rounded-lg shadow-2xl overflow-hidden transition-all duration-300 scale-100 opacity-100"
        style={{
          left: `${Math.min(Math.max(position.x - 175, 20), window.innerWidth - 370)}px`,
          top: `${Math.max(position.y - 50, 20)}px`,
          transformOrigin: 'center top'
        }}
      >
        {/* Video/Image Preview */}
        <div className="relative aspect-video bg-black">
          <img
            src={content.backdropUrl || content.thumbnailUrl}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#181818] via-[#181818]/80 to-transparent">
            <h3 className="text-2xl font-bold text-white mb-2">{content.title}</h3>
            
            {/* Season/Episode Info for Series */}
            {content.seasons && content.continueWatching && (
              <p className="text-sm text-white/80">
                T{content.continueWatching.season}:E{content.continueWatching.episode} "{content.seasons[0].episodes[content.continueWatching.episode - 1]?.title}"
              </p>
            )}
          </div>

          {/* Close Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-[#181818]/80 text-white hover:bg-[#181818]"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              className="flex-1 bg-white text-black hover:bg-white/80 font-semibold"
              onClick={() => window.location.href = `/watch/${content.id}`}
            >
              <Play className="mr-2 h-4 w-4 fill-black" />
              Assistir
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-10 w-10 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-10 w-10 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-10 w-10 rounded-full border-gray-500 bg-transparent text-white hover:bg-white/20"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-green-500 font-semibold">{content.match}% relevante</span>
            <Badge variant="outline" className="border-gray-500 text-white">
              {content.rating}
            </Badge>
            {content.seasons ? (
              <span className="text-gray-400">{content.seasons.length} temporada{content.seasons.length > 1 ? 's' : ''}</span>
            ) : (
              <span className="text-gray-400">{content.duration && `${Math.floor(content.duration / 60)}h ${content.duration % 60}min`}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-3">
            {content.description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {content.genres.map((genre) => (
              <span key={genre} className="text-xs text-gray-400">
                {genre} •
              </span>
            ))}
          </div>

          {/* Cast */}
          {content.cast.length > 0 && (
            <div className="text-xs text-gray-400">
              <span className="text-gray-300">Elenco:</span> {content.cast.slice(0, 3).join(', ')}
            </div>
          )}
        </div>
      </div>
    </>
  )
}