import axios from '../axios';

const getAllVoucher = () => {
    return axios.get('/api/v1/vouchers/all');
};

export { getAllVoucher };
