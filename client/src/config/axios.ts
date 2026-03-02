import axios from "axios";

const apiClient = axios.create({
    //use env in prod   
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


export default apiClient