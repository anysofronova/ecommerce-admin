'use client'

import { FC } from 'react'
import { useParams } from 'next/navigation'

import { UseOrigin } from '@/hooks'
import { ApiAlert } from '@/components/ui'

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams()
  const origin = UseOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`
  return (
    <>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  )
}
