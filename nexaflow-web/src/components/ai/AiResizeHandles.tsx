
import type {KeyboardEvent,PointerEvent,} from 'react'
import type { ResizeDirection } from '../../utils/ai/chatPanelSize'

interface AiResizeHandlesProps {
  onResizeStart: (
    direction: ResizeDirection,
    event: PointerEvent<HTMLButtonElement>
  ) => void

  onAdjustSize: (
    direction: ResizeDirection,
    amount: number
  ) => void
}

interface ResizeHandleConfig {
  direction: ResizeDirection
  label: string
  title: string
  className: string
}

const handles: ResizeHandleConfig[] = [
{
    direction: 'width',
    label: 'Resize chat width',
    title: 'Drag to resize width',
    className: 'nexa-resize-right',
  },
  {
    direction: 'height',
    label: 'Resize chat height',
    title: 'Drag to resize height',
    className: 'nexa-resize-bottom',
  },
  {
    direction: 'both',
    label: 'Resize chat width and height',
    title: 'Drag to resize both dimensions',
    className: 'nexa-resize-corner',
  },
]

export default function AiResizeHandles({
  onResizeStart,
  onAdjustSize,
}: AiResizeHandlesProps) {
  function handleKeyboard(
    direction: ResizeDirection,
    event: KeyboardEvent<HTMLButtonElement>
  ) {
    const adjustments: Record<
      string,
      { dimension: 'width' | 'height'; amount: number }
    > = {
      ArrowRight: { dimension: 'width', amount: 20 },
      ArrowLeft: { dimension: 'width', amount: -20 },
      ArrowDown: { dimension: 'height', amount: 20 },
      ArrowUp: { dimension: 'height', amount: -20 },
    }

    const adjustment = adjustments[event.key]

    if (!adjustment) return

    if (direction !== 'both' && direction !== adjustment.dimension) {
      return
    }

    event.preventDefault()
    onAdjustSize(adjustment.dimension,adjustment.amount)
  }

  return (
    <>
      {handles.map((handle) => (
        <button
          key={handle.direction}
          type="button"
          aria-label={handle.label}
          title={handle.title}
          className={`nexa-resize-handle ${handle.className}`}
          onPointerDown={(event) => onResizeStart(handle.direction, event)
          }
          onKeyDown={(event) =>
            handleKeyboard(handle.direction, event)
          }
        />
      ))}
    </>
  )
}