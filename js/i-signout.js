
    function Signout(){
        localStorage.removeItem('iuser');
        localStorage.removeItem('type');
        localStorage.removeItem('sessionON');
        window.location = "index.html";
    }
