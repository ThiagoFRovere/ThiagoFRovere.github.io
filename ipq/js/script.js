
const firebaseConfig = {
    apiKey: "AIzaSyBCVCOnsjyH0JdL9AKBoGHQa4KAWWkzO1c",
    authDomain: "prontuario-4ce95.firebaseapp.com",
    projectId: "prontuario-4ce95",
    storageBucket: "prontuario-4ce95.appspot.com",
    messagingSenderId: "276317492035",
    appId: "1:276317492035:web:c350879118105a204ad5f6",
    measurementId: "G-6TNEBPZ8YD"
  };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const Login = db.collection('prontuario')

let email = document.getElementById("sendEmail");
let password = document.getElementById("sendPassword");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  if (email.value == "" || password.value == "") {
      empyt();
  }else 
      if (validatorEmail(email.value) === true){
          const emailValid = email.value;
          const passwordValid = password.value;
          login(emailValid, passwordValid);
      }else{
          formatEmail();
      }
  e.preventDefault();
});

function login(emailValid, passwordValid){
  firebase.auth().signInWithEmailAndPassword(
      emailValid, passwordValid
      ).then(response=>{
          window.location.href = "./pages/prontuario.html";
      }).catch(erro=>{
          invalidos();
      })
}

function validatorEmail(email) {
  let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function invalidos(){
  $("#erro1").removeClass("hide1");
      setTimeout(()=>{
          $("#erro1").addClass("hide1");
      }, 3000)
}

