import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authentication from "../services/authentication";
export default function Signup() {
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm();

  function onsubmit(data) {
    if(data.password === data.re_password){
      authentication.signUp(data).then(response=>{
        if(response){
          console.log('account created')
          navigate('/login')
        }else{
          console.log('account not created')
        }
      }).catch(error=>{
        console.log('error is',error)
      })
    }else{
      alert('Password Not Matched')
    }
  }

  return (
    <div className="h-screen w-full">
      {/* content */}
      <div className="w-full h-full flex justify-between ">
        {/* left section */}
        <div className="w-[40%] bg-center bg-no-repeat bg-cover h-full bg-[url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/pexels-photo-3844786%201_4cRCSqrpP.png?updatedAt=1705680095987)]"></div>

        {/* right section */}
        <div className="h-full w-[60%] gap-20  flex flex-col justify-center items-center">
          {/* upper heading */}
          <h1 className="text-7xl outline-4  text-[#F2EDE3]  drop-shadow-[0px_0px_2px_#C92138]">
            Signup
          </h1>

          {/* form container */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="w-full px-5 flex flex-col items-center gap-5"
            >
              {/* username */}
              <div className="w-[30%] flex flex-col">
                <label className="text-xl font-semibold" htmlFor="userName">
                  Username
                </label>
                <input
                  className="text-xl border-2 outline-none px-2  rounded-xl border-[#C92138]"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter username"
                  {...register("username", { required: true })}
                />
              </div>

               {/* full name */}
               <div className="w-[30%] flex flex-col">
                <label className="text-xl font-semibold" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="text-xl border-2 outline-none px-2  rounded-xl border-[#C92138]"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter fullName"
                  {...register("fullName", { required: true })}
                />
              </div>

               {/* email */}
               <div className="w-[30%] flex flex-col">
                <label className="text-xl font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="text-xl border-2 outline-none px-2  rounded-xl border-[#C92138]"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
              </div>

              {/* password */}
              <div className="w-[30%] flex flex-col">
                <label className="text-xl font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="text-xl border-2 outline-none px-2  rounded-xl border-[#C92138]"
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>

              {/* retype password */}
              <div className="w-[30%] flex flex-col">
                <label className="text-xl font-semibold" htmlFor="re-password">
                  Retype-Password
                </label>
                <input
                  className="text-xl border-2 outline-none px-2  rounded-xl border-[#C92138]"
                  type="text"
                  name="re-password"
                  id="re-password"
                  placeholder="Re-Enter Password"
                  {...register("re_password", { required: true })}
                />
              </div>

              <input
                className="w-[30%] py-1  border-2 text-xl text-[#F2EDE3] rounded-2xl bg-[#C92138]"
                type="submit"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
