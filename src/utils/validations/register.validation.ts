import * as yup from "yup";

export const registerSchemaFirst = yup.object({
    username: yup.string()
        .matches(new RegExp('[a-zA-Z]+', 'g'), 'латинский алфавит')
        .matches(new RegExp('[0-9]+', 'g'), 'цифры')
        /* .matches(new RegExp(/^[^а-яё]+$/iu), 'латинский алфавит') */
        .required('Поле не может быть пустым'),
    password: yup.string()
        .matches(new RegExp('(?=.*[0-9])(?=.*[A-Z]){8,}', 'g'), 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
        .matches(new RegExp('(?=.*[A-Z])', 'g'), 'с заглавной буквой')
        .matches(new RegExp('(?=.*[0-9])', 'g'), 'и цифрой')
        .matches(new RegExp('(?=.*[0-9])(?=.*[A-Z])', 'g'), 'с заглавной буквой и цифрой')
        .min(8, 'не менее 8 символов')
})

export const registerSchemaSecond = yup.object({
    firstName: yup.string().required('Поле не может быть пустым'),
    lastName: yup.string().required('Поле не может быть пустым')
})

export const registerSchemaThird = yup.object({
    email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{1,}))$/i,'Введите корректный e-mail').min(4, 'Введите корректный e-mail').required('Поле не может быть пустым'),
    phone: yup.string().required('Поле не может быть пустым').matches(/^\+375 \((25|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/, 'В формате +375 (xx) xxx-xx-xx')
})
