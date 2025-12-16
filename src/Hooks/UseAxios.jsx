import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios