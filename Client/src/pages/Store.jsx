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
  BsPatchCheckFill,
  MdEdit,
  MdDelete,
} from "../icons/index.js";
import { Link } from "react-router-dom";
import product from "../services/product.js";
import { addStoreOwner } from "../store/storeSlice.js";
import { Error } from "../pages";
import { login } from "../store/authSlice.js";
import ErrorTemplate from "../components/ErrorTemplate.jsx";
import { toast } from "react-toastify";
export default function Store() {
  const { userName } = useParams();
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const storeOwner = useSelector((state) => state.store.storeOwner);
  const [loader, setLoader] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isdeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState({
    id: "",
    name: "",
    confirm: false,
  });

  useEffect(() => {
    if (userData) {
      if ([userData.username, userName].some((each) => each.trim() !== "")) {
        if (userData.username === userName.split("@")[1]) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }
  }, [userData, userName]);

  useEffect(() => {
    (async () => {
      try {
        const localUserData = localStorage.getItem("userData");
        if (localUserData) {
          dispatch(login({ userData: JSON.parse(localUserData) }));
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    } catch (error) {
      console.log("error is ");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (userName) {
          const response = await product.getStoreDetails(
            userName.split("@")[1]
          );
          if (response) {
            const data = response[0];
            dispatch(addStoreOwner(data));
            localStorage.setItem("storeOwner", JSON.stringify(response[0]));
            setLoader(false);
          }
        }
      } catch (error) {
        toast.error(error.message);
        setLoader(false);
      }
    })();
  }, [userName]);

  function handleShare() {
    if (userName) {
      const baseUrl = window.location.protocol + "//" + window.location.host;
      const dummyInput = document.createElement("input");
      dummyInput.value = `${baseUrl}/store/${userName}`;
      document.body.appendChild(dummyInput);
      dummyInput.select();
      document.execCommand("copy");
      document.body.removeChild(dummyInput);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    } else {
      console.log("invalid user name");
    }
  }

  async function handleDelete(id) {
    if (token) {
      if (id) {
        const response = await product.deleteProduct(token, id);
        if (response) {
          const data = response[0];
          console.log(data)
          dispatch(addStoreOwner(data));
          localStorage.setItem("storeOwner", JSON.stringify(response[0]));
          // setLoader(false);
        }
      }else{
        console.log('id not found')
      }
    }else{
      console.log('token not found')
    }
  }

  function handleHover(e) {
    e.currentTarget.querySelector(".content").classNameList.toggle("opacity-0");
    e.currentTarget.querySelector(".content").classNameList.toggle("opacity-1");
  }

  if (loader) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!loader && !storeOwner) {
    return <Error />;
  }

  return (
    <div
      className="h-screen overflow-y-auto no-scrollbar bg-[#171C2F] text-white w-full relative flex flex-col justify-center items-center"
      style={{ fontFamily: "Roboto,sans-serif" }}
    >
      {/* bg-vectors */}
      <div className="top-0 left-0 w-full h-full  fixed">
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

      <ErrorTemplate />

      {/* error modal box container*/}
      {isdeleteClicked ? (
        <>
          <div className="absolute  top-0 left-0 w-full h-full z-[400]  bg-slate-900/90 flex justify-center items-center">
            <div className="  h-[20rem] w-[30rem] bg-slate-800/90 flex flex-col justify-between items-center p-2 rounded-lg">
              {/* texts */}
              <div className="flex flex-col selection:bg-transparent text-xl gap-2">
                <h2>
                  Venturing into the realm of deletion? Simply affirm with '
                  <span className="text-red-400 font-bold">YES</span>' and let
                  the magic unfold.
                </h2>
                <h2>Farewell,</h2>
                <h2 className="w-full h-6 overflow-x-auto no-scrollbar text-slate-400 flex outline-none">
                  {deleteDetails?.name}
                </h2>
                <h2>your destiny awaits.</h2>
              </div>

              {/* inputs */}
              <div className="flex flex-col w-full gap-4">
                <input
                  onChange={(e) => {
                    if (e.target.value.toLowerCase() === "yes") {
                      setDeleteDetails({
                        ...deleteDetails,
                        confirm: true,
                      });
                    } else {
                      setDeleteDetails({
                        ...deleteDetails,
                        confirm: false,
                      });
                    }
                  }}
                  className="w-full rounded-xl outline-none py-2 px-4  bg-transparent border border-[#28BDD1]"
                  type="text"
                  name="confirm"
                  id="confirm"
                  placeholder="'YES'"
                />
                {/* buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => {
                      setIsDeleteClicked(false);
                    }}
                    className="w-1/2 transition-all duration-300 ease-linear border border-[#28BDD1] rounded-xl py-2 text-center bg-transparent hover:bg-[#28BDD1]"
                  >
                    cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteDetails?.id)}
                    disabled={!deleteDetails?.confirm}
                    className="w-1/2 py-2 transition-all duration-300 ease-linear text-center bg-red-500 text-black rounded-xl disabled:bg-red-800/50 disabled:text-white hover:font-extrabold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* container */}
      <div className="md:w-[80%] w-full px-2  md:px-0 h-full flex flex-col gap-10 absolute top-0 mx-auto overflow-y-auto no-scrollbar">
        {/*  breadcrumbs section */}
        <div className="flex gap-2 justify-start items-center font-bold selection:bg-transparent">
          <Link className="cursor-pointer" to={"../"}>
            Home
          </Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <Link className="text-[#28BDD1] cursor-pointer">Shop</Link>
        </div>

        {/* upper / profile  section*/}
        <div className="flex md:flex-row flex-col justify-between items-center gap-5 md:gap-0">
          {/* left section / profile section */}
          <div className="flex md:flex-row flex-col items-center gap-12">
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
            {isAdmin ? (
              <Link to={"../store/add-product"}>
                <SiAddthis />
              </Link>
            ) : null}

            {isCopied ? (
              <BsPatchCheckFill className="text-green-400" />
            ) : (
              <IoShare className="cursor-pointer" onClick={handleShare} />
            )}
          </div>
        </div>

        {/* lower/  products section*/}
        <div className="flex flex-col items-center gap-5 pb-4  h-full">
          <h1 className="text-3xl font-bold">Products</h1>
          {/* products container */}
          <div className="flex gap-10 flex-wrap justify-center items-center w-screen pb-4 ">
            {storeOwner.UserProduct.map((product) => {
              return (
                <Link
                  target="_blank"
                  to={`${product.Product_Url}`}
                  key={product._id}
                  className="h-[420px] w-[320px] relative"
                >
                  {/* <div
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
                  </div> */}

                  {isAdmin ? (
                    <>
                      <MdEdit
                        // onClick={(e) => handleBtn(e)}
                        className="absolute -top-4 right-8 z-[100] cursor-pointer text-4xl bg-yellow-400 border border-[#28BDD1] p-1 rounded-full text-black"
                      ></MdEdit>

                      <MdDelete
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteDetails({
                            id: product._id,
                            name: product.Product_Name,
                          });
                          setIsDeleteClicked(true);
                        }}
                        className="absolute top-8 -right-4 z-[100] cursor-pointer text-4xl bg-red-400 border border-[#28BDD1] p-1 rounded-full text-black"
                      />
                    </>
                  ) : null}

                  <div className="relative h-full   flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <div
                      className={`relative  flex h-[50%] overflow-hidden rounded-lg  bg-center bg-no-repeat bg-cover 
                    `}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={product.Product_Img[0].Product_img_Cloudnary_Path}
                        alt="product image"
                      />
                      {/* <span className="absolute top-0 right-0 text-black">asasdfasfddf</span> */}
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {/* {((product.Product_Price -
                          product.Product_Discount_Price) /
                          product.Product_Price) *
                          100} */}
                        {Math.round(
                          ((product.Product_Price -
                            product.Product_Discount_Price) /
                            product.Product_Price) *
                            100
                        )}
                        % OFF
                        {/* 39% OFF */}
                      </span>
                    </div>

                    <div className="mt-4 px-5 pb-5 h-[40%]">
                      <h5 className="text-xl tracking-tight max-h-[40%] font-bold text-slate-900 overflow-y-hidden">
                        {product.Product_Name}
                        {/* Nike Air MX Super 2500 - Red */}
                      </h5>

                      <div className="mt-2 mb-5 flex items-center max-h-[60%] justify-between">
                        <p className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-slate-900">
                            {/* $449 */}₹ {product.Product_Discount_Price}
                          </span>
                          <span className="text-sm text-slate-900 line-through">
                            {/* $699 */}₹ {product.Product_Price}
                          </span>
                        </p>
                        {/* <div className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                            5.0
                          </span>
                        </div> */}
                      </div>
                      {/* <div className="flex ">
                        <Link
                          to="/"
                          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 m-1 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Add to cart
                        </Link>
                        <Link
                          to="/"
                          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 m-1 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          Buy Now
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
