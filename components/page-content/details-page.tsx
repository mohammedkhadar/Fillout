"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Save } from "lucide-react"
import { useState } from "react"

export function DetailsPage() {
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Details page form submitted:", { description })
    // Handle form submission logic here
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <FileText className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>
          <p className="text-gray-600">Add a detailed description</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description..."
                className="max-w-md"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Description
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
