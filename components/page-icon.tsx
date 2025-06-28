import { DocumentIcon, CheckIcon } from "../assets/icons"
import type { Page } from "../types/page"

interface PageIconProps {
  page: Page
  isActive: boolean
}

export function PageIcon({ page, isActive }: PageIconProps) {
  const iconColor = isActive ? "text-orange-500" : "text-gray-400"
  const bgColor = isActive ? "bg-orange-500 text-white" : "bg-gray-400 text-white"

  if (page.name === "Info") {
    return <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${bgColor}`}>i</div>
  }

  if (page.name === "Ending") {
    return (
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${bgColor}`}>
        <CheckIcon />
      </div>
    )
  }

  return <DocumentIcon className={`${iconColor} transition-colors`} />
}
