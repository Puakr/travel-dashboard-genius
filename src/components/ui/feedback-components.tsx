
/**
 * Feedback Components
 * Includes alerts, dialogs, toasts, and other feedback-related UI elements
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Export from alert directly
export * from "@/components/ui/alert"

// Instead of exporting from both alert-dialog and modal-elements,
// only export from one of them
// export * from "@/components/ui/alert-dialog"

// Only export from modal-elements to avoid conflicts
export * from "@/components/ui/modal-elements"

// Export directly from display-elements
export * from "@/components/ui/display-elements"

// Export directly from feedback-elements
export * from "@/components/ui/feedback-elements"

// Export toast components
export { Toaster as SonnerToaster } from "@/components/ui/sonner"
export * from "@/components/ui/toast"
export * from "@/components/ui/toaster"
export * from "@/hooks/use-toast"
