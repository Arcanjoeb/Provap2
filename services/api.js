import { Axios } from "axios";

//https://viacep.com.br/ws/01001000/json/
const api = Axios.create({
    baseURL: "https://viacep.com.br/ws/",
});

export default api;