export interface Register {
  user: {
    name: string
    surname: string
    phone: string
    dateOfBirth: string
    userType: string
    verified: boolean
  }
  address: {
    addressType: string
    cep: string
    street: string
    neighborhood: string
    city: string
    state: string
    number: string
    complement: string
    referencePoint: string
    country: string
  }
  vehicle: {
    vehicle: string
    plate: string
    color: string
    manufacturingYear: string
    modelYear: string
    city: string
    state: string
  }
}
