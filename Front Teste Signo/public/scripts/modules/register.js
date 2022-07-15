function Register(){
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const user = {
      name: userName,
      email: userEmail,
      password: userPassword,
    }

    
    fetch("http://localhost:3000/createuser", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        if(data.error === "Email exists"){
          document.getElementById('messageError').innerHTML = 'Esse email já existe!'
        }

        if(!data.error){
          token = data
          localStorage.setItem('token', token)

          window.location.replace("/")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
    
}

document.getElementById('buttonRedirec').addEventListener('click', function(){
  window.location.replace("/login")
})