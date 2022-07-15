import { connect } from "../database/db";

interface IEditPollRequest{
    user_id: string;
    idPoll: string;
    pollResponse: [];
    idResponsePoll: [];
}

class EditPollService{
    async execute({ idPoll, user_id, pollResponse, idResponsePoll }: IEditPollRequest){
        const Connect = await connect()

        if(!user_id){
            throw new Error("User not logged!")
        }

        for(let i = 0; i < pollResponse.length; i++){
            if(idResponsePoll[i]){
                const editPoll = Connect.query(
                    `UPDATE poll, poll_response
                    SET poll_response = '${pollResponse[i]}'
                    WHERE poll_response.id_poll = '${idPoll}' AND
                    poll.id_user_created = '${user_id}' AND
                    poll.id_poll = '${idPoll}' AND
                    poll_response.id_poll_response = ${idResponsePoll[i]}`
                );
            }

            if(!idResponsePoll[i]){
                const sql = Connect.query(
                    `INSERT INTO poll_response(id_poll, poll_response) 
                    VALUES('${idPoll}','${pollResponse[i]}');`
                );
            }

            const [ newPollResponse ] = await Connect.query(
                `SELECT title_poll, startDate_poll, endDate_poll, poll_response, vote_poll 
                FROM poll, poll_response 
                WHERE poll_response.id_poll = '${idPoll}' AND
                poll.id_user_created = '${user_id}' AND
                poll.id_poll = '${idPoll}'`
            )
            
        }

        const [ deleteResponsePoll ] = await Connect.query(
            `SELECT title_poll, startDate_poll, endDate_poll, poll_response, vote_poll, id_poll_response 
            FROM poll, poll_response 
            WHERE poll_response.id_poll = '${idPoll}' AND
            poll.id_user_created = '${user_id}' AND
            poll.id_poll = '${idPoll}'`
        )
        
        const configDatabase = Connect.query(
            "SET FOREIGN_KEY_CHECKS=0;"
        )

        for(let i = 0; i < deleteResponsePoll.length; i++){
            
            if(deleteResponsePoll[i].poll_response != pollResponse[i] || !pollResponse[i]){
                await Connect.query(
                    `DELETE t1.* 
                    FROM signo.poll_response AS t1 
                    WHERE t1.id_poll_response = '${deleteResponsePoll[i].id_poll_response}' AND
                    t1.id_poll = '${idPoll}' AND
                    t1.poll_response = '${deleteResponsePoll[i].poll_response}'`
                )
            }
        }

        const [ newPollResponse ] = await Connect.query(
            `SELECT title_poll, startDate_poll, endDate_poll, poll_response, vote_poll 
            FROM poll, poll_response 
            WHERE poll_response.id_poll = '${idPoll}' AND
            poll.id_user_created = '${user_id}' AND
            poll.id_poll = '${idPoll}'`
        )
            
        return (newPollResponse)
    }
}

export { EditPollService }