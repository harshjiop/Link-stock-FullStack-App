import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Store() {
  const { userName } = useParams();
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // let sec = new Date().getSeconds();

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
      toast.error(error.message);
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
      toast.error("invalid user name");
    }
  }

  async function handleDelete(id) {
    if (token) {
      if (id) {
        const response = await product.deleteProduct(
          token,
          id,
          userName.split("@")[1]
        );
        if (response) {
          const data = response[0];
          dispatch(addStoreOwner(data));
          localStorage.setItem("storeOwner", JSON.stringify(response[0]));
          setIsDeleteClicked(false);
          toast.success("Product Deleted");
          // setLoader(false);
        }
      } else {
        toast.error("id not found");
      }
    } else {
      toast.error("token not found");
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

      {/* <ErrorTemplate /> */}
      <ToastContainer autoClose={1000} theme="dark" />

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
      <div className="md:w-[80%] w-full px-2  md:px-0 h-full flex flex-col gap-10 absolute top-0 mx-auto overflow-y-auto no-scrollbar overflow-x-hidden">
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
              src={`${storeOwner.avatar?.url}`}
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
        <div className="flex flex-col items-center gap-5 pb-4  h-full w-full">
          <h1 className="text-3xl font-bold">Products</h1>
          {/* products container */}
          <div className="flex gap-5 flex-wrap justify-between items-center p-5 pb-4">
            {storeOwner.UserProduct.map((product) => {
              return (
                <Link
                  target="_blank"
                  to={`${product.Product_Url}`}
                  key={product._id}
                  className="h-[420px] min-h-[300px]  w-[320px] relative mx-auto"
                >
                  {isAdmin ? (
                    <>
                      <MdEdit
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/store/edit-product/${product._id}`);
                        }}
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

                  <div className="relative h-full   flex w-full flex-col overflow-hidden rounded-lg border border-gray-100  shadow-md">
                    <div className="flex flex-col w-full h-[70%] text-white bg-white rounded-b-xl">
                      <div
                        className={`relative   flex h-[80%] overflow-hidden rounded-xl  bg-center bg-no-repeat bg-cover  
                    `}
                      >
                        <Slider slides={product.Product_Img} />

                        <span className="absolute  top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          {Math.round(
                            ((product.Product_Price -
                              product.Product_Discount_Price) /
                              product.Product_Price) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                      {/* name and price */}
                      <div className="my-1 px-5 h-[20%] ">
                        <h5 className="text-xl tracking-tight max-h-[40%] font-bold text-black overflow-y-hidden">
                          {product.Product_Name}
                          {/* Nike Air MX Super 2500 - Red */}
                        </h5>

                        <div className="  flex items-center max-h-[60%] justify-between">
                          <p className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-slate-900">
                              {/* $449 */}₹ {product.Product_Discount_Price}
                            </span>
                            <span className="text-sm text-slate-900 line-through">
                              {/* $699 */}₹ {product.Product_Price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* product desc */}
                    <div className="h-[40%] bg-transparent w-full rounded-xl text-white p-4 overflow-y-auto no-scrollbar">
                      <p className="w-full">{product.Product_Desc}</p>
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

function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className=" text-black w-full h-full">
      {slides.map((slide, index) => {
        return (
          <div
            className={`overflow-hidden border-2 rounded-xl border-[#28BDD1] h-full flex flex-col justify-center items-center bg-center bg-no-repeat bg-cover 
            ${index != current ? "hidden" : ""}
            `}
            key={index}
            style={{
              backgroundImage: `url(
                ${index === current && slide.Product_img_Cloudnary_Path}
              )`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
