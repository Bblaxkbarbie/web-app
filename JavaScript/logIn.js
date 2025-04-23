// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
//Importing bcrypt
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbzB4HpiloXoA6Kipmvh_scD2ynEUhE7c",
    authDomain: "rolsatechsolutions.firebaseapp.com",
    projectId: "rolsatechsolutions",
    storageBucket: "rolsatechsolutions.firebasestorage.app",
    messagingSenderId: "663284555987",
    appId: "1:663284555987:web:1ed93ad09efb5d3e117426"
  };

// Initialize Firebase, auth and database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);


//Submit-button to submit the user's input
const submit = document.getElementById("submit")

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

submit.addEventListener('click', (event) => {
    event.preventDefault()

    const isEmailValid = validateEmailInput()
    const isPasswordValid = validatePassword()

    if (isEmailValid && isPasswordValid) {
            
        //input fields
        const email = document.getElementById("Email").value
        const password = document.getElementById('Password').value
        
    }
})
//         //Insert the log in data here
        

//         //create user
//         getDoc(doc(database, "users", user.uid), {
//             //insert the get data code here  
//         })

//     // else {
//     //     console.log('failed')
//     // }
// })
