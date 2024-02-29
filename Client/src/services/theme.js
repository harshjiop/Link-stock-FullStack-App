import axios from "axios";

class Theme {
    async getThemeList(token) {
        try {
            const response = await axios.get('/api/v1/theme/all-theme', {
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
            const response = await axios.patch('/api/v1/users/update-theme', { theme: themeId }, {
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