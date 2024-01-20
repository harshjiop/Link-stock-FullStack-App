class Authentication {
    async signUp(data) {
        console.log(data)
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
                return response
            } else {
                console.log('some issue', response)
            }
        } catch (error) {
            console.log('some error in catch', error)
            return error.message;
        }
    }
}

export default new Authentication;