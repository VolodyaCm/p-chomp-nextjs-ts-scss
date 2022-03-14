import '@fireb/.';
import {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
  ReactElement,
} from 'react';
import styles from './Preload.module.scss';
import { AppContext } from '@store/.';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Types as UserTypes } from '@store/reducers/user';

const Preload: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: UserTypes.Add,
          payload: {
            user: {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
            },
          },
        });
      } else {
        dispatch({
          type: UserTypes.Delete,
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    return unsubscribe;
  }, []);

  return loading ? (
    <div className={styles.container}>
      <div className={styles['lds-dual-ring']}></div>
    </div>
  ) : (
    children
  );
};

export default Preload;
