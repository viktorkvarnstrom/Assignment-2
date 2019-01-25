$(function () {
    if ($('#logInForm').length) {
        let request = new XMLHttpRequest();
        request.onload = function () { 
            if (this.readyState == 4 && this.status == 200) {
                let object = JSON.parse(this.response);

                $('#loginBtn').click(function () {
                    if ($('#inputEmail').val() !== object.email || $('#inputPassword').val() !== object.password) {
                        document.getElementById('passwordIncorect').innerHTML = "** The email or password is incorect";
                    } else if ($('#inputEmail').val() === object.email && $('#inputPassword').val() === object.password) {
                        window.location.replace('index.html');
                    }
                    else {
                        console.log('not working');
                    }
                });
            }
        };
        request.open('GET', 'https://fe18.azurewebsites.net/api/user'); 
        request.send();
    }
});

// kollar varför inte bara en else if funkar