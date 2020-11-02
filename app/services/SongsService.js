import axios from 'axios';
import UserConstants from './../constants/UserConstants';
import UserService from './UserService'

/**
 * Songs Create
 * @param {Object} user 
 */
function create(song) {

    return new Promise((resolve, reject) => {

        axios.post('songs/create', song)
        .then( (response) => {

            resolve(response);

        })
        .catch((error) => {

            reject({
                msg: UserConstants.USER_REGISTER_FAIL
            });

        })

    });

}

/**
 * Fetches all songs.
 */
function getAll() {

    return new Promise((resolve, reject) => {

        axios.get('songs/getAll')
        .then( (response) => {

            resolve(response.data);

        })
        .catch((error) => {

            reject({
                msg: UserConstants.USER_LOGIN_FAIL
            });

        })

    });

}

axios.interceptors.request.use(function (config) {
    const token = UserService.getToken();
    if (config.url.startsWith('songs') && token) {
        config.headers.Authorization =  token;
    }
    console.log(config);
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

export default {
    create,
    getAll,
};
