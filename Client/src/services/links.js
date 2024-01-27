class Links {
    async getLinks(token) {
        try {
            const response = await fetch(`/api/v1/link/all-link`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                }
            })

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // const data = await response.json()
                    return await response.json();
                }
            } else {
                throw new Error(`Links ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }
    }

    async addLinks(token, data) {
        try {
            const response = await fetch('/api/v1/link/add-link', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const gotLinks = await this.getLinks(token)
                return gotLinks;
            } else {
                throw new Error(`Links ${response.statusText}`)
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
                // console.log(data)
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
            const response = await fetch(`/api/v1/link/delete-link`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ linkId: linkId })
            })

            if (response.ok) {
                const gotLinks = await this.getLinks(token)
                return gotLinks.data;
            } else {
                throw new Error(`Links ${response.statusText}`)
            }


        } catch (error) {
            throw error;
        }
    }
}

export default new Links;