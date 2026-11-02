
import { useCallback, useEffect, useRef, useState } from 'react'

import { aiAssistantService } from '../../services/aiAssistantService'

import { getAiChatErrorMessage } from '../../utils/ai/chatErrors'

import {
  createWelcomeMessage,
  loadChatMessages,
  saveChatMessages,
} from '../../utils/ai/chatStorage'

import {
  buildChatHistory,
  createUserMessage,
  createAssistantMessage,
} from '../../utils/ai/chatHistory'

import type { ChatMessage } from '../../types/aiAssistant'

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    loadChatMessages
  )

  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const requestVersion = useRef(0)
  const sendingRef = useRef(false)

  useEffect(() => {
    saveChatMessages(messages)
  }, [messages])

  const sendMessage = useCallback(
    async (value: string) => {
      const question = value.trim()

      if (!question || sendingRef.current) return

      sendingRef.current = true

      const version = ++requestVersion.current
      const history = buildChatHistory(messages)

      setMessages((previous) => [
        ...previous,
        createUserMessage(question),
      ])

      setSending(true)
      setError('')

      try {
        const response = await aiAssistantService.sendMessage(
          question,
          history
        )

        if (version !== requestVersion.current) return

        setMessages((previous) => [
          ...previous,
          createAssistantMessage(
            response.reply,
            response.generatedAt
          ),
        ])
      } catch (err) {
        if (version === requestVersion.current) {
          setError(getAiChatErrorMessage(err))
        }
      } finally {
        if (version === requestVersion.current) {
          sendingRef.current = false
          setSending(false)
        }
      }
    },
    [messages]
  )

  const clearChat = useCallback(() => {
    ++requestVersion.current

    sendingRef.current = false

    setMessages([createWelcomeMessage()])
    setSending(false)
    setError('')
  }, [])

  return {
    messages,
    sending,
    error,
    sendMessage,
    clearChat,
  }
}
