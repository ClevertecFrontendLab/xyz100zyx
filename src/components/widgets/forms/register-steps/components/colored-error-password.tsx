import { ERROR_ALL, ERROR_CAPITAL, ERROR_CAPITAL_NUMBER, ERROR_LENGTH, ERROR_LENGTH_CAPITAL, ERROR_LENGTH_NUMBER, ERROR_NUMBER } from '../utils/errors';

import styles from './colored.module.scss';

export const ColoredPasswordError = (errorText: string, isInFocus: boolean) => {

    switch(errorText){
        case '':
            return <p data-test-id='hint' className={styles.prompt}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
            break;
        case ERROR_ALL:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span className={styles.prompt__error}>не менее 8 символов</span>, с <span className={styles.prompt__error}>заглавной буквой</span> и <span className={styles.prompt__error}>цифрой</span></p>
            break;
        case ERROR_LENGTH_CAPITAL:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span className={styles.prompt__error}>не менее 8 символов</span>, с <span className={styles.prompt__error}>заглавной буквой</span> и <span>цифрой</span></p>
            break;
        case ERROR_LENGTH_NUMBER:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span className={styles.prompt__error}>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span className={styles.prompt__error}>цифрой</span></p>
            break;
        case ERROR_CAPITAL_NUMBER:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span>не менее 8 символов</span>, с <span className={styles.prompt__error}>заглавной буквой</span> и <span className={styles.prompt__error}>цифрой</span></p>
            break;
        case ERROR_CAPITAL:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span>не менее 8 символов</span>, с <span className={styles.prompt__error}>заглавной буквой</span> и <span>цифрой</span></p>
            break;
        case ERROR_LENGTH:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span className={styles.prompt__error}>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span></p>
            break;
        case ERROR_NUMBER:
            return <p data-test-id='hint' className={styles.prompt}>Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span className={styles.prompt__error}>цифрой</span></p>
            break;
    }
    if(errorText && !isInFocus){
        return <p className={styles.prompt}><span data-test-id='hint' className={styles.prompt__error}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span></p>
    }
    return <p className={styles.prompt} />
}
