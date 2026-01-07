"use client"

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

export function Portal({ children }: PortalProps) {
  const ref = useRef<Element | null>(null)
  
  useEffect(() => {
    ref.current = document.body
  }, [])

  return ref.current ? createPortal(children, ref.current) : null
}