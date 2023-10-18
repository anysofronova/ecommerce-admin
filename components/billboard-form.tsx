'use client'

import * as z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FC, useState } from 'react'
import { Trash } from 'lucide-react'
import { Billboard } from '@prisma/client'
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
  ApiAlert,
  ImageUpload
} from '@/components/ui'
import { AlertModal } from '@/components/modals/alert-modal'
import { UseOrigin } from '@/hooks/use-origin'

interface BillboardFormProps {
  initialData: Billboard | null
}

type BillboardFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

export const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const description = initialData
    ? 'Modify an existing billboard.'
    : 'Add a new billboard.'
  const toastMessage = initialData
    ? 'Billboard has been updated.'
    : 'Billboard has been created.'
  const toastErrorMessage = 'An error occurred. Please try again.'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', imageUrl: '' }
  })

  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      if (initialData)
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        )
      else await axios.post(`/api/${params.storeId}/billboards`, data)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error(toastErrorMessage)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      )
      router.refresh()
      router.push('/')
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
    </>
  )
}
