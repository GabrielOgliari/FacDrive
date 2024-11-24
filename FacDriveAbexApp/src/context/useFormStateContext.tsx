import React, { ReactNode, createContext, useContext, useState } from 'react';

type FormStateProps = {
    setObject: (key: string, object: any) => void;
    getObject: <T>(key: string) => T;
};

const FormStateContext = createContext({} as FormStateProps);

export const FormStateProvider = ({ children }: { children: ReactNode }) => {
    const [formValues, setFormValues] = useState<Record<string, any>>({});

    const setObject = (key: string, object: any) => {
        setFormValues(prev => ({
            ...prev,
            [key]: object,
        }));
    };

    const getObject = <T,>(key: string): T => {
        return formValues[key] as T;
    };

    return <FormStateContext.Provider value={{ setObject, getObject }}>{children}</FormStateContext.Provider>;
};

export const useFormStateContext = () => {
    const context = useContext(FormStateContext);
    if (!context) throw new Error('useFormStateContext must be used within a FormStateProvider');
    return context;
};
