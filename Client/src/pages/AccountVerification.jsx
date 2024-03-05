import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { clearStatus, updateStatus } from "../store/errorSlice";
import authentication from "../services/authentication";
import { login } from "../store/authSlice";
import { Error, ErrorTemplate } from "../components";

const AccountVerification = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [miniLoader, setMiniLoader] = useState(false);
  const [accountVerificationStatus, setAccountVerificationStatus] =
    useState(false);

  useEffect(() => {
    if (!token && accountVerificationStatus) {
      setLoading(false);
    } else if (!token && !accountVerificationStatus) {
      navigate("/admin");
    } else {
      setLoading(false);
    }
  }, [token, accountVerificationStatus]);
  async function handleClick() {
    if (token) {
      try {
        const response = await authentication.confirmAccountVerificationMail(
          token
        );
        if (response) {
          dispatch(login({ userData: response }));
          localStorage.setItem("userData", JSON.stringify(response));
          dispatch(updateStatus({ error: false, text: "Email Verified" }));
          navigate("/admin/account");
        }
      } catch (error) {
        dispatch(updateStatus({ error: false, text: "Email Verified" }));
      }
    }
  }
  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-[#171C2F] relative overflow-y-hidden overflow-x-hidden"
      style={{ fontFamily: "Roboto,sans-serif" }}
    >
      {/* error wrapper */}
      <ErrorTemplate />

      {/* bg vectors */}
      <div className="">
        <div
          className="h-[273px] w-[517px] absolute top-[10%] right-0  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2017__szVDEAmM.png?updatedAt=1708003922609)",
          }}
        ></div>

        <div
          className="h-[273px] w-[517px] absolute top-[10%] left-0  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2018_8KWnkjGIs.png?updatedAt=1708003922522)",
          }}
        ></div>

        <div
          className="h-[273px] w-[517px] absolute bottom-[0%] left-[40%]  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2016_KKAa-hjOk.png?updatedAt=1708003922448)",
          }}
        ></div>
      </div>

      <div className=" z-[100] flex justify-center items-center flex-col gap-3 text-white w-full md:w-[60%]">
        <h2 className="text-2xl font-bold w-full text-center">
          Thank you for connecting with us! please click the button below to verify your email address.
        </h2>
        <button
          className="bg-[#28BDD1] px-3 py-3 rounded-xl text-white font-bold"
          onClick={handleClick}
        >
          Click to Verify
        </button>

        <h3 className="w-full text-center text-red-300">
          If you did not request this verification, please ignore this message.
        </h3>

        <div className="w-full">
          <p>Thank you,</p>
          <p>Team Link Store</p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
