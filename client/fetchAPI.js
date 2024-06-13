import axios from "axios";



const connectifyAxios = () => {
    const connectifyAxios = axios.create({
        baseURL: 'http://localhost:5000',
        headers : {'content-type' : 'application/json'},
        withCredentials:true
    });
    return connectifyAxios;
}

export const authenticateUser = async (id) => {
    try {
        const response = await connectifyAxios().get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createUser = async (obj) => {
    try {
        const response = await connectifyAxios().post(`/users`, obj);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loginUser = async (obj) => {
    try {
        const response = await connectifyAxios().post(`/login`, obj);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};