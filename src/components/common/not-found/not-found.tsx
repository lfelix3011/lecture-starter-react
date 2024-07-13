import styles from './not-found.module.css';

type Props = {
  message: string;
};

const NotFound = ({ message }: Props): JSX.Element => {
  return (
    <p className={styles.elementNotFound}>
       {message}
    </p>
  );
};

export { NotFound };
