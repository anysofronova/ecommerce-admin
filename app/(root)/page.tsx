'use client'

import { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [onOpen, isOpen])

  return (
    <div className="p-4 text-slate-500">
      <Modal
        title={'Hello'}
        description={'My dear Anna'}
        isOpen={isOpen}
        onClose={() => {}}
      />
    </div>
  )
}

export default SetupPage
