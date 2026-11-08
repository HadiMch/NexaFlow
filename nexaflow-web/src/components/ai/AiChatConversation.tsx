import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";
import ChatMessageBubble from "./ChatMessageBubble";
import type { ChatMessage } from "../../types/aiAssistant";

interface AiChatConversationProps {
  messages: ChatMessage[];
  sending: boolean;
}

export default function AiChatConversation({
  messages,
  sending,
}: AiChatConversationProps) {
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conversation = conversationRef.current;

    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [messages, sending]);

  return (
    <div
      ref={conversationRef}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
      aria-relevant="additions text"
      className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 px-4 py-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 sm:px-6"
    >
      {messages.length === 0 ? (
        <div className="flex min-h-full flex-col items-center justify-center px-3 py-8 text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/20">
            <Bot size={38} className="text-white" />

            <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-2xl border-4 border-white bg-violet-500 text-white dark:border-slate-900">
              <Sparkles size={16} />
            </span>
          </div>

          <span className="mb-3 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            Your AI Copilot
          </span>

          <h3 className="max-w-md text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            What can I help you with today?
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Explore ideas, solve problems, improve productivity, and get
            intelligent assistance for your business.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Business insights", "Productivity", "Problem solving"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}

      {sending && (
        <div
          role="status"
          aria-label="NexaFlow AI is generating a response"
          className="mx-auto mt-5 flex w-full max-w-4xl items-start gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
            <Bot size={19} />
          </div>

          <div className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div aria-hidden="true" className="flex items-center gap-1">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                />
              ))}
            </div>

            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              NexaFlow AI is thinking...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
