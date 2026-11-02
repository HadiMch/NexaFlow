
import api from './api'

import type {
  AiChatRequest,
  AiChatResponse,
  ChatHistoryMessage,
} from '../types/aiAssistant'

export const aiAssistantService = {
  sendMessage: async (
    message: string,
    history: ChatHistoryMessage[] = []
  ): Promise<AiChatResponse> => {
    const request: AiChatRequest = {
      message,
      history,
    }

    const response = await api.post<AiChatResponse>(
      '/ai-assistant/chat',
      request
    )

    return response.data
  },
}
