import axios from "axios";



const connectifyAxios = () => {
    const connectifyAxios = axios.create({
        baseURL: 'http://localhost:3000',
        // headers: {
        //     'Authorization': localStorage.getItem("auth_token")
        // }
    });
    return connectifyAxios;
}

export const authenticateUser = async (obj) => {
    try {
        const response = await connectifyAxios().get('/auth',obj);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};