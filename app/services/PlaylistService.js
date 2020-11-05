import axios from 'axios';
import UserConstants from './../constants/UserConstants';

/**
 * Playlist Create
 * @param {Object} user 
 */
function create(song) {

    return new Promise((resolve, reject) => {

        axios.post('/api/playlist/create', song)
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
 * Fetches all playlist.
 */
function getAll() {

    return new Promise((resolve, reject) => {

        axios.get('/api/playlist/getAll')
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

/**
 * Fetches complete details about a playlist.
 */
function get(pl) {

    return new Promise((resolve, reject) => {

        axios.get('/api/playlist/get/' + pl._id)
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


/**
 * Updates the playlist.
 */
function update(pl) {

    return new Promise((resolve, reject) => {

        axios.post('/api/playlist/update/', pl)
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
    get,
    update
};
