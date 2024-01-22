class Authentication {
    async signUp(data) {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username: data.username, fullName: data.fullName, email: data.email, password: data.password }),
            })

            if (response.ok) {
                console.log('success', response)
                return true
            } else {
                console.log('some issue', response)
                return false;
            }
        } catch (error) {
            console.log('some error in catch', error)
            return error;
        }
    }

    async login(data) {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username: data.userName, password: data.password }),
            })
            if (response.ok) {
                return await response.json();
            } else {
                console.log('some issue', response)
            }
        } catch (error) {
            console.log('some error in catch', error)
            return error.message;
        }
    }

    async updateUser(token,data) {
        // console.log('token',typeof token);
        console.log('token',`${token}`);

        try {
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
            const response = await fetch('http://localhost:8000/api/v1/users/update-account', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({username: data.username, fullName: data.fullName, email: data.email}),
                // body: JSON.stringify({...data}),
            })
            if (response.ok) {
                return await response.json()
            } else {
                console.log('some issue', response)
            }
        } catch (error) {
            console.log('some error in catch', error)
            return error.message;
        }
    }

    async getUser(userName) {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/u/${userName}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    console.log(data)
                    return data.data;
                }
            } else {
                console.log('some issue', response.status, response.statusText)
                return false;
            }
        } catch (error) {
            console.log('some error in catch', error)
            return error;
        }
    }
}

export default new Authentication;