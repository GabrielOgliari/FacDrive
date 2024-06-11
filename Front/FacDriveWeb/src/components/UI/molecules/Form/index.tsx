import { FormHTMLAttributes, forwardRef, Ref } from 'react'
import * as S from './styles'
import { Button } from '../../atoms/Button'
import { useFormManagerContext } from '../../../../context/FormManagerContext'

type FormComponentProps = FormHTMLAttributes<HTMLFormElement> & {
  ref?: Ref<HTMLFormElement>
  showNextButton?: boolean
}

export const Form = forwardRef<HTMLFormElement, FormComponentProps>(
  ({ children, showNextButton = true, ...props }, ref) => {
    const formManager = useFormManagerContext()

    const firstForm = formManager.form === 0

    return (
      <S.Form ref={ref} {...props}>
        {children}

        <S.WrapperButtons>
          {showNextButton && <Button type="submit">Próximo</Button>}

          {!firstForm && <Button onClick={formManager.previous}>Voltar</Button>}
        </S.WrapperButtons>
      </S.Form>
    )
  },
)

Form.displayName = 'Form'
