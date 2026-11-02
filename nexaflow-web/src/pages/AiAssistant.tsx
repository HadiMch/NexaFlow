
import { useState } from 'react'
import type { CSSProperties } from 'react'
import AiPageHeader from '../components/ai/AiPageHeader'
import AiChatToolbar from '../components/ai/AiChatToolbar'
import AiChatConversation from '../components/ai/AiChatConversation'
import AiChatComposer from '../components/ai/AiChatComposer'
import AiResizeHandles from '../components/ai/AiResizeHandles'
import { useAiChat } from '../hooks/ai/useAiChat'
import { useResizableChat } from '../hooks/ai/useResizableChat'
import '../styles/ai-chat-layout.css'

export default function AiAssistant() {
  const {
    messages,
    sending,
    error,
    sendMessage,
    clearChat,
  } = useAiChat()

  const {
    size,
    containerRef,
    startResize,
    adjustSize,
    resetSize,
  } = useResizableChat()

  const [input, setInput] = useState('')

  function handleSend(value: string) {
    if (sending || !value.trim()) return

    void sendMessage(value)
    setInput('')
  }

  function handleNewChat() {
    clearChat()
    setInput('')
  }

  const panelStyle = {
    '--chat-width': `${size.width}px`,
    '--chat-height': `${size.height}px`,
  } as CSSProperties

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <AiPageHeader
        onResetSize={resetSize}
        onNewChat={handleNewChat}
      />

      <div
        ref={containerRef}
        className="relative flex min-w-0 justify-center"
      >
        <section
          style={panelStyle}
          className="nexa-chat-panel relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
          aria-label="NexaFlow AI chat workspace"
        >
          <AiChatToolbar />

          <AiChatConversation
            messages={messages}
            sending={sending}
          />

          <AiChatComposer
            messages={messages}
            input={input}
            sending={sending}
            error={error}
            onInputChange={setInput}
            onSend={handleSend}
          />

          <AiResizeHandles
            onResizeStart={startResize}
            onAdjustSize={adjustSize}
          />
        </section>
      </div>

      <p className="hidden text-center text-xs text-slate-400 md:block">
        Drag the edges or bottom-right corner to resize your workspace.
      </p>
    </div>
  )
}
