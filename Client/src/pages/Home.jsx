import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { updateStatus, clearStatus } from "../store/errorSlice";
import authentication from "../services/authentication";
import { Error, ErrorTemplate } from "../components";
import {
  MdOutlineHub,
  MdOutlineDesignServices,
  BsPuzzle,
  SlGraph,
  RiShareLine,
  AiOutlineMobile,
  AiFillHome,
  MdAdminPanelSettings,
  IoIosInformationCircle,
  MdFeaturedPlayList,
  TiUserAdd,
  IoLogInSharp,
  MdOutlineCancel,
} from "../icons";

// social icons
import {
  FaFacebook,
  AiFillInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaFlickr,
  FaDigg,
  FaYelp,
  FaScribd,
  FaReddit,
  PiMetaLogoFill,
} from "../icons";

export default function Home() {
  const dispatch = useDispatch();
  const [isLogin, setUserLogin] = useState(false);
  const userStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const localUserData = localStorage.getItem("userData");
      if (localUserData) {
        const userData = JSON.parse(localUserData);
        if (userData) {
          dispatch(login({ userData }));
          setUserLogin(true);
        }
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);

  return (
    <div
      className="bg-[#171C2F] w-full h-screen overflow-y-auto no-scrollbar "
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      {/* error wrapper */}
      <ErrorTemplate />

      {/* navbar wrapper*/}
      <div className="w-full  md:h-14 h-16 md:border-none border-2 border-[#28BDD1] rounded-md md:rounded-none  fixed md:top-0 bottom-1 backdrop-blur-xl    left-0 z-[100]">
        {/* navbar content */}
        <div className="md:w-[90%] w-full  h-full mx-auto flex justify-between items-center">
          {/* logo container */}
          <div className="border md:flex hidden border-[#28BDD1] font-bold text-center  justify-center items-center w-20 h-full text-red-500">
            Logo
          </div>

          {/* nav content container */}
          <div className="md:px-10 px-2  flex md:gap-24 justify-between md:w-auto w-full h-full">
            {/* nav menu container*/}
            <div className="px-2 h-full md:w-auto w-[60%] text-[#BEC2D3]">
              <ul className="flex w-full   md:gap-10 gap-3 h-full justify-between md:justify-center text-2xl md:text-lg items-center font-semibold">
                <li>
                  <h1 className="md:inline-block hidden">Home</h1>

                  <div className="flex md:hidden  flex-col justify-center items-center">
                    <AiFillHome className="md:hidden inline-block" />{" "}
                    <h1 className="text-xs font-bold">Home</h1>{" "}
                  </div>
                </li>

                <li>
                  <h1 className="md:inline-block hidden">About</h1>{" "}
                  <div className="flex md:hidden  flex-col justify-center items-center">
                    <IoIosInformationCircle className="md:hidden inline-block" />
                    <h1 className="text-xs font-bold">About</h1>
                  </div>
                </li>
                <li>
                  <h1 className="md:inline-block hidden">Features</h1>

                  <div className="flex md:hidden  flex-col justify-center items-center">
                    <MdFeaturedPlayList className="md:hidden inline-block" />
                    <h1 className="text-xs font-bold">Features</h1>
                  </div>
                </li>

                <li className={`${userStatus ? "" : "hidden"}`}>
                  <NavLink to={"/admin/links"}>
                    <h1 className="md:inline-block hidden">Admin</h1>

                    <div className="flex md:hidden  flex-col justify-center items-center">
                      <MdAdminPanelSettings className="" />
                      <h1 className="text-xs font-bold">Admin</h1>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* signup/login  */}
            <div className="px-2 h-full ">
              <ul className="h-full md:text-lg text-2xl flex justify-center items-center md:gap-8 gap-4">
                <li className="md:px-4 px-2 md:py-2 py-1  rounded-xl cursor-pointer  bg-[#28BDD1]  font-bold text-[#F2EDE3]">
                  <Link to={"/signup"}>
                    <h1 className="md:inline-block hidden">Signup</h1>

                    <div className="flex md:hidden  flex-col justify-center items-center">
                      <TiUserAdd className="md:hidden inline-block" />
                      <h1 className="text-xs font-bold">Signup</h1>
                    </div>
                  </Link>
                </li>
                <li className="font-bold border-2 md:px-4 px-2 md:py-2 py-1 rounded-xl border-[#28BDD1] text-[#BEC2D3]">
                  <Link to={"/login"}>
                    <h1 className="md:inline-block hidden">Login</h1>

                    <div className="flex md:hidden  flex-col justify-center items-center">
                      <IoLogInSharp className="md:hidden inline-block" />
                      <h1 className="text-xs font-bold">Login</h1>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* hero wrapper */}
      <div className="h-screen   w-full relative">
        {/* bg-vectors */}
        <div className="relative top-0 left-0 w-full h-full ">
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

        {/* hero container */}
        <div className="md:w-[80%] mx-auto absolute md:top-[20%] top-[0%] md:left-[10%] left-0 flex md:flex-row flex-col-reverse ">
          {/* left content wrapper */}
          <div className="md:px-5 md:w-1/2 w-full ">
            {/* left content content */}
            <div className="flex flex-col justify-center  md:gap-10  h-full">
              {/* heading container */}
              <div className="flex text-white  items-center md:items-start flex-col md:text-6xl text-3xl font-extrabold">
                <h1>Lorem Text For</h1>
                <h2 className="outline-4  text-[#28BDD1]">Lorem Text</h2>
              </div>

              {/* dummy text */}
              <h2 className=" text-center md:text-start text-[#BEC2D3]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, pariatur similique alias cumque mollitia in incidunt
                placeat eveniet repellat molestiae?
              </h2>

              {/* buttons container */}
              <div className=" mx-auto md:mx-0  rounded-xl w-[50%] h-14 flex gap-2">
                {/* create link */}
                <button className="h-full bg-[#28BDD1] text-[#F2EDE3] px-4 rounded-lg w-1/2 flex justify-center items-center">
                  create link
                </button>
                <button className=" border-2 border-[#28BDD1] text-[#BEC2D3] px-4 rounded-lg w-1/2 flex justify-center items-center">
                  About us
                </button>
              </div>
            </div>
          </div>

          {/* right content wrapper*/}
          <div className="md:w-1/2 w-full flex justify-center items-center h-full">
            {/* design container */}
            <div className="md:w-[544px] md:h-[536px]">
              <img
                className=""
                src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/Marketing-cuate_d5PmewCpD.png?updatedAt=1708003539319"
                alt="mobile design"
              />
            </div>
          </div>
        </div>
      </div>

      {/* feature wrapper */}
      <div className="md:h-screen h-full py-[43rem] md:py-[0rem]  xl:py-0  w-full relative ">
        {/* bg-vectors */}
        <div className="relative top-0 left-0 w-full h-full ">
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

        {/* feature container */}
        <div className="md:w-[80%] w-full absolute md:top-[16%] top-[0%] md:left-[10%] left-0 flex flex-col gap-5">
          {/* upper heading container*/}
          <div className="flex flex-col w-full items-center md:gap-2 gap-0">
            {/* heading */}
            <h1 className="text-2xl font-extralight text-[#28BDD1]">
              Features
            </h1>
            {/* subheading */}
            <h2 className="md:text-4xl text-2xl font-extrabold text-[#BEC2D3]">
              Here is What you get
            </h2>
          </div>

          {/* lower content container */}
          <div className="md:w-full w-[80%] mx-auto md:mx-0   justify-center  flex flex-wrap gap-4 ">
            {/* feature container 1 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <MdOutlineHub className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">Link Hub</h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Unified, dynamic bio links for a seamless online hub."Logo
                Design: Interconnected links forming a cohesive hub
              </h4>
            </div>

            {/* feature container 2 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <MdOutlineDesignServices className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">Design Ease</h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Effortless design integration with Figma for stunning bio links.
              </h4>
            </div>

            {/* feature container 3 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <BsPuzzle className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">Collab Boost</h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Amplify reach through collaborative bio links with Link Stock
              </h4>
            </div>

            {/* feature container 4 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <SlGraph className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">
                Smart Analytics
              </h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Instant insights with Link Stock's intelligent link analytics
                dashboard
              </h4>
            </div>

            {/* feature container 5 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <RiShareLine className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">
                Instant Share
              </h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Seamless sharing across platforms for instant online visibility
              </h4>
            </div>

            {/* feature container 6 */}
            <div className="flex flex-col border border-[#BEC2D3] md:w-1/4 w-full px-3 py-4 gap-3 rounded-lg">
              <AiOutlineMobile className="text-4xl text-white" />
              <h2 className="text-xl font-bold text-[#28BDD1]">Mobile Hub</h2>
              <h4 className="text-semibold text-[#BEC2D3] tracking-wide">
                Optimized, mobile-friendly bio links for on-the-go
                accessibility.
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* platform wrapper */}
      <div className="h-screen w-full relative flex justify-center items-center">
        {/* bg-vectors */}
        <div className="relative top-0 left-0 w-full h-full ">
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

        {/* platform container */}
        <div className="h-full md:w-[80%] mx-auto  items-center  w-full absolute md:top-[16%] top-[0%]   flex flex-col gap-5 ">
          <h3 className="text-2xl text-[#28BDD1] text-center">
            Link Stock works on any social media platform
          </h3>

          {/* platform strip wrapper */}
          <div className="border rounded-lg border-[#BEC2D3] w-full h-[65%] z-10"></div>

          {/* below link */}
          <Link
            className="bg-[#28BDD1] rounded-full py-4 px-6 md:w-[20%] w-full text-center text-xl font-bold text-white"
            to={"/admin/links"}
          >
            Create Now
          </Link>
        </div>
      </div>
    </div>
  );
}
