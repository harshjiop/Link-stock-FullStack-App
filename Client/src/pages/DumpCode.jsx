export default function DumpCode() {
    return (<>
        <div className="mobile lg:hidden  lg:z-0 z-[200] lg:w-[40%]  hidden lg:flex  w-full h-full   lg:static absolute top-0 left-0 lg:bg-transparent bg-slate-900/60  justify-center items-center">
            <div className="h-full z-0 w-full  bg-no-repeat bg-cover bg-center flex justify-center items-center ">
                {/* container */}
                {userTheme || selectedTheme ? (
                    <div
                        className="innerContainer"
                        style={
                            selectedTheme
                                ? selectedTheme.mainStyles.innerContainer
                                : userTheme.mainStyles.innerContainer
                        }
                    >
                        {/* upper section */}
                        <div
                            className="upperSection"
                            // style={userTheme.mainStyles.upperSection}
                            style={
                                selectedTheme
                                    ? selectedTheme.mainStyles.upperSection
                                    : userTheme.mainStyles.upperSection
                            }
                        >
                            {/* avatarContainer */}
                            <img
                                className="avatarContainer"
                                // style={userTheme.mainStyles.avatarContainer}
                                style={
                                    selectedTheme
                                        ? selectedTheme.mainStyles.avatarContainer
                                        : userTheme.mainStyles.avatarContainer
                                }
                                src={`${userData?.avatar?.url}`}
                                alt=""
                            />

                            {/* content section */}
                            <div
                                className="contentSection "
                                // style={userTheme.mainStyles.contentSection}
                                style={
                                    selectedTheme
                                        ? selectedTheme.mainStyles.contentSection
                                        : userTheme.mainStyles.contentSection
                                }
                            >
                                <h2 className="text-xs">{userData?.username}</h2>
                                <h1 className="text-xs">{userData?.fullName}</h1>
                                <h2 className="text-xs">{userData?.email}</h2>
                            </div>
                        </div>

                        {/* lower section */}
                        <div
                            className="lowerSection overflow-y-auto no-scrollbar h-[80%]"
                            // style={userTheme.mainStyles.lowerSection}
                            style={
                                selectedTheme
                                    ? selectedTheme.mainStyles.lowerSection
                                    : userTheme.mainStyles.lowerSection
                            }
                        >
                            {userLinks.length > 0 ? (
                                userLinks.map((link, index) => (
                                    <Link
                                        to={
                                            link.url.startsWith("http")
                                                ? link.url
                                                : link.url.startsWith("/")
                                                    ? `${window.location.protocol}` +
                                                    "//" +
                                                    window.location.host +
                                                    link.url
                                                    : `http://${link.url}`
                                        }
                                        key={index}
                                        className="linkSection"
                                        // style={userTheme.mainStyles.linkSection}
                                        style={
                                            selectedTheme
                                                ? selectedTheme.mainStyles.linkSection
                                                : userTheme.mainStyles.linkSection
                                        }
                                    >
                                        {/* icons */}
                                        <img
                                            className="linkIcon"
                                            // style={userTheme.mainStyles.linkIcon}
                                            style={
                                                selectedTheme
                                                    ? selectedTheme.mainStyles.linkIcon
                                                    : userTheme.mainStyles.linkIcon
                                            }
                                            src={`${link.thumbnail?.url}`}
                                            alt="sample"
                                        />

                                        {/* title */}
                                        <h1
                                            className="linkTitle"
                                            // style={userTheme.mainStyles.linkTitle}
                                            style={
                                                selectedTheme
                                                    ? selectedTheme.mainStyles.linkTitle
                                                    : userTheme.mainStyles.linkTitle
                                            }
                                        >
                                            {link.title}
                                        </h1>
                                    </Link>
                                ))
                            ) : !userLinks ? (
                                <div className="text-white h-full rounded-xl bg-slate-700/50"></div>
                            ) : (
                                <div className="w-full text-center text-red-500 ">
                                    Data Not Found
                                </div>
                            )}
                        </div>
                    </div>
                ) : userTheme ? (
                    <div className="h-full w-full bg-slate-300"></div>
                ) : (
                    <div className="border-4 rounded-3xl h-[550px] w-[360px] flex justify-center  items-center ">
                        <h1 className="text-red-400">Theme Not Found</h1>
                    </div>
                )}
            </div>

            <button
                onClick={handleMobile}
                className="lg:hidden inline-block  text-[#C92138]  absolute top-0 left-0 text-4xl w-10"
            >
                <MdOutlineCancel />
            </button>
        </div>
    </>)
}


// ***************************************************Theme Restoration*********************************************************************
const TestUserTheme = {
    name: "default",
    mainStyles: {
        innerContainer: {
            border: "5px solid #28BDD1",
            width: "381px",
            height: "80%",
            borderRadius: "15px",
            background: "rgba(0, 0, 0, 0.267)",
        },
        upperSection: {
            // border: "3px solid blue",
            height: "30%",
            borderRadius: "15px",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            padding: "15px 0",
            color: "white",
            gap: "10px"
        },
        avatarContainer: {
            // border: "1px solid red",
            border: "2px solid #28BDD1",
            borderRadius: "50%",
            width: "60px",
            height: "60px"
        },
        contentSection: {
            // border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1px",
            height: "40%",
            width: "100%"
        },
        lowerSection: {
            // border: "1px solid red",
            height: "70%",
            borderRadius: "10px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
        },
        linkSection: {
            border: "4px solid #28BDD1",
            width: "90%",
            height: "11%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "black",
            borderRadius: "5px",
            padding: "1px 5px",
            position: "relative",
        },
        linkIcon: {
            width: "30px",
            borderRadius: "50%",
        },
        linkTitle: {
            position: "absolute",
            left: "37%",
            color: "white",
        },
        wrapper: {
            height: '100vh',
            width: '100vw',
            backgroundColor: '#171C2F',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    previewStyles: {
        innerSection: {
            border: '3px solid #28BDD1',
            height: '80px',
            width: '120px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            backgroundColor: '#171C2F'
        },
        filter: {},
    }
};
// ***************************************************Theme Restoration*********************************************************************