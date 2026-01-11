'use client'

import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import { ExpensesList } from '@/app/expenses/[date]/_components/ExpensesList'
import { useDateInfo } from '@/app/expenses/[date]/_hooks/useDateInfo'

const formatTitle = (dateInfo: ReturnType<typeof useDateInfo>) => {
  if (!dateInfo) return 'Invalid date'
  return dateInfo.formatted
}

const ExpensesPage: NextPage = () => {
  const params = useParams<{ date?: string | string[] }>()

  const dateInfo = useDateInfo(params.date)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='mx-auto max-w-2xl'>
        <header className='flex flex-col justify-center bg-brand-soft'>
          <div className='flex justify-center py-2 sm:py-4'>
            <h1 className='text-xl font-semibold text-brand-strong'>{formatTitle(dateInfo)}</h1>
          </div>
          <div className='flex py-4 px-2'>
            <div className='flex-1 flex flex-col items-center'>User1</div>
            <div className='flex-1 flex flex-col items-center'>User2</div>
          </div>
        </header>
        <main className='w-full gap-4'>
          <section>
            <ExpensesList />
          </section>
        </main>
      </div>
    </Suspense>
  )
}

export default ExpensesPage
