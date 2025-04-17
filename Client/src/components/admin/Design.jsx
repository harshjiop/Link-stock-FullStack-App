import { AdminContainer } from "../index";
import { MdEdit } from "../../icons";
import { useSelector, useDispatch } from "react-redux";
import { clearStatus, updateStatus } from "../../store/errorSlice";
import { useCallback, useEffect, useState } from "react";
import themeService from "../../services/theme";
import axios from "axios";
import { ThemePreview } from "../index";
import { setSelectedThemesId } from "../../store/themeSlice";
import { login } from "../../store/authSlice";
import { borderRadius, display } from "@mui/system";
export default function Design() {
  const userData = useSelector((state) => state.auth.userData);
  const themesList = useSelector((state) => state.themes.themes);
  const selectedThemeId = useSelector((state) => state.themes.selectedThemeId);
  const dispatch = useDispatch();
  const [isThemeSelected, setIsThemeSelected] = useState(false);

  function handleClick(id) {
    if (id) {
      dispatch(setSelectedThemesId(id));
      setIsThemeSelected(true);
    }
  }

  async function handleUpdateTheme() {
    if (selectedThemeId) {
      try {
        const localToken = localStorage.getItem("token");
        if (localToken) {
          const response = await themeService.updateUserTheme(
            localToken,
            selectedThemeId
          );
          if (response) {
            setIsThemeSelected(false);
            dispatch(login({ userData: response }));
            localStorage.setItem("userData", JSON.stringify(response));
            dispatch(
              updateStatus({ error: false, text: "Theme Updated Successfully" })
            );
          }
        } else {
          dispatch(updateStatus({ error: true, text: "Token Not Found" }));
        }
      } catch (error) {
        dispatch(updateStatus({ error: true, text: error.message }));
      }
    }
  }



  return (
    <>
      {themesList.length > 0 ? (
        <AdminContainer className="rounded-lg z-[100] bg-black flex flex-col justify-between">
          <div className="w-full h-[20%] flex flex-col gap-2 justify-center items-center">
            <h1 className="text-white text-3xl font-bold"> Themes</h1>

            <button
              disabled={!isThemeSelected}
              onClick={handleUpdateTheme}
              className="bg-[#28BDD1] px-6 py-2 rounded-xl text-lg text-white font-bold disabled:bg-[#4e9faa]"
            >
              Save Changes
            </button>
          </div>

          {/* theme preview wrapper */}
          <div className="h-[80%] w-full  flex flex-wrap justify-center gap-10 py-4  overflow-y-auto no-scrollbar">
            {themesList.map((theme, index) => (
              <ThemePreview
                key={index}
                previewStyles={theme.previewStyles}
                name={theme.name}
                eventHandler={() => handleClick(theme._id)}
                className="cursor-pointer selection:bg-transparent"
              />
            ))}
          </div>
        </AdminContainer>
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
}
