import { AdminContainer } from "../index";
import { MdEdit } from "../../icons";
import { useSelector, useDispatch } from "react-redux";
import { clearStatus, updateStatus } from "../../store/errorSlice";
export default function Design() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  return (
    <AdminContainer className="rounded-lg bg-white">
      {/* profile picture */}
      <div className=" relative my-2 hidden">
        <MdEdit className="p-2 text-4xl bg-white rounded-full absolute top-0 right-0  z-10 text-black" />
        <img
          className="w-[100px] rounded-full "
          src="https://cdnstorage.sendbig.com/unreal/female.webp"
          alt=""
        />
      </div>

      {/* content section  */}
      <div className="flex flex-col gap-5 w-full items-center py-4">
        <h2 className="w-[40%] selection:bg-transparent border-2 border-[#C92138] rounded text-center px-10 bg-zinc-100 py-3 font-bold">
          {userData?.fullName}
        </h2>
        <h2 className="w-[60%] selection:bg-transparent border-2 border-[#C92138] rounded text-center px-10 bg-zinc-100 py-3 font-bold">
          {userData?.email}
        </h2>
      </div>

      {/* theme section */}
      <div className="bg-[#F2F5FA] w-full rounded-tl-xl rounded-tr-xl rounded-e h-full px-10 py-2">
        <h1 className="text-xl font-bold w-full text-center">Themes</h1>

        <h2 className="text-red-600 text-xl w-full text-center my-5">
          Coming Soon...
        </h2>
      </div>
    </AdminContainer>
  );
}
