"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { ReactNode } from "react"

interface ContextMenuItemProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  onSelect?: () => void
  disabled?: boolean
  variant?: "default" | "destructive"
  className?: string
}

export function ContextMenuItem({
  icon,
  label,
  onClick,
  onSelect,
  disabled = false,
  variant = "default",
  className = "",
}: ContextMenuItemProps) {
  const baseClasses = "px-4 py-2 flex items-center gap-3 cursor-pointer"
  const variantClasses = {
    default: "hover:bg-gray-50",
    destructive: "hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed",
  }

  const textClasses = {
    default: "text-sm font-medium text-gray-900",
    destructive: "text-sm font-medium text-red-600",
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <DropdownMenuItem onClick={onClick} onSelect={onSelect} disabled={disabled} className={combinedClasses}>
      {icon}
      <span className={textClasses[variant]}>{label}</span>
    </DropdownMenuItem>
  )
}
