import { useEffect } from "react";
import { useParams } from "react-router";
import {
  MdKeyboardArrowRight,
  SiAddthis,
  IoChatbubble,
  MdModeEditOutline,
  IoShare,
} from "../icons/index.js";
import { Link } from "react-router-dom";
export default function Store() {
  const { userName } = useParams();
  useEffect(() => {
    console.log("username is ", userName.split("@")[1]);
  }, [userName]);

  return (
    <div
      className="h-screen overflow-y-auto no-scrollbar bg-[#171C2F] text-white py-4 w-full relative flex flex-col justify-center items-center"
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      {/* container */}
      <div className="w-[80%] h-full flex flex-col gap-10">
        {/*  breadcrumbs section */}
        <div className="flex gap-2 justify-start items-center font-bold selection:bg-transparent">
          <h2>Home</h2>
          <MdKeyboardArrowRight className="text-2xl" />
          <h2 className="text-[#28BDD1]">Shop</h2>
        </div>

        {/* upper / profile  section*/}
        <div className="flex justify-between items-center">
          {/* left section / profile section */}
          <div className="flex items-center gap-12">
            <img
              className="w-[200px] h-[200px] rounded-full border-4 border-[#28BDD1]"
              src="profile_image"
              alt=""
            />

            {/* center section / profile content*/}
            <div>asdf</div>
          </div>

          {/* right section / buttons section */}
          <div className="flex  text-3xl items-center gap-6">
            <Link to={"../store/add-product"}>
              <SiAddthis />
            </Link>
            <IoChatbubble />
            <IoShare />
            <MdModeEditOutline />
          </div>
        </div>

        {/* lower/  products section*/}
        <div className="flex flex-col items-center gap-5 pb-4">
          <h1 className="text-3xl font-bold">Products</h1>
          {/* products container */}
          <div className="flex gap-10 flex-wrap justify-center items-center ">
            <div
              className="w-[314px] h-[422px] rounded-xl border-2 border-[#BEC2D3] bg-no-repeat bg-cover bg-center relative "
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-slate-900/70 rounded-xl flex flex-col justify-end items-center gap-2 py-3 selection:bg-transparent">
                <h2 className="text-2xl ">Headphone</h2>
                <h3 className="text-lg">Electronics</h3>
                <h4 className="text-[#23856D] font-bold">$4.33</h4>
              </div>
            </div>
            <div
              className="w-[314px] h-[422px] rounded-xl border-2 border-[#BEC2D3] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            ></div>
            <div
              className="w-[314px] h-[422px] rounded-xl border-2 border-[#BEC2D3] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            ></div>
            <div
              className="w-[314px] h-[422px] rounded-xl border-2 border-[#BEC2D3] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
