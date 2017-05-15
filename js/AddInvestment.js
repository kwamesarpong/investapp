import apiService from './ApiService'

const MAZZUMA_URL = 'https://client.teamcyst.com/app.php';
const MAZZUMA_API_KEY = '06bbd3f84eb58b3bcb4531f7793ec43f787b753f';

let bankOfGhanaRates;

export function fetchBankOfGhanaRates() {
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

export function calculate91DayTBill() {
    let principal = getPrincipal();
    let returns = calculateReturns(principal, (bankOfGhanaRates.interest_rate_91_days / 1000000), 1);
    updateTotalValue(principal, returns);
}

export function calculate182DayTBill() {
    let principal = getPrincipal();
    let returns = calculateReturns(principal, (bankOfGhanaRates.interest_rate_182_days / 1000000), 1);
    updateTotalValue(principal, returns);
}

export function saveCalculation() {
    let principal = getPrincipal();
    let tenure = getTenure();
    console.log(principal, tenure);
    saveCalculatedTBill(principal, tenure, function () {
        // Do nothing
    });
    //TODO: Clear the form
}

export function buyTBill() {
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
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}

function saveCalculatedTBill(principal, tenure, callback) {
    apiService.post('saved_t_bills.json', {
        saved_t_bill: {
            principal: principal,
            tenure: tenure
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

function getPrincipal() {
    let principalString = document.getElementById('principal').value;
    let principal = parseInt(principalString, 10);
    return principal;
}

function getTenure() {
    return $('input[name="tenure"]:checked').val();
}

function updateTotalValue(principal, returns) {
    document.getElementById("total_value").innerHTML = (principal + returns).toFixed(2);
}

function calculateReturns(principal, rate, duration) {
    return principal * rate * duration;
}

