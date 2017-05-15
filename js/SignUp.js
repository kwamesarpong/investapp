import * as ApiService from './ApiService'
import apiService from './ApiService'


export let user = {};
export function createNewUser() {
    console.log("Creating new user...");
    let name = document.getElementById('user_name').value;
    let phoneNumber = document.getElementById('user_phone_number').value;
    let password = document.getElementById('user_password').value;
    console.log(name);
    console.log(phoneNumber);
    console.log(password);

    apiService.post('users.json', {
        user: {
            name: name,
            phone_number: phoneNumber,
            password: password
        }
    })
        .then(function (response) {
            user = response.data;
            ApiService.setAuthToken(user.auth_token);
            apiService.headers = { Authorization: "Token token=" + ApiService.getAuthToken() };
            console.log(user);
            location.href = "#next_of_kin";
        })
        .catch(function (error) {
            console.log(error);
        });
}