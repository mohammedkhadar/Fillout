"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenuItem } from "./context-menu-item"
import { SetAsFirstIcon, RenameIcon, CopyIcon, DuplicateIcon, DeleteIcon } from "../assets/icons"
import type { PageContextMenuProps } from "../types/page"

export function PageContextMenu({
  page,
  isActive,
  canDelete,
  isOpen,
  onOpenChange,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: PageContextMenuProps) {
  if (!isActive) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all ml-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 p-0">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
        </div>

        <div className="py-1">
          <ContextMenuItem icon={<SetAsFirstIcon />} label="Set as first page" onClick={() => onSetAsFirst(page.id)} />

          <ContextMenuItem
            icon={<RenameIcon />}
            label="Rename"
            onSelect={() => {
              setTimeout(() => {
                onRename(page.id, page.name)
              }, 500)
            }}
          />

          <ContextMenuItem icon={<CopyIcon />} label="Copy" onClick={() => onCopy(page.id)} />

          <ContextMenuItem icon={<DuplicateIcon />} label="Duplicate" onClick={() => onDuplicate(page.id)} />
        </div>

        <div className="border-t border-gray-200 py-1">
          <ContextMenuItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(event) => {
              event?.stopPropagation()
              onDelete(page.id)
            }}
            disabled={!canDelete}
            variant="destructive"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
