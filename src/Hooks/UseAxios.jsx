import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://assignment-11-server-beta-ashen.vercel.app'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios