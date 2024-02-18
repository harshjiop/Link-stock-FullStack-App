import axios from 'axios'
class Product {

    async addProduct(token, data) {
        try {
            const form = new FormData();
            form.append('Product_Desc', data.Product_Desc)
            form.append('Product_Discount_Price', data.Product_Discount_Price)
            form.append('Product_Name', data.Product_Name)
            form.append('Product_Price', data.Product_Price)

            for (let i = 0; i < data.Product_img.length; i++) {
                form.append("Product_img", data.Product_img[i]);
            }

            const response = await axios.post(`/api/v1/product/add-product`, form, {
                headers: {
                    'Authorization': token,
                }
            })

            if (response) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }

    async getStoreDetails(token, userName) {
        try {
            const response = await axios.get(`/api/v1/${userName}/Store`, {
                headers: {
                    'Authorization': token
                }
            });

            if (response) {
                return response.data.data
            }

        } catch (error) {
            throw error;
        }
    }
}

export default new Product;