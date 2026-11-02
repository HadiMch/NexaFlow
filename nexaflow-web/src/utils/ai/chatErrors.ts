
import axios from 'axios'

export function getAiChatErrorMessage(
  error: unknown
): string {
  if (!axios.isAxiosError(error)) {
    return 'Something unexpected happened. Please try again.'
  }

  const status = error.response?.status

  if (status === 400) {
    return 'Your message could not be processed. Please check it.'
  }

  if (status === 401 || status === 403) {
    return 'You are not authorized to use the AI Assistant.'
  }

  if (status === 429) {
    return (
      'Too many AI requests. Please wait a moment ' +
      'before sending another message.'
    )
  }

  if (status === 502) {
    return 'The AI provider returned an invalid response. Please retry.'
  }

  if (status === 503) {
    return 'The AI service is temporarily unavailable.'
  }

  if (status === 504 || error.code === 'ECONNABORTED') {
    return 'The AI request timed out. Please try again.'
  }

  if (!error.response) {
    return 'Cannot connect to the server. Check your connection and API.'
  }

  if (status !== undefined && status >= 500) {
    return 'A server error occurred. Please try again later.'
  }

  return 'Unable to get an AI response. Please try again.'
}
