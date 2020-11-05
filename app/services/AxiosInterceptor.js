import axios from 'axios';
import UserService from './UserService'

axios.interceptors.request.use(function (config) {

    const token = UserService.getToken();

    if ((config.url.startsWith('/songs') || config.url.startsWith('/api/playlist')) && token) {
        config.headers.Authorization =  token;
    }

    return config;

});

axios.interceptors.response.use((response) => {

    return response;

}, (error) => {

    if (error.response.status === 401) {
        UserService.logout();
        return;
    }

    return Promise.reject(error);

});
