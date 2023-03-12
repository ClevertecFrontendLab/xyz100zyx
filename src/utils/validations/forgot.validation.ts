import * as yup from "yup";
import {RegistrationRegExp} from "./regex";

export const forgotSchemaFirst = yup.object({
    email: yup.string().matches(RegistrationRegExp.EMAIL,'Введите корректный e-mail').min(4, 'Введите корректный e-mail').required('Поле не может быть пустым')
})

export const forgotSchemaSecond = yup.object({
    password: yup.string()
        .matches(RegistrationRegExp.PASSWORD_ALL, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL, 'с заглавной буквой')
        .matches(RegistrationRegExp.PASSWORD_NUMBER, 'и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL_NUMBER, 'с заглавной буквой и цифрой')
        .min(8, 'не менее 8 символов').required('Поле не может быть пустым'),
    passwordConfirmation: yup.string().required('Поле не может быть пустым')
})
