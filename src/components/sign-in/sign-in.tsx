import { Link, Navigate } from "react-router-dom";
import { AppPath } from "../../common/enums/enums";
import { SignInForm } from "./sign-in-form";
import { useState } from "react";
import { SignIn as SignInType } from "../../common/types/types";
import styles from './sign-in.module.css'

type Props = {
  onSignIn: (signUp: SignInType) => void;
};

const SignIn = ({ onSignIn }: Props): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (signUpData: SignInType) => {
    onSignIn(signUpData);
    setSubmitted(true);
  };

  if (submitted) {
    return <Navigate to={AppPath.ROOT} replace />;
  }

  return (
    <main className={styles.signInPage}>
      <h1 className="visually-hidden">Travel App</h1>
     <SignInForm onSubmit={handleSubmit}></SignInForm>
      <span>
        Don't have an account? {' '}
        <Link
          to={AppPath.SIGN_UP}
          data-test-id="auth-sign-up-link"
          className={styles.signInForm__link}
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
};

export { SignIn };
