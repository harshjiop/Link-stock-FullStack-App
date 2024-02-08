import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { clearStatus, updateStatus } from "../../store/errorSlice";
import { resetLinks } from "../../store/linksSlice";
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
        dispatch(resetLinks());
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("links");
        localStorage.removeItem("userTheme")
        localStorage.removeItem('themes')
        dispatch(updateStatus({ error: false, text: "Logged Out" }));
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  };
  return <button onClick={logoutHandler}>Logout</button>;
}


