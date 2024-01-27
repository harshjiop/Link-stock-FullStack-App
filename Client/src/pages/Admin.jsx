import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { Logout } from "../components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { login } from "../store/authSlice";
import { setLinks } from "../store/linksSlice";
import links from "../services/links";
import { Error } from "../components";

import {
  AiOutlineMobile,
  MdOutlineCancel,
  MdDelete,
  FaSquareReddit,
} from "../icons";

export default function Admin() {
  const [token, setToken] = useState();

  const userLinks = useSelector((state) => state.links.links);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const localLinks = localStorage.getItem("links");
      if (localLinks) {
        dispatch(setLinks(JSON.parse(localLinks)));
      } else {
        const localToken = localStorage.getItem("token");
        if (localToken) {
          setToken(localToken);
        }
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  }, []);

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
          <img
            className="w-full md:h-full hidden"
            src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/mobile%20design_lMKBcoB7s.png?updatedAt=1705758234784"
            alt=""
          />

          <div className="h-full z-0 w-full  bg-no-repeat bg-cover bg-center flex justify-center items-center">
            {/* mobile container */}
            <div className="mobileOutline w-[279px] h-[573px]  rounded-3xl border-[10px]  border-black bg-blue-100 flex flex-col gap-5">
              {/* upper section */}
              <div className="h-[50%] rounded-xl bg-white">
                {/* upper section content section */}
                <div className="relative bg-no-repeat bg-center bg-cover h-[50%] rounded-xl bg-[url(https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
                  {/* content container */}
                  <div className="absolute bottom-[-100%] left-0 flex flex-col gap-2  w-full justify-center items-center">
                    <img
                      className="w-[100px] rounded-full"
                      src="https://xsgames.co/randomusers/assets/avatars/male/77.jpg"
                      alt=""
                    />
                    {/* name and bio */}
                    <div className="flex flex-col gap-2 text-lg font-bold justify-center items-center">
                      <h1>{userData?.fullName}</h1>
                      <h2>{userData?.email}</h2>
                      <h3>{userData?.username}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* lower section */}
              <div className=" rounded-xl  h-[50%] overflow-y-auto no-scrollbar flex flex-col gap-3 ">
                {userLinks.length > 0 ? (
                  userLinks.map((link, index) => (
                    <Link
                      to={
                        link.url.startsWith("http")
                          ? link.url
                          : `http://${link.url}`
                      }
                      key={index}
                      className="flex w-[90%] items-center mx-auto justify-start gap-8 bg-white px-2 py-1  rounded-md"
                    >
                      {/* icons */}
                      <img
                        className="w-[30px] h-[30px] "
                        src={`https://logo.clearbit.com/${link.title}.com`}
                        alt=""
                      />

                      {/* right content */}
                      <div>
                        {/* title */}
                        <h1 className="text-lg font-bold capitalize ">
                          {link.title}
                        </h1>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="w-full text-center text-red-500">
                    Data Not Found
                  </div>
                )}
              </div>
            </div>
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
                <NavLink to={"/admin/links"}>Links</NavLink>
              </li>
              <li className="flex justify-center items-center">
                <NavLink to={"/admin/design"}>Design</NavLink>
              </li>

              <li className="flex justify-center items-center">
                <NavLink to={"/admin/account"}>My Account</NavLink>
              </li>

              <li className="flex justify-center items-center">
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
