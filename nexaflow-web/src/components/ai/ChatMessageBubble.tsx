import { useEffect, useRef, useState } from "react";
import { Bot, UserRound, Copy, Check, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "../../styles/ai-markdown.css";
import type { ChatMessage } from "../../types/aiAssistant";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

type CopyState = "idle" | "copied" | "error";

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeout.current !== null) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (copyTimeout.current !== null) {
      clearTimeout(copyTimeout.current);
    }

    copyTimeout.current = setTimeout(() => {
      setCopyState("idle");
    }, 2000);
  }

  return (
    <article
      className={`group flex w-full min-w-0 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex min-w-0 max-w-[96%] flex-col gap-2 ${
          isUser ? "items-end sm:max-w-[78%]" : "items-start sm:max-w-[90%]"
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          {!isUser && (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/20">
              <Bot size={17} />
            </div>
          )}

          {isUser && (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <UserRound size={15} />
            </div>
          )}

          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {isUser ? "You" : "NexaFlow AI"}
          </span>
        </div>

        <div
          className={`min-w-0 max-w-full rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm sm:px-5 sm:py-4 ${
            isUser
              ? "rounded-tr-md bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-indigo-500/10"
              : "rounded-tl-md border border-slate-200/80 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
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

        <div className="flex items-center gap-2 px-1">
          <time className="text-[11px] text-slate-400 dark:text-slate-500">
            {time}
          </time>

          {!isUser && (
            <button
              type="button"
              onClick={() => void handleCopy()}
              aria-label="Copy AI response"
              title="Copy AI response"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-300"
            >
              {copyState === "copied" ? (
                <>
                  <Check size={13} />
                  Copied
                </>
              ) : copyState === "error" ? (
                <>
                  <AlertCircle size={13} />
                  Copy failed
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
