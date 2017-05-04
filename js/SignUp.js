import apiService from './ApiService'

export let user = {};
export function createNewUser() {
    console.log("Creating new user...")
    let name = document.getElementById('user_name').value;
    let phoneNumber = document.getElementById('user_phone_number').value;
    console.log(name);
    console.log(phoneNumber);

    apiService.post('users.json', {
        user: {
            name: name,
            phone_number: phoneNumber
        }
    })
        .then(function (response) {
            user = response.data;
            apiService.headers = { Authorization: "Token token=" + user.auth_token }

            console.log(user);
            location.href = "#next_of_kin";
        })
        .catch(function (error) {
            console.log(error);
        });
}