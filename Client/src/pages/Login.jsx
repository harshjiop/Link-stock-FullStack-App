import { useEffect, useState } from "react";
import authentication from "../services/authentication";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "../icons";
import { ErrorTemplate } from "../components";
import { MiniLoader } from "./";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [miniLoader, setMiniLoader] = useState(false);

  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    try {
      setMiniLoader(true);
      const response = await authentication.login({ ...data });
      if (response) {
        const userData = response.data;
        if (userData) {
          const localUserData = JSON.stringify(userData.user);
          localStorage.setItem("userData", localUserData);
          localStorage.setItem("token", userData.accessToken);
          dispatch(login({ userData }));
          setMiniLoader(false);
          navigate("/admin/links");
        }
      }
    } catch (error) {
      setMiniLoader(false);
      dispatch(updateStatus({ error: true, text: error.response.statusText }));
    }
  }

  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative overflow-y-hidden "
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
          <div className="w-[80%] h-[80%] bg-[url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Computer%20login-amico_Iill5Scxt.png?updatedAt=1708518046998)] bg-center bg-cover bg-no-repeat"></div>
        </div>

        {/* right section */}
        <div className="h-full lg:w-[60%] w-full gap-20  flex flex-col justify-center items-center bg-[#28BDD1] lg:rounded-l-2xl z-[100]">
          {/* upper heading */}
          <h1 className="text-7xl font-light text-white">LOGIN</h1>

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
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter Username"
                  {...register("userName", { required: true })}
                />
              </div>

              {/* password */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>

              {/* remembered section */}
              <div className="md:w-[40%] w-full flex gap-2 font-semibold justify-end text-xs">
                <h2>Forgot Password ? </h2>{" "}
                <h2 className="text-white font-bold">
                  <Link to={"/reset-password"}> Reset Now</Link>
                </h2>
              </div>

              {/* remembered section */}
              <div className="md:w-[40%] w-full flex gap-2 font-semibold justify-end ">
                <h2 className="text-white font-bold">
                  <Link to={"/signup"}> Register Now</Link>
                </h2>
              </div>

              {/* <input
                className="md:w-[40%] w-full cursor-pointer rounded-xl py-1 font-bold text-xl h-14 bg-white text-black"
                type="submit"
                value="Login"
              /> */}
              <button
                className="md:w-[40%] w-full cursor-pointer rounded-xl py-1 font-bold text-xl h-14 bg-white text-black flex justify-center items-center gap-3"
                type="submit"
              >
                Login
                {miniLoader && <MiniLoader />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
