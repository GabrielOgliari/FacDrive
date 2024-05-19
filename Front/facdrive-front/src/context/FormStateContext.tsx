/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type FormStateContextProps = {
  setFormData: (key: string, value: any) => void
  getFormData: () => any
}

const FormStateContext = createContext<FormStateContextProps | null>(null)

export const FormStateProvider = ({ children }: PropsWithChildren) => {
  const [formState, setFormState] = useState({})

  const setFormData = (key: string, value: any) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }))
  }

  const getFormData = () => formState

  return (
    <FormStateContext.Provider value={{ setFormData, getFormData }}>
      {children}
    </FormStateContext.Provider>
  )
}

export function useFormStateContext() {
  const context = useContext(FormStateContext)
  if (!context) {
    throw new Error(
      'useFormStateContext must be used within a FormStateProvider',
    )
  }
  return context
}
