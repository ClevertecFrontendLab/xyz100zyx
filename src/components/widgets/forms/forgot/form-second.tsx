import {FC, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler} from "react-hook-form/dist/types";
import styles from "./forgot-form.module.scss";
import {Input} from "../../../common/input/input";
import {
    forgotSchemaSecond
} from "../../../../utils/validations/forgot.validation";
import {useThunkDispatch} from "../../../../hooks/redux/dispatchers";
import {ERROR_ALL_TEXT} from "../register-steps/utils/errors";
import {ColoredPasswordError} from "../register-steps/components/colored-error-password";
import {getRegisterPassErrorText} from "../register-steps/utils/helpers";
import {ColoredError} from "../register-steps/components/colored-error";
import {resetPassword} from "../../../../store/slices/auth/async-actions";

interface IFormForgotSecond {
    password: string,
    passwordConfirmation: string,
    code: string,
}

export const ForgotFormSecond: FC = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        getValues,
        formState
    } = useForm<IFormForgotSecond>({
        resolver: yupResolver(forgotSchemaSecond),
        mode: 'onChange',
    });

    const [passwordFocus, setPasswordFocus] = useState(false)
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false)
    const [isPasswordTouched, setPasswordTouched] = useState(false);
    const [isPasswordConfirmTouched, setPasswordConfirmTouched] = useState(false);
    const location = useLocation()
    const thunkDispatch = useThunkDispatch();
    const checkAvailableButton = (deps: boolean[]) => deps.every(dep => dep)

    const togglePasswordFocus = () => {
        setPasswordFocus(prev => !prev);
        if (!isPasswordTouched) {
            setPasswordTouched(true)
        }
    }

    const togglePasswordConfirmFocus = () => {
        setPasswordConfirmFocus(prev => !prev);
        if (!isPasswordConfirmTouched) {
            setPasswordConfirmTouched(true)
        }
    }

    const onSubmit: SubmitHandler<IFormForgotSecond> = (data) => {
        console.log('click')
        if (getValues('password') === getValues('passwordConfirmation')) {
            thunkDispatch(resetPassword({
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
                code: location.search.slice(6)
            }))
        }
    };

    useEffect(() => {
        watch();
    }, [watch]);

    console.log(passwordConfirmFocus, 'not in func')

    return (
        <>
            <p className={styles.title}>Восстановление пароля</p>
            <form data-test-id='reset-password-form' className={styles.form}
                  onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('password')}
                        labelText='Новый пароль'
                        label='password'
                        register={register('password')}
                        required={false}
                        isPass={true}
                        invalid={getFieldState('password').invalid}
                        setFocus={togglePasswordFocus}
                        isNeedCheck={true}
                        name='password'
                    />
                    {getValues('password') && !passwordFocus && getFieldState('password').isDirty && formState.errors.password?.message && (

                        <ColoredError dataTestId='hint' text={ERROR_ALL_TEXT}/>
                    )}
                    {getFieldState('password').isDirty &&
                        formState.errors.password?.message &&
                        passwordFocus &&
                        ColoredPasswordError(getRegisterPassErrorText(getValues('password')), true)}
                    {!formState.errors.password?.message && !(!passwordFocus && isPasswordTouched && !getValues('password')) && (
                        <p data-test-id='hint' className={styles.form__prompt}>{ERROR_ALL_TEXT}</p>
                    )}
                    {(!getFieldState('password').isDirty && formState.errors.password?.message) && (
                        <ColoredError dataTestId='hint' text='Поле не может быть пустым'/>
                    )}
                    {!passwordFocus && isPasswordTouched && !getValues('password') &&
                        <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
                </div>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('passwordConfirmation')}
                        labelText='Повторите пароль'
                        label='passwordConfirmation'
                        register={register('passwordConfirmation')}
                        required={false}
                        isPass={true}
                        invalid={getFieldState('passwordConfirmation').invalid}
                        setFocus={togglePasswordConfirmFocus}
                        isNeedCheck={false}
                        name='passwordConfirmation'
                    />
                    {getFieldState('passwordConfirmation').isDirty && !!getValues('passwordConfirmation') && !passwordConfirmFocus && getValues('passwordConfirmation') !== getValues('password') && (
                        <ColoredError dataTestId='hint' text='Пароли не совпадают'/>
                    )}
                    {getFieldState('passwordConfirmation').error && !passwordConfirmFocus && (
                        <ColoredError dataTestId='hint'
                                      text={getFieldState('passwordConfirmation').error!.message || ''}/>
                    )}
                    {!getFieldState('passwordConfirmation').error && !passwordConfirmFocus && isPasswordConfirmTouched && !getValues('passwordConfirmation') &&
                        <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
                </div>
                <button
                    type='submit'
                    className={checkAvailableButton([getValues('password') === getValues('passwordConfirmation'), !getFieldState('passwordConfirmation').error, !getFieldState('password').error]) || checkAvailableButton([passwordConfirmFocus, !getFieldState('password').error, Boolean(getValues('password'))]) ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}
                    disabled={(!passwordConfirmFocus && (!!getFieldState('passwordConfirmation').error || !!getFieldState('password').error || getValues('password') !== getValues('passwordConfirmation')))}
                >
                    Сохранить изменения
                </button>
                <p className={styles.form__text}>После сохранения войдите в библиотеку, используя
                    новый пароль</p>
            </form>
        </>
    )
}
