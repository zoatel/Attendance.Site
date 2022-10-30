
        var input = document.getElementById('pnumber');
        window.intlTelInput(input, {
            preferredCountries: ['EG', 'PS'],
            initialCountry: "EG",
            excludeCountries: ["IL"],
            utilsScript: "js/utils.js",
        });
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
        firebase.initializeApp(firebaseConfig);
        render();
        function render(){
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
            });
            recaptchaVerifier.render();
        }
        function phoneAuth(){
            var number = window.intlTelInputGlobals.getInstance(input).getNumber();
            firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult){
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                document.getElementById('sender').style.display = 'none';
                document.getElementById('verifier').style.display = 'block';
                document.getElementById('then').innerText = " ********"+number.slice(-3);
            }).catch(function(error){
                alert(error.message);
            });
        }
        function codeverify(){
            var code = document.getElementById('otpcode').value;
            coderesult.confirm(code).then(()=>{
                $.bootstrapGrowl("Code verified successfully!",{
                type: "success",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
                });
                document.getElementById('otpcode').disabled = true;
                document.getElementById('ver').disabled = true;
                localStorage.setItem('reset',window.intlTelInputGlobals.getInstance(input).getNumber());
                setTimeout(() => {  window.location.href = "change-password.html" }, 1500);
            }).catch(function(){
                $.bootstrapGrowl("The code is incorrect!",{
                type: "danger",
                offset: {from:"top",amount:70},
                align: "center",
                delay: 1000,
                allow_dismiss: false,
                stackup_spacing: 10
                });
            })
        }

        