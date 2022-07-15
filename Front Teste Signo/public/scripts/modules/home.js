const idPoll = window.location.pathname.split("/")

if(idPoll[1] === "" || idPoll[1] === "home"){
    Home()
}

// Home()
async function Home(){
    try{
        const response = await fetch("http://localhost:3000/consultallpoll", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
        })
        const data = await response.json()

        if(data[0] != undefined){
            show(data)
        }

        if(data[0] === undefined){
            var notPoll = document.getElementById('notContent')
          
            notPoll.style.display = "flex";
        }
    
        return data
    } catch (error){
        console.log("Error: ", error)
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

    const today = new Date();

    const list = {
        create(poll){
            for (var i = 0; i != poll.length; i++) {  
                const pollContainer = document.createElement('div')
                const infoPoll = document.createElement('div')
                const titlePoll =  document.createElement('h1') 
                const pollButton = document.createElement('a')  
                const pollStatus = document.createElement('p') 
                const date = document.createElement('div')  
                const startDate =  document.createElement('span')   
                const endDate =  document.createElement('span')

                pollContainer.classList.add('pollContainer')
                pollContainer.setAttribute('id', `pollContainer${i}`)
                infoPoll.classList.add('infoPoll')
                infoPoll.setAttribute('id', `infoPoll${i}`)
                titlePoll.classList.add('titlePoll')
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

                if(poll[i].response_created){
                    pollStatus.innerHTML = "Em aberto"

                    pollStatus.style.background = "rgb(138, 248, 138)"
                }

                const diffEndDate = new Date(`${poll[i].endDate_poll}`)
                const timeDiff = Math.abs(diffEndDate.getTime() - today.getTime());
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                if(diffDays < 0){
                    pollStatus.innerHTML = "Encerrada"

                    pollStatus.style.background = "rgb(248, 138, 138)"
                }

                titlePoll.innerHTML = poll[i].title_poll
                startDate.innerHTML = "Data de início: " + newStartDay[0] + "/" + newStartDate[1] + "/" + newStartDate[0]
                endDate.innerHTML = "Data de término: " + newEndDay[0] + "/" + newEndDate[1] + "/" + newEndDate[0]
                pollButton.href = "/vote/" + poll[i].id_poll
                pollButton.innerHTML = "VOTAR"

                html.get(`.container`).appendChild(pollContainer)

                html.getId(`pollContainer${i}`).appendChild(pollStatus)
                html.getId(`pollContainer${i}`).appendChild(infoPoll)
                html.getId(`infoPoll${i}`).appendChild(titlePoll)
                html.getId(`infoPoll${i}`).appendChild(pollButton)
                html.getId(`pollContainer${i}`).appendChild(date)
                html.getId(`date${i}`).appendChild(startDate)
                html.getId(`date${i}`).appendChild(endDate)
            }
        }
    }

    console.log(data)
    
    // productID.forEach(list.create)
    list.create(data)
}

