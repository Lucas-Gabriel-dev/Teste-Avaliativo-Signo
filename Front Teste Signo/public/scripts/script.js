const div = document.getElementById('buttonSection')
const user =  document.getElementById('userLogged')
document.getElementById("logOut").addEventListener("click", logOut, true);

if(localStorage.token){
    div.style.display = "none";
    user.style.display = "block";

    fetch("http://localhost:3000/logged", {
    method: "GET",
    headers: new Headers({
    Authorization: `Bearer ${localStorage.token}`,
    })}).then((response) => response.json())
    .then(function(data) {
        let authors = data;
        console.log("Success:", data);
        
        document.getElementById('nameUser').innerHTML = data.name_user
    })
    .catch(function(error) {
        console.error("Error:", error);

        if(error){
        }
    });

}

function logOut(){
    localStorage.token = '';

    div.style.display = "block";
    user.style.display = "none";

    window.location.replace("/")
}



