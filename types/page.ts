import type React from "react"
export interface Page {
  id: string
  name: string
}

export interface DragHandlers {
  onDragStart: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragEnd: () => void
}

export interface PageTabProps {
  page: Page
  index: number
  isActive: boolean
  canDelete: boolean
  isDragging?: boolean
  isDraggedOver?: boolean
  dragHandlers: DragHandlers
  onActivate: (pageId: string) => void
  onRename: (pageId: string, newName: string) => void
  onSetAsFirst: (pageId: string) => void
  onCopy: (pageId: string) => void
  onDuplicate: (pageId: string) => void
  onDelete: (pageId: string) => void
}


export interface PageTabSeparatorProps {
  index: number
  onAddPage: (afterIndex: number) => void
}
