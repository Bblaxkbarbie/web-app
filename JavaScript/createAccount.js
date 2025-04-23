// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification   } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
//Importing bcrypt
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

  // Your web app's Firebase configuration
  const firebaseConfig = {
  };

// Initialize Firebase, auth and database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);


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

//This function validates the Password 
function validatePassword() {

    let isValid = true 

    //Password error message
    const pwdError = document.getElementById('pwderrormsg')

    //Getting the value entered into the input field
    const password = document.getElementById('Password').value

    //Pattern for validating Password
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    let test = regex.test(password);

    if (password.length === 0) {
        //Password error message
        pwdError.innerText = 'The password input field cannot be empty, please enter a valid password'
        isValid = false;
    }
    else if (!test) {
        pwdError.innerText = 'The password you entered is invalid, It must include uppercase letter, lowercase leteer, number and special characters'
        isValid = false;
        }
    else {
        pwdError.innerText = ''
        isValid = true;
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
    const isPasswordValid = validatePassword()
    const isPhonenoValid = validatePhonenumber()

    if (isNameValid && isEmailValid && isPasswordValid && isPhonenoValid) {
            //Function that hashes user's password
            function hashPassword() {
                //User's password
                const password = document.getElementById('Password')
                const userPassword = password.value;

                //Testing to check if bcrypt is available
                if (typeof bcrypt === 'undefined') {
                    console.error('bcrypt is not loaded');
                } else {
                    console.log('bcrypt is loaded');
                }

                //Generating a salt using bcrypt
                const salt = bcrypt.genSaltSync(10);

                //Hashing the password using the generated salt
                const hash = bcrypt.hashSync(userPassword, salt);

                return hash
            }
            
            //input fields
            const firstname = document.getElementById("Firstname").value
            const lastname = document.getElementById("Lastname").value
            const middlename = document.getElementById("Middlename").value
            const email = document.getElementById("Email").value
            const password = document.getElementById('Password').value
            const hashedPassword = hashPassword()
            const pNumber = document.getElementById("Phonenumber").value

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    //create user
                    setDoc(doc(database, "users", user.uid), {
                        uid: user.uid,
                        displayName: firstname,
                        lastName: lastname,
                        middleName: middlename,
                        phoneNumber: pNumber,
                        email: user.email,
                        password: hashedPassword
                    })
                    .then(() => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                // Email verification sent!
                                const name = localStorage.setItem('Name', firstname)
                                window.location.href = "homepage.html";
                            });

                    })
                })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
                alert("Error signing in:", errorMessage, errorCode)
            });
    }
    else {
        console.log('failed')
    }
})
