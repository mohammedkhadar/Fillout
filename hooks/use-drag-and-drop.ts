"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import type { Page } from "../types/page"

export function useDragAndDrop(pages: Page[], onPagesChange: (pages: Page[]) => void) {
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const draggedIndexRef = useRef<number | null>(null)

  const startDrag = useCallback((pageId: string, index: number) => {
    setDraggedPageId(pageId)
    draggedIndexRef.current = index
  }, [])

  const endDrag = useCallback(() => {
    setDraggedPageId(null)
    setDragOverIndex(null)
    draggedIndexRef.current = null
  }, [])

  const setDragOver = useCallback((index: number | null) => {
    setDragOverIndex(index)
  }, [])

  const handleDrop = useCallback(
    (targetIndex: number) => {
      if (draggedPageId === null || draggedIndexRef.current === null) return

      const draggedIndex = draggedIndexRef.current

      // Don't reorder if dropping in the same position
      if (draggedIndex === targetIndex) {
        endDrag()
        return
      }

      // Create new array with reordered pages
      const newPages = [...pages]
      const [draggedPage] = newPages.splice(draggedIndex, 1)
      newPages.splice(targetIndex, 0, draggedPage)

      onPagesChange(newPages)
      endDrag()
    },
    [draggedPageId, pages, onPagesChange, endDrag],
  )

  const isDragging = useCallback((pageId: string) => draggedPageId === pageId, [draggedPageId])

  const isDraggedOver = useCallback((index: number) => dragOverIndex === index, [dragOverIndex])

  const isAnyDragging = useCallback(() => draggedPageId !== null, [draggedPageId])

  // Create drag handlers for a specific page
  const createDragHandlers = useCallback(
    (pageId: string, index: number) => ({
      onDragStart: (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", pageId)
        startDrag(pageId, index)
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
        setDragOver(index)
      },
      onDragLeave: (e: React.DragEvent) => {
        // Only clear drag over if we're actually leaving the element
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX
        const y = e.clientY

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          setDragOver(null)
        }
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault()
        handleDrop(index)
      },
      onDragEnd: () => {
        endDrag()
      },
    }),
    [startDrag, setDragOver, handleDrop, endDrag],
  )

  return {
    draggedPageId,
    dragOverIndex,
    isDragging,
    isDraggedOver,
    isAnyDragging,
    createDragHandlers,
    endDrag,
  }
}
