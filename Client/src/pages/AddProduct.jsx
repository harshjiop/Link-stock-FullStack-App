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
export default function AddProduct() {
  const { register, handleSubmit, setValue } = useForm();
  const [token, setToken] = useState("");
  const authStatus = useSelector((state) => state.auth.status);

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
        setToken(localToken)
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
        const respsonse = await product.addProduct(token, data);
        if (respsonse) {
          toast.success("Product Added");
          setValue("Product_Name");
          setValue("Product_Desc");
          setValue("Product_Price");
          setValue("Product_Discount_Price");
          setValue("Product_img");
          setTimeout(() => {
            navigate(`/store/${userData?.username ?? ""}`);
          }, 500);
        }
      } catch (error) {
        console.log("errros on ad product is", error);
        toast.error("Error To Add Product");
      }
    }
    // console.log("submitted data is ", data);
  }
  if (loader) {
    return <Loader />;
  }
  return (
    <div
      className="h-screen w-full bg-[#171C2F] relative text-white flex justify-center items-center py-4"
      style={{ fontFamily: "Orbitron,sans-serif" }}
    >
      <ToastContainer autoClose={1000} theme="dark" />

      <div className="w-[80%] h-full flex flex-col gap-10">
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
        <div className="w-full flex flex-col justify-center items-center gap-7">
          <h2 className="text-3xl font-bold text-[#28BDD1]">Add Product</h2>

          <form
            className="flex flex-col gap-5 items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            {/* product name */}
            <input
              className="border-2 border-[#BEC2D3] rounded-lg bg-transparent text-center h-10 w-full outline-none"
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter Product Name"
              {...register("Product_Name")}
            />

            {/* product description */}
            <input
              className="border-2 border-[#BEC2D3] rounded-lg bg-transparent text-center h-10 w-full outline-none"
              type="text"
              name="productDesc"
              id="productDesc"
              placeholder="Enter Product description"
              {...register("Product_Desc")}
            />

            {/* product price */}
            <input
              className="border-2 border-[#BEC2D3] rounded-lg bg-transparent text-center h-10 w-full outline-none"
              type="number"
              name="productPrice"
              id="productPrice"
              placeholder="Enter Product Price"
              {...register("Product_Price")}
            />

            {/* product discounted price */}
            <input
              className="border-2 border-[#BEC2D3] rounded-lg bg-transparent text-center h-10 w-full outline-none"
              type="number"
              name="discountedPrice"
              id="discountedPrice"
              placeholder="Enter Product Discounted Price"
              {...register("Product_Discount_Price")}
            />

            <input
              className="border-2 border-[#BEC2D3] rounded-lg bg-transparent text-center h-10 w-full outline-none flex justify-center items-center"
              // type="file"
              type="file"
              name="Product_img"
              id="Product_img"
              multiple
              {...register("Product_img")}
            />

            <input
              className="bg-[#28BDD1] rounded-lg  text-center h-10 w-full outline-none cursor-pointer"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
