const appKey = 'WONGAMES'

export const getStorageItem = (key: string) => {
  if (typeof window === undefined) return

  const data = window.localStorage.getItem(`${appKey}_${key}`)

  if (data) return JSON.parse(data)
}

export const setStorageItem = (key: string, value: string[]) => {
  if (typeof window === undefined) return

  window.localStorage.setItem(`${appKey}_${key}`, JSON.stringify(value))
}
