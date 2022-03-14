import Button from '@components/Button';
import Input from '@components/Input';
import Image from 'next/image';
import styles from './Signin.module.scss';
import { useState, SyntheticEvent } from 'react';
import { useAuth } from '@fireb/authentication';
import { useRouter } from 'next/router';

interface HandlerProps extends SyntheticEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error] = useState('');
  const { login, loading } = useAuth();
  const router = useRouter();

  const emailHandler = ({ target }: HandlerProps) => {
    setEmail(target.value);
  };

  const passHandler = ({ target }: HandlerProps) => {
    setPass(target.value);
  };

  const submitHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!pass || !email) return;

    await login(email, pass);
    router.push('/admin');
  };

  return (
    <div className={`form-container ${styles.container}`}>
      <div className={styles.logo}>
        <Image width="40px" height="51px" src="/static/1_logo.svg" alt="logo" />
        <h1 className="color-primary">Sign In</h1>
      </div>
      <form className="form">
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <Input
            className="input"
            value={email}
            onChange={emailHandler}
            name="email"
            type="email"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="pass">Password</label>
          <Input
            className="input"
            value={pass}
            onChange={passHandler}
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

export default SigninPage;
