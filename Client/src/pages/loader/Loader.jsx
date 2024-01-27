import "./Loader.css";
export default function Loader() {
  return (
    <div className=" backdrop-blur-md h-screen w-screen bg-center bg-no-repeat bg-cover bg-slate-900 relative  flex justify-center items-center">
      {/* spinner container */}
      <div className="">
        {/* spinner section */}
        <div className="loader"></div>
      </div>
    </div>
  );
}
