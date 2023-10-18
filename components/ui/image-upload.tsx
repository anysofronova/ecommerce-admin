'use client'

import Image from 'next/image'
import { ImagePlusIcon, Trash } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui'

interface ImageUploadProps {
  disabled?: boolean
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

export const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
  onRemove
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const onUpload = (res: any) => {
    onChange(res.info.secure_url)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="w-[200px] h-[200px] relative rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                size="icon"
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="hrpajdfp" onUpload={onUpload}>
        {({ open }) => {
          const handleOnClick = (e: any) => {
            e.preventDefault()
            open()
          }
          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={handleOnClick}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
