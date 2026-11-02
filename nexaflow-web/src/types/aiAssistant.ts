
export interface ChatHistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AiChatRequest {
  message: string
  history: ChatHistoryMessage[]
}

export interface AiChatResponse {
  reply: string
  source: string
  generatedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
