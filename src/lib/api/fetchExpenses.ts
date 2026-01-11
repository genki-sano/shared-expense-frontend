import { getApi } from '@/lib/api'

type FetchExpenseResponse = {
  payments: {
    id: number
    user_id: number
    date: string
    price: number
    category: string
    memo: string
  }[]
}

export const fetchExpenses = (date: Date): Promise<FetchExpenseResponse> => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1

  return getApi<FetchExpenseResponse>(`/api/payments?date=${y}-${String(m).padStart(2, '0')}`)
}
