"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Save } from "lucide-react"
import { useState } from "react"

export function EndingPage() {
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Ending page form submitted:", { feedback })
    // Handle form submission logic here
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Completion</h1>
          <p className="text-gray-600">Share your feedback</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Input
                id="feedback"
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback..."
                className="max-w-md"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
