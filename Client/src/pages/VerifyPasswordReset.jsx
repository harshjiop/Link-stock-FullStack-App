import { useEffect, useState } from "react";
import authentication from "../services/authentication";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "../icons";
import { ErrorTemplate } from "../components";
import { useLocation } from "react-router-dom";
import { resetVerifyEmail } from "../store/authSlice";
import Loader from "./loader/Loader";
import { MiniLoader } from "./";

function VerifyPasswordReset() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [miniLoader, setMiniLoader] = useState(false);

  const { handleSubmit, register } = useForm();

  useEffect(() => {
    if (token) {
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [token]);

  async function onSubmit(data) {
    setMiniLoader(true);
    try {
      if (data.password === data.re_password) {
        const response = await authentication.verifyResetPassword(
          token,
          data.password
        );
        if (response) {
          dispatch(updateStatus({ error: false, text: "Password Updated" }));
          dispatch(resetVerifyEmail());
          setTimeout(() => {
            navigate("/login");
          }, 100);
        }
      } else {
        setMiniLoader(false);
        dispatch(updateStatus({ error: true, text: "Password Mismatched" }));
      }
    } catch (error) {
      setMiniLoader(false);
      dispatch(updateStatus({ error: true, text: error.response.statusText }));
    }
  }

  if (loading) {
    return <Loader />;
  }
  if (!loading && !token) {
    return <Error />;
  }
  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative overflow-y-hidden"
      style={{ fontFamily: "Roboto,sans-serif" }}
    >
      {/* error wrapper */}
      <ErrorTemplate />

      {/* bg vectors */}
      <div>
        <div
          className="h-[273px]  w-[517px] absolute top-[0%]  left-[10%]  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2016_KKAa-hjOk.png?updatedAt=1708003922448)",
          }}
        ></div>

        <div
          className="h-[273px] hidden md:inline-block  w-[517px] absolute bottom-[0%]  left-[0%]  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2018_8KWnkjGIs.png?updatedAt=1708003922522)",
          }}
        ></div>
      </div>

      {/* content */}
      <div className="w-full h-full flex justify-between ">
        {/* left section */}
        <div className="lg:w-[50%] w-0 lg:flex justify-center items-center hidden  bg-center bg-no-repeat bg-cover h-full relative">
          <div className="w-[80%] h-[80%] bg-[url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Forgot%20password-pana_S6NS8o55q.png?updatedAt=1708763644919)] bg-center bg-cover bg-no-repeat"></div>
        </div>

        {/* right section */}
        <div className="h-full lg:w-[60%] w-full gap-20  flex flex-col justify-center items-center bg-[#28BDD1] lg:rounded-l-2xl z-[100]">
          {/* upper heading */}
          <h1 className="text-7xl font-light text-white">RESET PASSWORD</h1>

          {/* form container */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full px-5 flex flex-col items-center gap-5"
            >
              {/* username */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter New Password"
                  {...register("password", { required: true })}
                />
              </div>

              {/* password */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="password"
                  name="re-password"
                  id="re-password"
                  placeholder="Renter New Password"
                  {...register("re_password", { required: true })}
                />
              </div>

              {/* <input
                className="md:w-[40%] w-full cursor-pointer rounded-xl py-1 font-bold text-xl h-14 bg-white text-black"
                type="submit"
                value="Save Password"
              /> */}

              <button className="md:w-[40%] w-full cursor-pointer rounded-xl py-1 font-bold text-xl h-14 bg-white text-black flex items-center justify-center gap-3">
                Save Password
                {miniLoader && <MiniLoader />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPasswordReset;
