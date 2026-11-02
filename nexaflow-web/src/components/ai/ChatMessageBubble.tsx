
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import '../../styles/ai-markdown.css'
import type { ChatMessage } from '../../types/aiAssistant'

interface ChatMessageBubbleProps {message: ChatMessage}

function ChatMessageBubble({message,}: ChatMessageBubbleProps) {
  const isUser = message.role === 'user'
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeout.current !== null) {
        clearTimeout(copyTimeout.current)
      }
    }
  }, [])

  const time = new Date(message.timestamp).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    if (copyTimeout.current !== null) {
      clearTimeout(copyTimeout.current)
    }

    copyTimeout.current = setTimeout(() => {
      setCopyState('idle')
    }, 2000)
  }

  return (
    <div
      className={`group flex w-full min-w-0 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex min-w-0 max-w-[94%] flex-col gap-2 ${
          isUser
            ? 'items-end sm:max-w-[78%]'
            : 'items-start sm:max-w-[88%]'
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          {!isUser && (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm">
              N
            </div>
          )}

          <span className="text-xs font-semibold text-slate-600">
            {isUser ? 'You' : 'NexaFlow AI'}
          </span>
        </div>

        <div
          className={`min-w-0 max-w-full rounded-2xl px-4 py-3 shadow-sm sm:px-5 sm:py-4 ${
            isUser
              ? 'rounded-tr-md bg-indigo-600 text-white'
              : 'rounded-tl-md border border-slate-200/80 bg-white text-slate-700'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-7">
              {message.content}
            </p>
          ) : (
            <div className="nexa-markdown min-w-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                skipHtml
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 px-1">
          <span className="text-[11px] text-slate-400">
            {time}
          </span>

          {!isUser && (
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-slate-200 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-500"
              aria-label="Copy AI response"
              title="Copy AI response"
            >
              {copyState === 'copied'
                ? '✓ Copied'
                : copyState === 'error'
                  ? 'Copy failed'
                  : '⧉ Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessageBubble