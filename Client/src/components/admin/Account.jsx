import { useEffect, useState } from "react";
import { AdminContainer } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authentication from "../../services/authentication";
import { login } from "../../store/authSlice";
import { clearStatus, updateStatus } from "../../store/errorSlice";
import { MdEdit, LuMailX, TbMailCheck, LuMailWarning } from "../../icons";
import { MiniLoader } from "../../pages";
import { toast } from "react-toastify";

export default function Account() {
  const [data, setData] = useState({});
  const [token, setToken] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [miniLoader, setMiniLoader] = useState(false);
  const [isMailSent, setIsMailSend] = useState(false);

  const { handleSubmit, register, watch, getValues } = useForm({
    defaultValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      fullName: userData?.fullName || "",
      avatar: userData?.avatar.url || "",
    },
  });
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

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
    setData(userData);
  }, [userData]);

  const onSubmit = async (data) => {
    setMiniLoader(true);
    try {
      if (token) {
        const response = await authentication.updateUser(token, data);
        if (response) {
          const data = response.data;
          localStorage.setItem("userData", JSON.stringify(data));
          dispatch(login({ userData: data }));
          dispatch(updateStatus({ error: false, text: "Profile Updated" }));
          setMiniLoader(false);
        }

        // file update
        if (data.avatar[0].type) {
          const response = await authentication.updateUserAvatar(
            token,
            data.avatar[0]
          );
          if (response) {
            const data = response.data;
            dispatch(login({ userData: data }));
            localStorage.setItem("userData", JSON.stringify(data));
            dispatch(updateStatus({ error: false, text: "Profile Updated" }));
            setMiniLoader(false);
          }
        }
      }
    } catch (error) {
      setMiniLoader(false);
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  };

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function handleVerificationEmail() {
    if (userData.account_email_Verified) {
      dispatch(updateStatus({ error: false, text: "Email Already Verified" }));
      return;
    }
    try {
      const response = await authentication.sendAccountVerificationMail(token);
      if (response.statusCode === 200) {
        dispatch(
          updateStatus({ error: false, text: "Verification Mail Send" })
        );
        setIsMailSend(true);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }

  if (data) {
    return (
      <AdminContainer className="rounded-lg bg-black z-[100] selection:bg-transparent">
        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-7 w-full"
        >
          {/* avatar */}

          {/* profile picture */}
          <div className="relative my-2  px-10 mx-auto flex justify-center items-center">
            <label
              className="p-2 text-xl bg-white rounded-full absolute top-0 right-[20%] cursor-pointer  z-10 text-black border-2 border-[#28BDD1]"
              htmlFor="avatar"
            >
              <MdEdit />
            </label>

            <img
              className="w-[100px] h-[100px] rounded-full border-4 border-[#28BDD1]"
              // src={`https://cdnstorage.sendbig.com/unreal/female.webp`}
              src={
                selectedImage
                  ? selectedImage
                  : getValues("avatar")
                  ? getValues("avatar")
                  : authentication.getUserAvatar(getValues("fullName"))
              }
              alt="avatar"
            />
          </div>

          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("avatar")}
            onInput={onImageChange}
          />

          {/* user name */}
          <input
            className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold border md:w-[60%] w-[90%]"
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            {...register("username", { required: true })}
          />

          {/* email */}
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <input
              className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold md:w-[60%] w-[90%]"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            <div
              onClick={handleVerificationEmail}
              className="md:w-[60%] w-[90%]  px-2 cursor-pointer"
            >
              {userData?.account_email_Verified ? (
                <>
                  <div className="text-green-500 flex items-center gap-2">
                    <TbMailCheck className=" text-xl" />
                    <p>Email is Verified</p>
                  </div>
                </>
              ) : isMailSent ? (
                <>
                  {" "}
                  <div className="text-yellow-500 flex items-center gap-2">
                    <LuMailWarning className=" text-xl" />
                    <p>Email Sent Check MailBox</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-500 flex items-center gap-2">
                    <LuMailX className=" text-xl" />
                    <p>Email is not Verified</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* full name */}
          <input
            className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold md:w-[60%] w-[90%]"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="full name"
            {...register("fullName", { required: true })}
          />

          {/* <input
            className="text-center cursor-pointer px-2 bg-[#28BDD1] py-2 rounded-lg text-xl font-bold text-white"
            type="submit"
            value="Update Details"
          /> */}

          <button className="text-center cursor-pointer px-3 bg-[#28BDD1] py-2 rounded-lg text-xl font-bold text-white flex items-center justify-center gap-3 md:w-[60%] w-[90%]">
            Update Details
            {miniLoader && <MiniLoader />}
          </button>
        </form>
      </AdminContainer>
    );
  } else {
    return <h1>this is loading</h1>;
  }
}
