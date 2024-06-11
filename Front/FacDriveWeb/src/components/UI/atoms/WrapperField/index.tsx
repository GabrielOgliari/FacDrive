import { WrapperFieldProps } from '../../../../types/wrapper-field'
import * as S from './styles'

export const WrapperField = ({
  children,
  label,
  errorMessage,
  helpText,
}: WrapperFieldProps) => {
  return (
    <S.WrapperField>
      <S.Label>{label}</S.Label>
      {children}

      {helpText && <S.HelpText>{helpText}</S.HelpText>}
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.WrapperField>
  )
}
