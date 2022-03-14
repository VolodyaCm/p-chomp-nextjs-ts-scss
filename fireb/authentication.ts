import '.';
import { AppContext } from '@store/.';
import { useContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const useAuth = () => {
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

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

  return {
    login,
    signup,
    logout,
    currentUser: state.user,
    loading,
  };
};
