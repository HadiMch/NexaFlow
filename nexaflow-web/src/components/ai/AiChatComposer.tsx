import { useRef } from "react";
import type { FormEvent, KeyboardEvent, ChangeEvent } from "react";
import { ArrowUp, AlertCircle, Lightbulb } from "lucide-react";
import ChatSuggestions from "./ChatSuggestions";
import type { ChatMessage } from "../../types/aiAssistant";

interface AiChatComposerProps {
  messages: ChatMessage[];
  input: string;
  sending: boolean;
  error: string;
  onInputChange: (value: string) => void;
  onSend: (value: string) => void;
}

export default function AiChatComposer({
  messages,
  input,
  sending,
  error,
  onInputChange,
  onSend,
}: AiChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending || !input.trim()) return;

    onSend(input);
    resetTextareaHeight();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (sending || !input.trim()) return;

      onSend(input);
      resetTextareaHeight();
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;

    onInputChange(textarea.value);

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }

  function resetTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  return (
    <div className="z-10 shrink-0 border-t border-slate-200 bg-white px-4 pb-4 pt-3 dark:border-slate-700 dark:bg-slate-900 sm:px-5">
      {error && (
        <div
          role="alert"
          className="mb-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      <div className="mb-3 flex min-w-0 items-center gap-3">
        <div className="hidden shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 sm:flex">
          <Lightbulb size={14} />
          Suggested
        </div>

        <div className="nexa-suggestions-scroll min-w-0 flex-1 overflow-x-auto pb-1">
          <ChatSuggestions
            messages={messages}
            disabled={sending}
            onSelect={onSend}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="group flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition-all focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-indigo-500 dark:focus-within:bg-slate-800"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          maxLength={1000}
          disabled={sending}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask NexaFlow AI anything..."
          aria-label="Your message"
          className="min-h-11 max-h-40 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <button
          type="submit"
          disabled={sending || !input.trim()}
          aria-label={sending ? "Sending message" : "Send message"}
          title="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {sending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <ArrowUp size={20} strokeWidth={2.5} />
          )}
        </button>
      </form>

      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-400 dark:text-slate-500">
        <span>
          <kbd className="font-sans font-semibold">Enter</kbd> to send
        </span>

        <span className="hidden sm:inline">·</span>

        <span>
          <kbd className="font-sans font-semibold">Shift + Enter</kbd> for new
          line
        </span>

        <span className="hidden sm:inline">·</span>

        <span>AI can make mistakes</span>
      </div>
    </div>
  );
}
