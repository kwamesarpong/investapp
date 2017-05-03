const MAZZUMA_URL = 'https://client.teamcyst.com/app.php';
const MAZZUMA_API_KEY = '06bbd3f84eb58b3bcb4531f7793ec43f787b753f';

let bankOfGhanaRates;
let nextOfKin;
let user;

let apiService = axios.create({
    baseURL: 'http://i4m.herokuapp.com/',
    timeout: 10000,
    // headers: { Authorization: "Token token=" + user.auth_token }
});

function fetchBankOfGhanaRates() {
    const today = new Date();
    apiService.get('bank_of_ghana_rates/' + today.toDateString() + ".json")
        .then(function (response) {
            bankOfGhanaRates = response.data;
            console.log(bankOfGhanaRates);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function calculate91DayTBill() {
    let principal = getPrincipal();
    let returns = calculateReturns(principal, (bankOfGhanaRates.interest_rate_91_days / 1000000), 1);
    updateTotalValue(principal, returns);
}

function calculate182DayTBill() {
    let principal = getPrincipal();
    let returns = calculateReturns(principal, (bankOfGhanaRates.interest_rate_182_days / 1000000), 1);
    updateTotalValue(principal, returns);
}

function saveCalculation() {
    let principal = getPrincipal();
    let tenure = getTenure();
    let userId = user.id;
    console.log(principal, tenure, userId);
    saveCalculatedTBill(principal, tenure, userId, function () {
        location.href = "#portfolio_page";
    });
}

function getPrincipal() {
    let principalString = document.getElementById('principal').value;
    let principal = parseInt(principalString, 10);
    return principal;
}

function updateTotalValue(principal, returns) {
    document.getElementById("total_value").innerHTML = (principal + returns).toFixed(2);
}

function getTenure() {
    return $('input[name="tenure"]:checked').val();
}

function calculateReturns(principal, rate, duration) {
    return principal * rate * duration;
}

function createNewUser() {
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
            apiService = axios.create({
                baseURL: 'http://i4m.herokuapp.com/',
                timeout: 10000,
                headers: { Authorization: "Token token=" + user.auth_token }
            });
            console.log(user);
            location.href = "#next_of_kin";
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createNextOfKing() {
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
            nextOfKin = response.data
            console.log(nextOfKin);
            location.href = "#inv_page";
        })
        .catch(function (error) {
            console.log(error);
        });
}

function saveCalculatedTBill(principal, tenure, userId, callback) {
    apiService.post('saved_t_bills.json', {
        saved_t_bill: {
            principal: principal,
            tenure: tenure,
            user_id: userId
        }
    })
        .then(function (response) {
            console.log(response.data);
            callback();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function buyTBill() {
    console.log("Buying the Tbill...");
    apiService({
        url: MAZZUMA_URL,
        method: 'post',
        data: {
            price: 1,
            orderID: 'fakeOrderId',
            success_url: 'http:www.meltwater.org',
            apikey: MAZZUMA_API_KEY
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    // apiService.post('purchased_t_bills.json', {
    //     purchased_t_bill: {
    //         principal: principal,
    //         tenure: tenure,
    //         user_id: userId
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}

fetchBankOfGhanaRates();