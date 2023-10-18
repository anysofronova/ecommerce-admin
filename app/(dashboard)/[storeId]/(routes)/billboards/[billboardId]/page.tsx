import { FC } from 'react'
import prismadb from '@/lib/prismadb'

import { BillboardForm } from '@/components/billboard-form'

interface BillboadPageProps {
  params: { billboardId: string }
}

const BillboadPage: FC<BillboadPageProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboadPage
