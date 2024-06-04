import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, mixed, object } from 'yup'
import { Form } from '../../../../components/UI/molecules/Form'
import { Fields } from '../../../../components/UI/organisms/fields/root'
import validStudentCardService from '../../../../core/services/valid-student-card-service'
import { useFormManagerContext } from '../../../../context/FormManagerContext'
import { useFormStateContext } from '../../../../context/FormStateContext'
import { Button } from '../../../../components/UI/atoms/Button'
import { ValidStudentCardOutput } from '../../../../core/models/valid-student-card'
import { useState } from 'react'

const studentCardSchema = object({
  studentCard: mixed<File[]>().required(
    "Campo 'Carteira de Estudante' é obrigatório.",
  ),
})

type StudentCardData = InferType<typeof studentCardSchema>

export const StudentCardForm = () => {
  const [showNextButton, setShowNextButton] = useState(false)

  const formManager = useFormManagerContext()
  const { setFormData } = useFormStateContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StudentCardData>({
    resolver: yupResolver(studentCardSchema),
  })

  const validStudentCardMutation = useMutation({
    mutationKey: 'valid-student-card',
    mutationFn: (studentCard: File[]) =>
      validStudentCardService.valid(studentCard[0]),
    onSuccess: (data: ValidStudentCardOutput) => {
      const verified = data.status === 'Aluno Regular'
      setFormData('student-card', data)
      setShowNextButton(verified)
    },
  })

  const onSubmit = () => {
    formManager.next()
  }

  const handleValidateStudentCard = () => {
    validStudentCardMutation.mutateAsync(watch('studentCard'))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} showNextButton={showNextButton}>
      <Fields.Input
        label="Carteira de Estudante"
        errorMessage={errors.studentCard?.message}
        type="file"
        {...register('studentCard')}
      />

      <span style={{ color: 'red' }}>
        {validStudentCardMutation.data?.status}
      </span>

      <Button onClick={handleValidateStudentCard}>
        Validar Carteira de Estudante
      </Button>
    </Form>
  )
}
