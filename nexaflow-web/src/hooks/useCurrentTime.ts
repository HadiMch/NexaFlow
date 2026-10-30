
import { useEffect, useState } from 'react'

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<number | null>(null)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(Date.now())
    }

    const initialUpdate = setTimeout(updateTime, 0)
    const interval = setInterval(updateTime, 60_000)

    return () => {
      clearTimeout(initialUpdate)
      clearInterval(interval)
    }
  }, [])

  return currentTime
}
