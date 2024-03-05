import axios from "axios";
const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
class Authentication {
    async signUp(data) {
        try {
            const response = await apiInstance.post('/api/v1/users/register', data)

            if (response.data) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await apiInstance.post('/api/v1/users/login', {
                username: data.userName, password: data.password
            })

            return response.data

        } catch (error) {
            throw error;
        }
    }

    async updateUser(token, data) {
        try {
            const response = await apiInstance.patch('/api/v1/users/update-account', { ...data }, {
                headers: {
                    'Authorization': token
                },
            })

            return response.data

        } catch (error) {
            throw error;
        }
    }

    async getUser(userName) {
        try {
            const response = await apiInstance.get(`/api/v1/users/u/${userName}`)

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
            const response = await apiInstance.patch('/api/v1/users/avatar', formData, {
                headers: {
                    'Authorization': token
                }
            })

            return response.data;

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
            const response = await apiInstance.post('/api/v1/users/forget-password', {
                email
            })
            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyResetPassword(token, password) {
        try {
            const response = await apiInstance.patch('/api/v1/users/forget-password', {
                token,
                password
            })
            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async sendAccountVerificationMail(token) {
        try {
            const response = await apiInstance.get('/api/v1/users/email-send', {
                headers: {
                    'Authorization': token
                }
            })
            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async confirmAccountVerificationMail(verificationToken) {
        try {
            const response = await apiInstance.post('/api/v1/users/email-verifide', {
                token: verificationToken
            }
            )
            if (response) {
                return response.data.data
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new Authentication;