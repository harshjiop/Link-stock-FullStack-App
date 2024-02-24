import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authentication from "../services/authentication";
import { Link } from "react-router-dom";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Error, ErrorTemplate } from "../components";

export default function Signup() {
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm();
  const dispatch = useDispatch();

  async function onsubmit(data) {
    if (data.password === data.re_password) {
      try {
        const response = await authentication.signUp(data);
        if (response) {
          dispatch(updateStatus({ error: false, text: "Account Created" }));
          navigate("/login");
        }
      } catch (error) {
        dispatch(updateStatus({ error: true, text: error.message }));
      }
    } else {
      dispatch(
        updateStatus({ error: true, text: "Password Does Not Matched" })
      );
    }
  }

  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative overflow-y-hidden"
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      {/* error wrapper */}
      <ErrorTemplate />

      {/* bg vectors*/}
      <div className="z-0">
        <div
          className="h-[273px] z-[-1] w-[517px] absolute top-[0%]  left-[10%]  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Vector%2016_KKAa-hjOk.png?updatedAt=1708003922448)",
          }}
        ></div>

        <div
          className="h-[273px] z-[-1] w-[517px] absolute bottom-[0%]  left-[0%]  bg-center bg-cover bg-no-repeat"
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
        <div className="h-full lg:w-[60%] w-full gap-20  flex flex-col justify-center items-center bg-[#28BDD1]  lg:rounded-l-2xl overflow-y-auto no-scrollbar z-[100]">
          {/* upper heading */}
          <h1 className="text-7xl font-light text-white">SIGNUP</h1>

          {/* form container */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="w-full px-5 flex flex-col items-center gap-5"
            >
              {/* username */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter username"
                  {...register("username", { required: true })}
                />
              </div>

              {/* full name */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter fullName"
                  {...register("fullName", { required: true })}
                />
              </div>

              {/* email */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
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

              {/* retype password */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-white font-semibold text-center outline-none px-2 h-14 bg-[#171C2F] rounded-xl"
                  type="password"
                  name="re-password"
                  id="re-password"
                  placeholder="Re-Enter Password"
                  {...register("re_password", { required: true })}
                />
              </div>

              {/* remembered section */}
              <div className="md:w-[40%] w-full flex gap-2 font-semibold justify-end ">
                <h2>Already Registered ?</h2>{" "}
                <h2 className="text-white font-bold">
                  <Link to={"/login"}>Login</Link>
                </h2>
              </div>

              <input
                className="md:w-[40%] w-full cursor-pointer rounded-xl py-1 font-bold text-xl h-14 bg-white text-black"
                type="submit"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
