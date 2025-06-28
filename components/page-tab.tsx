"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { Input } from "@/components/ui/input"
import { PageIcon } from "./page-icon"
import { PageContextMenu } from "./page-context-menu"
import { useRename } from "../hooks/use-rename"
import type { PageTabProps } from "../types/page"

export function PageTab({
  page,
  index,
  isActive,
  canDelete,
  isDragging,
  isDraggedOver,
  dragHandlers,
  onActivate,
  onRename,
  onSetAsFirst,
  onCopy,
  onDuplicate,
  onDelete,
}: PageTabProps) {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const { editName, startRename, finishRename, cancelRename, setEditName, isEditing } = useRename(onRename)

  const handleActivate = useCallback(() => {
    onActivate(page.id)
  }, [onActivate, page.id])

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isActive) {
      handleActivate()
    }
    setShowContextMenu(true)
  }

  const handleDoubleClick = useCallback(() => {
    startRename(page.id, page.name)
  }, [startRename, page.id, page.name])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") finishRename()
      if (e.key === "Escape") cancelRename()
    },
    [finishRename, cancelRename],
  )

  const tabClasses = `
    relative flex items-center gap-3 cursor-pointer select-none transition-all duration-200 px-4 py-3 rounded-lg group max-w-[180px] overflow-hidden
    ${isDragging ? "opacity-50 scale-95 z-10" : ""}
    ${isDraggedOver ? "ring-2 ring-blue-400 ring-offset-2 bg-blue-50" : ""}
    ${isActive ? "bg-white shadow-sm border border-gray-200" : "bg-gray-100 hover:bg-gray-200"}
    focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white focus-within:border-blue-400
  `

  return (
    <div
      draggable={!isEditing(page.id)}
      {...dragHandlers}
      onContextMenu={handleRightClick}
      className={tabClasses}
      onClick={handleActivate}
      tabIndex={0}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        <PageIcon page={page} isActive={isActive} />
      </div>

      {isEditing(page.id) ? (
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={finishRename}
          onKeyDown={handleKeyDown}
          className="h-6 px-2 text-sm border border-orange-300 bg-white text-gray-900 focus:border-orange-500 focus:ring-orange-500"
          autoFocus
        />
      ) : (
        <span
          className={`text-sm font-medium ${
            isActive ? "text-gray-900" : "text-gray-600"
          } transition-colors cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded truncate overflow-hidden text-ellipsis whitespace-nowrap`}
          onDoubleClick={handleDoubleClick}
          title="Double-click to edit"
        >
          {page.name}
        </span>
      )}

      <PageContextMenu
        page={page}
        isActive={isActive}
        canDelete={canDelete}
        isOpen={showContextMenu}
        onOpenChange={setShowContextMenu}
        onSetAsFirst={onSetAsFirst}
        onRename={startRename}
        onCopy={onCopy}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </div>
  )
}
