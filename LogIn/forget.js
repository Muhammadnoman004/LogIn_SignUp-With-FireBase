import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
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

let Btn2 = document.querySelector("#send_btn");

Btn2.addEventListener("click", () => {
  let getEmail = document.querySelector("#inp");

  sendPasswordResetEmail(auth, getEmail.value)
    .then(() => {
      console.log("Email Send");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error =>", errorMessage);
    });
})

