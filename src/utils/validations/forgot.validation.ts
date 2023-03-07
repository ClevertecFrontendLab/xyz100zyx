import * as yup from "yup";

export const forgotSchemaFirst = yup.object({
    email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{1,}))$/i,'Введите корректный e-mail').min(4, 'Введите корректный e-mail').required('Поле не может быть пустым')
})

export const forgotSchemaSecond = yup.object({
    password: yup.string()
        .matches(new RegExp('(?=.*[0-9])(?=.*[А-ЯA-Z]){8,}', 'g'), 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
        .matches(new RegExp('(?=.*[А-ЯA-Z])', 'g'), 'с заглавной буквой')
        .matches(new RegExp('(?=.*[0-9])', 'g'), 'и цифрой')
        .matches(new RegExp('(?=.*[0-9])(?=.*[А-ЯA-Z])', 'g'), 'с заглавной буквой и цифрой')
        .min(8, 'не менее 8 символов').required('Поле не может быть пустым'),
    passwordConfirmation: yup.string().required('Поле не может быть пустым')
})
