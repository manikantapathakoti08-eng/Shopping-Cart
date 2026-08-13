import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

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