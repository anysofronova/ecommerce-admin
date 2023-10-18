'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Billboard } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

// import { UseOrigin } from '@/hooks'
import { Button, Heading, Separator } from '@/components/ui'
import {
  BillboardColumn,
  columns
} from '@/components/billboard/billboard-columns'
import { DataTable } from '@/components/billboard/billboard-table'

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
      {/* {data.map((billboard: any) => (
        <div key={billboard.id}>
          {billboard?.label}
          <Image
            src={billboard.imageUrl}
            alt="Photo"
            width={100}
            height={100}
          />
        </div>
      ))} */}
      <Separator className="my-4" />

      {/* <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.billboardId}`}
        variant="public"
      /> */}
    </>
  )
}
