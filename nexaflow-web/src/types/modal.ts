
import type { ReactNode } from 'react'
export type ModalSize = 'md' | 'lg' | 'xl'

export interface ModalProps {
  open: boolean
  title: string
  description?: string
  size?: ModalSize
  children: ReactNode
  onClose: () => void
  disableClose?: boolean
}

export interface ModalHeaderProps {
  title: string
  description?: string
  titleId: string
  descriptionId: string
  disableClose: boolean
  onClose: () => void
}
