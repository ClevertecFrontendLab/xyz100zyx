import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { ReactComponent as OpenEyeSvg } from '../../../assets/eye-open.svg';
import { ReactComponent as ClosedEyeSvg } from '../../../assets/eye-closed.svg';
import styles from './input.module.scss';
import { RootState } from '../../../store/store';
import successPasswordSvg from '../../../assets/success-pass.svg';

interface IProps {
  isPass?: boolean;
  label: string;
  register: any;
  required: boolean;
  labelText: string;
  inputedValue: string;
  invalid?: boolean;
  setFocus?: Dispatch<SetStateAction<boolean>>;
  maskedOptions?: MaskedInputProps;
  ref?: React.LegacyRef<MaskedInput>;
  isFocus?: boolean;
  isNeedCheck?: boolean
}

export const Input: FC<IProps> = ({
  isPass,
  label,
  register,
  required,
  labelText,
  inputedValue,
  invalid,
  setFocus,
  maskedOptions,
  ref,
  isFocus,
    isNeedCheck
}) => {
  const [isHiddenPassword, setHiddenPassword] = useState(true);
  const { error } = useSelector((state: RootState) => state.auth);
  const isDirtyField = () => Boolean(inputedValue?.toString().length);
  const path = useLocation().pathname.slice(1);

  const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHiddenPassword(!isHiddenPassword);
  };

  const onFocusHandler = () => {
    if (setFocus) {
      setFocus(true);
    }
  };

  const onBlurHandler = () => {
    if (setFocus) {
      setFocus(false);
    }
  };

  return (
    <div className={!error && !invalid ? styles.wrapper : `${styles.wrapper} ${styles.wrapper__error}`}>
      <label htmlFor={label} className={isDirtyField() ? `${styles.label} ${styles.label__dirty}` : styles.label}>
        {labelText}
      </label>
      {!maskedOptions ? (
        <input
          type={isPass && isHiddenPassword ? 'password' : 'text'}
          id={label}
          className={styles.input}
          {...register}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      ) : (
        <MaskedInput
          id={label}
          className={styles.input}
          {...register}
          {...maskedOptions}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      )}
      {isPass && !invalid && inputedValue && (path === 'register' || isNeedCheck) && (
        <img src={successPasswordSvg} className={styles.wrapper__success} alt='Success password validation' />
      )}
      {isPass ? (
        <button type='button' className={styles.wrapper__toggle} onClick={(e) => onToggleClick(e)}>
          {isHiddenPassword ? <ClosedEyeSvg /> : <OpenEyeSvg />}
        </button>
      ) : null}
    </div>
  );
};
