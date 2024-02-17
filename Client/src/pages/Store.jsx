import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./index.js";
import {
  MdKeyboardArrowRight,
  SiAddthis,
  IoChatbubble,
  MdModeEditOutline,
  IoShare,
} from "../icons/index.js";
import { Link } from "react-router-dom";
import product from "../services/product.js";
import { addStoreOwner } from "../store/storeSlice.js";
export default function Store() {
  const { userName } = useParams();
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const storeOwner = useSelector((state) => state.store.storeOwner);

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    } catch (error) {
      console.log(error.message ?? "Failed To Fetch Token");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (userName && token) {
          const response = await product.getStoreDetails(
            token,
            userName.split("@")[1]
          );
          if (response) {
            const data = response[0];
            dispatch(addStoreOwner(data));
            localStorage.setItem("storeOwner", JSON.stringify(response[0]));
          }
        }
      } catch (error) {
        console.log("errir is ", error);
      }
    })();
  }, [userName, token]);

  function handleHover(e) {
    e.currentTarget.querySelector(".content").classList.toggle("opacity-0");
    e.currentTarget.querySelector(".content").classList.toggle("opacity-1");
  }

  if (!storeOwner) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div
      className="h-screen overflow-y-auto no-scrollbar bg-[#171C2F] text-white py-4 w-full relative flex flex-col justify-center items-center"
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      {/* container */}
      <div className="w-[80%] h-full flex flex-col gap-10">
        {/*  breadcrumbs section */}
        <div className="flex gap-2 justify-start items-center font-bold selection:bg-transparent">
          <Link className="cursor-pointer" to={"../"}>
            Home
          </Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <Link className="text-[#28BDD1] cursor-pointer">Shop</Link>
        </div>

        {/* upper / profile  section*/}
        <div className="flex justify-between items-center">
          {/* left section / profile section */}
          <div className="flex items-center gap-12">
            <img
              className="w-[200px] h-[200px] rounded-full border-4 border-[#28BDD1]"
              src={`${storeOwner.avatar.url}`}
              alt="profile_image"
            />

            {/* center section / profile content*/}
            <div className="text-start flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold">{storeOwner.fullName}</h2>
              <Link
                className="text-base text-[#28BDD1]"
                to={`mailto:${storeOwner.email}`}
              >
                {storeOwner.email}
              </Link>
            </div>
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
            {storeOwner.UserProduct.map((product) => {
              return (
                <div key={product._id}>
                  <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    className="w-[314px] h-[422px] card rounded-xl border-2 border-[#BEC2D3] bg-no-repeat bg-cover bg-center relative "
                    style={{
                      backgroundImage: `url(${product?.Product_Img[0]?.Product_img_Cloudnary_Path})`,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full content bg-slate-900/70 rounded-xl flex opacity-0 transition-all duration-300 ease-linear flex-col justify-end items-center gap-2 py-3 selection:bg-transparent">
                      <h2 className="text-2xl ">{product.Product_Name}</h2>
                      <h3 className="text-lg">{product.Product_Desc}</h3>
                      <h4 className="text-[#23856D] font-bold">
                        ${product.Product_Price}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
