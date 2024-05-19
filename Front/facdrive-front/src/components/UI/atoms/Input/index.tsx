import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import * as S from './styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <S.Input ref={ref} {...props} />
})

Input.displayName = 'Input'
