class Authentication {
    async signUp(data) {
        try {
            const response = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username: data.username, fullName: data.fullName, email: data.email, password: data.password }),
            })

            if (response.ok) {
                return true
            } else {
                throw new Error(`User ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username: data.userName, password: data.password }),
            })
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`User ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUser(token, data) {

        try {
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
            const response = await fetch('/api/v1/users/update-account', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({ username: data.username, fullName: data.fullName, email: data.email }),
                // body: JSON.stringify({...data}),
            })
            if (response.ok) {
                return await response.json()
            } else {
                throw new Error(`User ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }
    }

    async getUser(userName) {
        try {
            const response = await fetch(`/api/v1/users/u/${userName}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    console.log(data)
                    return data.data;
                }
            } else {
                throw new Error(`User ${response.statusText}`)
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new Authentication;