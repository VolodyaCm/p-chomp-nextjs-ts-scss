import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { AppContext } from '@store/.';
import { useContext, useEffect, useState } from 'react';
import { Types as UserTypes } from '@store/reducers/user';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

export const useAuth = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
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
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await signOut(auth);
      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return { login, signup, logout, currentUser: state.user, loading };
};
