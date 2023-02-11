import { FC } from 'react';
import styles from './terms.module.scss';
import dataTerms from './data/terms.json';

interface IProps {
  type: string;
}
export const Terms: FC<IProps> = ({ type }) => (
  <div className={styles.terms}>
    <h3>{type === 'terms' ? `Правила пользования` : 'Договор оферты'}</h3>
    <ul className={styles.terms__list}>
      <p className={styles.terms__title}>{dataTerms['1'].title}</p>
      <ul className={styles.terms__sublist}>
        <p className={styles.terms__subtitle}>{dataTerms['1']['1.1'].title}</p>
        <p className={styles.terms__subtitle}>{dataTerms['1']['1.2'].title}</p>
        <p className={styles.terms__subtitle}>{dataTerms['1']['1.3'].title}</p>
        <p className={styles.terms__subtitle}>{dataTerms['1']['1.4'].title}</p>
      </ul>
      <p className={styles.terms__title}>{dataTerms['2'].title}</p>
      <ul className={styles.terms__sublist}>
        <p className={styles.terms__subtitle}>{dataTerms['2']['2.1'].title}</p>
        <ul className={styles.terms__sublist}>
          <p className={styles.terms__subtitle}>{dataTerms['2']['2.1']['2.1.1'].title}</p>
          <p className={styles.terms__subtitle}>{dataTerms['2']['2.1']['2.1.2'].title}</p>
        </ul>
        <p className={styles.terms__subtitle}>{dataTerms['2']['2.2'].title}</p>
      </ul>
      <p className={styles.terms__title}>{dataTerms['3'].title}</p>
      <ul className={styles.terms__sublist}>
        <p className={styles.terms__subtitle}>{dataTerms['3']['3.1'].title}</p>
        <ul className={styles.terms__sublist}>
          <p className={styles.terms__subtitle}>{dataTerms['3']['3.1']['3.1.1'].title}</p>
          <p className={styles.terms__subtitle}>{dataTerms['3']['3.1']['3.1.2'].title}</p>
        </ul>
        <p className={styles.terms__subtitle}>{dataTerms['3']['3.2'].title}</p>
        <p className={styles.terms__subtitle}>{dataTerms['3']['3.3'].title}</p>
        <ul className={styles.terms__sublist}>
          <p className={styles.terms__subtitle}>{dataTerms['3']['3.3']['3.3.1'].title}</p>
          <ul className={styles.terms__sublist}>
            <p className={styles.terms__subtitle}>{dataTerms['3']['3.3']['3.3.1']['3.3.1.1'].title}</p>
            <p className={styles.terms__subtitle}>{dataTerms['3']['3.3']['3.3.1']['3.3.1.2'].title}</p>
          </ul>
        </ul>
        <p className={styles.terms__subtitle}>{dataTerms['3']['3.4'].title}</p>
      </ul>
    </ul>
  </div>
);
