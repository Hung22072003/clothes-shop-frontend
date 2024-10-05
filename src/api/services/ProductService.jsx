import axios from '../axios';

const getProductByCategory = (id, page = 0, size = 10) => {
    return axios.get(`/api/v1/products/getByCategory/${id}?page=${page}&size=${size}`);
};

const getProductById = (id) => {
    return axios.get(`/api/v1/products/getProductById/${id}`);
};

const searchProduct = (query, page, size) => {
    return axios.get(`/api/v1/products/search?query=${query}&page=${page}&size=${size}`);
};
export { getProductByCategory, getProductById, searchProduct };
