import axios from '../axios';

const getCategoriesByOptions = (options) => {
    const formData = new FormData();
    options.forEach((option) => {
        formData.append('options', option);
    });
    return axios.post('/api/v1/categories/getCategoriesByOptions', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    // const formData = new FormData();

    // // Đối tượng optionsRequest
    // const optionsRequest = {
    //     name: 'John',
    //     age: '25',
    // };

    // // Tạo một Blob từ chuỗi JSON và thêm vào formData
    // const optionsBlob = new Blob([JSON.stringify(optionsRequest)], { type: 'application/json' });
    // console.log(optionsBlob);
    // formData.append('options', optionsBlob); // Gắn Blob JSON vào formData

    // return axios.post('/api/v1/categories/all', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    // });
};

const getCategoryById = (id) => {
    return axios.get(`/api/v1/categories/getCategoryById/${id}`);
};

export { getCategoriesByOptions, getCategoryById };
