import { auth, signInWithEmailAndPassword } from "../../../../firebase.js";

function showMessage(message, messageIcon) {
    Swal.fire({
        title: message,
        icon: messageIcon,
        draggable: true
    });
}

const signIn = document.getElementById("signIn");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^.{8,}$/;

signIn.addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                localStorage.setItem("currUser", user.uid)
                showMessage("User Login Successfully", "success")
                setTimeout(() => {
                    window.location.href = "../../../../home/index.html";
                }, 1000)
            })
            .catch((error) => {
                let errorCode = error.code;
                (errorCode == 'auth/invalid-credential') ? showMessage("Incorrect Email and Password", "error") : showMessage("Account Does not Exist", "error");
            })
    } else {
        showMessage("Somthing Went wrong", "error")
    }
})