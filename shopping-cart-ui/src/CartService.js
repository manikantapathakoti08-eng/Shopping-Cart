import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/cart`;

const getCart = () => {
    return axios.get(API_URL);
};

const addItem = (item) => {
    return axios.post(API_URL, item);
};

const updateItem = (name, item) => {
    return axios.put(`${API_URL}/${name}`, item);
};

const removeItem = (name) => {
    return axios.delete(`${API_URL}/${name}`);
};

const clearCart = () => {
    return axios.delete(`${API_URL}/clear`);
};

export default { getCart, addItem, updateItem, removeItem, clearCart };