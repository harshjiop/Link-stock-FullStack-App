import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import links from "../services/links";
import { Error, Loader } from "../pages";
import { updateStatus, clearStatus } from "../store/errorSlice";

// ! importing theme from local
import themes from "../../data/themes.json";

export default function Guest() {
  const { userName } = useParams();
  const [userData, setUserData] = useState();
  const [userLinks, setUserLinks] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userTheme, setUserTheme] = useState();

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

  // ! setting Theme of the state
  useEffect(() => {
    console.log("theme from local", themes.themes[0]);
    setUserTheme(themes.themes[1]);
  }, []);

  useEffect(()=>{
    
  },[userData])

  if (userData && userLinks && userTheme) {
    return (
      <div className="wrapper" style={userTheme.mainStyles.wrapper}>
        <div
          className="innerContainer"
          style={userTheme.mainStyles.innerContainer}
        >
          {/* upper section */}
          <div
            className="upperSection"
            style={userTheme.mainStyles.upperSection}
          >
            {/* avatarContainer */}
            <img
              className="avatarContainer"
              style={userTheme.mainStyles.avatarContainer}
              src={`${userData?.avatar?.url}`}
              alt=""
            />

            {/* content section */}
            <div
              className="contentSection"
              style={userTheme.mainStyles.contentSection}
            >
              <h2>{userData?.username}</h2>
              <h1>{userData?.fullName}</h1>
              <h2>{userData?.email}</h2>
            </div>
          </div>

          {/* lower section */}
          <div
            className="lowerSection "
            style={userTheme.mainStyles.lowerSection}
          >
            {userLinks.length > 0 ? (
              userLinks.map((link, index) => (
                <Link
                  to={
                    link.url.startsWith("http")
                      ? link.url
                      : `http://${link.url}`
                  }
                  key={index}
                  className="linkSection"
                  style={userTheme.mainStyles.linkSection}
                >
                  {/* icons */}
                  <img
                    className="linkIcon"
                    style={userTheme.mainStyles.linkIcon}
                    src={`https://logo.clearbit.com/${link.title}.com`}
                    alt=""
                  />

                  {/* title */}
                  <h1
                    className="linkTitle"
                    style={userTheme.mainStyles.linkTitle}
                  >
                    {link.title}
                  </h1>
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
