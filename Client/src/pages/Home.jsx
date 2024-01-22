import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import authentication from "../services/authentication";

export default function Home() {
  const dispatch = useDispatch();
  const [isLogin, setUserLogin] = useState(false);
  const userStatus = useSelector(state=>state.auth.status);

  useEffect(() => {
    try {
      const localUserData = localStorage.getItem("userData");
      if (localUserData) {
        const userData = JSON.parse(localUserData);
        if (userData) {
          dispatch(login({ userData }));
          setUserLogin(true);
        } else {
          console.log("no user data");
        }
      } else {
        console.log("no user Data in local storage");
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div
      className="bg-[#F2EDE3] w-full h-screen"
      style={{ fontFamily: "Poppins,sans-serif" }}
    >
      {/* navbar wrapper*/}
      <div className="w-full  h-14 fixed top-2  left-0 z-10">
        {/* navbar content */}
        <div className="w-[90%]   h-full mx-auto flex justify-between items-center">
          {/* logo container */}
          <div className="border border-red-500 font-bold text-center flex justify-center items-center w-20 h-full text-red-500">
            Logo
          </div>

          {/* nav content container */}
          <div className="px-10 flex gap-24 h-full">
            {/* nav menu container*/}
            <div className="px-2 h-full">
              <ul className="flex gap-10 h-full justify-center items-center font-semibold">
                <li>Home</li>
                <li>About</li>
                <li>Features</li>
                <li>Pricing</li>
                <li className={`${userStatus ? "" : "hidden"}`}>
                  <NavLink to={"/admin/links"}>Admin</NavLink>
                </li>
              </ul>
            </div>

            {/* signup/login  */}
            <div className="px-2 h-full ">
              <ul className="h-full flex justify-center items-center gap-8">
                <li className="px-4 py-2 rounded-xl cursor-pointer  bg-[#C92138] border-2 border-black text-lg font-bold text-[#F2EDE3]">
                  <Link to={"/signup"}>Signup</Link>
                </li>
                <li className="text-lg font-bold">
                  <Link to={"/login"}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* hero wrapper */}
      <div className="h-screen   w-full relative">
        {/* hero container */}
        <div className="w-[80%] mx-auto absolute top-[20%] left-[10%] flex ">
          {/* left content wrapper */}
          <div className="px-5 w-1/2 ">
            {/* left content content */}
            <div className="flex flex-col justify-center   gap-10 h-full">
              {/* heading container */}
              <div className="flex flex-col text-6xl font-extrabold">
                <h1>Lorem Text For</h1>
                <h2 className="outline-4 outline-red-400 text-[#F2EDE3]  drop-shadow-[0px_0px_2px_#C92138]">
                  Lorem Text
                </h2>
              </div>

              {/* dummy text */}
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, pariatur similique alias cumque mollitia in incidunt
                placeat eveniet repellat molestiae?
              </h2>

              {/* buttons container */}
              <div className="border-2 border-[#C92138] rounded-xl w-[50%] h-14 flex">
                {/* create link */}
                <button className="h-full bg-[#C92138] text-[#F2EDE3] px-4 rounded-lg w-1/2 flex justify-center items-center">
                  create link
                </button>
                <button className="text-[#C92138] w-1/2 flex justify-center items-center">
                  About us
                </button>
              </div>
            </div>
          </div>

          {/* right content wrapper*/}
          <div className="w-1/2 flex justify-center items-center h-full">
            {/* design container */}
            <div className="w-[544px] h-[536px]">
              <img
                className=""
                src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/hero%20page%20design_HcfB4NTIp.png?updatedAt=1705678389631"
                alt="mobile design"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
