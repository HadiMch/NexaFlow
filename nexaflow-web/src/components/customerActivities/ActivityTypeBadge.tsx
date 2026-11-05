
import {Mail,MessageSquareText,Phone,UsersRound,} from 'lucide-react'
import type { CustomerActivityType } from '../../types/customerActivity'
import Badge from '../ui/Badge'

interface ActivityTypeBadgeProps {type: CustomerActivityType}

const typeConfig = {
  Call: {
    icon: Phone,
    variant: 'primary',
  },
  Email: {
    icon: Mail,
    variant: 'neutral',
  },
  Meeting: {
    icon: UsersRound,
    variant: 'success',
  },
  Note: {
    icon: MessageSquareText,
    variant: 'warning',
  },
} as const

export default function ActivityTypeBadge({
  type,
}: ActivityTypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <Badge variant={config.variant}>
      <Icon size={13} aria-hidden="true" />
      {type}
    </Badge>
  )
}