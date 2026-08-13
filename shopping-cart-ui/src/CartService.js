import axios from 'axios';

// This points directly to your running Spring Boot Tomcat server
const API_URL = 'http://localhost:8080/api/cart';

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