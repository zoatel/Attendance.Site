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
      
    import { getDatabase, ref, set, child, get, onValue, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

    const db = getDatabase();

                
    var qrcode = new QRCode(document.getElementById('qrcode'));
    qrcode.makeCode("www.attendance.site");


    function makeSQ() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
    return result;
    }
        //refs
    const submit = document.getElementById('sub_btn');
    const SQ = document.getElementById('sessioncode');
    const end = document.getElementById('end_btn');
    let userlink = document.getElementById('userlink');
    let signoutlink = document.getElementById('signoutlink');
    var currentUser = null;
    var status = null;
    const code = makeSQ();
    var stdNo = 0;
    var tbody = document.getElementById('tbody1');

    function CheckStatus(){
        status = localStorage.getItem('sessionON');
        if(status == null){
            document.getElementById('attendees').remove();
        }else{
            document.getElementById('createSession').remove();  
        }
    }





    function CreateSession(){
        const dbRef = ref(db);

        get(child(dbRef, "SessionsList/"+ code)).then((snapshot)=>{
        if(snapshot.exists()){
            $.bootstrapGrowl("Failed, please try again!",{
                type: "danger",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
            });
        }
        else{
            set(ref(db, "SessionsList/"+ code),
            {
                username: "Done"
            })
            .then(()=>{
            submit.disabled = true;
            $.bootstrapGrowl("Created Successfully!",{
                type: "success",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
            });
            localStorage.setItem('sessionON',code);
            //SQ.innerText = "The session code is : "+code;
            setTimeout(() => {  window.location.href = "instructor-dashboard.html" }, 1500);
            })
            .catch((error)=>{
            alert("sadsadasd"+error);
            })
        }

        });


    }
    function AddItemToTable(name, username, email){
        let trow = document.createElement("tr");
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")


        td1.innerHTML= ++stdNo;
        td2.innerHTML= name;
        td3.innerHTML= username;
        td4.innerHTML= email;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);

        tbody.appendChild(trow);
    }

    function AddAllItemsToTable(TheStudent){
        stdNo = 0;
        tbody.innerHTML="";
        TheStudent.forEach(element => {
            if(element.fullname != null || element.fullname != null || element.email != null){
                AddItemToTable(element.fullname, element.user, element.email);
            }

        });
    }

    function GetAllStudents(){
        const dbRef = ref(db,"SessionsList/"+localStorage.getItem('sessionON'));

        onValue(dbRef,(snapshot)=>{
            var students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });

            AddAllItemsToTable(students);
        });
    }

    window.onload = function(){
            CheckStatus();
            if(localStorage.getItem('sessionON') != null){
                GetAllStudents();
            }
            currentUser = JSON.parse(localStorage.getItem('iuser'));
            if(currentUser == null){
                window.location = "index.html";
            }else{
                
                SQ.innerText = "The session code is : "+localStorage.getItem('sessionON');
                userlink.innerText = currentUser.username;
                userlink.classList.replace("btn","nav-link");
                userlink.classList.remove("btn-primary");
                userlink.href = "#";

                signoutlink.innerText="SignOut";
            }
    }

    function EndSession(){

        remove(ref(db, "SessionsList/" + localStorage.getItem('sessionON')))
            .then(()=>{
                localStorage.removeItem('sessionON');
                $.bootstrapGrowl("Session Ended!",{
                    type: "success",
                    offset: {from:"top",amount:70},
                    align: "center",
                    delay: 1000,
                    allow_dismiss: false,
                    stackup_spacing: 10
                });
                setTimeout(() => {  window.location.href = "instructor-dashboard.html" }, 1500);
            })
            .catch((error)=>{
                alert(error);
            });

        
    }
      


    submit.addEventListener('click',CreateSession);
    end.addEventListener('click', EndSession);
