'use client'

import { FC, HTMLAttributes } from 'react'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import Link from 'next/link'

type routesType = {
  href: string
  label: string
  active: boolean
}

export const MainNav: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname()
  const params = useParams()

  const routes: routesType[] = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    }
  ]
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
