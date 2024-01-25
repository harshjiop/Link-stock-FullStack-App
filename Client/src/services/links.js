class Links {
    async getLinks(token) {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/link/all-link`, {
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
                    console.log('data :: ', data)
                }
            }
        } catch (error) {
            console.log('ERROR IN :: GETLINKS :: ', error)
        }
    }

    async addLinks(token, data) {
        try {
            const response = await fetch('http://localhost:8000/api/v1/link/add-link', {
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
            }


        } catch (error) {
            console.log('error is ', error);
        }
    }

    async getIcons(name) {
        try {
            const response = await fetch(`https://logo.clearbit.com/${name}.com`)
            if (response.ok) {
                const data = response.url
                // console.log(data)
                return data
            }
        } catch (error) {
            console.log('GET ICONS :: ', error);
        }

    }

    async deleteLinks(token, linkId) {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/link/delete-link`, {
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
            }


        } catch (error) {
            console.log('error is ', error);
        }
    }
}

export default new Links;