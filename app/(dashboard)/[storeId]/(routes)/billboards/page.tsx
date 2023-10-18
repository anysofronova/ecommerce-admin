import { FC } from 'react'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import { BillboardClient } from '@/components/billboard/billboard-client'
import { BillboardColumn } from '@/components/billboard/billboard-columns'

interface BillboardsPageProps {
  params: { storeId: string }
}
const BillboardsPage: FC<BillboardsPageProps> = async ({ params }) => {
  // const { userId } = auth()
  // if (!userId) redirect('/sign-in')

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!billboards) return <>No billboards</>

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, 'MMMM do, yyyyy')
    })
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
