// document.getElementById("buttonLogin").addEventListener("click", LogIn, true)
document.querySelector('form').addEventListener('submit', LogIn, true)

function LogIn(){
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  var token = localStorage;

    const user = {
      email: userEmail,
      password: userPassword
    }

    console.log(user)

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        token = data
        localStorage.setItem('token', token)
        
        let pathname =  window.location.pathname
          
        if(data.error){
          var messageError = document.getElementById('messageError')
          
          messageError.style.display = "block";

          document.querySelector('#messageError').innerHTML = "Usuário ou senha incorreto"
        }

        if(!data.error){
          if(pathname === "/login"){
            window.location.replace("/")
          }
        }     
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}