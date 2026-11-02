
export type ResizeDirection = 'width' | 'height' | 'both'

export interface ChatSize {
  width: number
  height: number
}

const STORAGE_KEY = 'nexaflow-ai-panel-size-v2'

export const DEFAULT_CHAT_SIZE: ChatSize = {
  width: 1100,
  height: 850,
}

const MIN_WIDTH = 460
const MIN_HEIGHT = 580
const MAX_HEIGHT = 1400

export function constrainChatSize(
  size: ChatSize,
  availableWidth: number
): ChatSize {
  const maxWidth = Math.max(1, availableWidth)
  const minWidth = Math.min(MIN_WIDTH, maxWidth)

  return {
    width: Math.max(
      minWidth,
      Math.min(maxWidth, size.width)
    ),
    height: Math.max(
      MIN_HEIGHT,
      Math.min(MAX_HEIGHT, size.height)
    ),
  }
}

export function loadChatSize(): ChatSize {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return { ...DEFAULT_CHAT_SIZE }

    const parsed: unknown = JSON.parse(saved)

    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      'width' in parsed &&
      'height' in parsed &&
      typeof parsed.width === 'number' &&
      typeof parsed.height === 'number' &&
      Number.isFinite(parsed.width) &&
      Number.isFinite(parsed.height)
    ) {
      return {
        width: Math.max(MIN_WIDTH, parsed.width),
        height: Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, parsed.height)
        ),
      }
    }
  } catch {
    // Restore defaults if browser storage is unavailable.
  }

  return { ...DEFAULT_CHAT_SIZE }
}

export function saveChatSize(size: ChatSize): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(size)
    )
  } catch {
    // Resizing continues even without local storage.
  }
}

export function resizeChatSize(
  current: ChatSize,
  direction: ResizeDirection,
  deltaX: number,
  deltaY: number
): ChatSize {
  return {
    width:
      direction === 'height'
        ? current.width
        : current.width + deltaX,
    height:
      direction === 'width'
        ? current.height
        : current.height + deltaY,
  }
}
