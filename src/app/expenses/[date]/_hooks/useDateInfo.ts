import { atom, useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'

type DateInfo = {
  year: number
  month: number
  formatted: string // YYYY-MM
}
export const dateInfoAtom = atom<DateInfo | null>(null)

export const useDateInfo = (date?: string | string[]): DateInfo | null => {
  const dateParam = Array.isArray(date) ? date[0] : date
  const dateInfo = useMemo(() => parseDateParam(dateParam), [dateParam])

  const setDateInfo = useSetAtom(dateInfoAtom)

  useEffect(() => {
    setDateInfo(dateInfo)
  }, [dateInfo, setDateInfo])

  return dateInfo
}

const parseDateParam = (raw: string | undefined): DateInfo | null => {
  if (!raw) return null
  if (!/^\d{6}$/.test(raw)) return null

  const year = Number(raw.slice(0, 4))
  const month = Number(raw.slice(4, 6))
  if (month < 1 || month > 12) return null

  return {
    year,
    month,
    formatted: `${year}-${String(month).padStart(2, '0')}`,
  }
}
