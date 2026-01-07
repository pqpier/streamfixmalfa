export type ContentType = 'movie' | 'series' | 'documentary'
export type ContentRating = 'L' | '10' | '12' | '14' | '16' | '18'

export interface Content {
  id: string
  title: string
  description: string
  type: ContentType
  thumbnailUrl: string
  backdropUrl: string
  videoUrl: string
  trailerUrl?: string
  duration?: number // in minutes for movies
  releaseYear: number
  rating: ContentRating
  genres: string[]
  cast: string[]
  director?: string
  seasons?: Season[]
  match: number // percentage match
  isNew?: boolean
  isTrending?: boolean
  continueWatching?: {
    progress: number // percentage watched
    lastWatchedAt: Date
    episode?: number
    season?: number
  }
}

export interface Season {
  id: string
  number: number
  episodes: Episode[]
  year: number
}

export interface Episode {
  id: string
  number: number
  title: string
  description: string
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  isKids: boolean
  myList: string[]
  continueWatching: string[]
  preferences: {
    language: string
    subtitles: boolean
    autoplay: boolean
  }
}

export interface Category {
  id: string
  title: string
  contents: Content[]
}