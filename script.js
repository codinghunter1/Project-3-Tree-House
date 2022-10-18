const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const size = document.querySelector("#size");
const shirtDesgin = document.querySelector("#design");
const shirtColor  = document.querySelector("#color");
const shirtPuns   = document.querySelector(`optgroup[label = Color-Puns]`);
const shirtHeart  = document.querySelector(`optgroup[label = Color-Hearts]`);
const jobRole = document.getElementById("title");
const otherJob = document.getElementById("other-job-role");
const shirtColorsDiv = document.getElementById("shirt-colors");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");
const creditCardDiv = document.getElementById("credit-card");
const activities = document.querySelector("#activities-box");
const totalCost = document.querySelector("#activities-cost");
const payWith = document.querySelector("#payment");
const expDate = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const bitcoinBtn = document.getElementById("bitcoin-button");
const paypalBtn = document.getElementById("paypal-button");
const subBtn = document.getElementsByClassName("subBtn");
const submitErrorInfo = document.getElementById("submit-error-info");
const submitErrorPayment = document.getElementById("submit-error-payment");
const submitErrorActivities = document.getElementById("submit-error-activities");
const SUBbutton = document.querySelector("#subBtn");

let testName = false, testEmail = false, testJobRole = false, testOtherJobRole = false, testShirtSize = false, testShirtDesign = false, testPay = false, testInfo = false,
testShirtcolor = false, testActivities = false, testCardNumber = false, testZip = false, testCVV = false, testExpDate = false, testExpYear = false, testPaypal = false, testBitcoin = false;


function isValidName(name) {
    return /^[a-z]+(\s[a-z]+)?$/.test(name);
}

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function showOrHideTip(show, element) {
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
}

function displayCorrect(showTip, inputName){
    let test = false;
    let trimName = inputName.id;
    if(showTip === false) {
        if(document.getElementById(inputName.id).style.background === "rgb(255,60,0, 0.8)"){ //red already
            document.getElementById(inputName.id).style.background = "rgb(51,211,3, 0.8)";
            test = true;
            checkAll("1",inputName, test);
        }
        else { 
            inputName.addEventListener("blur", event => {
                document.getElementById(inputName.id).style.background = "rgb(51,211,3, 0.8)";
                test = true;
                checkAll(inputName, test);
            });
        }
    } 
    else {
        inputName.addEventListener("blur", event => {
            document.getElementById(inputName.id).style.background = "rgb(255,60,0, 0.8)";
            test = false;
            checkAll(inputName, test);
        });
    }
}

function createListener(validator, inputName) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
      displayCorrect(showTip, inputName);
    };
}

nameInput.addEventListener("input", createListener(isValidName, nameInput));
emailInput.addEventListener("input", createListener(isValidEmail, emailInput));

//



otherJob.style.display = "none";

jobRole.addEventListener("input", event => {
    if(event.target.value == "other"){
        otherJob.style.display = "block";
    } 
    else {
        if(event.target.value !== "select-job"){
            testJobRole = true;
        }
    }   
});

otherJob.addEventListener("input", createListener(isValidTitle, otherJob));

function isValidTitle(title){
    return /^[a-z]+(\s[a-z]+)?$/.test(title);
}

jobRole.addEventListener("change", event => { 
    if(jobRole.value == "select-job"){
        stepClear(jobRole, false)
    }
    else {
        stepClear(jobRole, true);
    }
});
//

function stepClear(element, test){
    if(test == true){
        element.style.background = "rgb(51,211,3, 0.8)";
    }
    else {
        element.addEventListener("change", () => {
            element.style.background = "rgb(255,60,0, 0.8)";
        });
    }
    if(element == size){
        testShirtSize = test;
    }
    else if(element == shirtDesgin){
        testShirtDesign = test;
    }
    else if(element == shirtColor){
        testShirtcolor = test;
    }
}

shirtColorsDiv.style.display = "none";

shirtDesgin.addEventListener("change", () => {
    if(shirtDesgin.options[shirtDesgin.selectedIndex].value === "Select Theme"){
        shirtColorsDiv.style.display = "none";
    }
    else if(shirtDesgin.options[shirtDesgin.selectedIndex].value === "js-puns"){
        shirtColorsDiv.style.display = "block";
        shirtColor.appendChild(shirtPuns);
        shirtColor.removeChild(shirtHeart);
    }
    else if(shirtDesgin.options[shirtDesgin.selectedIndex].value === "heart-js"){
        shirtColorsDiv.style.display = "block";
        shirtColor.appendChild(shirtHeart);
        shirtColor.removeChild(shirtPuns);
    }
});


size.addEventListener("change", event => { 
    if(size.value == "start-size"){
        stepClear(size, false)
    }
    else {
        stepClear(size, true);
    }
});
shirtDesgin.addEventListener("change", event => { 
    if(shirtDesgin.value == "start-design"){
        stepClear(shirtDesgin, false)
    }
    else {
        stepClear(shirtDesgin, true);
    }
});
shirtColor.addEventListener("change", event => { 
    if(shirtColor.value == "start-color"){
        stepClear(shirtColor, false)
    }
    else {
        stepClear(shirtColor, true);
    }
});




//

let cost = 0;

activities.addEventListener("change", event => {
    
    let el = event.target.parentNode.parentNode.firstChild;
    if(event.target.checked){
        for(let i = 0; i <= 12; i++) {
            el = el.nextSibling;
            if(el.nodeType === 1 && !el.firstChild.nextSibling.checked){
                el.style.background = "rgb(255, 253, 249)";
            }
        }
        showOrHideTip(false, activities.previousElementSibling);
        testActivities = true;
        event.target.parentNode.style.background = "rgb(51,211,3, 0.8)";
        cost += parseInt(event.target.getAttribute("data-cost"));
        totalCost.innerHTML = 'Total: $' + cost;
        aTest(testActivities);
    }
    else {
        event.target.parentNode.style.background = "rgb(255, 253, 249)";
        cost -= parseInt(event.target.getAttribute("data-cost"));
        totalCost.innerHTML = 'Total: $' + cost;
    }
    
    if (cost == 0){
        for(let i = 0; i <= 12; i++) {
            el = el.nextSibling;
            if(el.nodeType === 1){
                el.style.background = "rgb(255,60,0, 0.8)";
                testActivities = false;
                aTest(testActivities);
            }
        }
        showOrHideTip(true, activities.previousElementSibling);
        
    }
});

//


paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";



payWith.addEventListener("change", event => {
    displayOtherPayment(event.target.value);
    checkAll(testBitcoin, false);
    checkAll(testPaypal, false);
    checkAll(testPay, false);

});

function displayOtherPayment(method){

    if (method == "paypal"){
        paypalDiv.style.display = "block";
        creditCardDiv.style.display = "none";
        bitcoin.style.display = "none";
    }
    else if (method == "bitcoin"){
        bitcoinDiv.style.display = "block";
        creditCardDiv.style.display = "none";
        paypal.style.display = "none";
    }
    else{
        creditCardDiv.style.display = "block";
        bitcoinDiv.style.display = "none";
        paypal.style.display = "none";
    }
}



expDateIsValid();
expYearIsValid();
zipCodeIsValid();
isValidCardNumber();

function expDateIsValid(){
    expDate.addEventListener("change", event => {
        if (event.target.value == "select-date"){
            expDate.style.background = "rgb(255,60,0, 0.8)";
            testExpDate = false;
        }
        else {
            expDate.style.background = "rgb(51,211,3, 0.8)";
            testExpDate = true;
        }
    });
}
function expYearIsValid(){
    expYear.addEventListener("change", event => {
        if (event.target.value == "select-year"){
            expYear.style.background = "rgb(255,60,0, 0.8)";
            testExpYear = false;
        }
        else {
            expYear.style.background = "rgb(51,211,3, 0.8)";
            testExpYear = true;
        }
    });
}

function isValidCardNumber(cardNum){
    return  /^\d{13,16}$/.test(cardNum);
}

function zipCodeIsValid(zipC){
    return  /^\d{5}$/.test(zipC);
}

function CVVIsValid(zipC){
    return  /^\d{3}$/.test(zipC);
}

cardNumber.addEventListener("input", createListener(isValidCardNumber, cardNumber));
zipCode.addEventListener("input", createListener(zipCodeIsValid, zipCode));
cvv.addEventListener("input", createListener(CVVIsValid, cvv));

function toggle(button) {
    if (button.value == "OFF") {
        button.value = "ON";
        button.parentNode.style.background = "rgb(51,211,3, 0.8)"; //green
        button.innerHTML = "Cancel";
        payWith.style.background = "rgb(51,211,3, 0.8)";
        if(button == bitcoinBtn){
            checkAll(testBitcoin, true);
        }
        else if(button == paypalBtn){
            checkAll(testPaypal, true);
        }
    } 
    else {
        button.value = "OFF";
        button.parentNode.style.background = "rgb(255,60,0, 0.8)"; //red
        button.innerHTML = "Confirm";
        payWith.style.background = "rgb(255,60,0, 0.8)";
        if(button == bitcoinBtn){
            testBitcoin = false;
            checkAll(testBitcoin, false);
        }
        else if(button == paypalBtn){
            checkAll(testPaypal, false);
        }
    }
}

bitcoinBtn.addEventListener("change", event => {
    toggle(bitcoinBtn);
    toggle(paypalBtn);
});

//

function checkAll(inputName, test){
    if(inputName == nameInput){
        testName = test;
    }
    else if(inputName == emailInput){
        testEmail = test;
    }
    else if(inputName == otherJob){
        testOtherJobRole = test;
    }
    else if(inputName == cardNumber){   
        testCardNumber = test;
    }
    else if(inputName == zipCode){
        testZip = test;
    }
    else if(inputName == cvv){
        testCVV = test;
    }
    else if(inputName == testBitcoin){
        testBitcoin = test;
    }
    else if(inputName == testPaypal){
        testBitcoin = testPaypal;
    }
    addEventListener("click", event => {
        if((testCardNumber == true && testCVV == true && testExpDate == true && testExpYear == true && testZip == true && testCVV == true) | testPaypal == true | testBitcoin == true){
            payWith.style.background = "rgb(51,211,3, 0.8)";
            showOrHideTip(false, submitErrorPayment);
            testPay = true;
        }
        else {
            submitErrorPayment.innerHTML = "Error with payment info, Fix to Submit"
            showOrHideTip(true, submitErrorPayment);
            testPay = false;
            //console.log("testCardNumber: ", testCardNumber);
            //console.log("testCVV: ", testCVV);
            //console.log("testExpDate: ", testExpDate);
            //console.log("testExpYear: ", testExpYear);
            //console.log("testZip: ", testZip);
            //console.log("testCVV: ", testCVV);
            //console.log("testPaypal: ", testPaypal);
            //console.log("testBitcoin: ", testBitcoin);
        }
        
        if(testName == true && testEmail == true && (testJobRole == true | testOtherJobRole == true) && testShirtSize == true && testShirtDesign == true && testShirtcolor == true){
            testInfo = true;
            showOrHideTip(false, submitErrorInfo);
        }
        else {
            submitErrorInfo.innerHTML = "Error with info provided, Fix to Submit"
            showOrHideTip(true, submitErrorInfo);
            testInfo = false;
        }
        console.log("testpay = ", testPay);
    });
    
}
let result = false;

function aTest(outcome){
    if (outcome == false){
        submitErrorActivities.innerHTML = "Error with Activite sellection, Fix to Submit"
        showOrHideTip(true, submitErrorActivities);
    }
    else {
        showOrHideTip(false, submitErrorActivities);
    }
    result = outcome;
}

addEventListener("click", event => {
    console.log("Pay", testPay, "Att:", result, "info: ", testInfo);
    if(testPay == true && result == true && testInfo == true){
        console.log("all treu");
        subBtn[0].setAttribute("type", "submit");
    }
    else {
        console.log("shoudl be locked")
        subBtn[0].setAttribute("type", "button");
    }
});






