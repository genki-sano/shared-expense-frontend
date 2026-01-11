import { atom, useAtomValue } from 'jotai'
import { dateInfoAtom } from '@/app/expenses/[date]/_hooks/useDateInfo'
import { fetchExpenses } from '@/lib/api/fetchExpenses'

type Expense = {
  id: number
  user_id: number
  date: string
  price: number
  category: string
  memo: string
}

const expenseAtom = atom(async (get): Promise<Expense[]> => {
  const dateInfo = get(dateInfoAtom)
  if (!dateInfo) return []

  const res = await fetchExpenses(new Date(dateInfo.year, dateInfo.month - 1))
  return res.payments
})

const formatCurrency = (price: number) => new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price)

export const ExpensesList: React.FC = () => {
  const expenses: Expense[] = useAtomValue(expenseAtom)

  return (
    <ul className='divide-y divide-default px-2'>
      {expenses.map((expense) => (
        <li key={expense.id} className='py-3 sm:py-4'>
          <div className='flex items-center mx-2 gap-2 sm:mx-4 sm:gap-4'>
            <div className='relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full'>
              <svg
                className='absolute w-12 h-12 text-body-subtle -left-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'></path>
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-base'>{expense.memo || 'No data'}</p>
              <p className='text-sm text-body'>{expense.date}</p>
            </div>
            <div className='text-lg font-medium text-brand'>{formatCurrency(expense.price)}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}
