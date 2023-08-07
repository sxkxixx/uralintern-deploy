import axios from 'axios'
import {domen} from "../redux/authApi";

const api = axios.create({
    baseURL: `${domen}`,
});

export default api;
