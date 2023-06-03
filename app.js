const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkRequired(inputArr){
    inputArr.forEach (function(input) {
        if(input.value === ''){
            showError(input, `${getFieldName(input)} is required`);
        
        } else {
            showSuccess(input);
        }
    });
}


function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); 
}


// Check if email is valid
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else if (input.value === ''){
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check length
function checkLength(input, min, max){

    if(input.value == '') {
        showError(input, `${getFieldName(input)} is required` )
    }
   else if (input.value.length < min) {
        showError(input, `${getFieldName(input)} should be min ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} should be max ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check if passwords match 
function checkPassword(password, password2){
    if(password.value !=='' && password2.value === ''){
        showError(password2, 'You never entered confirm password');
    } else if(password.value !== password2.value){
        showError(password2, 'Passwords don\'t match')
    } 
}


form.addEventListener('submit', function(e){
    e.preventDefault();

   checkRequired([email, password2]);
   checkLength(username, 6, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPassword(password, password2);


});