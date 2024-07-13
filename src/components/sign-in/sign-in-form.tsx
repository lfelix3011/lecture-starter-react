import { ChangeEvent, FormEvent, useState } from "react";
import {
  isStringNullOrEmpty,
  isValidEmail,
} from "../../common/helpers/utilities";
import { SignIn } from "../../common/types/types";
import styles from './sign-in.module.css'

type Props = {
  onSubmit: (SignIn: SignIn) => void;
};

const SignInForm = ({ onSubmit }: Props): JSX.Element => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (_event: ChangeEvent<HTMLInputElement>) => {
    const value: string = _event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const validateEmail = (emailOnChange: string): void => {
    if (isStringNullOrEmpty(emailOnChange)) {
      setEmailError("Email is required");
      return;
    }

    if (!isValidEmail(emailOnChange)) {
      setEmailError("Email must be valid structure: example@domain.comn");
      return;
    }

    setEmailError("");
    return;
  };

  const isEmailValidToSubmit = (): boolean => {
    return isStringNullOrEmpty(emailError);
  };

  const handlePasswordChange = (_event: ChangeEvent<HTMLInputElement>) => {
    const value: string = _event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const validatePassword = (passwordOnChange: string): void => {
    if (isStringNullOrEmpty(passwordOnChange)) {
      setPasswordError("Password is required");
      return;
    }

    if (passwordOnChange.length < 3 || passwordOnChange.length > 20) {
      setPasswordError("Password must be between 3 and 20 characters");
      return;
    }

    setPasswordError("");
  };
  const isPasswordValidToSubmit = (): boolean => {
    return isStringNullOrEmpty(passwordError);
  };

  const handleSubmit = (_event: FormEvent): void => {
    _event.preventDefault();

    validateEmail(email);
    validatePassword(password);
    if (!isEmailValidToSubmit() || !isPasswordValidToSubmit()) {
      return;
    }

    const signIn: SignIn = {
      email: email,
      password: password,
    };

    onSubmit(signIn);
    setEmail("");
    setPassword("");
  };

  return (
    <form className={styles.signInForm} autoComplete="off" onSubmit={handleSubmit}>
      <h2 className={styles.signInForm__title}>Sign In</h2>
      <label className="input">
        <span className="input__heading">Email</span>
        <input
          data-test-id="auth-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="field__error">{emailError}</p>}
      </label>
      <label className="input">
        <span className="input__heading">Password</span>
        <input
          data-test-id="auth-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="field__error">{passwordError}</p>}
      </label>
      <button data-test-id="auth-submit" className="button" type="submit">
        Sign In
      </button>
    </form>
  );
};

export { SignInForm };
