document.getElementById('buttonAdd').addEventListener('click', AddMoreInput, true)
document.getElementById('buttonRemove').addEventListener('click', RemoveInput, true)
document.getElementById('buttonSend').addEventListener('click', ResponsePoll, true)

const idPollInPage = window.location.pathname.split("/")
let optionNumber = 3

if(idPollInPage[2]){
    InfoPoll()
}

async function InfoPoll(){
    const poll = {
        pollId: idPollInPage[2]
    }

    try{
        const response = await fetch("http://localhost:3000/detailpoll-response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(poll)
        })
        
        const data = await response.json()
        
        console.log(data)

        Show(data)

        return data
    } catch (error){
        console.log("Error: ", error)

        if(error){
            var divForm = document.getElementById('userArea')
            var divInfo = document.getElementById('infoPoll')
            var divError = document.getElementById('pollinvalid') 


            divForm.style.display = "none";
            divInfo.style.display = "none";
            divError.style.display = "block";
            
            return
        }
    }
}


function Show(data){ 
    const html = {
        get(element){
            return document.querySelector(element)
        },
        getId(element){
            return document.getElementById(element)
        }
    }

    const list = {
        create(poll){
            const newStartDate = poll[0].startDate_poll.split('-')
            const newEndDate = poll[0].endDate_poll.split('-')
        
            const newStartDay = newStartDate[2].split('T')
            const newEndDay = newEndDate[2].split('T')

            html.getId(`titlePoll`).innerHTML = poll[0].title_poll
            html.getId(`idPoll`).innerHTML = idPollInPage[2]
            html.getId(`startPoll`).innerHTML = newStartDay[0] + "/" + newStartDate[1] + "/" + newStartDate[0]
            html.getId(`endPoll`).innerHTML = newEndDay[0] + "/" + newEndDate[1] + "/" + newEndDate[0]
        }
    }
    
    list.create(data)
}

function ResponsePoll(){
    const values = {
        idPoll: idPollInPage[2],
        pollResponse: [],
    }

    for(let i = 1; i <= optionNumber; i++){
        const option = values.pollResponse.push(document.getElementById(`option${i}`).value)
    }

    console.log("Lucas")

    fetch("http://localhost:3000/responsecreate", {
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
        
        console.log(values)

        if(!data.error){
            window.location.replace(`/vote/${data[0]}`)
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

function AddMoreInput(){
    optionNumber = optionNumber + 1
    const optionTitle = document.createElement('label')
    const optionInput =  document.createElement('input')

    optionTitle.setAttribute('id', `optionTitle${optionNumber}`)
    optionInput.setAttribute('id', `option${optionNumber}`)

    optionTitle.innerHTML = "Opção " + optionNumber
    optionInput.type = 'text'
    optionInput.placeholder = "Opção " + optionNumber
    optionInput.required = true

    document.getElementById('inputs').appendChild(optionTitle)
    document.getElementById('inputs').appendChild(optionInput)
}


function RemoveInput(){
    const optionInput = document.getElementById(`option${optionNumber}`)
    const optionTitle = document.getElementById(`optionTitle${optionNumber}`)
    console.log(`${optionNumber}`)
    
    if(optionNumber === 3){
        return
    }
    
    optionNumber = optionNumber - 1
    
    optionInput.remove() 
    optionTitle.remove()

}