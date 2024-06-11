import { useState } from 'react';

type useFormProps<T> = {
  validations?: {
    [K in keyof T]?: (value: T[K] | undefined) => string | undefined;
  };
};

export const useForm = <T extends Record<string, any>>({
  validations,
}: useFormProps<T>) => {
  const [formState, setFormState] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const applyValidations = (): boolean => {
    setHasSubmitted(true);

    if (!validations) return true;

    const newErrors: { [K in keyof T]?: string } = {};
    let isValid = true;

    for (const name in validations) {
      const value = formState[name] as T[Extract<keyof T, string>] | undefined;
      const validator = validations[name];
      const error = validator ? validator(value) : undefined;

      if (error) {
        newErrors[name] = error;
        isValid = false;
      } else {
        newErrors[name] = undefined;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const register = (name: keyof T) => {
    const onChange = (value: T[Extract<keyof T, string>]) => {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    };

    return {
      onChange,
      value: formState[name],
      error: errors[name],
      hasSubmitted,
    };
  };

  const watch = (name: keyof T) => {
    return formState[name];
  };

  const setState = (fieldName: keyof T, value: T[keyof T]) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  return { register, watch, applyValidations, setState };
};
