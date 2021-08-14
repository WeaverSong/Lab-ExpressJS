const EmailInput = document.getElementById("Email");
const PasswordInput = document.getElementById("Password");

document.getElementById("Submit").addEventListener('click', (e) =>
{
    e.preventDefault();

    let Email = EmailInput.value;
    let Password = PasswordInput.value;

    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //For some reason it won't send the body unless I put it in the headers. I'd love to know what I'm doing wrong there.
            //The form itself didn't seem to be sending the data either.
            body: JSON.stringify({Email, Password})
        }
    });

    location.href = "http://localhost:3000/formsubmission";

})