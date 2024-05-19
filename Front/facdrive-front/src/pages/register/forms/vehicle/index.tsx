import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, object, string } from 'yup'
import { Form } from '../../../../components/UI/molecules/Form'
import { Fields } from '../../../../components/UI/organisms/fields/root'
import { useFormStateContext } from '../../../../context/FormStateContext'
import { Register } from '../../../../core/models/register'
import { VehicleOutput } from '../../../../core/models/vehicle'
import registerService from '../../../../core/services/register-service'
import vehicleService from '../../../../core/services/vehicle-service'

const vehicleSchema = object({
  plate: string().required("Campo 'Placa' é obrigatório."),
  color: string().required("Campo 'Cor' é obrigatório."),
  manufacturingYear: string().required("Campo 'Ano Fabricação' é obrigatório."),
  modelYear: string().required("Campo 'Ano Modelo' é obrigatório."),
  city: string().required("Campo 'Cidade' é obrigatório."),
  state: string().required("Campo 'Estado' é obrigatório."),
})

type VehicleData = InferType<typeof vehicleSchema>

export const VehicleForm = () => {
  const { setFormData, getFormData } = useFormStateContext()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vehicleSchema) })

  const vehicleByPlateMutation = useMutation({
    mutationKey: ['vehicle', watch('plate')],
    mutationFn: (plate: string) => vehicleService.vehicleByPlate(plate),
    onSuccess: (data: VehicleOutput) => {
      setValue('color', data.color)
      setValue('manufacturingYear', data.manufacturingYear)
      setValue('modelYear', data.modelYear)
      setValue('city', data.city)
      setValue('state', data.state)
    },
  })

  const saveRegisterMutation = useMutation({
    mutationKey: 'register',
    mutationFn: (data: Register) => registerService.save(data),
  })

  const onSubmit = (data: VehicleData) => {
    setFormData('vehicle', data)
  }

  useEffect(() => {
    const formData = getFormData()

    if (formData.vehicle) {
      saveRegisterMutation.mutateAsync(formData)
    }
  }, [getFormData])

  useEffect(() => {
    const isCompletePlate = String(watch('plate')).length === 7

    if (isCompletePlate) {
      vehicleByPlateMutation.mutateAsync(watch('plate'))
    }
  }, [watch('plate')])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fields.Input
        label="Placa"
        errorMessage={errors.plate?.message}
        {...register('plate')}
      />

      <Fields.Input
        label="Cor"
        errorMessage={errors.color?.message}
        {...register('color')}
      />

      <Fields.Input
        label="Ano Fabricação"
        errorMessage={errors.manufacturingYear?.message}
        {...register('manufacturingYear')}
      />

      <Fields.Input
        label="Ano Modelo"
        errorMessage={errors.modelYear?.message}
        {...register('modelYear')}
      />

      <Fields.Input
        label="Município"
        errorMessage={errors.city?.message}
        {...register('city')}
      />

      <Fields.Input
        label="Estado"
        errorMessage={errors.state?.message}
        {...register('state')}
      />
    </Form>
  )
}
