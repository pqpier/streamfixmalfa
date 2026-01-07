"use client"

import { useState, useEffect } from "react"
import { Play, Info, Volume2, VolumeX, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContentCarousel } from "@/components/streaming/content-carousel"
import { categories, continueWatchingContents, mockContents } from "@/lib/data/mock-content"
import { Header } from "@/components/streaming/header"
import { MobileNav } from "@/components/streaming/mobile-nav"

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true)
  const heroContent = mockContents[0]

  return (
    <div className="relative min-h-screen bg-[#141414]">
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img
              src={heroContent.backdropUrl}
              alt={heroContent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-[25%] md:bottom-[35%] left-4 md:left-12 max-w-lg md:max-w-2xl space-y-3 md:space-y-6">
          <h1 className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg">
            {heroContent.title}
          </h1>
          
          <p className="text-sm md:text-lg text-white/90 line-clamp-2 md:line-clamp-3 max-w-xs md:max-w-xl drop-shadow">
            {heroContent.description}
          </p>

          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              size="default" 
              className="bg-white text-black hover:bg-white/80 px-4 md:px-8 text-sm md:text-lg font-semibold"
              onClick={() => window.location.href = `/watch/${heroContent.id}`}
            >
              <Play className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6 fill-black" />
              Assistir
            </Button>
            
            <Button 
              size="default" 
              variant="secondary"
              className="bg-gray-500/70 text-white hover:bg-gray-500/50 px-4 md:px-8 text-sm md:text-lg font-semibold backdrop-blur"
            >
              <Info className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" />
              <span className="hidden sm:inline">Mais Informações</span>
              <span className="sm:hidden">Info</span>
            </Button>
          </div>
        </div>

        {/* Rating and Sound Control */}
        <div className="absolute bottom-[25%] md:bottom-[35%] right-4 md:right-12 flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-white/50 bg-transparent text-white hover:bg-white/20"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          <div className="bg-gray-500/60 backdrop-blur px-3 py-1 border-l-4 border-white">
            <span className="text-white font-bold text-lg">{heroContent.rating}</span>
          </div>
        </div>

        {/* Fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Content Sections */}
      <div className="relative -mt-32 z-10 pb-20 md:pb-20 mb-16 md:mb-0">
        {/* Continue Watching */}
        {continueWatchingContents.length > 0 && (
          <ContentCarousel
            title="Continuar Assistindo"
            contents={continueWatchingContents}
            showProgress
          />
        )}

        {/* Categories */}
        {categories.map((category) => (
          <ContentCarousel
            key={category.id}
            title={category.title}
            contents={category.contents}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}