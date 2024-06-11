import { forwardRef } from 'react'
import { WrapperFieldProps } from '../../../../types/wrapper-field'
import { Input, InputProps } from '../../atoms/Input'
import { WrapperField } from '../../atoms/WrapperField'

type InputFieldProps = InputProps & Omit<WrapperFieldProps, 'children'>

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    return (
      <WrapperField
        label={props.label}
        errorMessage={props.errorMessage}
        helpText={props.helpText}
      >
        <Input
          placeholder={props.placeholder ?? props.label}
          ref={ref}
          {...props}
        />
      </WrapperField>
    )
  },
)

InputField.displayName = 'InputField'
