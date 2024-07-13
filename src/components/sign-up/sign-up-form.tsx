import { ChangeEvent, FormEvent, useState } from "react";
import { SignUp } from "../../common/types/types";
import {
  isStringNullOrEmpty,
  isValidEmail,
} from "../../common/helpers/utilities";
import styles from './sign-up.module.css';

type Props = {
  onSubmit: (signUp: SignUp) => void;
};

const SignUpForm = ({ onSubmit }: Props): JSX.Element => {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFullNameChange = (_event: ChangeEvent<HTMLInputElement>) => {
    const value: string = _event.target.value;
    setFullName(value);
    validateFullName(value);
  };

  const validateFullName = (fullNameOnChange: string): boolean => {
    if (isStringNullOrEmpty(fullNameOnChange)) {
      setFullNameError("Full name is required");
      return false;
    }

    setFullNameError("");
    return true;
  };

  const isFullNameValidToSubmit = () => {
    return isStringNullOrEmpty(fullNameError);
  };

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

    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    if (
      !isFullNameValidToSubmit() ||
      !isEmailValidToSubmit() ||
      !isPasswordValidToSubmit()
    ) {
      return;
    }

    const signUp: SignUp = {
      fullName: fullName,
      email: email,
      password: password,
    };

    onSubmit(signUp);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form className={styles.signUpForm} autoComplete="off" onSubmit={handleSubmit}>
      <h2 className={styles.signUpForm__title}>Sign Up</h2>
      <label className="input">
        <span className="input__heading">Full name</span>
        <input
          data-test-id="auth-full-name"
          name="full-name"
          type="text"
          required
          value={fullName}
          onChange={handleFullNameChange}
        />
        {fullNameError && <p className="field__error">{fullNameError}</p>}
      </label>
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
        Sign Up
      </button>
    </form>
  );
};

export { SignUpForm };
