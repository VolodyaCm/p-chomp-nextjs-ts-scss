// import { doAuth } from '../../firebase/clientApp';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from './Signup.module.scss';
import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../../firebase/clientApp';

interface HandlerProps extends SyntheticEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();

  const emailHandler = ({ target }: HandlerProps) => {
    setEmail(target.value);
  };
  const passHandler = ({ target }: HandlerProps) => {
    setPass(target.value);
  };
  const passConfirmHandler = ({ target }: HandlerProps) => {
    setPassConfirm(target.value);
  };

  const submitHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!pass && !passConfirm && !email) return;
    if (pass !== passConfirm) {
      return setError('Password does not match');
    }

    signup(email, pass);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.logo}>
        <Image width="40px" height="51px" src="/static/1_logo.svg" alt="logo" />
        <h1 className="color-primary">Sign Up</h1>
      </div>
      <form action="">
        <div className={styles['input-container']}>
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            onChange={emailHandler}
            name="email"
            type="email"
            required
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="pass">Password</label>
          <Input
            value={pass}
            onChange={passHandler}
            name="pass"
            type="password"
            required
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="pass">Password Confirmation</label>
          <Input
            value={passConfirm}
            onChange={passConfirmHandler}
            name="pass"
            type="password"
            required
          />
        </div>
        {error && <div className="color-error">{error}</div>}
        <Button small primary filled onClick={submitHandler}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
