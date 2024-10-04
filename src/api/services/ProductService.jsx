import axios from '../axios';

const getProductByCategory = (id) => {
    return axios.get(`/api/v1/products/getByCategory/${id}`);
};

const getProductById = (id) => {
    return axios.get(`/api/v1/products/getProductById/${id}`);
};
export { getProductByCategory, getProductById };
