import { MdKeyboardArrowRight, MdOutlineCancel } from "../icons/index";
import { useForm } from "react-hook-form";
import product from "../services/product";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader/Loader";
import { login } from "../store/authSlice";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { addStoreOwner, removeStoreOwner } from "../store/storeSlice";
import { LuImagePlus, FaImage, MdAddCircleOutline } from "../icons/index.js";
import { Switch } from "@mui/material";
import { useImmer } from "use-immer";

export default function EditProduct() {
  const [productData, setProductData] = useState();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [token, setToken] = useState("");
  const { id } = useParams();
  const [optionFieldsVisibility, setOptionalFieldsVisibility] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isImageClicked, setIsImageClicked] = useState(false);

  const navigate = useNavigate();
  const storeOwner = useSelector((state) => state.store.storeOwner);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const [imageDeleteList, setImageDeleteList] = useImmer([]);
  const [displayImage, setDisplayImage] = useState([]);

  useEffect(() => {
    if (productData) {
      setValue("Product_Name", productData.Product_Name || "");
      setValue("Product_Url", productData.Product_Url || "");
      setValue("Product_Price", productData.Product_Price || "");
      setValue(
        "Product_Discount_Price",
        productData.Product_Discount_Price || ""
      );
      setValue("Product_Desc", productData.Product_Desc || "");
    }
  }, [productData]);

  // useEffect(() => {
  //   console.log("image to be deleted list", imageDeleteList);
  // }, [imageDeleteList]);

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
    }
    //  else if (authStatus) {
    //   navigate(`/store/@${storeOwner?.username}`);
    // }
    setLoader(false);
  }, [authStatus, storeOwner, navigate]);

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        const response = await product.getProductById(token, id);
        if (response) {
          setProductData(response);
          setDisplayImage(response.Product_Img);
        }
      })();
    }
  }, [id, token]);

  async function onSubmit(data) {
    if (data) {
      const regex = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      if (regex.exec(data.Product_Url) !== null) {
        try {
          const response = await product.updateProduct(
            token,
            data,
            imageDeleteList,
            id
          );

          if (response) {
            toast.success("Product Updated");
            setTimeout(() => {
              navigate(`/store/@${storeOwner?.username}`);
            }, 2000);
          }
        } catch (error) {
          toast.error(error?.message && "Error While Updating Product");
        }
      } else {
        setValue("Product_Url", productData.Product_Url || "");
        toast.error("Invalid Product URL");
      }
    }
  }

  function handleFileChange(event) {
    if (event.target.files.length + displayImage.length > 5) {
      toast.error("Only 5 images allowed");
      setValue("new_product_img");
      setSelectedImage([]);
    } else {
      const fileList = event.target.files;
      const fileUrls = Array.from(fileList).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage(fileUrls);
      console.log("files are ", event.target.files.length);
    }
  }

  async function handleImageDelete(id) {
    // setPreviousImage((draft) => {
    //   const image = draft.find((a) => a.Product_img_Cloudnary_Public_id === id);
    //   image.Product_img_Cloudnary_Public_id = "";
    //   image.Product_img_Cloudnary_Path = "";
    // });

    setImageDeleteList([...imageDeleteList, { id: id }]);
    setDisplayImage(
      displayImage.filter((img) => img.Product_img_Cloudnary_Public_id !== id)
    );
  }

  if (loader) {
    return <Loader />;
  }
  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative text-white flex justify-center items-center py-4 overflow-y-hidden no-scrollbar "
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

      {isImageClicked ? (
        <div className="w-screen h-screen z-[500]  bg-slate-950/80 relative">
          <div className="absolute top-0 right-0 p-2 border-l-[0.4rem] border-b-[0.4rem] rounded-sm border-black">
            <MdOutlineCancel
              className="text-3xl text-red-400 cursor-pointer"
              onClick={() => setIsImageClicked(false)}
            />
          </div>

          {displayImage.length < 5 ? (
            <div className="absolute top-0 left-0 p-2 border-r-[0.4rem] border-b-[0.4rem] rounded-sm border-black">
              <input
                className="border  rounded-lg bg-transparent text-center h-full w-full opacity-0 outline-none flex justify-center items-center absolute top-0 left-0 cursor-pointer"
                type="file"
                name="Product_img"
                id="Product_img"
                multiple
                onInput={(event) => handleFileChange(event)}
                {...register("new_product_img")}
              />
              <MdAddCircleOutline className="text-3xl text-[#28BDD1] cursor-pointer" />
            </div>
          ) : null}

          <div className="md:w-[70%] w-[80%] overflow-y-auto no-scrollbar  mx-auto h-full flex flex-col justify-center items-center  gap-4">
            <div className="flex w-full h-auto justify-center items-center flex-wrap gap-4 overflow-y-auto no-scrollbar">
              {displayImage.map((img) => {
                return (
                  <div
                    key={img.Product_img_Cloudnary_Public_id}
                    className="relative w-[280px] h-[280px] border-[#28BDD1] border-2 rounded"
                  >
                    <img
                      className="rounded h-full w-full"
                      src={img.Product_img_Cloudnary_Path}
                      alt="err"
                    />

                    <div className="absolute  top-0 right-0 border bg-slate-950/60 hover:bg-slate-950/80 duration-200 ease-linear border-l-2 border-b-2 rounded-sm border-black p-1">
                      <MdOutlineCancel
                        onClick={() =>
                          handleImageDelete(img.Product_img_Cloudnary_Public_id)
                        }
                        className=" text-3xl text-red-400 cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`h-1/2 ${
                selectedImage.length > 0 ? "" : "hidden"
              } flex flex-col items-center gap-3`}
            >
              <h2 className="text-xl font-bold text-[#28BDD1]">New</h2>
              <div className="flex w-full h-auto justify-center items-center flex-wrap gap-4 overflow-y-auto no-scrollbar">
                {selectedImage.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-[280px] h-[280px] border-[#28BDD1] border-2 rounded"
                  >
                    <img
                      className="rounded h-full w-full"
                      src={img}
                      alt="err"
                    />

                    <div className="absolute hidden top-0 right-0 border bg-slate-950/60 hover:bg-slate-950/80 duration-200 ease-linear border-l-2 border-b-2 rounded-sm border-black p-1">
                      <MdOutlineCancel
                        // onClick={() =>
                        //   handleImageDelete(img.Product_img_Cloudnary_Public_id)
                        // }
                        className=" text-3xl text-red-400 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:w-[80%] w-full px-2 md:px-0 h-full flex absolute top-5 mx-auto flex-col gap-10">
        {/*  breadcrumbs section */}
        <div className="flex gap-2 justify-start items-center font-bold selection:bg-transparent">
          <Link to="/admin/links">Home</Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <Link to={`/store/@${storeOwner?.username}`} className="">
            Shop
          </Link>
          <MdKeyboardArrowRight className="text-2xl" />
          <h2 className="text-[#28BDD1]">Edit Product</h2>
        </div>

        {/* add product section */}
        <div className="w-[80%] md:w-[50%] mx-auto flex flex-col justify-center items-center gap-7 ">
          <h2 className="text-3xl font-bold text-[#28BDD1]">Edit Product</h2>
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

                {/* right section / other visible input fields */}
                <div className="w-full mx-auto flex flex-col gap-2">
                  {/* product name */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="text"
                    name="Product_Name"
                    id="Product_Name"
                    placeholder="Enter Product Name"
                    // defaultValue={productData?.Product_Name}
                    // value={productData?.Product_Name}
                    {...register("Product_Name")}
                  />

                  {/* product url */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="text"
                    name="Product_Url"
                    id="Product_Url"
                    placeholder="Enter Product Url"
                    // defaultValue={productData?.Product_Url}
                    {...register("Product_Url")}
                  />

                  {/* product price */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4  h-10 w-full outline-none"
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    placeholder="Enter Product Price"
                    // defaultValue={productData?.Product_Price}
                    {...register("Product_Price")}
                  />

                  {/* product discounted price */}
                  <input
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4 h-10 w-full outline-none"
                    type="number"
                    name="discountedPrice"
                    id="discountedPrice"
                    placeholder="Enter Product Discounted Price"
                    // defaultValue={productData?.Product_Discount_Price}
                    {...register("Product_Discount_Price")}
                  />

                  {/* product description */}
                  <textarea
                    className="border-2 border-[#BEC2D3] rounded-lg bg-transparent px-4  w-full outline-none overflow-y-auto no-scrollbar"
                    type="text"
                    name="productDesc"
                    id="productDesc"
                    placeholder="Enter Product description"
                    // defaultValue={productData?.Product_Desc}
                    {...register("Product_Desc")}
                    cols="30"
                    rows="5"
                  ></textarea>

                  {/* product status switch and image button */}
                  <div className="flex items-center md:gap-32 justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Switch
                        // defaultChecked
                        color="success"
                        size="medium"
                        name="product_status"
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                        {...register("Product_status")}
                      />
                      <label htmlFor="product_status">Product status</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaImage
                        className="text-2xl text-[#28BDD1] cursor-pointer"
                        onClick={() => setIsImageClicked(true)}
                      />
                      <h2>Update Images</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* lower container / buttons container */}
            <div className="flex gap-4 items-center justify-between w-[100%] mx-auto">
              <button
                className="bg-[#28BDD1] text-xs md:text-base rounded-lg  text-center h-10 w-1/2 outline-none cursor-pointer"
                onClick={handleSubmit}
              >
                Save
              </button>

              <button
                type="reset"
                className="bg-yellow-400 text-xs md:text-base  rounded-lg  text-center h-10 w-1/2 outline-none cursor-pointer"
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
                  setSelectedImage([]);
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
