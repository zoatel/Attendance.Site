
        //refs
        
        let userlink = document.getElementById('userlink');
        let signoutlink = document.getElementById('signoutlink');
        let contact = document.getElementById('contact');
        var currentUser = null;
        let type = null;
        function getUsername(){
                type = localStorage.getItem('type');
                if(type == "Instructor"){
                    currentUser = JSON.parse(localStorage.getItem('iuser'));
                }else{
                    currentUser = JSON.parse(localStorage.getItem('suser'));
                }
        }

        function Signout(){
            localStorage.removeItem('type')
            localStorage.removeItem('suser');
            localStorage.removeItem('iuser');
            window.location = "index.html";
        }
        window.onload = function(){
            getUsername();
            if(currentUser == null){
                userlink.href = "sign-up.html";
                signoutlink.href = "sign-in.html";
            }else{
                if(type == "Instructor"){
                    userlink.innerText = currentUser.username+" (Instructor)";
                    userlink.href = "instructor-dashboard.html";
                }else{
                    userlink.innerText = currentUser.username+" (Student)";
                    userlink.href = "student-dashboard.html";
                }

                contact.remove();
                signoutlink.innerText="SignOut";
                signoutlink.classList.replace("btn","nav-link");
                signoutlink.classList.remove("btn-secondary");
                signoutlink.href = "javascript:Signout()";

            }
        }