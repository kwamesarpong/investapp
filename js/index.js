const API_URL = "http://localhost:3000/";
let bankOfGhanaRates;

function fetchBankOfGhanaRates() {
    const today = new Date();
    axios.get(API_URL + 'bank_of_ghana_rates/' + today.toDateString() + ".json")
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
    let userId = 1;
    console.log(principal, tenure, userId);
    saveCalculatedTBill(principal, tenure, userId);
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

function addUser(name, phoneNumber) {
    axios.post(API_URL + 'users.json', {
        user: {
            name: name,
            phone_number: phoneNumber
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function addNextOfKin(name, phoneNumber, userId) {
    axios.post(API_URL + 'next_of_kins.json', {
        next_of_kin: {
            name: name,
            phone_number: phoneNumber,
            user_id: userId
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function saveCalculatedTBill(principal, tenure, userId) {
    axios.post(API_URL + 'saved_t_bills.json', {
        saved_t_bill: {
            principal: principal,
            tenure: tenure,
            user_id: userId
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function savePurchasedTBill() {
    axios.post(API_URL + 'purchased_t_bills.json', {
        purchased_t_bill: {
            principal: principal,
            tenure: tenure,
            user_id: userId
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

fetchBankOfGhanaRates();