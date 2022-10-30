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


        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        const submit = document.getElementById('sub_btn')


        function isEmpty(s){
            return s === null || s.match(/^ *$/) !== null;
          }


        function Validation(){
            if(isEmpty(name.value) || isEmpty(email.value) || isEmpty(message.value)){
            return false;
            }
            return true;
        }
        function SendMessage(){
            if(!Validation()){
                $.bootstrapGrowl("Plaese, fill all the fields!",{
                    type: "danger",
                    offset: {from:"top",amount:800},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
                return
            }
            set(ref(db, "Messages/"+ message.value),
                {
                    name: name.value,
                    email: email.value,
                    message: message.value 
                })
                .then(()=>{
                  submit.disabled = true;
                  $.bootstrapGrowl("Message Sent!",{
                    type: "success",
                    offset: {from:"top",amount:800},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
                })
                .catch((error)=>{
                  alert(error);
                })
        }

        submit.addEventListener('click',SendMessage);

