"use client"
import { useState } from "react"
import { PageNavigation } from "./components/page-navigation"
import { MainContent } from "./components/main-content"
import type { Page } from "./types/page"

const initialPages: Page[] = [
  { id: "1", name: "Info" },
  { id: "2", name: "Details" },
  { id: "3", name: "Other" },
  { id: "4", name: "Ending" },
]

export default function Component() {
  const [activePage, setActivePage] = useState("1")
  const [pages, setPages] = useState<Page[]>(initialPages)

  // Find the current page from the actual pages state, not the initial pages
  const currentPage = pages.find((p) => p.id === activePage)

  const handlePagesChange = (updatedPages: Page[]) => {
    setPages(updatedPages)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Navigation */}
      <PageNavigation
        initialPages={pages}
        initialActivePage={activePage}
        onActivePageChange={setActivePage}
        onPagesChange={handlePagesChange}
      />

      {/* Main Content Area */}
      <MainContent activePage={currentPage} />
    </div>
  )
}
