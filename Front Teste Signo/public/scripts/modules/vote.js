const idPollInPage = window.location.pathname.split("/")

if(idPollInPage[2]){
    Vote()
}
console.log(idPollInPage[2])

async function Vote(){
    const poll = {
        pollId: idPollInPage[2]
    }

    try{
        const response = await fetch("http://localhost:3000/detailpoll", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(poll)
        })
        
        const data = await response.json()
        
        console.log(data)

        show(data)

        return data
    } catch (error){
        console.log("Error: ", error)

        if(error){
            var div = document.getElementById('container')
            var divError = document.getElementById('notResponse') 
    
            div.style.display = "none";
            divError.style.display = "block";

            document.getElementById('registerResponse').href = "/create-response/" + idPollInPage[2]
        }
    }
}

function show(data){ 
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
            const infoPoll = document.createElement('div')
            const titlePoll =  document.createElement('h1') 

            const date = document.createElement('div')  
            const startDate =  document.createElement('span')   
            const endDate =  document.createElement('span')

            infoPoll.classList.add('infoPoll')
            titlePoll.classList.add('titlePoll')
            date.classList.add('date')
            startDate.classList.add('startDate')
            endDate.classList.add('endDate')
            console.log(poll)

            const newStartDate = poll[0].startDate_poll.split('-')
            const newEndDate = poll[0].endDate_poll.split('-')
        
            const newStartDay = newStartDate[2].split('T')
            const newEndDay = newEndDate[2].split('T')

            titlePoll.innerHTML = poll[0].title_poll
            startDate.innerHTML = "Data de início: " + newStartDay[0] + "/" + newStartDate[1] + "/" + newStartDate[0]
            endDate.innerHTML = "Data de término: " + newEndDay[0] + "/" + newEndDate[1] + "/" + newEndDate[0]


            html.getId(`container`).appendChild(infoPoll)
            html.get(`.infoPoll`).appendChild(titlePoll)
            html.getId(`container`).appendChild(date)
            html.get(`.date`).appendChild(startDate)
            html.get(`.date`).appendChild(endDate)

            for (var i = 0; i != poll.length; i++) {  
                const option = document.createElement('div')
                const pollDescription = document.createElement('div')
                const pollOption = document.createElement('h2')
                const sectionVote = document.createElement('section')
                const numberOfVote = document.createElement('p') 
                const graphic = document.createElement('div')
                const pollButton = document.createElement('a')  
                
                pollDescription.setAttribute('id', `pollDescription${poll[i].id_poll_response}`)
                option.setAttribute('id', `option${poll[i].id_poll_response}`)
                option.classList.add('option')
                pollOption.classList.add('pollOption')
                sectionVote.classList.add('sectionVote')
                sectionVote.setAttribute('id', `sectionVote${poll[i].id_poll_response}`)
                numberOfVote.classList.add('numberOfVote')
                graphic.classList.add('graphic')
                pollButton.classList.add('pollButton')

                console.log(poll[i].id_poll_response)
              
                pollOption.innerHTML = poll[i].poll_response

                if(!poll[i].vote_poll){
                    numberOfVote.innerHTML = "0 votos"
                }else{
                    numberOfVote.innerHTML = poll[i].vote_poll + " votos"
                }

                pollButton.href = "/vote/" + idPollInPage[2] + '/' + poll[i].id_poll_response
                pollButton.innerHTML = "VOTAR"
                
                html.getId(`container`).appendChild(option)                
                html.getId(`option${poll[i].id_poll_response}`).appendChild(pollDescription)                
                html.getId(`pollDescription${poll[i].id_poll_response}`).appendChild(pollOption)                
                html.getId(`pollDescription${poll[i].id_poll_response}`).appendChild(sectionVote)                
                html.getId(`sectionVote${poll[i].id_poll_response}`).appendChild(numberOfVote)                
                html.getId(`sectionVote${poll[i].id_poll_response}`).appendChild(graphic)                
                html.getId(`option${poll[i].id_poll_response}`).appendChild(pollButton)
            }
        }
    }
    
    list.create(data)
}

if(idPollInPage[3]){
    votedPoll()
}

function votedPoll(){ 
    const pollVoted = {
        idPoll: idPollInPage[2],
        idPollResponse: idPollInPage[3],
        voted: true
    }

    fetch("http://localhost:3000/votepoll", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        }),
        body: JSON.stringify(pollVoted)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        const userVote = document.getElementById('userVote')
        userVote.style.display = "block";

        userVote.addEventListener('click', () => {
            userVote.style.display = "none"
            window.location.href = '/vote/' + pollVoted.idPoll
        })
           
        if(!data.error){
            document.getElementById('nameVote').innerHTML = "Você votou em " + data[1]
        }

        if(data.error){
            document.getElementById('nameVote').innerHTML = "Você já votou em " + data.error
        }
    })
    .catch((error) => {
        console.error("Error:", error);

        if(error){
            var div = document.getElementById('container')
            var divError = document.getElementById('errorMessage') 
    
            div.style.display = "none";
            divError.style.display = "block";
            // window.location.replace("./index.html")
        }
    });
}