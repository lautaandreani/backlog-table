import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type TypographyProps = PropsWithChildren<{}>

export function TypographyH1({ children, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', props.className)} {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0', className)} {...props}>
      {children}
    </h2>
  )
}

export function TypographyP({ children, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('leading-7', props.className)} {...props}>
      {children}
    </p>
  )
}
