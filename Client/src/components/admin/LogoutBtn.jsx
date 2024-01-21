import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout successfully");
    navigate("/");
  };
  return <button onClick={logoutHandler}>Logout</button>;
}
