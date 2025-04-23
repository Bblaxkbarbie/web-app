const name = localStorage.getItem('Name');
console.log('name', name)
let displayName = document.getElementById('username')

displayName.innerText = name

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInAnonymously  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
  };

// Initialize Firebase, auth and database
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);


//Submit-button to submit the user's input
const submit = document.getElementById("submit")



//This function stores the data into the database
function databaseStorage(event){
    //Prevents the form from being submitted
    event.preventDefault();
    
    //input fields
    const email = document.getElementById("Email").value

    //Signing in user anonymously to link their data to a unique user id 
    signInAnonymously(auth)
  .then(() => {
    const user = auth.currentUser;
    console.log("Signed in anonymously ");
      // Using the user id to store the email address
      setDoc(doc(database, 'users', user.uid, 'Info', 'Newsletter'), {
          Email: email,
          Subscribed:true
      });
  })
  .catch((error) => {
    console.error("Anonymous sign-in failed ", error);
  });

}

//This function validates the email address
function validateEmailInput() {

    const email = document.getElementById("Email").value

    if (email.length === 0) {
        //Add error message code here
        console.log('empty')
        return false
    }
    else {
        let regex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
        let isValid = regex.test(email);
        if (!isValid) {
            //Add error message code here 
            console.log('flase')
            return false
        } else {
            //Add normal code here
            return true
        }
    }
}

submit.addEventListener('click', async (event) => {
    event.preventDefault()
    let validEmail = validateEmailInput();
    if (!validEmail) return;

    await databaseStorage(event)
})