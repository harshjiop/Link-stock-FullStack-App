export default function Login() {
  return <div className="h-screen w-full">
  {/* content */}
  <div className="w-full h-full flex justify-between ">
    {/* left section */}
    <div className="w-[40%] bg-center bg-no-repeat bg-cover h-full bg-[url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/pexels-photo-3844786%201_4cRCSqrpP.png?updatedAt=1705680095987)]"></div>

    {/* right section */}
    <div className="h-full w-[60%] gap-20  flex flex-col justify-center items-center">
      {/* upper heading */}
      <h1 className="text-7xl outline-4 text-[#F2EDE3]  drop-shadow-[0px_0px_2px_#C92138]">
        Login
      </h1>

      {/* form container */}
      <div className="w-full">
        <form className="w-full px-5 flex flex-col items-center gap-5">
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
            />
          </div>

          <input
            className="w-[30%] py-1  border-2 text-xl text-[#F2EDE3] rounded-2xl bg-[#C92138]"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  </div>
</div>
}
