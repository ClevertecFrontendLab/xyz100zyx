import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';
import { ReactComponent as SearchIcon } from '../../../assets/search-icon.svg';
import searchIconActive from '../../../assets/search-icon-active.svg';
import { ReactComponent as InputClose } from '../../../assets/input-close.svg';

interface IProps {
  placeholder: string;
  label?: string;
  mobileOpen?: boolean;
  setMobileOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<IProps> = ({ placeholder, label, mobileOpen, setMobileOpen }) => {
  const [value, setValue] = useState<string>('');
  const [isInFocus, setInFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    inputRef.current?.focus();
    console.log(inputRef.current === document.activeElement)
    setInFocus(true)
  };

  const onBlur = () => {
    inputRef.current?.blur();
    setInFocus(false)
  };

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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
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
