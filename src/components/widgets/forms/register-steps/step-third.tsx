import {yupResolver} from '@hookform/resolvers/yup';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {registerSchemaThird} from '../../../../utils/validations/register.validation';
import {Input} from '../../../common/input/input';
import styles from '../register/register-form.module.scss';
import {useThunkDispatch} from '../../../../hooks/redux/dispatchers';
import {RootState} from '../../../../store/store';
import {setThirdStepFields} from '../../../../store/slices/forms/register';
import {registration} from '../../../../store/slices/auth/async-actions';
import {ColoredError} from "./components/colored-error";
import {RegistrationRegExp} from "../../../../utils/validations/regex";

interface IFormRegister {
    phone: string;
    email: string;
}

export const RegisterThirdStep: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        getFieldState,
        control
    } = useForm<IFormRegister>({
        resolver: yupResolver(registerSchemaThird),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        mode: 'all',
    });

    const [phoneFocus, setPhoneFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [isTouchedPhone, setIsTouchedPhone] = useState(false);
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);

    const {regData} = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();

    const onSubmit: SubmitHandler<IFormRegister> = (data) => {
        dispatch(setThirdStepFields(data));
        thunkDispatch(registration({...regData, ...data}))
    };

    const toggleFocusPhone = () => {
        setPhoneFocus(prev => !prev);
        if (!isTouchedPhone) setIsTouchedPhone(true)
    }

    const toggleFocusEmail = () => {
        setEmailFocus(prev => !prev);
        if (!isTouchedEmail) setIsTouchedEmail(true)
    }


    useEffect(() => {
        watch();
    }, [watch]);

    console.log('phone: ', getFieldState('phone'), getValues('phone'), phoneFocus, isTouchedPhone)
    console.log('email: ', getFieldState('email'), getValues('email'), emailFocus, isTouchedEmail)

    return (
        <form data-test-id='register-form' className={styles.form}
              onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__field}>
                <Controller
                    control={control}
                    name='phone'
                    render={({
                                 field: {name, onBlur, onChange, ref, value},
                                 fieldState: {isTouched, error}
                             }) => (
                        <Input
                            inputedValue={value}
                            label='phone'
                            name='phone'
                            labelText='Номер телефона'
                            register={register('phone')}
                            required={true}
                            setFocus={toggleFocusPhone}
                            isFocus={phoneFocus}
                            ref={ref}
                            maskedOptions={{
                                keepCharPositions: true,
                                placeholderChar: 'x',
                                mask: [
                                    '+',
                                    '3',
                                    '7',
                                    '5',
                                    ' ',
                                    '(',
                                    /\d/,
                                    /\d/,
                                    ')',
                                    ' ',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                ],
                                onChange,
                                onBlur,
                            }}
                        />
                    )}
                />
                {((getValues('phone')?.match(RegistrationRegExp.PHONE) && getValues('phone')) || !isTouchedPhone) && <p data-test-id='hint' className={styles.form__prompt}>В формате +375 (xx) xxx-xx-xx</p>}
                {((isTouchedPhone && !getValues('phone') && !phoneFocus)) && <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
                {(!getValues('phone')?.match(RegistrationRegExp.PHONE) && isTouchedPhone && getValues('phone')) && <ColoredError text='В формате +375 (xx) xxx-xx-xx' dataTestId='hint'/>}
            </div>
            <div className={styles.form__field}>
                <Input
                    inputedValue={getValues('email')}
                    label='email'
                    name='email'
                    labelText='E-mail'
                    register={register('email')}
                    required={true}
                    setFocus={toggleFocusEmail}
                />
                {getValues('email') && getFieldState('email').error?.message === 'Введите корректный e-mail' && (
                    <ColoredError dataTestId='hint'
                                  text={getFieldState('email').error?.message || ''}/>
                )}
                {((isTouchedEmail && !getFieldState('email').error && !getValues('email') && !emailFocus) || getFieldState('email').error?.types?.required) && <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
            </div>
            <button
                disabled={getFieldState('phone').invalid || getFieldState('email').invalid || (isTouchedEmail && !getValues('email') || (isTouchedPhone) && !getValues('phone'))}
                type='submit'
                className={!(getFieldState('phone').invalid || getFieldState('email').invalid || (isTouchedEmail && !getValues('email') || (isTouchedPhone) && !getValues('phone'))) ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}
            >
                Зарегистрироваться
            </button>
        </form>
    );
};
