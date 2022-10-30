          var input = document.getElementById('floatingInputPNumber');
            window.intlTelInput(input, {
                preferredCountries: ['EG', 'PS'],
                initialCountry: "EG",
                excludeCountries: ["IL"],
                utilsScript: "js/utils.js",
            });
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
          
          const name = document.getElementById('floatingInputUsername');
          const email = document.getElementById('floatingInputEmail');
          const fullname = document.getElementById('FullName');
          const pass = document.getElementById('floatingPassword');
          const type = document.getElementById('mission');
          const submit = document.getElementById('sub_btn');
          const tpnumber = window.intlTelInputGlobals.getInstance(input).getNumber();
          
          //validation
          
          function isEmpty(s){
            return s === null || s.match(/^ *$/) !== null;
          }
          function Validation(){
            let nameregex = /^[a-zA-Z0-9]{5,}$/;
            let emailregex = /^[a-zA-Z0-9.]+@(gmail|yahoo|outlook|protonmail)\.com$/;
            
            if(isEmpty(name.value) || isEmpty(email.value) || isEmpty(pass.value)){
              //alert("you cannot leave any empty field!");
              $.bootstrapGrowl("You cannot leave any empty field!",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
              return false;
            }
            
            if(!nameregex.test(name.value)){
              //alert("-username can only be alphanumeric\n-username must be at least 5 characters\n-username cannot contain spaces");
              $.bootstrapGrowl("Username can only be alphanumeric",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
                  $.bootstrapGrowl("Username must be at least 5 characters",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
                  $.bootstrapGrowl("Username cannot contain spaces",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
              return false;
            }
          
            if(!emailregex.test(email.value)){
              //alert("enter a valid email!");
              $.bootstrapGrowl("Enter a valid email!",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
              return false;
            }
          
            return true;
          }
          
          function Register(){
            if(!Validation()){
              return;
            }
            const dbRef = ref(db);
          
            get(child(dbRef, "UsernamesList/"+ name.value)).then((snapshot)=>{
              if(snapshot.exists()){
                //alert("Account Alredy Exist!\ntry to sign in!")
                $.bootstrapGrowl("Username is taken!",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                  });
              
              }
              else{
                get(child(dbRef, "UsersList/"+ window.intlTelInputGlobals.getInstance(input).getNumber())).then((snapshot)=>{
                  if(snapshot.exists()){
                    $.bootstrapGrowl("The Phone Number is already linked with other account!",{
                    type: "danger",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                    });
                  }else{
                    set(ref(db, "UsernamesList/"+ name.value),{
                      username: name.value,
                      email: email.value,
                      name: fullname.value,
                      password: Enc(),
                      pnumber: window.intlTelInputGlobals.getInstance(input).getNumber(),
                      accountType: type.value
                    })
                    .then(()=>{
                      set(ref(db, "UsersList/"+ window.intlTelInputGlobals.getInstance(input).getNumber()),{
                        username: name.value,
                        email: email.value,
                        name: fullname.value,
                        password: Enc(),
                        pnumber: window.intlTelInputGlobals.getInstance(input).getNumber(),
                        accountType: type.value
                      })
                      .then(()=>{
                        //alert("User added successfully!");
                        submit.disabled = true;
                        $.bootstrapGrowl("Signed Up successfully!",{
                          type: "success",
                          offset: {from:"top",amount:70},
                          align: "center",
                          delay: 1000,
                          allow_dismiss: false,
                          stackup_spacing: 10
                        });
                        setTimeout(() => {  window.location.href = "sign-in.html" }, 1500);
                      })
                      .catch((error)=>{
                        alert(error);
                      });
                    })
                    .catch((error)=>{
                      alert(error);
                    });
                  }
                });
              }
          
              });
          }
          
          
          //encription
          
          function Enc(){
            return (CryptoJS.AES.encrypt(pass.value, pass.value)).toString();
          }
          
          submit.addEventListener('click',Register);