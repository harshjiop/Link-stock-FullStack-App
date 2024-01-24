import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { Logout } from "../components";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import {AiOutlineMobile,MdOutlineCancel} from '../icons'


export default function Admin() {
  function handleMobile(){
    console.log('this is mobile ');
    document.querySelector('.mobile').classList.toggle('hidden');
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F2EDE3] relative">
      {/* admin container */}
      <div className="md:w-[90%] w-full h-[90%] mx-auto flex justify-between">
        {/* left section */}
        <div className="mobile md:z-0 z-[200] md:w-[30%] md:inline-block hidden  w-full h-full   md:static absolute top-0 left-0 md:bg-transparent bg-slate-900/60">
          <img
            className="w-full md:h-full"
            src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/mobile%20design_lMKBcoB7s.png?updatedAt=1705758234784"
            alt=""
          />

          <button onClick={handleMobile} className="md:hidden inline-block  text-[#C92138]  absolute top-0 left-0 text-4xl w-10"><MdOutlineCancel/></button>
        </div>

        {/* right section */}
        <div className="md:w-[60%] w-full flex flex-col gap-10">
          {/* navbar */}
          <div className="border md:w-[80%] w-full mx-auto bg-[#C92138] rounded-3xl  text-white md:px-10 px-5 py-4">
            <ul className="flex justify-between md:text-xl text-xs font-bold">

              <li onClick={handleMobile} className=" md:hidden flex justify-center items-center"><AiOutlineMobile className="md:text-3xl text-xl"/></li>

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
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li className="flex justify-center items-center  px-2  bg-zinc-800 rounded-xl">
                <NavLink className={'hidden'} to={"/admin/settings"}>Settings</NavLink>
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
