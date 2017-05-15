import axios from 'axios';

const AUTH_TOKEN_KEY = 'authToken';

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

let apiService = axios.create({
    baseURL: 'https://i4m.herokuapp.com/',
    // baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers : { Authorization: "Token token=" + getAuthToken() }
});

export default apiService;