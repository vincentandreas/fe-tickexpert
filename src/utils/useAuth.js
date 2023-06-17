import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import {useRouter} from 'next/navigation';



export const useAuthentication = () => {
  const router = useRouter();

  useEffect(() => {
    let isAuthenticated = false;
    const theSession = getCookie('te-session');
    
    if (theSession != undefined){
        isAuthenticated = true;
    }
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return null;
};

export const Logout = () => {
  console.log("logout function called");
  deleteCookie("q_unique_code");
  deleteCookie("event_id");
  window.location.href = "/login";
};