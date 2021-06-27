function setAsyncInterval(callback: () => Promise<void>, ms: number): () => void {
  let timeout: NodeJS.Timeout
  function start(): NodeJS.Timeout {
    return setTimeout(() => {
      callback().finally(() => {
        clearTimeout(timeout)
        timeout = start()
      })
    }, ms)
  }
  timeout = start()
  return () => {
    clearTimeout(timeout)
  }
}

export default setAsyncInterval
