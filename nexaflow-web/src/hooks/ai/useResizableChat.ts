
import { useCallback, useEffect, useRef, useState } from 'react'

import type { PointerEvent as ReactPointerEvent } from 'react'

import {
  DEFAULT_CHAT_SIZE,
  constrainChatSize,
  loadChatSize,
  resizeChatSize,
  saveChatSize,
} from '../../utils/ai/chatPanelSize'

import type {
  ChatSize,
  ResizeDirection,
} from '../../utils/ai/chatPanelSize'

import { attachChatResizeEvents } from '../../utils/ai/chatResizeEvents'

export function useResizableChat() {
  const [size, setSize] = useState<ChatSize>(loadChatSize)

  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    saveChatSize(size)
  }, [size])

  useEffect(() => {
    return () => cleanupRef.current?.()
  }, [])

  const constrainSize = useCallback((next: ChatSize) => {
    const availableWidth =
      containerRef.current?.clientWidth ?? window.innerWidth

    return constrainChatSize(next, availableWidth)
  }, [])

  const startResize = useCallback(
    (
      direction: ResizeDirection,
      event: ReactPointerEvent<HTMLButtonElement>
    ) => {
      if (event.button !== 0) return

      event.preventDefault()
      cleanupRef.current?.()

      cleanupRef.current = attachChatResizeEvents({
        direction,
        startX: event.clientX,
        startY: event.clientY,
        initialSize: constrainSize(size),
        onResize: (next) => setSize(constrainSize(next)),
      })
    },
    [constrainSize, size]
  )

  const adjustSize = useCallback(
    (direction: ResizeDirection, amount: number) => {
      setSize((previous) =>
        constrainSize(
          resizeChatSize(previous, direction, amount, amount)
        )
      )
    },
    [constrainSize]
  )

  const resetSize = useCallback(() => {
    setSize({ ...DEFAULT_CHAT_SIZE })
  }, [])

  return {
    size,
    containerRef,
    startResize,
    adjustSize,
    resetSize,
  }
}
