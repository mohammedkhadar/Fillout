"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info, Save } from "lucide-react"
import { useState } from "react"

export function InfoPage() {
  const [projectName, setProjectName] = useState("Excel Navigation System")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Info page form submitted:", { projectName })
    // Handle form submission logic here
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Information</h1>
          <p className="text-gray-600">Enter your project details</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="max-w-md"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Project Name
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
