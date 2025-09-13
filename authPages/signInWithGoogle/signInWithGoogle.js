import { auth, googleProvider, GoogleAuthProvider, signInWithPopup, db, setDoc, doc } from "../../firebase.js";

function showMessage(message, messageIcon) {
    Swal.fire({
        title: message,
        icon: messageIcon,
        draggable: true
    });
}

const signInWithGoogle = document.getElementById("signInWithGoogle");

signInWithGoogle.addEventListener("click", (event) => {
    event.preventDefault();

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // console.log("userData", userData)
            showMessage("Login Successfully", "success")
            localStorage.setItem("currUser", user.uid)
            const { displayName, email, photoUrl, providerId } = user["reloadUserInfo"]["providerUserInfo"][0];
            const userData = {
                uid: user.uid,
                name: displayName,
                email: email,
                photoUrl: photoUrl,
                providerId: providerId,
            }
            const docRef = doc(db, "users", user.uid)
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "../../home/index.html";
                })
                .catch((error) => {
                    showMessage(error, "error")
                })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            showMessage(errorMessage, "error")
        });
})