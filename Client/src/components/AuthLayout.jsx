import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { Loader } from "../pages";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    try {
      const localUserData = localStorage.getItem("userData");
      const localToken = localStorage.getItem("token");
      if (localUserData && localToken) {
        const userData = JSON.parse(localUserData);
        dispatch(login({ userData }));
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/admin/links");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <Loader /> : <>{children}</>;
}
