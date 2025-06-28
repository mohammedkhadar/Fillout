"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddPageButtonProps {
  onAddPage: () => void
}

export function AddPageButton({ onAddPage }: AddPageButtonProps) {
  return (
    <Button
      variant="outline"
      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors px-4 py-2 text-sm font-medium rounded-lg shadow-sm"
      onClick={onAddPage}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add page
    </Button>
  )
}
