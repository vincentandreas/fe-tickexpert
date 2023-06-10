import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import {useRouter} from 'next/navigation';

const useAuthentication = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false;
    const theSession = getCookie('te-session');
    
    if (theSession == undefined){
        isAuthenticated = false;
    }
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return null;
};

export default useAuthentication;