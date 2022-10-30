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



//refs
const submit = document.getElementById('sub_btn');
const attend = document.getElementById('attend_btn');
const SC = document.getElementById('floatingInputSession');
let userlink = document.getElementById('userlink');
let signoutlink = document.getElementById('signoutlink');
var currentUser = null;
var status1 = null;
var key = 0;
//funcs


const dbRef = ref(db);
function AttendS(){
    GetUser();
    get(child(dbRef, "SessionsList/"+ SC.value)).then((snapshot)=>{
        if(snapshot.exists()){
            set(ref(db, "SessionsList/"+SC.value+"/"+currentUser.username),
            {
                fullname: currentUser.name,
                user: currentUser.username,
                email: currentUser.email
            })
            .then(()=>{
            //alert("User added successfully!");
                attend.disabled = true;
                $.bootstrapGrowl("Attended",{
                type: "success",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
                });
                localStorage.removeItem('AttendS');
                setTimeout(() => {  window.location.href = "student-dashboard.html" }, 1500);
            })
            .catch((error)=>{
              alert(error);
            })
        }
        else{
            $.bootstrapGrowl("The code does not exists!",{
                type: "danger",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
              });
        }
        
});
}
function GetUser(){
    currentUser = JSON.parse(localStorage.getItem('suser'));
}


function CheckStatus1(){
    status1 = localStorage.getItem('AttendS');
    if(status1 == null){
        document.getElementById('EnterInfo').remove();
    }else{
        document.getElementById('attendSession').remove();
    }
}
window.onload = function(){
    CheckStatus1();
    GetUser();
    if(currentUser == null){
        window.location = "index.html";
    }else{
        userlink.innerText = currentUser.username;
        userlink.classList.replace("btn","nav-link");
        userlink.classList.remove("btn-primary");
        userlink.href = "#";
        signoutlink.innerText="SignOut";
    }
}

function Enteri(){
    localStorage.setItem('AttendS','ON');
    window.location.href = "student-dashboard.html";
}

attend.addEventListener('click',AttendS);
submit.addEventListener('click',Enteri);