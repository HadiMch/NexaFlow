
import { useEffect, useRef } from 'react'

import ChatMessageBubble from './ChatMessageBubble'

import type { ChatMessage } from '../../types/aiAssistant'

interface AiChatConversationProps {
  messages: ChatMessage[]
  sending: boolean
}

export default function AiChatConversation({
  messages,
  sending,
}: AiChatConversationProps) {
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const conversation = conversationRef.current

    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight
    }
  }, [messages, sending])

  return (
    <div
      ref={conversationRef}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
      className="min-h-0 min-w-0 flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-slate-50 to-indigo-50/30 px-4 py-5 sm:px-6"
    >
      {messages.map((message) => (
        <ChatMessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {sending && (
        <div role="status" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
            N
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <span className="animate-pulse">
              NexaFlow AI is thinking...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
