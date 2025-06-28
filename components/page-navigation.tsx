"use client"

import { useEffect } from "react"
import { PageTab } from "./page-tab"
import { PageTabSeparator } from "./page-tab-separator"
import { AddPageButton } from "./add-page-button"
import { usePageNavigation } from "../hooks/use-page-navigation"
import { useDragAndDrop } from "../hooks/use-drag-and-drop"
import type { Page } from "../types/page"

interface PageNavigationProps {
  initialPages: Page[]
  initialActivePage: string
  onActivePageChange?: (pageId: string) => void
  onPagesChange?: (pages: Page[]) => void
}

export function PageNavigation({
  initialPages,
  initialActivePage,
  onActivePageChange,
  onPagesChange,
}: PageNavigationProps) {
  const {
    pages,
    activePage,
    addPage: addPageAction,
    deletePage: deletePageAction,
    renamePage: renamePageAction,
    duplicatePage: duplicatePageAction,
    setAsFirstPage: setAsFirstPageAction,
    setActivePage: setActivePageAction,
    setCopyPage: setCopyPageAction,
    setPages: setPagesAction,
  } = usePageNavigation(initialPages, initialActivePage)

  // Drag and drop functionality
  const { isDragging, isDraggedOver, createDragHandlers } = useDragAndDrop(pages, setPagesAction)

  const addPage = (afterIndex: number) => addPageAction(afterIndex)
  const handleActivate = (pageId: string) => setActivePageAction(pageId)
  const setCopyPage = (pageId: string) => setCopyPageAction(pageId)
  const duplicatePage = (pageId: string) => duplicatePageAction(pageId)
  const deletePage = (pageId: string) => deletePageAction(pageId)
  const setAsFirstPage = (pageId: string) => setAsFirstPageAction(pageId)

  useEffect(() => {
    if (activePage) {
      onActivePageChange?.(activePage)
    }
  }, [activePage, onActivePageChange])

  useEffect(() => {
    onPagesChange?.(pages)
  }, [pages, onPagesChange])

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 overflow-x-auto">
        <div className="flex items-center py-4 transition-all duration-300 ease-out">
          {pages.map((page, index) => (
            <div key={page.id} className="flex items-center">
              <PageTab
                index={index}
                page={page}
                isActive={page.id === activePage}
                canDelete={pages.length > 1}
                isDragging={isDragging(page.id)}
                isDraggedOver={isDraggedOver(index)}
                dragHandlers={createDragHandlers(page.id, index)}
                onActivate={handleActivate}
                onRename={renamePageAction}
                onSetAsFirst={setAsFirstPage}
                onCopy={setCopyPage}
                onDuplicate={duplicatePage}
                onDelete={deletePage}
              />

              <PageTabSeparator index={index} onAddPage={addPage} />
            </div>
          ))}

          <AddPageButton onAddPage={() => addPage(pages.length - 1)} />
        </div>
      </div>
    </div>
  )
}
