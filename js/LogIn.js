import {getAuthToken} from './ApiService';

export function logIn() {
    location.href = "#portfolio_page";
}

export function isLoggedIn() {
    if (getAuthToken()) {
        return true;
    }
}