import { connect } from "../database/db";


class ConsultAllPollService{
    async execute(){
        const Connect = await connect()

        const [ pollResponse ] = await Connect.query(
            `SELECT poll.id_poll, title_poll, startDate_poll, endDate_poll, response_created
            FROM poll
            WHERE response_created = true`
        )
        
        
        return (pollResponse)
    }
}

export { ConsultAllPollService }