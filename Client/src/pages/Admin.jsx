import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { Logout } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { login } from "../store/authSlice";
import { setLinks } from "../store/linksSlice";
import links from "../services/links";

import { Error, ErrorTemplate } from "../components";

import {
  AiOutlineMobile,
  MdOutlineCancel,
  MdDelete,
  FaSquareReddit,
  PiLinkSimpleBold,
  MdOutlineDesignServices,
  RiAccountCircleLine,
  MdOutlineHome,
  MdLogout,
} from "../icons";
import theme from "../services/theme";
import { setThemes } from "../store/themeSlice";

export default function Admin() {
  const [token, setToken] = useState();
  const [userTheme, setUserTheme] = useState();
  const [selectedTheme, setSelectedTheme] = useState();

  const userLinks = useSelector((state) => state.links.links);
  const userData = useSelector((state) => state.auth.userData);
  const themeList = useSelector((state) => state.themes.themes);
  const selectedThemeId = useSelector((state) => state.themes.selectedThemeId);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const localLinks = localStorage.getItem("links");
      const localTheme = localStorage.getItem("themes");
      if (localLinks) {
        dispatch(setLinks(JSON.parse(localLinks)));
      } else {
        const localToken = localStorage.getItem("token");
        if (localToken) {
          setToken(localToken);
        }
      }

      if (localTheme == !undefined || null) {
        dispatch(setThemes(JSON.parse(localTheme)));
      } else {
        const localToken = localStorage.getItem("token");
        if (localToken) {
          setToken(localToken);
          getThemes(localToken);
        }
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);

  const getThemes = useCallback(
    async (token) => {
      try {
        if (token) {
          const data = await theme.getThemeList(token);
          localStorage.setItem("themes", JSON.stringify(data));
          dispatch(setThemes(data));
        }
      } catch (error) {
        dispatch(updateStatus({ error: true, text: error.message }));
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await links.getLinks(token);
          if (response) {
            dispatch(setLinks(response.data));
            localStorage.setItem("links", JSON.stringify(response.data));
          }
        } catch (error) {
          dispatch(updateStatus({ error: true, text: error.message }));
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    try {
      if (userData && themeList) {
        const localUserTheme = localStorage.getItem("userTheme");
        if (localUserTheme) {
          const parsedLocalUserTheme = JSON.parse(localUserTheme);

          if (parsedLocalUserTheme._id === userData.theme) {
            setUserTheme(parsedLocalUserTheme);
          } else {
            themeList.forEach((themeObj) => {
              if (themeObj._id === userData.theme) {
                setUserTheme(themeObj);
                localStorage.setItem("userTheme", JSON.stringify(themeObj));
              }
            });
          }
        } else {
          themeList.forEach((themeObj) => {
            if (themeObj._id === userData.theme) {
              setUserTheme(themeObj);
              localStorage.setItem("userTheme", JSON.stringify(themeObj));
            }
          });
        }
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, [userData, themeList]);

  useEffect(() => {
    themeList.forEach((themeObj) => {
      if (themeObj._id === selectedThemeId) {
        setSelectedTheme(themeObj);
      }
    });
  }, [selectedThemeId, themeList]);

  function handleMobile() {
    document.querySelector(".mobile").classList.toggle("hidden");
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

      {/* admin container */}
      <div className="md:w-[90%] w-full h-[90%] mx-auto flex justify-between ">

        {/* left section */}
        <div className="mobile lg:z-0 z-[200] lg:w-[40%] hidden  lg:flex  w-full h-full  lg:static absolute top-0 left-0 lg:bg-transparent bg-slate-900/60  justify-center items-center ">
          <div className="h-full z-0 w-full  bg-no-repeat bg-cover bg-center flex justify-center items-center ">
            {/* container */}
            {userTheme || selectedTheme ? (
              <div
                className="innerContainer"
                style={
                  selectedTheme
                    ? selectedTheme.mainStyles.innerContainer
                    : userTheme.mainStyles.innerContainer
                }
              >
                {/* upper section */}
                <div
                  className="upperSection"
                  // style={userTheme.mainStyles.upperSection}
                  style={
                    selectedTheme
                      ? selectedTheme.mainStyles.upperSection
                      : userTheme.mainStyles.upperSection
                  }
                >
                  {/* avatarContainer */}
                  <img
                    className="avatarContainer"
                    // style={userTheme.mainStyles.avatarContainer}
                    style={
                      selectedTheme
                        ? selectedTheme.mainStyles.avatarContainer
                        : userTheme.mainStyles.avatarContainer
                    }
                    src={`${userData?.avatar?.url}`}
                    alt=""
                  />

                  {/* content section */}
                  <div
                    className="contentSection "
                    // style={userTheme.mainStyles.contentSection}
                    style={
                      selectedTheme
                        ? selectedTheme.mainStyles.contentSection
                        : userTheme.mainStyles.contentSection
                    }
                  >
                    <h1 className="">{userData?.fullName}</h1>
                    <h2 className="text-xs">{userData?.username}</h2>
                    <h2 className="text-xs">{userData?.email}</h2>
                  </div>
                </div>

                {/* lower section */}
                <div
                  className="lowerSection overflow-y-auto no-scrollbar h-[80%]"
                  // style={userTheme.mainStyles.lowerSection}
                  style={
                    selectedTheme
                      ? selectedTheme.mainStyles.lowerSection
                      : userTheme.mainStyles.lowerSection
                  }
                >
                  {userLinks.length > 0 ? (
                    userLinks.map((link, index) => (
                      <Link
                        to={
                          link.url.startsWith("http")
                            ? link.url
                            : link.url.startsWith("/")
                              ? `${window.location.protocol}` +
                              "//" +
                              window.location.host +
                              link.url
                              : `http://${link.url}`
                        }
                        key={index}
                        className="linkSection"
                        // style={userTheme.mainStyles.linkSection}
                        style={
                          selectedTheme
                            ? selectedTheme.mainStyles.linkSection
                            : userTheme.mainStyles.linkSection
                        }
                      >
                        {/* icons */}
                        <img
                          className="linkIcon"
                          // style={userTheme.mainStyles.linkIcon}
                          style={
                            selectedTheme
                              ? selectedTheme.mainStyles.linkIcon
                              : userTheme.mainStyles.linkIcon
                          }
                          src={`${link.thumbnail?.url}`}
                          alt="sample"
                        />

                        {/* title */}
                        <h1
                          className="linkTitle"
                          // style={userTheme.mainStyles.linkTitle}
                          style={
                            selectedTheme
                              ? selectedTheme.mainStyles.linkTitle
                              : userTheme.mainStyles.linkTitle
                          }
                        >
                          {link.title}
                        </h1>
                      </Link>
                    ))
                  ) : !userLinks ? (
                    <div className="text-white h-full rounded-xl bg-slate-700/50"></div>
                  ) : (
                    <div className="w-full text-center text-red-500 ">
                      Data Not Found
                    </div>
                  )}
                </div>
              </div>
            ) : userTheme ? (
              <div className="h-full w-full bg-slate-300"></div>
            ) : (
              <div className="border-4 rounded-3xl h-[550px] w-[360px] flex justify-center  items-center ">
                <h1 className="text-red-400">Theme Not Found</h1>
              </div>
            )}
          </div>

          <button
            onClick={handleMobile}
            className="lg:hidden inline-block  text-[#C92138]  absolute top-0 left-0 text-4xl w-10 "
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* right section */}
        <div className="lg:w-[60%] w-full flex flex-col gap-10">
          {/* navbar */}
          <div className=" lg:w-[80%] w-full mx-auto bg-black rounded-3xl  text-white lg:px-10 px-5 h-12">
            <ul className="flex justify-between h-full lg:text-base text-xs font-bold">
              <li
                onClick={handleMobile}
                className=" lg:hidden flex justify-center items-center"
              >
                <AiOutlineMobile className="md:text-3xl text-xl" />
              </li>

              <li className="flex justify-center items-center  h-full w-[16%]">
                <NavLink
                  to={"/admin/links"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#28BDD1] w-full px-2 flex justify-center items-center rounded-3xl h-full  text-black"
                      : "px-2"
                  }
                >
                  <h1 className="md:inline-block hidden">Links</h1>
                  <PiLinkSimpleBold className="md:hidden text-lg" />
                </NavLink>
              </li>

              <li className="flex justify-center items-center  h-full w-[16%]">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#28BDD1] w-full px-2 flex justify-center items-center rounded-3xl h-full  text-black"
                      : "px-2"
                  }
                  to={"/admin/design"}
                >
                  <h1 className="md:inline-block hidden">Design</h1>
                  <MdOutlineDesignServices className="md:hidden text-lg" />
                </NavLink>
              </li>

              <li className="flex justify-center items-center  h-full w-[16%]">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#28BDD1] w-full px-2 flex justify-center items-center rounded-3xl h-full  text-black"
                      : "px-2"
                  }
                  to={"/admin/account"}
                >
                  <h1 className="md:inline-block hidden">Account</h1>
                  <RiAccountCircleLine className="md:hidden text-lg" />
                </NavLink>
              </li>

              <li className="flex justify-center rounded-3xl bg-[#28BDD1] text-black items-center  h-full w-[16%]">
                <NavLink to={"/"}>
                  <h1 className="md:inline-block hidden">Home</h1>
                  <MdOutlineHome className="md:hidden text-lg" />
                </NavLink>
              </li>
              <li className="flex justify-center rounded-3xl bg-[#28BDD1] text-black items-center  h-full w-[16%]">
                <NavLink className={"hidden"} to={"/admin/settings"}>
                  Settings
                </NavLink>
                <Logout>
                  <h1 className="md:inline-block hidden">Logout</h1>
                  <MdLogout className="md:hidden text-lg" />
                </Logout>
              </li>
            </ul>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
