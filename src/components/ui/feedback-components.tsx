
/**
 * Feedback Components
 * Includes alerts, dialogs, toasts, and other feedback-related UI elements
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Re-export feedback components, avoiding duplicates
export * from "@/components/ui/alert"
export * from "@/components/ui/alert-dialog"
export * from "@/components/ui/dialog"
export * from "@/components/ui/display-elements"
// Note: feedback-elements is now only exported directly, not through other files
export * from "@/components/ui/feedback-elements"
export * from "@/components/ui/modal-elements"
// Choose one Toaster implementation to export
export { Toaster as SonnerToaster } from "@/components/ui/sonner"
export * from "@/components/ui/toast"
export * from "@/components/ui/toaster"
export * from "@/hooks/use-toast"
