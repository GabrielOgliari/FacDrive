import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, number, object, string } from 'yup'
import { Form } from '../../../../components/UI/molecules/Form'
import { Fields } from '../../../../components/UI/organisms/fields/root'
import { useFormManagerContext } from '../../../../context/FormManagerContext'
import { useFormStateContext } from '../../../../context/FormStateContext'
import { Address } from '../../../../core/models/address'
import addressService from '../../../../core/services/address-service'

const addressSchema = object({
  cep: number().required("Campo 'CEP' é obrigatório."),
  street: string().required("Campo 'Logradouro' é obrigatório."),
  neighborhood: string().required("Campo 'Bairro' é obrigatório."),
  city: string().required("Campo 'Cidade' é obrigatório."),
  state: string().required("Campo 'Estado' é obrigatório."),
  number: string().required("Campo 'Número' é obrigatório."),
  complement: string().required("Campo 'Complemento' é obrigatório."),
  referencePoint: string().required(
    "Campo 'Ponto de Referência' é obrigatório.",
  ),
  country: string().required("Campo 'País' é obrigatório."),
})

type AddressData = InferType<typeof addressSchema>

export const AddressForm = () => {
  const formManager = useFormManagerContext()
  const { setFormData } = useFormStateContext()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addressSchema) })

  const getAddressByCepMutation = useMutation(
    (cep: number) => addressService.getAddressByCep(cep),
    {
      onSuccess: (data: Address) => {
        setValue('street', data.street)
        setValue('neighborhood', data.neighborhood)
        setValue('city', data.city)
        setValue('state', data.state)
      },
    },
  )

  const onSubmit = (data: AddressData) => {
    setFormData('address', data)
    formManager.next()
  }

  useEffect(() => {
    const isCompleteCep = String(watch('cep')).length === 8

    if (isCompleteCep) {
      getAddressByCepMutation.mutateAsync(watch('cep'))
    }
  }, [watch('cep')])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fields.Input
        label="CEP"
        errorMessage={errors.cep?.message}
        {...register('cep')}
      />

      <Fields.Input
        label="Logradouro"
        errorMessage={errors.street?.message}
        {...register('street')}
      />

      <Fields.Input
        label="Bairro"
        errorMessage={errors.neighborhood?.message}
        {...register('neighborhood')}
      />

      <Fields.Input
        label="Cidade"
        errorMessage={errors.city?.message}
        {...register('city')}
      />

      <Fields.Input
        label="Estado"
        errorMessage={errors.state?.message}
        {...register('state')}
      />

      <Fields.Input
        label="Número"
        errorMessage={errors.number?.message}
        {...register('number')}
      />

      <Fields.Input
        label="Complemento"
        errorMessage={errors.complement?.message}
        {...register('complement')}
      />

      <Fields.Input
        label="Ponto de Referência"
        errorMessage={errors.referencePoint?.message}
        {...register('referencePoint')}
      />

      <Fields.Input
        label="País"
        errorMessage={errors.country?.message}
        {...register('country')}
      />
    </Form>
  )
}
