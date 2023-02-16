import { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './search.module.scss';
import searchIcon from '../../../assets/search-icon.svg';
import { ReactComponent as InputClose } from '../../../assets/input-close.svg';

interface IProps {
  placeholder: string;
  label?: string;
  mobileOpen?: boolean;
  setMobileOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<IProps> = ({ placeholder, label, mobileOpen, setMobileOpen }) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className={mobileOpen ? `${styles.search} ${styles.search__mob__open}` : styles.search}>
      <img
        data-test-id='button-search-open'
        role='presentation'
        className={mobileOpen ? styles.mobile_open : ''}
        onClick={() => setMobileOpen!(true)}
        src={searchIcon}
        alt='search icon'
      />
      {label && <label>{label}</label>}
      <input
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
        className={mobileOpen ? styles.search__close : styles.search__close_off}
      >
        <InputClose />
      </div>
    </div>
  );
};
