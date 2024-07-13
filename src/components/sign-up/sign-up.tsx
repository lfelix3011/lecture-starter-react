import { Link, Navigate } from "react-router-dom";
import { AppPath } from "../../common/enums/enums";
import { SignUpForm } from "./sign-up-form.tsx";
import { SignUp as SignUpType } from "../../common/types/types";
import { useState } from "react";
import styles from './sign-up.module.css';

type Props = {
  onSignUp: (signUp: SignUpType) => void;
};

const SignUp = ({ onSignUp }: Props): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (signUpData: SignUpType) => {
    onSignUp(signUpData);
    setSubmitted(true);
  };

  if (submitted) {
    return <Navigate to={AppPath.ROOT} replace />;
  }

  return (
    <main className={styles.signUpPage}>
      <h1 className="visually-hidden">Travel App</h1>
      <SignUpForm onSubmit={handleSubmit}></SignUpForm>
      <span>
        Already have an account? {" "}
        <Link
          to={AppPath.SIGN_IN}
          data-test-id="auth-sign-in-link"
          className={styles.signUpForm__link}
        >
          Sign In
        </Link>
      </span>
    </main>
  );
};

export { SignUp };
