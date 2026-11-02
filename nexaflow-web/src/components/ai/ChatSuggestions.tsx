
import { useMemo } from 'react'
import type { ChatMessage } from '../../types/aiAssistant'

interface ChatSuggestionsProps {
  messages: ChatMessage[]
  disabled: boolean
  onSelect: (question: string) => void
}

const initialQuestions = [
  'What can you help me with?',
  'Analyze my business performance.',
  'What is my task completion rate?',
  'How can I improve my inventory?',
  'Explain dependency injection.',
  'Help me write a professional email.',
]

const businessQuestions = [
  'What should I improve first?',
  'What risks should I focus on?',
  'How can I improve business productivity?',
  'Summarize my business performance.',
]

const programmingQuestions = [
  'Can you explain that with an example?',
  'What are the best practices?',
  'Can you show me sample code?',
]

const generalQuestions = [
  'Can you explain that in simpler terms?',
  'Give me a practical example.',
  'What should I do next?',
]

function ChatSuggestions({
  messages,
  disabled,
  onSelect,
}: ChatSuggestionsProps) {
  const suggestions = useMemo(() => {
    const recentQuestion = [...messages]
      .reverse()
      .find((message) => message.role === 'user')

    if (!recentQuestion) {
      return initialQuestions
    }

    const question = recentQuestion.content.toLowerCase()

    if (
      /customer|inventory|product|stock|task|business|sales/.test(
        question
      )
    ) {
      return businessQuestions
    }

    if (
      /code|programming|flutter|react|typescript|javascript|c#/.test(
        question
      )
    ) {
      return programmingQuestions
    }

    return generalQuestions
  }, [messages])

  return (
    <div className="nexa-suggestions flex w-max flex-nowrap gap-2">
      {suggestions.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {question}
        </button>
      ))}
    </div>
  )
}

export default ChatSuggestions
