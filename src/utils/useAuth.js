import { useEffect } from "react";
import { deleteCookie, getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/navigation";

export const useAuthentication = (checkUserRole) => {
  const router = useRouter();

  useEffect(() => {
    let isAuthenticated = false;
    const theSession = getCookie("te-session");

    if (theSession != undefined) {
      isAuthenticated = true;
    }
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (checkUserRole == true) {
      let usrole = getCookie("role");
      if (usrole == undefined || usrole == "" || usrole !== "PROMOTOR") {
        alert("This menu only for promotor");
        router.push("/");
      }
    }
  }, []);

  return null;
};

export const Logout = () => {
  deleteCookie("q_unique_code");
  deleteCookie("event_id");
  deleteCookie("role");

  window.location.href = "/login";
};
