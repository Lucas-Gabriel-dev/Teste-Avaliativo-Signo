if(localStorage.token === ""){
    var div = document.getElementById('container')
    var divError = document.getElementById('errorMessage') 

    div.style.display = "none";
    divError.style.display = "block";
}

function CreatePoll(){
    const titlePoll = document.getElementById('titlePoll').value
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value

    const values = {
        titlePoll: titlePoll,
        startDate: startDate,
        endDate: endDate
    }

    fetch("http://localhost:3000/createpoll", {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        }),
        body: JSON.stringify(values)
    }).then((response) => response.json())
    .then(function(data) {
        let authors = data;
        console.log("Success:", data);
        
        if(!data.error){
            window.location.replace(`/create-response/${data[0]}`)
        }

        if(data.error){
            var messageError = document.getElementById('messageError')

            messageError.style.display = "block";

            if(data.error === "Invalid start data"){
                document.querySelector('#messageError').innerHTML = "Data de início não pode ser anterior a atual"
            }

            if(data.error === "Invalid end data"){
                document.querySelector('#messageError').innerHTML = "Data de conclusão não pode ser anterior a atual"
            }
        }
    })
    .catch(function(error) {
        console.error("Error:", error);

        if(error){
        }
    });
}