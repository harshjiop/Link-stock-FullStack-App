import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import links from "../services/links";
import { Error, Loader } from "../pages";
import { updateStatus, clearStatus } from "../store/errorSlice";
export default function Guest() {
  const { userName } = useParams();
  const [userData, setUserData] = useState();
  const [userLinks, setUserLinks] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userName) {
      links
        .getGuestLinks(userName)
        .then((response) => {
          if (response) {
            setUserData(response);
            setUserLinks(response.UserLink);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          dispatch(updateStatus({ error: true, text: error.message }));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
    } else {
      setIsLoading(false);
      dispatch(updateStatus({ error: true, text: "User Name Not Found" }));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  }, []);

  if (userData && userLinks) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#F2EDE3]">
        <div className="w-[279px] h-[573px]  border-black rounded-3xl bg-blue-100 flex flex-col gap-5 border-[10px]  ">
          {/* upper section */}
          <div className="h-[50%] rounded-xl bg-white">
            {/* upper section content section */}
            <div className="relative bg-no-repeat bg-center bg-cover h-[50%] rounded-xl bg-[url(https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
              {/* content container */}
              <div className="absolute bottom-[-100%] left-0 flex flex-col gap-2  w-full justify-center items-center">
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  // src="https://xsgames.co/randomusers/assets/avatars/male/77.jpg"
                  src= {`${userData?.avatar?.url}`}
                  alt=""
                />
                {/* name and bio */}
                <div className="flex flex-col gap-2 text-lg font-bold justify-center items-center">
                  <h1>{userData?.fullName}</h1>
                  <h2>{userData?.email}</h2>
                  <h3>{userData?.username}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* lower section */}
          <div className=" rounded-xl  h-[50%] overflow-y-auto no-scrollbar flex flex-col gap-3 ">
            {userLinks.length > 0 ? (
              userLinks.map((link, index) => (
                <Link
                  to={
                    link.url.startsWith("http")
                      ? link.url
                      : `http://${link.url}`
                  }
                  key={index}
                  className="flex w-[90%] items-center mx-auto justify-start gap-8 bg-white px-2 py-1  rounded-md"
                >
                  {/* icons */}
                  <img
                    className="w-[30px] h-[30px] "
                    src={`https://logo.clearbit.com/${link.title}.com`}
                    alt=""
                  />

                  {/* right content */}
                  <div>
                    {/* title */}
                    <h1 className="text-lg font-bold capitalize ">
                      {link.title}
                    </h1>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full text-center text-red-500">
                Data Not Found
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <Error />
        )}
      </>
    );
  }
}
