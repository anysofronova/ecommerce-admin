'use client'

import { FC, useState, useEffect } from 'react'
import { Button, Modal } from '@/components/ui'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      isOpen={isOpen}
      title="Are you sure?"
      description="This action cannot be undone."
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button onClick={onClose} variant="outline" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="destructive" disabled={loading}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
