import { FaSquareReddit } from "../../icons";
import { AdminContainer } from "../index";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <AdminContainer className="gap-10">
      {/* add buttons */}
      <div className=" mx-auto w-full flex justify-between items-center text-white text-lg  font-bold">
        <button className="text w-[40%] bg-[#C92138] py-2 rounded-xl">
          Add Heading
        </button>
        <button className="text w-[40%] bg-[#C92138] py-2 rounded-xl">
          Add Heading
        </button>
      </div>

      {/* links container */}
      <div className="flex flex-col gap-6 w-full">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="flex justify-start gap-8 bg-white px-5 py-2 rounded-md"
          >
            {/* icons */}
            <FaSquareReddit className="text-5xl text-red-500" />

            {/* content */}
            <div>
              {/* heading */}
              <h1 className="text-xl font-semibold">Reddit</h1>
              <Link
                className="font-semibold underline"
                to={"https://www.reddit.com/"}
              >
                https://www.reddit.com/
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminContainer>
  );
}
