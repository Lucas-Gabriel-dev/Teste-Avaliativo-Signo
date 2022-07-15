import { connect } from "../database/db";

interface IDetailPollForVoteRequest{
    pollId: string;
}

class DetailPollForVoteService{
    async execute({ pollId }: IDetailPollForVoteRequest){
        const Connect = await connect()

        const [ pollResponse ] = await Connect.query(
            `SELECT title_poll, startDate_poll, endDate_poll, id_poll_response, poll_response, vote_poll 
            FROM poll, poll_response 
            WHERE poll.id_poll = '${pollId}' AND
            poll_response.id_poll = poll.id_poll`
        )

        return (pollResponse)
    }
}

export { DetailPollForVoteService }