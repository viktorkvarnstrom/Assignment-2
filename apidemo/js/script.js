$(function() {

    let request = new XMLHttpRequest(); 
    request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
            let user = JSON.parse(this.response);
            
            let fullname = user.firstname + " " + user.lastname; // lägger ihop förnamn och wfternMN 
            console.log(fullname); // hämtar
         

            let password = user.password;
            console.log(password);
        
        }
    
    };


    request.open('GET', 'https://fe18.azurewebsites.net/api/user'); // Hämtar JavaScirpts objektet och sparar in det i request.   
    request.send();

});