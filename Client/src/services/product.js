import axios from 'axios'
class Product {

    async addProduct(token, data) {
        try {
            // const form = new FormData();

            // for (const key in data) {
            //     if (Object.hasOwnProperty.call(data, key)) {
            //         const value = data[key];
            //         form.append(key, value);
            //     }
            // }
            // console.log('rpoduct data ', data)
            const response = await axios.post(`/api/v1/product/add-product`, data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new Product;