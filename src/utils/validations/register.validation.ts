import * as yup from "yup";
import {RegistrationRegExp} from "./regex";

export const registerSchemaFirst = yup.object({
    username: yup.string()
        .matches(RegistrationRegExp.USERNAME_ALPHABET, 'латинский алфавит')
        .matches(RegistrationRegExp.USERNAME_NUMBERS, 'цифры')
        /* .matches(new RegExp(/^[^а-яё]+$/iu), 'латинский алфавит') */
        .required('Поле не может быть пустым'),
    password: yup.string()
        .matches(RegistrationRegExp.PASSWORD_ALL, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL, 'с заглавной буквой')
        .matches(RegistrationRegExp.PASSWORD_NUMBER, 'и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL_NUMBER, 'с заглавной буквой и цифрой')
        .min(8, 'не менее 8 символов')
})

export const registerSchemaSecond = yup.object({
    firstName: yup.string().required('Поле не может быть пустым'),
    lastName: yup.string().required('Поле не может быть пустым')
})

export const registerSchemaThird = yup.object({
    email: yup.string().required('Поле не может быть пустым').matches(RegistrationRegExp.EMAIL,'Введите корректный e-mail').min(4, 'Введите корректный e-mail'),
    phone: yup.string().required('Поле не может быть пустым').matches(RegistrationRegExp.PHONE, 'В формате +375 (xx) xxx-xx-xx')
})
