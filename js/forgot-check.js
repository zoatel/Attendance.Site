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

function CheckPN(){
    const dbRef = ref(db);
    
    get(child(dbRef, "UsersList/"+ window.intlTelInputGlobals.getInstance(input).getNumber())).then((snapshot)=>{
        if(snapshot.exists()){
            phoneAuth();
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
const sig = document.getElementById('sign-in-button');
sig.addEventListener('click',CheckPN);