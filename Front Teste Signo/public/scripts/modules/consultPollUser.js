ConsultPollUser()

function ConsultPollUser(){
    fetch("http://localhost:3000/consultpoll", {
    method: "GET",
    headers: new Headers({
    Authorization: `Bearer ${localStorage.token}`,
    })}).then((response) => response.json())
    .then(function(data) {
        let authors = data;
        console.log("Success:", data);
        
        if(!data.error){
            show(data)
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
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

    const today = new Date();

    const list = {
        create(poll){
            for (var i = 0; i != poll.length; i++) {  
                const pollContainer = document.createElement('div')
                const infoPoll = document.createElement('div')
                const titlePoll =  document.createElement('h1') 
                const sectionButton = document.createElement('section')
                const pollButton = document.createElement('a') 
                const editButton = document.createElement('a') 
                const pollStatus = document.createElement('p') 
                const date = document.createElement('div')  
                const startDate =  document.createElement('span')   
                const endDate =  document.createElement('span')

                pollContainer.classList.add('pollContainer')
                pollContainer.setAttribute('id', `pollContainer${i}`)
                infoPoll.classList.add('infoPoll')
                infoPoll.setAttribute('id', `infoPoll${i}`)
                titlePoll.classList.add('titlePoll')
                sectionButton.classList.add('sectionButton')
                sectionButton.setAttribute('id', `sectionButton${i}`)
                editButton.classList.add('editButton')
                pollButton.classList.add('pollButton')
                pollStatus.classList.add('pollStatus')
                date.setAttribute('id', `date${i}`)
                date.classList.add('date')
                startDate.classList.add('startDate')
                endDate.classList.add('endDate')
                
                const newStartDate = poll[i].startDate_poll.split('-')
                const newEndDate = poll[i].endDate_poll.split('-')

                const newStartDay = newStartDate[2].split('T')
                const newEndDay = newEndDate[2].split('T')

                titlePoll.innerHTML = poll[i].title_poll

                if(poll[i].response_created){
                    pollStatus.innerHTML = "Em aberto"
                    pollStatus.style.background = "rgb(138, 248, 138)"
                }

                if(!poll[i].response_created){
                    pollStatus.innerHTML = "Pendente"

                    pollStatus.style.background = "rgb(231, 243, 126)"
                }

                const diffEndDate = new Date(`${poll[i].endDate_poll}`)
                const timeDiff = diffEndDate.getTime() - today.getTime();
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                console.log(diffDays)

                if(diffDays < 0){
                    pollStatus.innerHTML = "Encerrada"

                    pollStatus.style.background = "rgb(248, 138, 138)"
                }

                startDate.innerHTML = "Data de início: " + newStartDay[0] + "/" + newStartDate[1] + "/" + newStartDate[0]
                endDate.innerHTML = "Data de término: " + newEndDay[0] + "/" + newEndDate[1] + "/" + newEndDate[0]
                pollButton.href = "/vote/" + poll[i].id_poll
                pollButton.innerHTML = "Detalhes"

                html.get(`.container`).appendChild(pollContainer)

                html.getId(`pollContainer${i}`).appendChild(pollStatus)
                html.getId(`pollContainer${i}`).appendChild(infoPoll)
                html.getId(`infoPoll${i}`).appendChild(titlePoll)
                html.getId(`infoPoll${i}`).appendChild(sectionButton)

                if(poll[i].response_created){
                    html.getId(`sectionButton${i}`).appendChild(editButton)

                    editButton.href = "/editpoll/" + poll[i].id_poll
                    editButton.innerHTML = "Editar"
                }

                html.getId(`sectionButton${i}`).appendChild(pollButton)
                html.getId(`pollContainer${i}`).appendChild(date)
                html.getId(`date${i}`).appendChild(startDate)
                html.getId(`date${i}`).appendChild(endDate)
            }
        }
    }
 
    list.create(data)
}
