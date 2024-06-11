import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InferType, date, number, object, string } from 'yup'
import { Form } from '../../../../components/UI/molecules/Form'
import { Fields } from '../../../../components/UI/organisms/fields/root'
import { useFormManagerContext } from '../../../../context/FormManagerContext'
import { useFormStateContext } from '../../../../context/FormStateContext'

const userSchema = object({
  name: string().required("Campo 'Nome' é obrigatório."),
  surname: string().required("Campo 'Sobrenome' é obrigatório."),
  phone: number().required("Campo 'Telefone' é obrigatório."),
  dateOfBirth: date().required("Campo 'Data de Aniversário' é obrigatório."),
  userType: string().required("Campo 'Tipo de Usuário' é obrigatório."),
})

type UserData = InferType<typeof userSchema>

export const UserForm = () => {
  const formManager = useFormManagerContext()
  const { setFormData } = useFormStateContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) })

  const onSubmit = (data: UserData) => {
    setFormData('user', data)
    formManager.next()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fields.Input
        label="Nome"
        errorMessage={errors.name?.message}
        {...register('name')}
      />

      <Fields.Input
        label="Sobrenome"
        errorMessage={errors.surname?.message}
        {...register('surname')}
      />

      <Fields.Input
        label="Telefone"
        errorMessage={errors.phone?.message}
        {...register('phone')}
      />

      <Fields.Input
        label="Data de Aniversário"
        errorMessage={errors.dateOfBirth?.message}
        {...register('dateOfBirth')}
      />

      <Fields.Input
        label="Tipo De Usuário"
        errorMessage={errors.userType?.message}
        {...register('userType')}
      />
    </Form>
  )
}
