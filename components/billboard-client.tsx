'use client'

import { FC, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ApiAlert, Button, Heading, Separator } from '@/components/ui'
import axios from 'axios'
import Image from 'next/image'

export const BillboardClient: FC = () => {
  const params = useParams()
  const router = useRouter()

  const [billboards, setBillboads] = useState([])
  useEffect(() => {
    axios
      .get(`/api/${params.storeId}/billboards`)
      .then((res) => setBillboads(res.data))
  }, [])
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="my-4" />
      {billboards.map((billboard: any) => (
        <div key={billboard.id}>
          {billboard?.label}
          <Image
            src={billboard.imageUrl}
            alt="Photo"
            width={100}
            height={100}
          />
        </div>
      ))}
      <Separator className="my-4" />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.billboardId}`}
        variant="public"
      />
    </>
  )
}
