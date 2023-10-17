'use client'

import * as z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FC, useState } from 'react'
import { Trash } from 'lucide-react'
import { Store } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'

import {
  Button,
  Form,
  FormField,
  FormItem,
  Heading,
  Separator,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  ApiAlert
} from '@/components/ui'
import { AlertModal } from '@/components/modals/alert-modal'
import { UseOrigin } from '@/hooks/use-origin'

interface SettinsFormProps {
  initialData: Store
}

type SettinsFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  name: z.string().min(1)
})

export const SettinsForm: FC<SettinsFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const origin = UseOrigin()

  const form = useForm<SettinsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: SettinsFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success('The store has been updated.')
    } catch (error) {
      toast.error('Error updating the store. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('The store has been deleted.')
    } catch (error) {
      toast.error(
        'Error deleting the store. Please try again. Make sure you have removed all products and categories first.'
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
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  )
}
