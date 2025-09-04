"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("main")
  const [isInitialized, setIsInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const updateActiveSection = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const sections = container.querySelectorAll(".snap-section")
    if (sections.length === 0) return

    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const scrollPosition = scrollTop + containerHeight / 2

    let currentSection = "main"

    sections.forEach((section) => {
      const element = section as HTMLElement
      const sectionTop = element.offsetTop
      const sectionHeight = element.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const id = element.id || "main"
        currentSection = id
      }
    })

    setActiveSection(currentSection)
    if (!isInitialized) {
      setIsInitialized(true)
    }
  }, [isInitialized])

  const debouncedUpdateActiveSection = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    debounceTimerRef.current = setTimeout(() => {
      updateActiveSection()
    }, 20)
  }, [updateActiveSection])

  const setActiveSectionManually = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    setIsInitialized(true)
  }, [])

  const forceUpdate = useCallback(() => {
    updateActiveSection()
  }, [updateActiveSection])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Множественные попытки инициализации
    const initAttempts = [50, 150, 300, 600, 1000]
    const timers: NodeJS.Timeout[] = []

    initAttempts.forEach(delay => {
      const timer = setTimeout(() => {
        const sections = container.querySelectorAll(".snap-section")
        if (sections.length > 0) {
          updateActiveSection()
        }
      }, delay)
      timers.push(timer)
    })

    // Слушатель изменений DOM
    const observer = new MutationObserver(() => {
      const sections = container.querySelectorAll(".snap-section")
      if (sections.length > 0 && !isInitialized) {
        setTimeout(updateActiveSection, 100)
      }
    })

    observer.observe(container, {
      childList: true,
      subtree: true
    })

    const handleScroll = () => {
      debouncedUpdateActiveSection()
    }

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    container.addEventListener("scroll", throttledScroll)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      observer.disconnect()
      container.removeEventListener("scroll", throttledScroll)
    }
  }, [debouncedUpdateActiveSection, updateActiveSection, isInitialized])

  return { activeSection, containerRef, isInitialized, forceUpdate, setActiveSectionManually }
}