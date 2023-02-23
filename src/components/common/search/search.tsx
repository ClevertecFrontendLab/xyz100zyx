import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './search.module.scss';
import { ReactComponent as InputClose } from '../../../assets/input-close.svg';
import { RootState } from '../../../store/store';
import { changeInputValue } from '../../../store/slices/filter/filter-slice';

interface IProps {
  placeholder: string;
  label?: string;
  mobileOpen?: boolean;
  setMobileOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<IProps> = ({ placeholder, label, mobileOpen, setMobileOpen }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.filter.inputValue);

  const onFocus = () => {
    inputRef.current?.focus();
    console.log(inputRef.current === document.activeElement)
  };

  const onBlur = () => {
    inputRef.current?.blur();
  };

  const onChange = (value: string) => {
    dispatch(changeInputValue(value));
  }

  return (
    <div className={mobileOpen ? `${styles.search} ${styles.search__mob__open}` : styles.search}>
      <div
        data-test-id='button-search-open'
        role='presentation'
        className={mobileOpen ? styles.mobile_open : ''}
        onClick={() => setMobileOpen!(true)}
      />
      {label && <label>{label}</label>}
      <input
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        data-test-id='input-search'
        className={mobileOpen ? styles.input__mob__open : ''}
        placeholder={placeholder}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      <div
        data-test-id='button-search-close'
        role='presentation'
        onClick={() => setMobileOpen!(false)}
        className={
          mobileOpen || inputRef.current === document.activeElement ? styles.search__close : styles.search__close_off
        }
      >
        <InputClose />
      </div>
    </div>
  );
};
