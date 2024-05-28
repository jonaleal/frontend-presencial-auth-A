export interface FormData extends Record<string, any> {
    cc: string,
    idType: string,
    firstname: string,
    lastname: string,
    password: string,
    mail: string,
    country: string,
    province: string,
    city: string,
    residence: string,
    phone: string
    birthdate: string,
    confirmPassword?: string,
    username?: string,
    gender?: string,
}
