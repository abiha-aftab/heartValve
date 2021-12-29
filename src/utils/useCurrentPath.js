import { useEffect, useState } from 'react'

// Reads the browser path after hydration. Reading window.location during
// render made the server and client markup disagree.
export const useCurrentPath = () => {
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(window.location.pathname)
  }, [])
  return path
}
