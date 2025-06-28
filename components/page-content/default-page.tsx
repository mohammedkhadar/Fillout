"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Save } from "lucide-react"
import { useState } from "react"

interface DefaultPageProps {
  pageName: string
}

export function DefaultPage({ pageName }: DefaultPageProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${pageName} page form submitted:`, { inputValue })
    // Handle form submission logic here
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <FileText className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageName}</h1>
          <p className="text-gray-600">Enter information for {pageName}</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{pageName} Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-value">{pageName} Value</Label>
              <Input
                id="input-value"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${pageName.toLowerCase()} value...`}
                className="max-w-md"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save {pageName}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
