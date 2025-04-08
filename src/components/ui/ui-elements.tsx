
/**
 * Base UI Elements
 * 
 * This file contains all fundamental UI components:
 * - Buttons and core interactive elements
 * - Base typography components
 * - Core containers and structure elements
 * - Essential display components
 */

import * as React from "react"

// Re-export base components
export * from "@/components/ui/button"
export * from "@/components/ui/tooltip"
export * from "@/components/ui/accordion"
export * from "@/components/ui/display-elements" // Contains Badge, Separator, etc.
export * from "@/components/ui/dropdown-elements"

// We don't re-export Avatar here to avoid conflicts with media-elements
