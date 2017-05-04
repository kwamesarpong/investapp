import apiService from './ApiService'
import {user} from './SignUp'

export function createNextOfKing() {
    console.log("Adding next of king to user", user.name);
    let name = document.getElementById('next_of_kin_name').value;
    let phoneNumber = document.getElementById('next_of_kin_phone_number').value;
    console.log(name);
    console.log(phoneNumber);

    apiService.post(
        'next_of_kins.json',
        {
            next_of_kin: {
                name: name,
                phone_number: phoneNumber,
                user_id: user.id
            }
        },
        {
            headers: {
                Authorization: "Token token=" + user.auth_token
            }
        }
    )
        .then(function (response) {
            console.log(response.data);
            location.href = "#inv_page";
        })
        .catch(function (error) {
            console.log(error);
        });
}