import { auth, facebookProvider, FacebookAuthProvider, signInWithPopup, db, setDoc, doc } from "../../firebase.js";

function showMessage(message, messageIcon) {
    Swal.fire({
        title: message,
        icon: messageIcon,
        draggable: true
    });
}

const signInWithFacebook = document.getElementById("signInWithFacebook");
signInWithFacebook.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            
            const { displayName, email, photoURL, providerId, uid } = user["providerData"][0];
            const userData = { name: displayName, photoUrl: photoURL, email, providerId, uid };
            localStorage.setItem("currUser", uid)
            const docRef = doc(db, "users", uid)
            setDoc(docRef, userData)
                .then(() => {
                    showMessage("Login Successfully With Facebook", "success")
                    setTimeout(() => {
                        window.location.href = "../../home/index.html";
                    }, 1000)
                })
                .catch((error) => {
                    showMessage(error, "error")
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
            showMessage(errorMessage, "error")
        });
})