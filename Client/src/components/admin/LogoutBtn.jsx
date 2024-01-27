import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { clearStatus, updateStatus } from "../../store/errorSlice";
import { useNavigate } from "react-router";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const logoutHandler = () => {
    try {
      const localUserData = localStorage.getItem("userData");
      const localToken = localStorage.getItem("token");

      if (localUserData && localToken) {
        dispatch(logout());
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("links");
        dispatch(updateStatus({ error: false, text: "Logged Out" }));
        setTimeout(() => {
          dispatch(clearStatus());
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  };
  return <button onClick={logoutHandler}>Logout</button>;
}
