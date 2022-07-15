import { connect } from "../database/db";

interface IConsultPollRequest{
    user_id: string;
}

class ConsultPollService{
    async execute({ user_id }: IConsultPollRequest){
        const Connect = await connect()

        const [ pollResponse ] = await Connect.query(
            `SELECT poll.id_poll, title_poll, startDate_poll, endDate_poll, response_created 
            FROM poll
            WHERE poll.id_user_created = '${user_id}'`
        )
        
        return (pollResponse)
    }
}

export { ConsultPollService }