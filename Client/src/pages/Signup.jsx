import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authentication from "../services/authentication";
import { Link } from "react-router-dom";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Error } from "../components";

export default function Signup() {
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm();
  const dispatch = useDispatch();

  function onsubmit(data) {
    if (data.password === data.re_password) {
      authentication
        .signUp(data)
        .then((response) => {
          if (response) {
            dispatch(updateStatus({ error: false, text: "Account Created" }));
            setTimeout(() => {
              navigate("/login");
              dispatch(clearStatus());
            }, 2000);
          }
        })
        .catch((error) => {
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
    } else {
      dispatch(
        updateStatus({ error: true, text: "Password Does Not Matched" })
      );
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  }

  return (
    <div className="h-screen w-full bg-[#F2EDE3] ">
      {/* error wrapper */}
      <Error
        className="top-[-10rem]"
        statusClassName="top-[1rem] md:bottom-4"
      />

      {/* content */}
      <div className="w-full h-full flex justify-between ">
        {/* left section */}
        <div className="md:w-[40%] w-0 md:inline-block hidden border-r-4 border-[#C92138] bg-center bg-no-repeat bg-cover h-full relative">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-900/20 flex justify-center items-center">
            <h2 className="rotate-[-90deg] text-7xl font-bold text-[#F2EDE3]">
              SIGNUP
            </h2>
          </div>
          <video
            className="w-full object-cover  h-full"
            src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/pexels-pachon-in-motion-15283218%20(Original)%20(online-video-cutter.com)_l_sXOcPt1R.mp4?updatedAt=1705951634647"
            autoPlay
            loop
            muted
          ></video>
        </div>

        {/* right section */}
        <div className="h-full md:w-[60%] w-full py-5 gap-20  flex flex-col justify-center items-center overflow-y-auto no-scrollbar">
          {/* upper heading */}
          <h1 className="text-7xl font-bold text-[#C92138]">SIGNUP</h1>

          {/* form container */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="w-full px-5 flex flex-col items-center gap-5"
            >
              {/* username */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                <h2 className="text-[#C92138] font-bold">
                  <Link to={"/login"}>Login</Link>
                </h2>
              </div>

              <input
                className="md:w-[40%] w-full py-1 font-bold  border-2 text-xl text-[#F2EDE3] h-14 rounded bg-[#C92138]"
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
