
/**
 * UI Navigation Components
 * 
 * This file contains all navigation-related components:
 * - Menus and navigation bars
 * - Sidebars and drawers
 * - Tabs and tab panels
 * - Dropdown menus
 * - Tooltips and context menus
 */

import * as React from "react"

// Re-export all navigation-related components
export * from "@/components/ui/dropdown-elements"
export * from "@/components/ui/menubar"
export * from "@/components/ui/navigation-elements"
export * from "@/components/ui/tabs"
export * from "@/components/ui/tooltip"
export * from "@/components/ui/sidebar"
export * from "@/components/ui/sheet" // Often used for mobile navigation
export {
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-controls"

// Re-export specific components to avoid conflicts
export { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from "@/components/ui/navigation-controls"
