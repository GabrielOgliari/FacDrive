import { ReactNode } from 'react'

export type WrapperFieldProps = {
  children: ReactNode
  label: string
  errorMessage?: string
  helpText?: string
}
