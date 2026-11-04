
import {
  LayoutDashboard,
  Users,
  Package,
  ListTodo,
  ChartNoAxesCombined,
  Sparkles,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  name: string
  path: string
  icon: LucideIcon
  description: string
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    description: 'Business overview',
  },
  {
    name: 'Customers',
    path: '/customers',
    icon: Users,
    description: 'Customer management',
  },
  {
    name: 'Inventory',
    path: '/inventory',
    icon: Package,
    description: 'Products and stock',
  },
  {
    name: 'Employees & Tasks',
    path: '/tasks',
    icon: ListTodo,
    description: 'Task management',
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: ChartNoAxesCombined,
    description: 'Insights and reporting',
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: Sparkles,
    description: 'Intelligent assistance',
  },
]
