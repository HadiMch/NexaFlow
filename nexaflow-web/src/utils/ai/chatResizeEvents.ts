
import type {
  ChatSize,
  ResizeDirection,
} from './chatPanelSize'

import { resizeChatSize } from './chatPanelSize'

interface ResizeOptions {
  direction: ResizeDirection
  startX: number
  startY: number
  initialSize: ChatSize
  onResize: (size: ChatSize) => void
}

export function attachChatResizeEvents({
  direction,
  startX,
  startY,
  initialSize,
  onResize,
}: ResizeOptions): () => void {
  const previousUserSelect = document.body.style.userSelect

  function handleMove(event: PointerEvent) {
    const next = resizeChatSize(
      initialSize,
      direction,
      event.clientX - startX,
      event.clientY - startY
    )

    onResize(next)
  }

  function cleanup() {
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', cleanup)
    window.removeEventListener('pointercancel', cleanup)

    document.body.style.userSelect = previousUserSelect
  }

  document.body.style.userSelect = 'none'

  window.addEventListener('pointermove', handleMove)
  window.addEventListener('pointerup', cleanup)
  window.addEventListener('pointercancel', cleanup)

  return cleanup
}
