import axios from 'axios'
const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
class Product {

    async addProduct(token, data) {
        try {
            if (data) {
                const form = new FormData();
                form.append('Product_Desc', data.Product_Desc)
                form.append('Product_Discount_Price', data.Product_Discount_Price)
                form.append('Product_Name', data.Product_Name)
                form.append('Product_Price', data.Product_Price)
                form.append('Product_Retailer', data.Product_Retailer)
                form.append('Product_Url', data.Product_Url)

                for (let i = 0; i < data.Product_img.length; i++) {
                    form.append("Product_img", data.Product_img[i]);
                }

                const response = await apiInstance.post(`/api/v1/product/add-product`, form, {
                    headers: {
                        'Authorization': token,
                    }
                })

                if (response) {
                    return response.data
                }
            }

        } catch (error) {
            throw error;
        }
    }

    async getStoreDetails(userName) {
        try {
            const response = await apiInstance.get(`/api/v1/${userName}/Store`
            );

            if (response) {
                return response.data.data
            }

        } catch (error) {
            throw error;
        }
    }
}

export default new Product;