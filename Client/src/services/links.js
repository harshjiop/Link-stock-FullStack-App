import axios from "axios";

class Links {
    async getLinks(token) {
        try {
            const response = await axios.get('/api/v1/link/all-link', {
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
            const response = await axios.post('/api/v1/link/add-link', data, {
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
            const response = await axios.post('/api/v1/link/delete-link', { linkId }, {
                headers: {
                    Authorization: token
                }
            })

            if (response) {
                const gotLinks = await this.getLinks(token);
                return gotLinks
            }
        } catch (error) {
            throw new Error(`Links ${response.statusText}`)
        }
    }

    async getGuestLinks(userName) {
        try {
            const response = await axios.get(`http://localhost:8000/${userName}`)
            return response.data.data[0];

        } catch (error) {
            throw error;
        }
    }
}

export default new Links;