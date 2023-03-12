import * as yup from "yup";

export const loginSchema = yup.object({
    identifier: yup.string().required('Поле не может быть пустым'),
    password: yup.string().required('Поле не может быть пустым')
})
