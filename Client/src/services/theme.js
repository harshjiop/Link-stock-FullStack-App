import axios from "axios";
const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
class Theme {
    async getThemeList(token) {
        try {
            const response = await apiInstance.get('/api/v1/theme/all-theme', {
                headers: {
                    Authorization: token
                }
            })
            if (response) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUserTheme(token, themeId) {
        try {
            const response = await apiInstance.patch('/api/v1/users/update-theme', { theme: themeId }, {
                headers: {
                    Authorization: token
                }
            })
            if (response) {
                return response.data.data
            }
        } catch (error) {
            throw error;
        }
    }


}

export default new Theme;