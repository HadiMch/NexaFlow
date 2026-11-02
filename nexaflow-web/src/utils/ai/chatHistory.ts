
import type {
  ChatHistoryMessage,
  ChatMessage,
} from '../../types/aiAssistant'

const MAX_HISTORY_MESSAGES = 10
const MAX_MESSAGE_LENGTH = 2000

export function buildChatHistory(
  messages: ChatMessage[]
): ChatHistoryMessage[] {
  // Exclude the initial welcome message.
  return messages
    .slice(1)
    .slice(-MAX_HISTORY_MESSAGES)
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, MAX_MESSAGE_LENGTH),
    }))
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  }
}

export function createAssistantMessage(
  content: string,
  timestamp: string
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content,
    timestamp,
  }
}
