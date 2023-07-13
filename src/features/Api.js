import axios from "axios";
let baseUrl = 'https://freelancerwork.live/app-api/'
const service = axios.create({
    baseURL: baseUrl,
});
const getApiMethod = async (url, token) => {
    try {
        const res = await service.get(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWlucyAiLCJ1c2VyX2lkIjpudWxsLCJleHAiOjE2ODk4NzE0MzV9.s3uXpViqKCW2VABRLcjEjm8rc4B7sAUz5cLx549IgcM`,
            },
        });
        return res;
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