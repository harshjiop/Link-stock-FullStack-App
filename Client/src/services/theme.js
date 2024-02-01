class Theme {
    async getThemeList(token) {
        try {
            const response = await fetch('/api/v1/theme/all-theme', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.data;
                }
            } else {
                throw new Error('ERROR IS', response.statusText)
            }
        } catch (error) {
            throw error
        }
    }

    async updateUserTheme(token, themeId) {
        try {
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
            const response = await fetch('/api/v1/users/update-theme', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({ theme: themeId })
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.data;
                }
            } else {
                throw new Error('ERROR IS', response)
            }
        } catch (error) {
            throw error
        }
    }


}

export default new Theme;