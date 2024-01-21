import { useEffect, useState } from "react";
import { AdminContainer } from "../index";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authentication from "../../services/authentication";

export default function Account() {
  const [data, setData] = useState({});
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register, watch } = useForm();
  useEffect(() => {
    console.log("userData",userData['user'] );
    setData(userData['user']);
  }, [userData]);


  const onSubmit = (data)=>{
    authentication.updateUser(userData.accessToken,data).then(response=>{
      if(response){
        console.log('updated');
      }
    })
  }

  if (data) {
    return (
      <AdminContainer className="rounded-lg bg-white">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          {/* user name */}
          <input
            className="bg-slate-300 text-center text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="username"
            id="username"
            defaultValue={data.username}
            placeholder="User Name"
            {...register('username',{required:true})}
          />

          {/* email */}
          <input
            className="bg-slate-300 text-center text-black outline-none text-xl py-2 font-bold"
            type="email"
            name="email"
            id="email"
            defaultValue={data.email}
            placeholder="Email"
            {...register('email',{required:true})}
          />

          {/* full name */}
          <input
            className="bg-slate-300 text-center text-black outline-none text-xl py-2 font-bold"
            type="text"
            name="fullname"
            id="fullname"
            defaultValue={data.fullName}
            placeholder="full name"
            {...register('fullName',{required:true})}
          />

          <input
            className="text-center bg-[#C92138] py-2 rounded-lg text-xl font-bold text-white"
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
