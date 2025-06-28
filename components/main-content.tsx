"use client"

import { InfoPage } from "./page-content/info-page"
import { DetailsPage } from "./page-content/details-page"
import { OtherPage } from "./page-content/other-page"
import { EndingPage } from "./page-content/ending-page"
import { DefaultPage } from "./page-content/default-page"
import type { Page } from "../types/page"

interface MainContentProps {
  activePage?: Page
}

/**
 * Content resolver that maps page names to their corresponding components
 */
function getPageContent(page: Page) {
  switch (page.name.toLowerCase()) {
    case "info":
      return <InfoPage />
    case "details":
      return <DetailsPage />
    case "other":
      return <OtherPage />
    case "ending":
      return <EndingPage />
    default:
      return <DefaultPage pageName={page.name} />
  }
}

/**
 * Displays the main content area for the currently active page tab.
 * Uses a modular system to render different content based on page name.
 */
export function MainContent({ activePage }: MainContentProps) {
  if (!activePage) {
    return (
      <div className="flex h-80 items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Page Selected</h2>
          <p>Select or create a page to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96">
        <div className="p-8">{getPageContent(activePage)}</div>
      </div>
    </section>
  )
}
