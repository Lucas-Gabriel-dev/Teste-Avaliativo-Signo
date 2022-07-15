import { connect } from "../database/db";

interface IDeletePollRequest{
    user_id: string;
    idPoll: string;
}

class DeletePollService{
    async execute({ idPoll, user_id }: IDeletePollRequest){
        const Connect = await connect()

        if(!user_id){
            throw new Error("User not logged!")
        }

        const configDatabase = Connect.query(
            "SET FOREIGN_KEY_CHECKS=0;"
        )
        
        const deletePoll = Connect.query(
            `DELETE t2.*, t1.* 
            FROM signo.poll AS t1 
            INNER JOIN signo.poll_response as t2 
            WHERE t1.id_user_created = '${user_id}' AND
            t2.id_poll = '${idPoll}' AND
            t1.id_poll = '${idPoll}'`
        );

        const [ pollUser ] = await Connect.query(
            `SELECT title_poll, startDate_poll, endDate_poll, poll_response, vote_poll 
            FROM poll, poll_response 
            WHERE poll.id_user_created = '${user_id}' AND
            poll_response.id_poll = poll.id_poll `
        )
        
        return (pollUser)
    }
}

export { DeletePollService }