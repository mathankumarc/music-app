import axios from 'axios';
import UserConstants from './../constants/UserConstants';

/**
 * Songs Create
 * @param {Object} user 
 */
function create(song) {

    return new Promise((resolve, reject) => {

        axios.post('/songs/create', song)
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

        axios.get('/songs/getAll')
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

export default {
    create,
    getAll,
};
