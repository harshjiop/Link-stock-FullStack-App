import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { Logout } from "../components";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Admin() {

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F2EDE3]">
      {/* admin container */}
      <div className="w-[90%] h-[90%]mx-auto flex justify-between">
        {/* left section */}
        <div className="w-[30%] h-full">
          <img
            className="w-full h-full"
            src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/mobile%20design_lMKBcoB7s.png?updatedAt=1705758234784"
            alt=""
          />
        </div>

        {/* right section */}
        <div className="w-[60%]  border flex flex-col gap-10">
          {/* navbar */}
          <div className="border w-[80%] mx-auto bg-[#C92138] rounded-3xl  text-white px-10 py-4">
            <ul className="flex justify-between text-xl font-bold">
              <li>
                <NavLink to={"/admin/links"}>Links</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/design"}>Design</NavLink>
              </li>
              <li >
                <NavLink className={'hidden'} to={"/admin/settings"}>Settings</NavLink>
                  <Logout>Logout </Logout>
              </li>
              <li>
                <NavLink to={"/admin/account"}>My Account</NavLink>
              </li>

              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
            </ul>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
