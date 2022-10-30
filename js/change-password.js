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

import { getDatabase, ref, set, child, get, update } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();

var mode = null;
const newpassword = document.getElementById('newpassword');
const submit = document.getElementById('change-button');
var user = null;

function UpadatePassword() {
    const dbRef = ref(db);
    get(child(dbRef, "UsersList/"+ localStorage.getItem('reset'))).then((snapshot)=>{

        if(snapshot.exists()){
            user = snapshot.val().username;
            update(ref(db, "UsersList/" + localStorage.getItem('reset')), {
                password: Enc()
            })
            .then(()=>{
                update(ref(db, "UsernamesList/" + user), {
                    password: Enc()
                })
                .then(()=>{
                    $.bootstrapGrowl("Password changed successfully!",{
                        type: "success",
                        offset: {from:"top",amount:70},
                        align: "center",
                        delay: 1000,
                        allow_dismiss: false,
                        stackup_spacing: 10
                    });
                    submit.disabled = true;
                    localStorage.removeItem('reset');
                    setTimeout(() => {  window.location.href = "sign-in.html" }, 1500);
                })
                .catch((error)=>{
                    $.bootstrapGrowl("Can't change the password!",{
                        type: "danger",
                        offset: {from:"top",amount:70},
                        align: "center",
                        delay: 1000,
                        allow_dismiss: false,
                        stackup_spacing: 10
                    });
                });
            })
            .catch((error)=>{
                $.bootstrapGrowl("Can't change the password!",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                });
            });
        }else{
            $.bootstrapGrowl("Acoount does not exist!",{
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

function Enc(){
return (CryptoJS.AES.encrypt(newpassword.value, newpassword.value)).toString();
}


window.onload = function(){
    //localStorage.removeItem('reset');
    mode = localStorage.getItem('reset');
    if(mode == null){
        window.location = "forgot-password.html";

    }
}

submit.addEventListener('click',UpadatePassword);

