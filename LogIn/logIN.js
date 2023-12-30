import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAjtZdajh6XmdtUPSRop58Hf-DBE38Iy24",
  authDomain: "authentication-8001a.firebaseapp.com",
  projectId: "authentication-8001a",
  storageBucket: "authentication-8001a.appspot.com",
  messagingSenderId: "959867814576",
  appId: "1:959867814576:web:9b12ffd833dd01a14df175"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let log_Btn = document.querySelector("#signIn");
let googlebtn = document.querySelector("#Google");

log_Btn.addEventListener("click", () => {
  let log_Email = document.querySelector("#lemail");
  let log_password = document.querySelector("#lpass");
  let message = document.querySelector("#para");
  let FirebaseError = document.querySelector("#firebaseError");

  if (log_Email.value == '' && log_password.value == '') {
    message.innerHTML = "Please Fill The Form."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (log_Email.value == '') {
    message.innerHTML = "Please Enter The Email."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (log_password.value == '') {
    message.innerHTML = "Please Enter The Password."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else {
    signInWithEmailAndPassword(auth, log_Email.value, log_password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);
        localStorage.setItem("USEREmail", user.email)
        window.location = "../Home.html"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorMessage);
        FirebaseError.innerHTML = errorCode
        setTimeout(() => {
          FirebaseError.innerHTML = ""
        }, 3000)

      });
  }
})

googlebtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  let FirebaseError = document.querySelector("#firebaseError");

  signInWithPopup(auth, provider)
    .then(async (result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user.displayName);
      console.log(user.email);
      localStorage.setItem("USEREMAIL", user.email)

      try {
        const docRef = await addDoc(collection(db, "users"), {
          Name: user.displayName,
          Email: user.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      window.location = '../Home.html'

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      FirebaseError.innerHTML = errorCode;
      setTimeout(() => {
        FirebaseError.innerHTML = ""
      }, 3000)

      const email = error.customData.email;

      const credential = GoogleAuthProvider.credentialFromError(error);

    });


})

let getBtn1 = document.querySelector("#Sbutton");
getBtn1.addEventListener("click", () => {
  window.location = "../SignUP/index.html"
})