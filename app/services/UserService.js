import axios from 'axios';
import UserConstants from './../constants/UserConstants';
import jwt_decode from "jwt-decode";

/**
 * User Registration
 * @param {Object} user 
 */
function register(user) {

    return new Promise((resolve, reject) => {

        axios.post('user/register', user)
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
 * Authenticates the given user credentials.
 * @param {Object} user 
 */
function login(user) {

    return new Promise((resolve, reject) => {

        axios.post('user/login', user)
        .then( (response) => {

            // Decode the Token.
            const decodedToken = jwt_decode(response.data.token);

            // Store the details in localstorage.
            localStorage.setItem('userInfo', JSON.stringify({
                token: response.data.token,
                userDetails: { ...decodedToken.data },
                expiry: decodedToken.exp
            }));

            resolve(response);

        })
        .catch((error) => {

            reject({
                msg: UserConstants.USER_LOGIN_FAIL
            });

        })

    });

}

function getToken() {

    let userInfo = localStorage.getItem('userInfo')

    if (!userInfo) {
        return false;
    }

    userInfo = JSON.parse(userInfo)

    return userInfo.token;

}

function logout() {
    localStorage.removeItem('userInfo');
    window.location.reload();
}

export default {
    register,
    login,
    getToken,
    logout
};
