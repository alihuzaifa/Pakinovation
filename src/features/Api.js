import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
let baseUrl = 'https://freelancerwork.live/app-api/'
const service = axios.create({
    baseURL: baseUrl,
});
const getApiMethod = async (url, token) => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (token) {
            token = JSON.parse(token)
            const res = await service.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res;
        }
    } catch (error) {
        return error.message;
    }
};
const postApiMethod = async (url, data) => {
    try {
        const res = await service.post(url, data);
        return res;
    } catch (error) {
        return error.message;
    }
};
export { getApiMethod, postApiMethod };