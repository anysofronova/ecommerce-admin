'use client'

import { useEffect, useState } from 'react'

import { useStoreModal } from '@/hooks'

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [onOpen, isOpen])

  return <div className="p-4">Root page</div>
}

export default SetupPage
