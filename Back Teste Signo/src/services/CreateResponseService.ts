import { connect } from "../database/db";

interface ICreateResponseRequest{
    user_id: string;
    idPoll: string;
    pollResponse: [];
}

class CreateResponseService{
    async execute({ user_id, idPoll, pollResponse }: ICreateResponseRequest){
        const Connect = await connect()

        const user = [
            idPoll,
            pollResponse
        ] 

        if(!user_id){
            throw new Error("User not logged")
        }

        if(pollResponse.length < 3 || !pollResponse){
            throw new Error("Quantity response are incorrect")
        }

        const [ verifyUser ] = await Connect.query(
            `SELECT id_poll FROM poll
            WHERE poll.id_user_created = '${user_id}' AND
            poll.id_poll = '${idPoll}'`
        )

        if(!verifyUser[0]){
            throw new Error("User different from poll creator")
        }

        const [ responseCreated ] = await Connect.query( 
            `UPDATE poll
            SET response_created = true
            WHERE poll.id_user_created = '${user_id}' AND
            poll.id_poll = '${idPoll}'`
        )

        for(let i = 0; i < pollResponse.length; i++){
            if(pollResponse[i] === ""){
                throw new Error("Response are null")
            }

            Connect.query(`INSERT INTO poll_response(id_poll, poll_response) 
            VALUES('${idPoll}','${pollResponse[i]}');`);
        }
        
        return (user)
    }
}

export { CreateResponseService }