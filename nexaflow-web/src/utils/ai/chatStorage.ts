
import type { ChatMessage } from '../../types/aiAssistant'

const STORAGE_KEY = 'nexaflow-ai-chat-v1'

export function createWelcomeMessage(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content:
      "Hello! I'm NexaFlow AI. I can help with business analysis, " +
      'programming, writing, problem-solving, and general questions. ' +
      'Choose a suggestion below or ask me anything!',
    timestamp: new Date().toISOString(),
  }
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (value === null || typeof value !== 'object') {
    return false
  }

  return (
    'id' in value &&
    typeof value.id === 'string' &&
    'role' in value &&
    (value.role === 'user' || value.role === 'assistant') &&
    'content' in value &&
    typeof value.content === 'string' &&
    'timestamp' in value &&
    typeof value.timestamp === 'string'
  )
}

export function loadChatMessages(): ChatMessage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return [createWelcomeMessage()]

    const parsed: unknown = JSON.parse(saved)

    if (Array.isArray(parsed) && parsed.every(isChatMessage)) {
      return parsed.length > 0
        ? parsed
        : [createWelcomeMessage()]
    }
  } catch {
    // Start a fresh chat when saved data is unavailable.
  }

  return [createWelcomeMessage()]
}

export function saveChatMessages(
  messages: ChatMessage[]
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    )
  } catch {
    // Keep the chat working without browser storage.
  }
}
