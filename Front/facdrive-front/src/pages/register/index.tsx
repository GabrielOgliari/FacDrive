import { useFormManagerContext } from '../../context/FormManagerContext'
import { AddressForm } from './forms/address'
import { StudentCardForm } from './forms/student-card'
import { UserForm } from './forms/user'
import { VehicleForm } from './forms/vehicle'
import * as S from './styles'

const forms = [UserForm, AddressForm, StudentCardForm, VehicleForm]

export const Register = () => {
  const formManager = useFormManagerContext()

  const Form = forms[formManager.form]

  return (
    <S.Container>
      <S.TopWrapper></S.TopWrapper>

      <S.FormWrapper>
        <Form />
      </S.FormWrapper>
    </S.Container>
  )
}
