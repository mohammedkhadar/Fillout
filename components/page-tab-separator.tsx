"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PageTabSeparatorProps } from "../types/page"

export function PageTabSeparator({ index, onAddPage }: PageTabSeparatorProps) {
  return (
    <div className="relative group transition-all duration-300 ease-out">
      <div className="flex items-center justify-center transition-all duration-300 ease-out">
        <div className="flex items-center opacity-100 transition-opacity duration-200 group-hover:opacity-1">
          <div className="w-3 h-0 border-t border-dashed border-gray-300"></div>
        </div>

        <div className="inset-0 flex items-center justify-center opacity-0 scale-50 w-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:w-auto group-hover:pointer-events-auto transition-all duration-200 ease-in-out">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 rounded-full border border-gray-200 hover:border-orange-200 shadow-sm shadow-md transform scale-90 group-hover:scale-100 bg-white"
            onClick={() => onAddPage(index)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center opacity-100 transition-opacity duration-200 group-hover:opacity-1">
          <div className="w-3 h-0 border-t border-dashed border-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
