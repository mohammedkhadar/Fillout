"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cog, Save } from "lucide-react"
import { useState } from "react"

export function OtherPage() {
  const [configuration, setConfiguration] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Other page form submitted:", { configuration })
    // Handle form submission logic here
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <Cog className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
          <p className="text-gray-600">Set up your configuration</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="configuration">Configuration Value</Label>
              <Input
                id="configuration"
                type="text"
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
                placeholder="Enter configuration value..."
                className="max-w-md"
              />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
