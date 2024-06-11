import { ButtonHTMLAttributes, forwardRef, Ref } from 'react'
import * as S from './styles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <S.Button ref={ref} type="button" {...props} />
  },
)

Button.displayName = 'Button'
