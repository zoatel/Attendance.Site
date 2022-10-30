import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
      

const firebaseConfig = {
  apiKey: "AIzaSyD6-Iyc2-usUsxK0Nfp5vca4HbEATp2Djs",
  authDomain: "attendance-8dd2e.firebaseapp.com",
  databaseURL: "https://attendance-8dd2e-default-rtdb.firebaseio.com",
  projectId: "attendance-8dd2e",
  storageBucket: "attendance-8dd2e.appspot.com",
  messagingSenderId: "31912357734",
  appId: "1:31912357734:web:2149a94b6f8edb0ad522a7",
  measurementId: "G-0P2BS1ZTX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();


var currentUser = null;
let typeo = null;
  function getUsername(){
          typeo = localStorage.getItem('type');
          if(typeo == "Instructor"){
              currentUser = JSON.parse(localStorage.getItem('iuser'));
          }else{
              currentUser = JSON.parse(localStorage.getItem('suser'));
          }
  }
  window.onload = function(){
      getUsername();
      if(currentUser != null){
        window.location = "index.html";
      }
  }
//refs

const name = document.getElementById('floatingInputUsername');
const pass = document.getElementById('floatingPassword');
const submit = document.getElementById('sub_btn');
var type = null;

//dec  
  function Dec(dbpass){
      var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
      return pass12.toString(CryptoJS.enc.Utf8);
  }

  function StudentSignout(){
  localStorage.removeItem('type');
  localStorage.removeItem('suser');
  }

  function InstructorSignout(){
  localStorage.removeItem('type');
  localStorage.removeItem('iuser');
  }
function login(user){


  if(type == "Instructor"){
    StudentSignout();
    localStorage.setItem('type',type);
    localStorage.setItem('iuser', JSON.stringify(user));
    window.location = "instructor-dashboard.html";
  }
  else if (type == "Student"){
    InstructorSignout();
    localStorage.setItem('type',type);
    localStorage.setItem('suser', JSON.stringify(user));
    window.location = "student-dashboard.html";
  }
}
//auth

function Authenticate(){
  const dbRef = ref(db);


  get(child(dbRef, "UsernamesList/"+ name.value)).then((snapshot)=>{
        if(snapshot.exists()){
            let dbpass = Dec(snapshot.val().password);
            type = snapshot.val().accountType;
            if(dbpass == pass.value){
              login(snapshot.val());
            }
            else{
              $.bootstrapGrowl("Username or password is incorrect",{
              type: "danger",
              offset: {from:"top",amount:70},
              align: "center",
              delay: 1000,
              allow_dismiss: false,
              stackup_spacing: 10
            });
            }
        }
        else{
          $.bootstrapGrowl("Account does not exist!",{
              type: "warning",
              offset: {from:"top",amount:70},
              align: "center",
              delay: 1000,
              allow_dismiss: false,
              stackup_spacing: 10
            });
        }
      });
}

submit.addEventListener('click',Authenticate)


