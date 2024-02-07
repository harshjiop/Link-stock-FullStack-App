import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateStatus, clearStatus } from "../store/errorSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineCancel } from "../icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorTemplate() {
  const errorText = useSelector((state) => state.errors.text);
  const isError = useSelector((state) => state.errors.error);
  const status = useSelector((state) => state.errors.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && status) {
      toast.error(errorText);
      setTimeout(() => {
        dispatch(clearStatus());
      }, 1000);
    } else if (!isError && status) {
      toast.success(errorText);
      setTimeout(() => {
        dispatch(clearStatus());
      }, 1000);
    }
  }, [errorText, isError, status]);
  return (
    <div className={`${status ? `opacity-1` : "opacity-0"}`}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
