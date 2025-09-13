import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from "../../../../firebase.js";

function showMessage(message, messageIcon) {
    Swal.fire({
        title: message,
        icon: messageIcon,
        draggable: true
    });
}

const signUp = document.getElementById("signUp");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email validation regex
const passwordRegex = /^.{8,}$/; // password validation upper then 8 letter or number

signUp.addEventListener("click", (e) => {
    e.preventDefault();
    let fullName = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (emailRegex.test(email) && passwordRegex.test(password)) {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = { name: fullName, uid: user.uid, providerId: "emailandPassword", address, email };
                showMessage("Account Created Successfully", "success")
                const docRef = doc(db, "users", user.uid)
                setDoc(docRef, userData)
                    .then(() => {
                        window.location.href = "../signIn/signIn.html";
                    })
                    .catch((error) => {
                        showMessage(error, "error")
                    })
            })
            .catch((error) => {
                let errorCode = error.code;
                (errorCode == 'auth/email-already-in-use') ? showMessage('Email Address Already Exists !!!', "info") : showMessage("Unable to create User", "error");
            })
    } else {
        showMessage("Somthing went Wrong\n Please enter correct email", "error")
    }
})