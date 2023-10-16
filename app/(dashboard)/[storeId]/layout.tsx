import { ReactNode } from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({
  children,
  params
}: {
  children: ReactNode
  params: { storeId: string }
}) => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId }
  })

  if (!store) redirect('/')
  return (
    <>
      <div>This will be navbar</div>
      {children}
    </>
  )
}

export default DashboardLayout
