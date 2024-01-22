import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const logoutHandler = () => {
    try {
      const localUserData = localStorage.getItem('userData')
      const localToken = localStorage.getItem('token')

      if(localUserData && localToken){
        dispatch(logout());
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
        console.log("logout successfully");
        navigate("/");
      }
    } catch (error) {
      console.log('error is ',error)
    }
    
  };
  return <button onClick={logoutHandler}>Logout</button>;
}
