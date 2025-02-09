import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="DelPuma Logo"
      width={255}
      height={55}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[12.375rem] w-full h-[55px]', className)}
      src="/Delpuma2025WhiteLogo.svg"
    />
  )
}
