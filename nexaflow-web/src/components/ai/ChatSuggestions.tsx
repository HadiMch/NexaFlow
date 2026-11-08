import { useMemo } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ChatMessage } from "../../types/aiAssistant";

interface ChatSuggestionsProps {
  messages: ChatMessage[];
  disabled: boolean;
  onSelect: (question: string) => void;
}

const initialQuestions = [
  "What can you help me with?",
  "Analyze my business performance.",
  "What is my task completion rate?",
  "How can I improve my inventory?",
  "Explain dependency injection.",
  "Help me write a professional email.",
];

const businessQuestions = [
  "What should I improve first?",
  "What risks should I focus on?",
  "How can I improve business productivity?",
  "Summarize my business performance.",
];

const programmingQuestions = [
  "Can you explain that with an example?",
  "What are the best practices?",
  "Can you show me sample code?",
];

const generalQuestions = [
  "Can you explain that in simpler terms?",
  "Give me a practical example.",
  "What should I do next?",
];

export default function ChatSuggestions({
  messages,
  disabled,
  onSelect,
}: ChatSuggestionsProps) {
  const suggestions = useMemo(() => {
    const recentQuestion = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!recentQuestion) {
      return initialQuestions;
    }

    const question = recentQuestion.content.toLowerCase();

    if (/customer|inventory|product|stock|task|business|sales/.test(question)) {
      return businessQuestions;
    }

    if (
      /code|programming|flutter|react|typescript|javascript|c#/.test(question)
    ) {
      return programmingQuestions;
    }

    return generalQuestions;
  }, [messages]);

  return (
    <div className="nexa-suggestions flex w-max flex-nowrap items-center gap-2">
      {suggestions.map((question, index) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="group/suggestion inline-flex shrink-0 items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-2 text-xs font-medium text-indigo-700 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-100 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/20"
        >
          {index === 0 ? (
            <Sparkles size={13} className="shrink-0" />
          ) : (
            <ArrowUpRight
              size={13}
              className="shrink-0 opacity-70 transition-transform group-hover/suggestion:-translate-y-0.5 group-hover/suggestion:translate-x-0.5"
            />
          )}

          <span>{question}</span>
        </button>
      ))}
    </div>
  );
}
