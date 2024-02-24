import { useEffect, useState } from "react";
import { AdminContainer } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authentication from "../../services/authentication";
import { login } from "../../store/authSlice";
import { clearStatus, updateStatus } from "../../store/errorSlice";
import { MdEdit } from "../../icons";

export default function Account() {
  const [data, setData] = useState({});
  const [token, setToken] = useState("");
  const userData = useSelector((state) => state.auth.userData);
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
    try {
      if (token) {
        const response = await authentication.updateUser(token, data);
        if (response) {
          const data = response.data;
          localStorage.setItem("userData", JSON.stringify(data));
          dispatch(login({ userData: data }));
          dispatch(updateStatus({ error: false, text: "Profile Updated" }));
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
          }
        }
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  };

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  if (data) {
    return (
      <AdminContainer className="rounded-lg bg-black z-[100]">
        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-7"
        >
          {/* avatar */}

          {/* profile picture */}
          <div className="relative my-2 w-full px-10 mx-auto ">
            <label
              className="p-2 text-xl bg-white rounded-full absolute top-0 right-[45%]  z-10 text-black"
              htmlFor="avatar"
            >
              <MdEdit />
            </label>

            <img
              className="w-[100px] h-[100px] rounded-full "
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
            className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            {...register("username", { required: true })}
          />

          {/* email */}
          <input
            className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />

          {/* full name */}
          <input
            className="text-center  bg-white rounded text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="full name"
            {...register("fullName", { required: true })}
          />

          <input
            className="text-center cursor-pointer px-2 bg-[#28BDD1] py-2 rounded-lg text-xl font-bold text-white"
            type="submit"
            value="Update Details"
          />
        </form>
      </AdminContainer>
    );
  } else {
    return <h1>this is loading</h1>;
  }
}
