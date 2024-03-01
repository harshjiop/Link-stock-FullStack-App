import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover h-screen w-screen bg-[url(https://ik.imagekit.io/8fgpvoiai/Link%20Stock/pexels-photo-2422464_FnRIrHhNH.jpeg?updatedAt=1706291451448)] relative"
      style={{ fontFamily: "Roboto,sans-serif" }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/40 backdrop-blur-sm flex justify-center items-center flex-col gap-3">
        {/* upper logo */}
        <div className=" w-[200px] h-[100px] bg-slate-900/50 px-6 py-4 backdrop-blur-xl rounded-xl flex justify-center items-center">
          <img className="rounded" src="https://ik.imagekit.io/8fgpvoiai/Link%20Stock/800w-mNb5D51JPec_Wut2QXm78.jpg?updatedAt=1708786481427" alt="" />
        </div>

        {/* content */}
        <div className="flex flex-col justify-center items-center bg-slate-900/50 px-6 py-4 backdrop-blur-xl rounded-xl">
          <h1 className="text-[6rem] font-bold text-red-500">404</h1>
          <h1 className="text-3xl font-semibold text-red-400">
            Page Not Found
          </h1>
        </div>

        {/* home */}
        <Link
          className="px-6 py-2 bg-slate-900/80 rounded-xl text-white text-2xl font-bold"
          to={"/"}
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}
