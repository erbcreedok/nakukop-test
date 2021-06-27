import { RefObject, useEffect } from 'react'

function useClickOutside(ref: RefObject<unknown>, callback: (event: Event) => void): void {
  useEffect(() => {
    function handleClickOutside(event: Event): void {
      const element = ref.current as HTMLElement
      const target = event.target as HTMLElement
      if (ref && element && !element.contains(target)) {
        callback(event)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export default useClickOutside
