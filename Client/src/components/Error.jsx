import { updateStatus, clearStatus } from "../store/errorSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineCancel } from "../icons";
import { Link, useNavigate } from "react-router-dom";
export default function Error({
  className = "bottom-[-10rem]",
  statusClassName = "bottom-20 md:bottom-4",
}) {
  const errorText = useSelector((state) => state.errors.text);
  const isError = useSelector((state) => state.errors.error);
  const status = useSelector((state) => state.errors.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={` h-20 ${className}  z-[100] transition-all ease-linear duration-200  fixed left-0 w-full   flex ${
        status ? `${statusClassName}` : "opacity-0"
      }`}
    >
      <div
        className={`min-w-[30%] h-18 mx-auto  ${
          isError ? "bg-red-400" : "bg-green-400"
        }  backdrop-blur rounded-lg flex justify-between items-center text-white gap-3 px-4`}
      >
        {/* icons */}
        <div className="text-[3rem] text-white px-4">
          <MdOutlineCancel />
        </div>

        {/* middle content */}
        <div className="w-full">
          {/* upper content */}
          <div className="flex gap-1 items-center">
            <h1 className="text-extrabold text-lg">
              {isError ? "ERROR" : "SUCCESS"} :
            </h1>
            <h1>{errorText}</h1>
          </div>

          {/* lower loading */}
          <div className="border w-full loadingBar"></div>
        </div>

        {/* bar */}
        <div className="border-2 rounded-xl h-[80%]"></div>

        {/* Close */}
        <h2
          //   onClick={() => dispatch(clearStatus())}
          onClick={() => {
            dispatch(clearStatus());
          }}
          className="font-bold text-slate-200 cursor-pointer"
        >
          CLOSE
        </h2>
      </div>
    </div>
  );
}
