import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
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

let Btn = document.querySelector("#signUp");
let googlebtn = document.querySelector("#Google");

Btn.addEventListener("click", () => {
  let Name = document.querySelector("#sname");
  let message = document.querySelector("#para");
  let Email = document.querySelector("#semail");
  let password = document.querySelector("#spass");
  let FirebaseError = document.querySelector("#firebaseError");

  if (Email.value == '' && password.value == '' && Name.value == '') {
    message.innerHTML = "Please Fill The Form."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (Email.value == '') {
    message.innerHTML = "Please Enter The Email."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (password.value == '') {
    message.innerHTML = "Please Enter The Password."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else if (Name.value == '') {
    message.innerHTML = "Please Enter The Name."
    setTimeout(() => {
      message.innerHTML = ""
    }, 3000)
  }
  else {
    console.log(Name.value);
    console.log(Email.value);
    console.log(password.value);
    createUserWithEmailAndPassword(auth, Email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            Name: Name.value,
            Email: Email.value,
            Password: password.value,

          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        window.location = "../LogIn/logIn.html"


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorCode);
        FirebaseError.innerHTML = errorCode
        setTimeout(() => {
          FirebaseError.innerHTML = ""
        }, 3000)

      });
  }

});

googlebtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  let FirebaseError = document.querySelector("#firebaseError");

  signInWithPopup(auth, provider)
    .then(async (result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user.displayName)
      console.log(user.email)
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

let getBtn = document.querySelector('#Sbutton1');
getBtn.addEventListener('click', () => {
  window.location = "../LogIn/logIn.html"
})