
//Submit-button to submit the user's input
const submit = document.getElementById("submit")

//function vaidating the name fields
function validateName() {

    let isValid = true 

    //error messages ids
    const firstNameError = document.getElementById('fnerrormsg')
    const lastNameError = document.getElementById('lnerrormsg')
    const middleNameError = document.getElementById('mnerrormsg')

    //Getting the value entered into the input field
    const firstname = document.getElementById("Firstname").value
    const lastname = document.getElementById("Lastname").value
    const middlename = document.getElementById("Middlename").value

    //Function for reusable error message
    function getErrorMsg(fieldName, rulesDescription) {
        return `The ${fieldName} you entered is invalid. ${rulesDescription}`;
    }

    function getEmptyFieldError(fieldName) {
        return `The ${fieldName} field cannot be left empty. Please enter a valid ${fieldName}.`;
    }

    //Regex pattern to be used to validate names
    let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s][A-Za-zÀ-ÖØ-öø-ÿ\s\-,'\.]*$/

    //Regex tests
    const test1 = regex.test(firstname)
    const test2 = regex.test(lastname)

    //firstname
    if (firstname.length === 0) {
        //First name error message
        firstNameError.innerText = getEmptyFieldError('first name')
        isValid = false;
    }
    else if (!test1) {
        firstNameError.innerText = getErrorMsg('firstname', 'It can only include letters, fullstop, commas, apostrophe, dash and spaces')
        isValid = false;
    }
    else {
        firstNameError.innerText = ""
        isValid = true;
    }


    //lastname
    if (lastname.length === 0) {
        //Last name error message
        lastNameError.innerText = getEmptyFieldError('last name')
        isValid = false;
    }
    else if (!test2) {
        lastNameError.innerText = getErrorMsg('lastname', 'It can only include letters, fullstop, commas, apostrophe, dash and spaces')
        isValid = false;
    }
    else
    {
        lastNameError.innerText = ""
        isValid = true;
    }
    

    //middlename
    const test = regex.test(middlename)
    if (middlename.length > 0 && !test) {
        middleNameError.innerText = getErrorMsg('middlename', 'It can only include letters, fullstop, commas, apostrophe, dash and spaces')
        isValid = false;
    }else {
        middleNameError.innerText = ""
        isValid = true;
    }

    return isValid
}


//This function validates the email address
function validateEmailInput() {

    let isValid = true 

    //Email error message
    const emailError = document.getElementById('emailerrormsg')

    //Getting the value entered into the input field
    const email = document.getElementById("Email").value

    //Pattern for validating email address
    let regex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

    let test = regex.test(email);

    if (email.length === 0) {
        //Email error message
        emailError.innerText = 'The email input field cannot be empty, please enter a valid email address'
        isValid = false;
    }
    else if (!test) {
        emailError.innerText = 'The email address you entered is invalid, Please enter a valid email address'
        isValid = false;
    }
    else {
        emailError.innerText = ''
        isValid = true;
    }

    return isValid
}


function validateServiceType() {
    
    let isValid = true 

    //service type error msg
    const serviceType = document.getElementById('sterrormsg')

    //Getting the service type values
    const consultation = document.getElementById('consultation')
    const installation = document.getElementById('installation')

    if (!consultation.checked && !installation.checked) {
        serviceType.innerText = 'Please select one of the available service types'
        isValid = false;
    } else {
        serviceType.innerText = ''

        let selectedServiceType = ''

        if (consultation.checked) {
            selectedServiceType = consultation.value
        } else if (installation.checked) {
            selectedServiceType = installation.value
        }
        
        console.log(selectedServiceType)
    }

    return isValid
}


//This function validates the phone number
function validatePhonenumber() {

    let isValid = true 

    //phone no error message
    const phonenoError = document.getElementById('phnoerrormsg')

    //Getting the value entered into the input field
    const pNumber = document.getElementById("Phonenumber").value

    //Pattern for validating email address
    let regex = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/

    let test = regex.test(pNumber);

    if (pNumber.length > 0 && !test) {
        phonenoError.innerText = 'The phone number you entered is invalid, Please enter a valid phone number'
        isValid = false;
    } else {
        phonenoError.innerText = ''
        isValid = true;
    }

    return isValid
}

submit.addEventListener('click', (event) => {
    event.preventDefault()

    const isNameValid = validateName()
    const isEmailValid = validateEmailInput()
    validateServiceType()

})
