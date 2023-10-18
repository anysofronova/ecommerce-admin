'use client'

import { FC } from 'react'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import {
  BillboardColumn,
  columns
} from '@/components/billboard/billboard-columns'
import { DataTable } from '@/components/billboard/billboard-table'
import { Button, Heading, Separator, ApiList } from '@/components/ui'

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  // const origin = UseOrigin()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Billboads" />
      <Separator className="my-4" />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}
