import { FaSquareReddit, MdDelete } from "../../icons";
import { AdminContainer } from "../index";
import { Link } from "react-router-dom";
import links from "../../services/links";
import { setLinks } from "../../store/linksSlice";
import { updateStatus, clearStatus } from "../../store/errorSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

export default function Links() {
  const [token, setToken] = useState();
  const [linksArray, setLinksArray] = useState([]);
  const [iconUrls, setIconUrls] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const userLinks = useSelector((state) => state.links.links);
  const userName = useSelector((state) => state.auth.userData?.username);

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    } catch (error) {
      dispatch(updateStatus({ error: true, text: error.message }));
    }
  }, []);
  useEffect(() => {
    if (userLinks) {
      setLinksArray(userLinks);
    }
  }, [userLinks]);

  function handleAddHeader() {
    const addFormContainer = document.querySelector(".addFormContainer");
    addFormContainer.classList.toggle("w-full");
    addFormContainer.classList.toggle("w-0");
    addFormContainer.classList.toggle("h-[90%]");
    addFormContainer.classList.toggle("h-0");
    addFormContainer.classList.toggle("opacity-0");
    addFormContainer.classList.toggle("opacity-1");
  }

  async function onSubmit(data) {
    handleAddHeader();
    if (token && data.title && data.url) {
      // const regex = /^(https?:\/\/)?(www\.)?/i;
      try {
        const response = await links.addLinks(token, {
          title: data.title,
          url: data.url,
          isActive: true,
        });
        if (response) {
          setValue("url", "");
          setValue("title", "");
          localStorage.setItem("links", JSON.stringify(response.data));
          dispatch(setLinks(response.data));
        }
      } catch (error) {
        dispatch(updateStatus({ error: true, text: error.message }));
      }
    }
  }

  async function handleLinkDelete(id) {
    if (token && id) {
      try {
        const response = await links.deleteLinks(token, id);
        if (response) {
          dispatch(setLinks(response.data));
          localStorage.setItem("links", JSON.stringify(response.data));
        }
      } catch (error) {
        dispatch(updateStatus({ error: true, text: error.message }));
      }
    } else {
      dispatch(updateStatus({ error: true, text: "Not A Valid User" }));
    }
  }

  function handleShare() {
    if (userName) {
      const baseUrl =
        window.location.hostname === "localhost" ? "http://localhost:5173" : "";
      const dummyInput = document.createElement("input");
      dummyInput.value = `${baseUrl}/${userName}`;
      document.body.appendChild(dummyInput);
      dummyInput.select();
      document.execCommand("copy");
      document.body.removeChild(dummyInput);

      document.querySelector(".shareButton").innerHTML = "Link Copied";
      setTimeout(() => {
        document.querySelector(".shareButton").innerHTML = "Share";
      }, 500);
    } else {
      console.log("invalid user name");
    }
  }

  return (
    <AdminContainer className="gap-1 justify-start relative">
      {/* add buttons */}

      <div className="h-[10%] mx-auto w-full flex justify-between items-center text-black text-lg  font-bold">
        <button
          onClick={handleAddHeader}
          className="text w-[30%] bg-[#28BDD1] py-2 rounded-xl"
        >
          Add Link
        </button>

        <Link
          to={`../../store/@${userName}`}
          className="text w-[30%] bg-[#28BDD1] py-2 rounded-xl text-center"
        >
          Store
        </Link>

        <button
          onClick={handleShare}
          className="text w-[30%] bg-[#28BDD1] py-2 rounded-xl shareButton"
        >
          Share
        </button>
      </div>

      {/* links container */}
      <div className="flex h-[90%]  flex-col gap-6 w-full overflow-y-auto no-scrollbar ">
        {linksArray.length > 0 ? (
          linksArray.map((data, index) => {
            return (
              <div
                key={data._id}
                className="flex  gap-8 bg-black px-5 py-2 rounded-md w-full text-white shadow-"
                style={{ boxShadow: "2px 5px #28BDD1" }}
              >
                <div className="flex justify-start gap-4 w-[90%] ">
                  {/* icons */}
                  {data ? (
                    <>
                      <img
                        className="w-[50px]"
                        src={`https://logo.clearbit.com/${data.title}.com`}
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <FaSquareReddit className="text-5xl text-red-500" />
                    </>
                  )}

                  {/* content */}
                  <div className=" flex flex-col w-[80%]">
                    {/* heading */}
                    <h1 className="text-xl font-semibold">{data.title}</h1>
                    <Link
                      className="font-semibold underline overflow-x-auto no-scrollbar w-full"
                      to={
                        data.url.startsWith("http")
                          ? data.url
                          : `http://${data.url}`
                      }
                    >
                      {data.url}
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center items-center w-[10%] ">
                  <button
                    className="text-2xl text-[#C92138]"
                    onClick={(e) => handleLinkDelete(data._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center text-red-600 font-bold text-2xl">
            data is not available
          </div>
        )}
      </div>

      <div className="w-0 h-0 opacity-0 transition-all duration-500 ease-linear addFormContainer    absolute  rounded-xl top-[10%] left-0 bg-black text-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-4 flex flex-col gap-4"
        >
          {/* title */}
          <div className="flex flex-col ">
            <label className="text-2xl font-bold" htmlFor="title">
              Header
            </label>
            <input
              className=" rounded text-black text-xl font-semibold outline-none bg-zinc-100 border-2 h-10"
              type="text"
              name="title"
              id="title"
              {...register("title", { required: true })}
            />
          </div>

          {/* url input */}
          <div className="flex flex-col">
            <label className="text-2xl font-bold" htmlFor="url">
              Enter URL
            </label>
            <input
              className="text-black text-xl rounded font-semibold outline-none bg-zinc-100 border-2 h-10"
              type="text"
              name="url"
              id="url"
              {...register("url", { required: true })}
            />
          </div>

          <input
            className="py-2 cursor-pointer text-xl text-white font-bold px-4 bg-[#28BDD1] rounded"
            type="submit"
            value="Add Link"
          />
        </form>
      </div>
    </AdminContainer>
  );
}
