import { useEffect, useState } from "react";
import { AdminContainer } from "../index";
import { useSelector,useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authentication from "../../services/authentication";
import { login } from "../../store/authSlice";

export default function Account() {
  const [data, setData] = useState({});
  const [token, setToken] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register, watch } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      // console.log('local token',typeof localToken)
      if (localToken) {
        setToken(localToken);
      }else{
        console.log('token not found in local storage')
      }
    } catch (error) {
      console.log('error is ',error);
      // console.log('error is ',localToken);
    }
  }, []);

  useEffect(() => {
    // console.log("userData", userData);
    setData(userData);
  }, [userData]);

  const onSubmit = (data) => {
    if (token) {
      authentication.updateUser(token, data).then((response) => {
        if (response) {
          const data = response.data;
          try {
            localStorage.setItem('userData',JSON.stringify(data));
            dispatch(login({userData:data}))
          } catch (error) {
            console.log('error is ',error)
          }
         
        }
      });
    } else {
      console.log("token not found to update user",token);
    }
  };

  if (data) {
    return (
      <AdminContainer className="rounded-lg bg-white">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          {/* avatar */}
          <input className="hidden" type="file" name="input file" id="" />

          {/* user name */}
          <input
            className="text-center border-2 border-[#C92138] bg-zinc-100 text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="username"
            id="username"
            defaultValue={data.username}
            placeholder="User Name"
            {...register("username", { required: true })}
          />

          {/* email */}
          <input
            className="border-2 border-[#C92138] bg-zinc-100 text-center text-black outline-none text-xl py-2 font-bold"
            type="email"
            name="email"
            id="email"
            defaultValue={data.email}
            placeholder="Email"
            {...register("email", { required: true })}
          />

          {/* full name */}
          <input
            className="border-2 border-[#C92138] bg-zinc-100 text-center text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="fullname"
            id="fullname"
            defaultValue={data.fullName}
            placeholder="full name"
            {...register("fullName", { required: true })}
          />

          <input
            className="text-center cursor-pointer bg-[#C92138] py-2 rounded-lg text-xl font-bold text-white"
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
