"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Content } from "@/lib/types/streaming"
import { Progress } from "@/components/ui/progress"
import { SimpleHover } from "./simple-hover"

interface ContentCarouselProps {
  title: string
  contents: Content[]
  showProgress?: boolean
}

export function ContentCarousel({ title, contents, showProgress }: ContentCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredContent, setHoveredContent] = useState<Content | null>(null)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = carouselRef.current.offsetWidth - 100
    const newScrollLeft = 
      direction === "left"
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth"
    })

    // Update arrow visibility
    setTimeout(() => {
      if (!carouselRef.current) return
      setShowLeftArrow(carouselRef.current.scrollLeft > 0)
      setShowRightArrow(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth - 10
      )
    }, 300)
  }

  const handleMouseEnter = (content: Content, element: HTMLElement) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    
    // Set new timeout
    hoverTimeoutRef.current = setTimeout(() => {
      const rect = element.getBoundingClientRect()
      setHoveredContent(content)
      setTargetRect(rect)
    }, 500)
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Check if we're moving to the hover card itself
    const relatedTarget = e.relatedTarget as HTMLElement
    if (relatedTarget && relatedTarget.closest('[data-hover-card]')) {
      return // Don't close if moving to hover card
    }
    
    // Clear timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    
    // Small delay before hiding to prevent flickering
    setTimeout(() => {
      setHoveredContent(null)
      setTargetRect(null)
    }, 100)
  }

  return (
    <div className="relative px-4 md:px-12 mb-6 md:mb-10 overflow-visible">
      <h2 className="text-white text-lg md:text-2xl font-semibold mb-3 md:mb-4">{title}</h2>
      
      <div className="relative group overflow-visible">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Carousel Content */}
        <div 
          ref={carouselRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => {
            const target = e.target as HTMLDivElement
            setShowLeftArrow(target.scrollLeft > 0)
            setShowRightArrow(
              target.scrollLeft < target.scrollWidth - target.offsetWidth - 10
            )
          }}
        >
          {contents.map((content) => (
            <div
              key={content.id}
              className="flex-none w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px]"
            >
              <SimpleHover content={content} showProgress={showProgress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}