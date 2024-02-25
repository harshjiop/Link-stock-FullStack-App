import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./loader/Loader";
import Error from "./Error";
import { BsPatchCheckFill } from "../icons";
import authentication from "../services/authentication";
import { ToastContainer, toast } from "react-toastify";
import { ErrorTemplate } from "../components";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { MiniLoader } from "./";

function ResendEmail() {
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(20);
  const [isButtonAvailable, setIsButtonAvailable] = useState(false);
  const navigate = useNavigate();
  const verifyEmail = useSelector((state) => state.auth.verifyEmail);
  const dispatch = useDispatch();
  const [miniLoader, setMiniLoader] = useState(false);

  const handleClick = async () => {
    setMiniLoader(true);
    if (verifyEmail) {
      try {
        const response = await authentication.sendResetPasswordMail(
          verifyEmail
        );
        if (response) {
          setIsButtonAvailable(false);
          setTimer(20);
          setMiniLoader(false);
        }
      } catch (error) {
        setMiniLoader(false);
        dispatch(
          updateStatus({
            error: true,
            text: error.response.statusText ?? "Failed To Send Email",
          })
        );
      }
    } else {
      setMiniLoader(false);
      dispatch(updateStatus({ error: true, text: "Email Not Found" }));
      setTimer(20);
    }
  };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setIsButtonAvailable(true);
    }
  }, [timer]);

  useEffect(() => {
    if (verifyEmail) {
      setLoading(false);
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, [verifyEmail]);

  if (loading) {
    return <Loader />;
  }
  if (!loading && !verifyEmail) {
    return <Error />;
  }
  return (
    <div
      className="w-full h-screen bg-[#171C2F] selection:bg-transparent relative flex justify-center items-center"
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      {/* error wrapper */}
      <ErrorTemplate />

      {/* image section */}
      <div className="bg-white w-[500px] h-[500px] rounded-3xl my-[10rem]">
        <img
          className=""
          src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/output-onlinegiftoolssend%20mail_KH3JDhxv5X.gif?updatedAt=1708768765575"
          alt="vector"
        />
      </div>
      {/*content  container */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#171C2F]/80 text-white flex flex-col justify-center items-center py-[10rem] gap-3">
        {/* text section */}
        <div className="flex flex-col gap-3 w-full justify-center items-center text-center">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-3">
            Email Send <BsPatchCheckFill className="text-green-400 text-2xl" />
          </h1>
          <h2 className="text-2xl font-bold text-red-400">
            Don't refresh this page
          </h2>
          <h3 className="text-xl font-semibold">
            Generate Verification link in : {timer}s
          </h3>
        </div>

        {/* button */}
        <button
          onClick={handleClick}
          disabled={!isButtonAvailable}
          className="bg-[#28BDD1] disabled:bg-[#89bac0] py-2 px-4 rounded-xl font-bold flex items-center gap-3"
        >
          Resend Email
          {miniLoader && <MiniLoader />}
        </button>
      </div>
    </div>
  );
}

export default ResendEmail;
