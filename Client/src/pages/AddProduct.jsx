import { MdKeyboardArrowRight } from "../icons/index";
import { useForm } from "react-hook-form";
import product from "../services/product";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader/Loader";
import { login } from "../store/authSlice";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { addStoreOwner, removeStoreOwner } from "../store/storeSlice";
import { LuImagePlus } from "../icons/index.js";
import { Switch } from "@mui/material";
export default function AddProduct() {
  const { register, handleSubmit, setValue } = useForm();
  const [token, setToken] = useState("");
  const [optionFieldsVisibility, setOptionalFieldsVisibility] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const [selectedImage, setSelectedImage] = useState();

  const navigate = useNavigate();
  const storeOwner = useSelector((state) => state.store.storeOwner);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    try {
      const localStoreOwner = localStorage.getItem("storeOwner");
      const localUserData = localStorage.getItem("userData");
      const localToken = localStorage.getItem("token");
      if (localUserData && localToken && localStoreOwner) {
        const parsedStoreOwner = JSON.parse(localStoreOwner);
        const userData = JSON.parse(localUserData);
        dispatch(login({ userData }));
        dispatch(addStoreOwner(parsedStoreOwner));
        setToken(localToken);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    } else if (authStatus) {
      navigate("/store/add-product");
    }
    setLoader(false);
  }, [authStatus, navigate, storeOwner]);

  // useEffect(() => {
  //   try {
  //     const localToken = localStorage.getItem("token");
  //     if (localToken) {
  //       setToken(localToken);
  //     }
  //   } catch (error) {
  //     dispatch(updateStatus({ error: true, text: error.message }));
  //   }
  // }, []);

  async function onSubmit(data) {
    if (data) {
      try {
        if (
          Object.entries(data)
            .filter(([key, value]) => key !== "Product_Retailer")
            .some(([key, value]) => {
              if (typeof value !== "string") {
                return false;
              }
              return value.trim() === "";
            })
        ) {
          throw new Error("All Fields Except Product_Retailer Are Required");
        }
        const respsonse = await product.addProduct(token, data);
        if (respsonse) {
          toast.success("Product Added");
          setValue("Product_Name");
          setValue("Product_Desc");
          setValue("Product_Price");
          setValue("Product_Discount_Price");
          setValue("Product_img");
          setValue("Product_Retailer");
          setValue("Product_Url");
          setOptionalFieldsVisibility(false);
          setAddAnother(false);
          setSelectedImage();
          if (!addAnother) {
            setTimeout(() => {
              navigate(`/store/@${storeOwner.username}`);
            }, 500);
          }
        }
      } catch (error) {
        console.log("ada", error);
        toast.error(error.message ?? "Error To Add Product");
      }
    }

    // console.log("submitted data is ", data);
    // toast.success("Product Added");
    // setValue("Product_Name");
    // setValue("Product_Desc");
    // setValue("Product_Price");
    // setValue("Product_Discount_Price");
    // setValue("Product_img");
    // setValue("Product_Retailer");
    // setOptionalFieldsVisibility(false);
    // setAddAnother(false);
    // setSelectedImage();
    // if (!addAnother) {
    //   navigate(`/store/${userData?.username ?? ""}`);
    // }
  }

  function handleFileChange(event) {
    const fileList = event.target.files;
    const fileNames = Array.from(fileList).map((file) => file.name);
    setSelectedImage(fileNames);
  }

  const handleOptionalFieldsVisibility = (event) => {
    // console.log(event.target.checked);
    setValue("Product_Retailer");
    setOptionalFieldsVisibility(event.target.checked);
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative text-white flex justify-center items-center py-4 overflow-y-auto no-scrollbar"
      style={{ fontFamily: "Roboto,sans-serif" }}
    >
      <ToastContainer autoClose={1000} theme="dark" />

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

      <div className="md:w-[80%] w-full px-2 md:px-0 h-full flex absolute top-5 mx-auto flex-col gap-10">
        {/*  breadcrumbs section */}
        <div className="flex gap-2 justify-start items-center font-bold selection:bg-transparent">
          <Link to="/admin/links">Home</Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <Link to={`/store/@${storeOwner.username}`} className="">
            Shop
          </Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <h2 className="text-[#28BDD1]">Add Product</h2>
        </div>

        {/* add product section */}
        <div className="w-[80%] mx-auto flex flex-col justify-center items-center gap-7 ">
          <h2 className="text-3xl font-bold text-[#28BDD1]">Add Product</h2>
          <form
            className="flex flex-col gap-5 items-start justify-center  w-full"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            {/* upper container / form container*/}
            <div className="w-full flex flex-col gap-3">
              {/* upper section / visible form section  */}
              <div className="flex flex-col md:flex-row gap-4 ">
                {/* left section / image input */}
                <div className="md:w-1/2 w-full h-full border-2 py-4 border-dashed border-[#28BDD1]  flex justify-center items-center relative">
                  <input
                    className="border rounded-lg bg-transparent text-center h-full w-full opacity-0 outline-none flex justify-center items-center absolute top-0 left-0 cursor-pointer"
                    type="file"
                    name="Product_img"
                    id="Product_img"
                    multiple
                    onInput={(event) => handleFileChange(event)}
                    {...register("Product_img")}
                  />

                  <div className=" w-full h-full flex flex-col justify-center items-center gap-2">
                    <div
                      className={`${
                        selectedImage ? "hidden" : "flex"
                      } flex-col justify-center items-center h-full`}
                    >
                      <LuImagePlus className="text-4xl text-[#28BDD1]" />
                      <h2 className="font-semibold">Drop Here</h2>
                    </div>

                    {selectedImage ? (
                      <div className=" max-h-full text-xs flex flex-wrap gap-3 justify-center items-end overflow-y-auto">
                        {selectedImage.map((image, index) => (
                          <div
                            key={index}
                            className="bg-black px-2 rounded-full h-6  flex justify-center items-center"
                          >
                            <h1>{image}</h1>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* right section / other visible input fields */}
                <div className="md:w-1/2 w-full flex flex-col gap-2">
                  {/* product name */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="text"
                    name="productName"
                    id="productName"
                    placeholder="Enter Product Name"
                    {...register("Product_Name")}
                  />

                  {/* product url */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="text"
                    name="Product_Url"
                    id="Product_Url"
                    placeholder="Enter Product Url"
                    {...register("Product_Url")}
                  />

                  {/* product price */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4  h-10 w-full outline-none"
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    placeholder="Enter Product Price"
                    {...register("Product_Price")}
                  />

                  {/* product discounted price */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="number"
                    name="discountedPrice"
                    id="discountedPrice"
                    placeholder="Enter Product Discounted Price"
                    {...register("Product_Discount_Price")}
                  />

                  {/* product description */}
                  <textarea
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4  w-full outline-none"
                    type="text"
                    name="productDesc"
                    id="productDesc"
                    placeholder="Enter Product description"
                    {...register("Product_Desc")}
                    cols="30"
                    rows="5"
                  ></textarea>

                  {/* product status switch */}
                  <div className="flex items-center gap-2">
                    <Switch
                      defaultChecked
                      color="success"
                      size="medium"
                      name="product_status"
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("Product_status")}
                    />
                    <label htmlFor="product_status">Product status</label>
                  </div>
                </div>
              </div>

              {/* lower section / optional fields section */}
              <div className="flex flex-col gap-3">
                {/* optional fields switch container */}
                <div className="flex gap-2 items-center">
                  <Switch
                    name="option-data-fields"
                    checked={optionFieldsVisibility}
                    onChange={handleOptionalFieldsVisibility}
                  />
                  <label htmlFor="option-data-fields">
                    Show Option Data Fields
                  </label>
                </div>

                {/* optional fields fields container */}
                <div
                  className={`${
                    optionFieldsVisibility
                      ? "flex h-1/2 md:w-1/2 w-full opacity-1"
                      : "h-0 w-0 opacity-0"
                  } transition-all duration-500 ease-linear`}
                >
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="text"
                    name="Product_Retailer"
                    id="Product_Retailer"
                    placeholder="Enter Product Retailer"
                    {...register("Product_Retailer")}
                  />
                </div>
              </div>
            </div>

            {/* lower container / buttons container */}
            <div className="flex gap-4 items-center w-full">
              <button
                className="bg-[#28BDD1] text-xs md:text-base rounded-lg  text-center h-10 w-1/3 outline-none cursor-pointer"
                onClick={handleSubmit}
              >
                Save
              </button>

              <button
                className="border-[#28BDD1] text-xs md:text-base border-2 rounded-lg  text-center h-10 w-1/3 outline-none cursor-pointer"
                onClick={() => {
                  handleSubmit();
                  setAddAnother(true);
                }}
              >
                Save & Add
              </button>

              <button
                type="reset"
                className="bg-yellow-400 text-xs md:text-base  rounded-lg  text-center h-10 w-1/3 outline-none cursor-pointer"
                onClick={() => {
                  setValue("Product_Name");
                  setValue("Product_Desc");
                  setValue("Product_Price");
                  setValue("Product_Discount_Price");
                  setValue("Product_img");
                  setValue("Product_Url");
                  setValue("Product_Retailer");
                  setOptionalFieldsVisibility(false);
                  setAddAnother(true);
                  setSelectedImage();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
