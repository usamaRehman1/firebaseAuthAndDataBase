import { auth, onAuthStateChanged, signOut, db, getDoc, doc } from "../firebase.js";

function showMessage(message, messageIcon) {
    Swal.fire({
        title: message,
        icon: messageIcon,
        draggable: true
    });
}

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("currUser");
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log(userData)
                    document.getElementById("welcomeMwssage").innerText = `Welcome to the page ${userData.name}`;
                    document.getElementById("userLoginProvider").innerText = `You are Login With ${userData.providerId}`;
                } else {
                    showMessage("no document found matching id", "info")
                }
            })
    } else {
        showMessage("user id is not found in local Storage", "error")
    }
})

let logOutBtn = document.getElementById("signOut");
logOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("currUser");
    signOut(auth)
        .then(() => {
                showMessage("SignOut Successfully", "success")
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000)
        })
        .catch((error) => {
            console.error("Error to Sign Out", error)
        })
})