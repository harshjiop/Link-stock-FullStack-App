import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { Logout } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { login } from "../store/authSlice";
import { setLinks } from "../store/linksSlice";
import links from "../services/links";
// import
import { Error } from "../components";

import {
  AiOutlineMobile,
  MdOutlineCancel,
  MdDelete,
  FaSquareReddit,
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
  // const userTheme

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
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
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
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      links
        .getLinks(token)
        .then((data) => {
          if (data) {
            try {
              dispatch(setLinks(data.data));
              localStorage.setItem("links", JSON.stringify(data.data));
            } catch (error) {
              dispatch(updateStatus({ error: true, text: error.message }));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            }
          }
        })
        .catch((error) => {
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
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
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
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
      className="h-screen w-full flex justify-center items-center bg-[#F2EDE3] relative"
      style={{ fontFamily: "Poppins,sans-serif" }}
    >
      {/* error wrapper */}
      <Error />

      {/* admin container */}
      <div className="md:w-[90%] w-full h-[90%] mx-auto flex justify-between">
        {/* left section */}
        <div className="mobile  lg:z-0 z-[200] lg:w-[40%]  hidden lg:flex  w-full h-full   lg:static absolute top-0 left-0 lg:bg-transparent bg-slate-900/60  justify-center items-center">
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
                    className="contentSection"
                    // style={userTheme.mainStyles.contentSection}
                    style={
                      selectedTheme
                        ? selectedTheme.mainStyles.contentSection
                        : userTheme.mainStyles.contentSection
                    }
                  >
                    <h2>{userData?.username}</h2>
                    <h1>{userData?.fullName}</h1>
                    <h2>{userData?.email}</h2>
                  </div>
                </div>

                {/* lower section */}
                <div
                  className="lowerSection "
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
                          src={`https://logo.clearbit.com/${link.title}.com`}
                          alt=""
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
                  ) : (
                    <div className="w-full text-center text-red-500">
                      Data Not Found
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <h1>Loaading....</h1>
            )}

            <div></div>
          </div>

          <button
            onClick={handleMobile}
            className="lg:hidden inline-block  text-[#C92138]  absolute top-0 left-0 text-4xl w-10"
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* right section */}
        <div className="lg:w-[60%] w-full flex flex-col gap-10">
          {/* navbar */}
          <div className="border lg:w-[80%] w-full mx-auto bg-[#C92138] rounded-3xl  text-white lg:px-10 px-5 py-4">
            <ul className="flex justify-between lg:text-xl text-xs font-bold">
              <li
                onClick={handleMobile}
                className=" lg:hidden flex justify-center items-center"
              >
                <AiOutlineMobile className="md:text-3xl text-xl" />
              </li>

              <li className="flex justify-center items-center">
                <NavLink
                  to={"/admin/links"}
                  className={({ isActive }) =>
                    isActive ? "bg-red-300 px-2 rounded-xl " : "px-2"
                  }
                >
                  Links
                </NavLink>
              </li>
              <li className="flex justify-center items-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-red-300 px-2 rounded-xl " : "px-2"
                  }
                  to={"/admin/design"}
                >
                  Design
                </NavLink>
              </li>

              <li className="flex justify-center items-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-red-300 px-2 rounded-xl " : "px-2"
                  }
                  to={"/admin/account"}
                >
                  My Account
                </NavLink>
              </li>

              <li className="flex justify-center items-center  px-2  bg-zinc-800 rounded-xl">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="flex justify-center items-center  px-2  bg-zinc-800 rounded-xl">
                <NavLink className={"hidden"} to={"/admin/settings"}>
                  Settings
                </NavLink>
                <Logout>Logout </Logout>
              </li>
            </ul>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
