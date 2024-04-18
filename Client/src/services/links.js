import axios from "axios";
const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
class Links {
    async getLinks(token) {
        try {
            const response = await apiInstance.get('/api/v1/link/all-link', {
                headers: {
                    Authorization: token
                }
            })
            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async addLinks(token, data) {
        try {
            const form = new FormData();
            form.append('title', data.title);
            form.append('url', data.url);
            form.append('isActive', true);
            form.append('thumbnail', data.thumbnail[0]);



            const response = await apiInstance.post('/api/v1/link/add-link', form, {
                headers: {
                    Authorization: token
                }
            })
            if (response) {
                const gotLinks = await this.getLinks(token)
                return gotLinks;
            }
        } catch (error) {
            throw error;
        }
    }

    async getIcons(name) {
        try {
            const response = await fetch(`https://logo.clearbit.com/${name}.com`)
            if (response.ok) {
                const data = response.url
                return data
            } else {
                throw new Error(`Links ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }

    }

    async deleteLinks(token, linkId) {
        try {
            const response = await apiInstance.post('/api/v1/link/delete-link', { linkId }, {
                headers: {
                    Authorization: token
                }
            })

            if (response) {
                const gotLinks = await this.getLinks(token);
                return gotLinks
            }
        } catch (error) {
            throw new Error(`Links ${error.message}`)
        }
    }

    async getGuestLinks(userName) {
        try {
            const response = await apiInstance.get(`/api/v1/${userName}`)
            return response.data.data[0];

        } catch (error) {
            throw error;
        }
    }

    async getHomeLinks() {
        try {
            const response = await apiInstance.get(`/api/v1`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new Links;