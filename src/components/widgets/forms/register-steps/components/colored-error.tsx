import {FC} from 'react';
import styles from "./colored.module.scss";

interface IProps {
    text: string;
}

export const ColoredError: FC<IProps> = ({text}) => (
    <p className={styles.prompt}><span className={styles.prompt__error}>{text}</span></p>
)
