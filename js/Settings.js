import * as ApiService from './ApiService'

export function logOut() {
    ApiService.removeAuthToken();
    location.href = "#log_in";
}
