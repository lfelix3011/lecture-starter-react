import styles from './footer.module.css'
import heartImg from '../../../assets/images/heart.svg';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__text}>
        © 2024, from
        <a className={styles.footer__link} href="https://binary-studio.com" target="_blank">
          binary studio
        </a>
        with
        <img className={styles.footer__icon} src={heartImg} alt="heart" />
      </span>
    </footer>
  );
};

export { Footer };
