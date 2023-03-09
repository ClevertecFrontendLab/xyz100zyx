import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {registerSchemaSecond} from "../../../../utils/validations/register.validation";
import styles from "../register/register-form.module.scss";
import {Input} from "../../../common/input/input";
import {LightText} from "../../../common/light-text/light-text";
import {setSecondStepFields} from '../../../../store/slices/forms/register';
import {ColoredError} from "./components/colored-error";

interface IFormRegister {
    name: string;
    surname: string;
}

interface IProps {
    step: number,
    setStep: Dispatch<SetStateAction<number>>
}

export const RegisterSecondStep: FC<IProps> = ({step, setStep}) => {
    const {
        register,
        handleSubmit,
        formState,
        watch,
        getValues,
        getFieldState
    } = useForm<IFormRegister>({
        resolver: yupResolver(registerSchemaSecond, {abortEarly: false}),
        mode: 'onChange',
    });

    const [nameFocus, setNameFocus] = useState(true);
    const [surnameFocus, setSurnameFocus] = useState(true);
    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<IFormRegister> = (data) => {
        setStep(3)
        dispatch(setSecondStepFields(data))
    };

    useEffect(() => {
        watch()
    }, [watch])


    return (
        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__field}>
                <Input inputedValue={getValues('name')} labelText='Имя'
                       label='name' register={register('name')}
                       required={false}
                       invalid={getFieldState('name').invalid}
                       setFocus={setNameFocus}
                       name='firstName'
                />
                {/* <p className={styles.form__prompt}>{formState.errors.name && LightText(formState.errors.name?.message || '', 'Поле не может быть пустым', '', true)}</p> */}
                {formState.errors.name &&
                    <ColoredError dataTestId='hint' text={formState.errors.name.message || ''}/>}
            </div>
            <div className={styles.form__field}>
                <Input inputedValue={getValues('surname')} labelText='Фамилия' label='surname'
                       register={register('surname')}
                       required={false}
                       invalid={getFieldState('surname').invalid}
                       setFocus={setSurnameFocus}
                        name='lastName'
                />
                {formState.errors.surname &&
                    <ColoredError dataTestId='hint' text={formState.errors.surname.message || ''}/>}
            </div>
            {step === 3 ?
                <input type="submit" className={styles.form__submit} value='ЗАРЕГИСТРИРОВАТЬСЯ'/> :
                <button disabled={!formState.isValid} type='submit'
                        className={formState.isValid ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}>Последний
                    шаг</button>}
        </form>
    )
}
