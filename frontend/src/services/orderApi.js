import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
};

