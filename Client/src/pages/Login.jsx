import { useEffect } from "react";
import authentication from "../services/authentication";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const { handleSubmit, register, watch } = useForm();

  async function onSubmit(data) {
    authentication.login({ ...data }).then(async (response) => {
      if (response) {
        console.log("login successful");
        const userData = response.data;
        if (userData) {
          try {
            const localUserData = JSON.stringify(userData.user);
            localStorage.setItem("userData", localUserData);
            localStorage.setItem("token", userData.accessToken);
            dispatch(login({ userData }));
            navigate("/admin/links");
          } catch (error) {
            console.log("some error", error);
          }
        }
      } else {
        console.log("some error");
      }
    });
  }

  return (
    <div className="h-screen w-full bg-[#F2EDE3]">
      {/* content */}
      <div className="w-full h-full flex justify-between ">
        {/* left section */}
        <div className="md:w-[40%] w-0 md:inline-block hidden  border-r-4 border-[#C92138] bg-center bg-no-repeat bg-cover h-full relative">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-900/20 flex justify-center items-center">
            <h2 className="rotate-[-90deg] text-7xl font-bold text-[#F2EDE3]">
              LOGIN
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
        <div className="h-full md:w-[60%] w-full gap-20  flex flex-col justify-center items-center">
          {/* upper heading */}
          <h1 className="text-7xl font-bold text-[#C92138]">LOGIN</h1>

          {/* form container */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full px-5 flex flex-col items-center gap-5"
            >
              {/* username */}
              <div className="md:w-[40%] w-full flex flex-col">
                <input
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
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
                  className="text-xl text-black font-semibold border-2 outline-none px-2 h-14 bg-zinc-100 rounded  border-[#C92138]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>

              {/* remembered section */}
              <div className="md:w-[40%] w-full flex gap-2 font-semibold justify-end ">
                <h2>Forgot Password ? </h2>{" "}
                <h2 className="text-[#C92138] font-bold">
                  <Link to={"/"}> Reset Password</Link>
                </h2>
              </div>

              {/* remembered section */}
              <div className="md:w-[40%] w-full flex gap-2 font-semibold justify-end ">
                <h2 className="text-[#C92138] font-bold">
                  <Link to={"/signup"}> Register Now</Link>
                </h2>
              </div>

              <input
                className="md:w-[40%] w-full cursor-pointer rounded py-1 font-bold  border-2 text-xl text-[#F2EDE3] h-14 bg-[#C92138]"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
