'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ColumnDef } from '@tanstack/react-table'
import { useParams, useRouter } from 'next/navigation'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button
} from '@/components/ui'
import { AlertModal } from '@/components/modals/alert-modal'

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original
      const [open, setOpen] = useState<boolean>(false)
      const [loading, setLoading] = useState<boolean>(false)

      const router = useRouter()
      const params = useParams()

      const onCopy = () => {
        navigator.clipboard.writeText(id)
        toast.success('Billboard ID copied to the clipboard.')
      }
      const onDelete = async () => {
        try {
          setLoading(true)
          await axios.delete(`/api/${params.storeId}/billboards/${id}`)
          router.refresh()
          toast.success('Billboard has been deleted.')
        } catch (error) {
          toast.error(
            'Error deleting the billboard. Please try again. Make sure you have removed all categories using this billboard first.'
          )
        } finally {
          setLoading(false)
          setOpen(false)
        }
      }
      return (
        <>
          <AlertModal
            onConfirm={onDelete}
            loading={loading}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/${params.storeId}/billboards/${id}`)
                }
              >
                <Edit className="h-4 w-4 mr-2" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  }
]
