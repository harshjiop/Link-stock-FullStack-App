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
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
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

  function onSubmit(data) {
    handleAddHeader();
    if (token && data.title && data.url) {
      // const regex = /^(https?:\/\/)?(www\.)?/i;
      links
        .addLinks(token, {
          title: data.title,
          url: data.url,
          isActive: true,
        })
        .then((data) => {
          if (data) {
            // setLinksArray(data.data);
            setValue("url", "");
            setValue("title", "");
            try {
              localStorage.setItem("links", JSON.stringify(data.data));
              dispatch(setLinks(data.data));
            } catch (error) {
              dispatch(updateStatus({ error: true, text: error.message }));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            }
          }
        })
        .catch((error) => {
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
    }
  }

  function handleLinkDelete(id) {
    if (token && id) {
      links
        .deleteLinks(token, id)
        .then((data) => {
          if (data) {
            try {
              dispatch(setLinks(data));
              localStorage.setItem("links", JSON.stringify(data));
            } catch (error) {
              dispatch(updateStatus({ error: true, text: error.message }));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            }
          }
        })
        .catch((error) => {
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
    } else {
      dispatch(updateStatus({ error: true, text: "Not A Valid User" }));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  }

  function handleShare() {
    if (userName) {
        const baseUrl =
          window.location.hostname === "localhost"
            ? "http://localhost:5173"
            : "";
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

      <div className="h-[10%] mx-auto w-full flex justify-between items-center text-white text-lg  font-bold">
        <button
          onClick={handleAddHeader}
          className="text w-[40%] bg-[#C92138] py-2 rounded-xl"
        >
          Add Heading
        </button>

        <button
          onClick={handleShare}
          className="text w-[40%] bg-[#C92138] py-2 rounded-xl shareButton"
        >
          Share
        </button>
      </div>

      {/* links container */}
      <div className="flex h-[90%]  flex-col gap-6 w-full overflow-y-auto no-scrollbar relative">
        {linksArray.length > 0 ? (
          linksArray.map((data, index) => {
            return (
              <div
                key={index}
                className="flex justify-between gap-8 bg-white px-5 py-2 rounded-md"
              >
                <div className="flex justify-between gap-8 ">
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
                  <div>
                    {/* heading */}
                    <h1 className="text-xl font-semibold">{data.title}</h1>
                    <Link
                      className="font-semibold underline"
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

                <div className="flex justify-center items-center">
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

      {/* w-0 h-0 opacity-0 */}
      {/* w-full h-[90%] opacity-1 */}
      <div className="w-0 h-0 opacity-0 transition-all duration-500 ease-linear addFormContainer    absolute  rounded-xl top-[10%] left-0 bg-white">
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
              className="border-[#C92138] text-xl font-semibold outline-none bg-zinc-100 border-2 h-10"
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
              className="border-[#C92138] text-xl font-semibold outline-none bg-zinc-100 border-2 h-10"
              type="text"
              name="url"
              id="url"
              {...register("url", { required: true })}
            />
          </div>

          <input
            className="py-2 cursor-pointer text-xl text-white font-bold px-4 bg-[#C92138] rounded"
            type="submit"
            value="Add Link"
          />
        </form>
      </div>
    </AdminContainer>
  );
}
