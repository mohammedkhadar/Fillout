"use client"

import { useState, useCallback } from "react"

type onRenameCallback = (pageId: string, newName: string) => void

export function useRename(onRename: onRenameCallback) {
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [editName, setEditNameState] = useState("")

  const startRename = useCallback((pageId: string, currentName: string) => {
    setEditingPage(pageId)
    setEditNameState(currentName)
  }, [])

  const finishRename = useCallback(
    () => {
      if (editingPage && editName.trim()) {
        onRename(editingPage, editName.trim())
      }
      cancelRename()
    },
    [editingPage, editName],
  )

  const cancelRename = useCallback(() => {
    setEditingPage(null)
    setEditNameState("")
  }, [])

  const isEditing = useCallback((pageId: string) => editingPage === pageId, [editingPage])

  return {
    editingPage,
    editName,
    startRename,
    finishRename,
    cancelRename,
    setEditName: setEditNameState,
    isEditing,
  }
}
