import { connect } from "../database/db";

interface IDetailPollForResponseRequest{
    pollId: string;
}

class DetailPollForResponseService{
    async execute({ pollId }: IDetailPollForResponseRequest){
        const Connect = await connect()

        const [ pollResponse ] = await Connect.query(
            `SELECT id_poll, title_poll, startDate_poll, endDate_poll 
            FROM poll
            WHERE poll.id_poll = '${pollId}'`
        )
        
        return (pollResponse)
    }
}

export { DetailPollForResponseService }