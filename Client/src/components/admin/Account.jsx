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
      // console.log('local token',typeof localToken)
      if (localToken) {
        setToken(localToken);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  }, []);

  useEffect(() => {
    // console.log("userData", userData);
    setData(userData);
    // setAvatarUrl(userData.avatar)
  }, [userData]);

  const onSubmit = (data) => {
    if (token) {
      authentication
        .updateUser(token, data)
        .then((response) => {
          if (response) {
            const data = response.data;
            try {
              localStorage.setItem("userData", JSON.stringify(data));
              dispatch(login({ userData: data }));
              dispatch(updateStatus({ error: false, text: "Profile Updated" }));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            } catch (error) {
              dispatch(updateStatus({ error: true, text: error.message }));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            }
          }
        })
        .catch((error) => {
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });

      if (data.avatar[0].type) {
        // data.avatar[0].type==="image/jpeg"
        authentication
          .updateUserAvatar(token, data.avatar[0])
          .then((response) => {
            if (response) {
              try {
                const data = response.data;
                dispatch(login({ userData: data }));
                localStorage.setItem("userData", JSON.stringify(data));
                dispatch(
                  updateStatus({ error: false, text: "Profile Updated" })
                );
                setTimeout(() => {
                  dispatch(clearStatus());
                }, 3000);
              } catch (error) {
                dispatch(updateStatus({ error: true, text: error.message }));
                setTimeout(() => {
                  dispatch(clearStatus());
                }, 3000);
              }
            }
          })
          .catch((error) => {
            console.log("er", error);
            dispatch(updateStatus({ error: true, text: error.message }));
            setTimeout(() => {
              dispatch(clearStatus());
            }, 3000);
          });
      }
    } else {
      dispatch(
        updateStatus({ error: true, text: "Invalid User Token Re-Login" })
      );
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  if (data) {
    return (
      <AdminContainer className="rounded-lg bg-white">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-7">
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
            className="text-center border-2 border-[#C92138] bg-zinc-100 text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="username"
            id="username"
            // defaultValue={data.username}
            placeholder="User Name"
            {...register("username", { required: true })}
          />

          {/* email */}
          <input
            className="border-2 border-[#C92138] bg-zinc-100 text-center text-black outline-none text-xl py-2 font-bold"
            type="email"
            name="email"
            id="email"
            // defaultValue={data.email}
            placeholder="Email"
            {...register("email", { required: true })}
          />

          {/* full name */}
          <input
            className="border-2 border-[#C92138] bg-zinc-100 text-center text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="fullname"
            id="fullname"
            // defaultValue={data.fullName}
            placeholder="full name"
            {...register("fullName", { required: true })}
          />

          <input
            className="text-center cursor-pointer px-2 bg-[#C92138] py-2 rounded-lg text-xl font-bold text-white"
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
