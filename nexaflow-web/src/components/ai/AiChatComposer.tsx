
import type {FormEvent,KeyboardEvent,} from 'react'
import ChatSuggestions from './ChatSuggestions'
import type { ChatMessage } from '../../types/aiAssistant'

interface AiChatComposerProps {
  messages: ChatMessage[]
  input: string
  sending: boolean
  error: string
  onInputChange: (value: string) => void
  onSend: (value: string) => void
}

export default function AiChatComposer({
  messages,
  input,
  sending,
  error,
  onInputChange,
  onSend,
}: AiChatComposerProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSend(input)
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      onSend(input)
    }
  }

  return (
    <div className="z-10 shrink-0 border-t border-slate-200 bg-white px-4 py-3">
      {error && (
        <p
          role="alert"
          className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {/* Suggested questions */}
      <div className="mb-2 flex min-w-0 items-center gap-3">
        <span className="hidden shrink-0 text-[11px] font-semibold text-slate-400 sm:block">
          SUGGESTED
        </span>

        <div className="min-w-0 flex-1 overflow-x-auto pb-1">
          <ChatSuggestions
            messages={messages}
            disabled={sending}
            onSelect={onSend}
          />
        </div>
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"
      >
        <textarea
          rows={1}
          value={input}
          maxLength={1000}
          disabled={sending}
          onChange={(event) =>
            onInputChange(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Message NexaFlow AI..."
          aria-label="Your message"
          className="min-h-[40px] max-h-24 min-w-0 flex-1 resize-y bg-transparent px-3 py-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="shrink-0 rounded-lg bg-indigo-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? 'Sending...' : 'Send →'}
        </button>
      </form>

      <p className="mt-2 text-center text-[10px] text-slate-400">
        Enter to send · Shift + Enter for a new line · AI can make mistakes
      </p>
    </div>
  )
}