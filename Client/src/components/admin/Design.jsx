import { AdminContainer } from "../index";
import { MdEdit } from "../../icons";
export default function Design() {
  return (
    <AdminContainer className="rounded-lg bg-white">
      {/* profile picture */}
      <div className=" relative my-2">
        <MdEdit className="p-2 text-4xl bg-white rounded-full absolute top-0 right-0  z-10 text-black" />
        <img
          className="w-[100px] rounded-full "
          src="https://cdnstorage.sendbig.com/unreal/female.webp"
          alt=""
        />
      </div>

      {/* content section  */}
      <div className="flex flex-col gap-5 w-full items-center">
        <h2 className="w-[30%] text-center px-10 bg-slate-300 py-3 font-bold">
          Name
        </h2>
        <h2 className="w-[50%] text-center px-10 bg-slate-300 py-3 font-bold">
          Bio
        </h2>
      </div>

      {/* theme section */}
      <div className="bg-[#F2F5FA] w-full rounded-tl-xl rounded-tr-xl rounded-e h-full px-10 py-2">
        <h1 className="text-xl font-bold w-full text-center">Themes</h1>
      </div>
    </AdminContainer>
  );
}
