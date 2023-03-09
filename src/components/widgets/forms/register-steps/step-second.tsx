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
    firstName: string;
    lastName: string;
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
        mode: 'onBlur',
    });

    const [nameFocus, setNameFocus] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);
    const [isTouchedFirstName, setTouchedFirstName] = useState<boolean>(false)
    const [isTouchedLastName, setTouchedLastName] = useState<boolean>(false)
    const dispatch = useDispatch()

    const onFirstNameFocusToggle = () => {
        setNameFocus(prev => !prev)
        if (!isTouchedFirstName) {
            setTouchedFirstName(true)
        }
    }

    const onLastNameFocusToggle = () => {
        setSurnameFocus(prev => !prev)
        if (!isTouchedLastName) {
            setTouchedLastName(true)
        }
    }

    const onSubmit: SubmitHandler<IFormRegister> = (data) => {
        setStep(3)
        dispatch(setSecondStepFields(data))
    };

    useEffect(() => {
        watch()
    }, [watch])

    console.log(isTouchedFirstName, getValues('firstName'), nameFocus)


    return (
        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__field}>
                <Input inputedValue={getValues('firstName')} labelText='Имя'
                       label='firstName' register={register('firstName')}
                       required={true}
                       invalid={getFieldState('firstName').invalid}
                       setFocus={onFirstNameFocusToggle}
                       name='firstName'
                />
                {/* <p className={styles.form__prompt}>{formState.errors.name && LightText(formState.errors.name?.message || '', 'Поле не может быть пустым', '', true)}</p> */}
                {formState.errors.firstName &&
                    <ColoredError dataTestId='hint' text={formState.errors.firstName.message || ''}/>}
                {!nameFocus && !getValues('firstName') && isTouchedFirstName && <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
            </div>
            <div className={styles.form__field}>
                <Input inputedValue={getValues('lastName')} labelText='Фамилия' label='lastName'
                       register={register('lastName')}
                       required={false}
                       invalid={getFieldState('lastName').invalid}
                       setFocus={onLastNameFocusToggle}
                        name='lastName'
                />
                {formState.errors.lastName &&
                    <ColoredError dataTestId='hint' text={formState.errors.lastName.message || ''}/>}
                {!surnameFocus && !getValues('lastName') && isTouchedLastName && <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
            </div>
            {step === 3 ?
                <input type="submit" className={styles.form__submit} value='ЗАРЕГИСТРИРОВАТЬСЯ'/> :
                <button disabled={!formState.isValid} type='submit'
                        className={formState.isValid ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}>Последний
                    шаг</button>}
        </form>
    )
}
