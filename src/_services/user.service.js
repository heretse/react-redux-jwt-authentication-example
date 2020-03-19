import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAllDevices
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
        mode: 'cors', // no-cors, cors, *same-origin
        credentials: 'same-origin'
    };

    return fetch(`${config.apiUrl}/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token i n local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAllDevices() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
        // credentials: 'same-origin'
    };

    return fetch(`${config.apiUrl}/api/devices`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (response.status != 200) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {

            // data["token"] = 'fake-jwt-token';

            if (response.headers["Refresh-JWT"]) {
                data["token"] = response.headers.Refresh-JWT;
            }

            if (response.headers["refresh-token"]) {
                data["refresh-token"] = response.headers.refresh-token;
            }
            
        }

        return data;
    });
}