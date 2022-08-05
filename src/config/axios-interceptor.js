import axios from "axios";
const onRequestSuccess = config => {

    const token = localStorage.getItem('market-token') || sessionStorage.getItem('market-token')
    const url_server = 'http://localhost:8081/';
    if (token) {
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.Authorization = `Bearer ${token}`;    // headerdagi Authorizationga token yasab berayabdi
    }
    config.url = `${url_server}${config.url}`;
    return config;



};

const setAxiosInter = onUnauthorized => {
    const onResponseError = err =>{
        const status = err.status || err.response.status
        if (status == 403 || status == 401){
            onUnauthorized();
        }
        if (status == 500){
            localStorage.removeItem('market-token')
            sessionStorage.removeItem('market-token')
        }
        return Promise.reject(err)
        };
        if (axios.interceptors){
            axios.interceptors.request.use(onRequestSuccess);
            axios.interceptors.response.use(res => res, onResponseError)
        }
}

    export {onRequestSuccess, setAxiosInter}