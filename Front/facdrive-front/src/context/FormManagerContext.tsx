import { PropsWithChildren, createContext, useContext, useState } from 'react'

type FormManagerContextProps = {
  next: () => void
  previous: () => void
  form: number
}

export const formManagerContext = createContext({} as FormManagerContextProps)

export const FormManagerProvider = ({ children }: PropsWithChildren) => {
  const [form, setForm] = useState(0)

  const next = () => {
    setForm((prev) => {
      return prev + 1
    })
  }

  const previous = () => {
    setForm((prev) => {
      if (prev > 0) return prev - 1
      return prev
    })
  }

  return (
    <formManagerContext.Provider
      value={{
        next,
        previous,
        form,
      }}
    >
      {children}
    </formManagerContext.Provider>
  )
}

export const useFormManagerContext = () => {
  return useContext(formManagerContext)
}
