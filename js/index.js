import $ from 'jquery'
import * as SignUp from './SignUp'
import * as NextOfKin from './NextOfKin'
import * as AddInvestment from './AddInvestment'

AddInvestment.fetchBankOfGhanaRates();

// SignUp user
$("a[data-create-new-user]").click(function (e) {
   SignUp.createNewUser();
});

// Next of Kin
$("a[data-create-next-of-kin]").click(function (e) {
    NextOfKin.createNextOfKing();
});

// Add Investment
$("input[name='tenure']:radio").click(function () {
    console.log("91 days");
    AddInvestment.calculate91DayTBill();
});

$("input[data-calc-182-day-t-bill]").change(function () {
    console.log("182 days");
    AddInvestment.calculate182DayTBill();
});

$("a[data-buy-t-bill]").click(function (e) {
    AddInvestment.buyTBill();
});

$("a[data-save-calculation]").click(function (e) {
    AddInvestment.saveCalculation();
});