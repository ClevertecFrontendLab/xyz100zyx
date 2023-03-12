import {FC} from 'react';
import styles from "./colored.module.scss";

interface IProps {
    text: string;
    dataTestId?: string
}

export const ColoredError: FC<IProps> = ({text, dataTestId}) => (
    <p className={styles.prompt}><span data-test-id={dataTestId}
                                       className={styles.prompt__error}>{text}</span></p>
)
