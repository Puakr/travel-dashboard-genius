
/**
 * Base UI Components
 * Includes input elements, buttons, switches, and other foundational UI elements
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Re-export all base components
export * from "@/components/ui/avatar"
export * from "@/components/ui/button"
export * from "@/components/ui/calendar"
export * from "@/components/ui/form"
// Don't export from both input and input-elements - choose one
export * from "@/components/ui/input"
// export * from "@/components/ui/input-elements" - removing duplicate export
export * from "@/components/ui/label"
export * from "@/components/ui/slider"
export * from "@/components/ui/switch"
export * from "@/components/ui/textarea"
export * from "@/components/ui/toggle"
export * from "@/components/ui/toggle-group"
