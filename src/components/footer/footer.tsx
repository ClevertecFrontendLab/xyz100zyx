import { FC } from 'react';
import styles from './footer.module.scss';
import iconFacebook from '../../assets/social-facebook.svg';
import iconInsta from '../../assets/social-insta.svg';
import iconVk from '../../assets/social-vk.svg';
import iconLink from '../../assets/social-link.svg';

export const Footer: FC = () => (
  <div className={styles.footer}>
    <div className={styles.footer__inner}>
      <span>© 2020-2023 Cleverland. Все права защищены.</span>
      <ul className={styles.footer__socials}>
        <li className={styles.footer__social}>
          <a href='#'>
            <img src={iconFacebook} alt='social facebook' />
          </a>
        </li>
        <li className={styles.footer__social}>
          <a href='#'>
            <img src={iconInsta} alt='social instagram' />
          </a>
        </li>
        <li className={styles.footer__social}>
          <a href='#'>
            <img src={iconVk} alt='social vk' />
          </a>
        </li>
        <li className={styles.footer__social}>
          <a href='#'>
            <img src={iconLink} alt='social linkedIn' />
          </a>
        </li>
      </ul>
    </div>
  </div>
);
