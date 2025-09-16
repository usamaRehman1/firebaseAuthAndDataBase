import {auth, RecaptchaVerifier, signInWithPhoneNumber} from "../../firebase.js";


// window.recaptchaVerifier = new RecaptchaVerifier(auth, 'registerBtn', {
//     size: 'invisible',
//     callback : (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         console.log("recaptcha solved")
//         onSignInSubmit();
//     }
// });

const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onSignInSubmit();
})

function onSignInSubmit() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    console.log("phoneNumber =>", phoneNumber)
    
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

    auth.languageCode = 'it';
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+${phoneNumber}`, appVerifier)
        .then((confirmationResult) => {
            console.log("confirmationResult => ", confirmationResult)
        }).catch((error) => {
            console.log("error =>", error)
         });
}