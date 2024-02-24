import axios from "axios";

class Authentication {
    async signUp(data) {
        try {
            const response = await axios.post('/api/v1/users/register', data)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await axios.post('/api/v1/users/login', {
                username: data.userName, password: data.password
            })
            if (response.statusText === 'OK') {
                return response.data
            } else {
                console.log(response)
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUser(token, data) {
        try {
            const response = await axios.patch('/api/v1/users/update-account', { ...data }, {
                headers: {
                    'Authorization': token
                },
            })
            if (response.statusText = 'OK') {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async getUser(userName) {
        try {
            const response = await axios.get(`/api/v1/users/u/${userName}`)

            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    // https://cloud.appwrite.io/v1/avatars/initials?name=Lokesh+Ghosh&width=80&height=80&project=console
    async updateUserAvatar(token, file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const response = await axios.patch('/api/v1/users/avatar', formData, {
                headers: {
                    'Authorization': token
                }
            })
            if (response.statusText === 'OK') {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    getUserAvatar(name) {
        console.log('name', name)
        const updatedName = name.replace(/\s/g, '+')
        const url = `https://cloud.appwrite.io/v1/avatars/initials?name=${updatedName}`
        return url;
    }

    async sendResetPasswordMail(email) {
        try {
            const response = await axios.post('/api/v1/users/forget-password', {
                email
            })
            if (response) {
                return response.data
            } else {
                console.log(response)
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyResetPassword(token,password){
        try {
            const response = await axios.patch('/api/v1/users/forget-password', {
                token,
                password
            })
            if (response) {
                return response.data
            } else {
                console.log(response)
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new Authentication;