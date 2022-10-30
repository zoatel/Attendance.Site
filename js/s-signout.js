
        
    function Signout(){
        localStorage.removeItem('suser');
        localStorage.removeItem('type');
        localStorage.removeItem('AttendS');
        window.location = "index.html";
    }