import { connect } from "../database/db";
import moment, { isMoment, parseZone } from "moment"

interface IVotePollRequest{
    user_id: string;
    idPoll: string;
    idPollResponse: number;
    voted?: boolean;
}

class VotePollService{
    async execute({ user_id, idPoll, idPollResponse, voted = false }: IVotePollRequest){
        const Connect = await connect()

        if(!user_id){
            throw new Error("User not logged!")
        }

        if(!voted){
            throw new Error("Vote invalid")
        }

        const [ pollResponse ] = await Connect.query(
            `SELECT poll_response, vote_poll, startDate_poll, endDate_poll 
            FROM poll, poll_response 
            WHERE poll_response.id_poll = '${idPoll}' AND
            poll_response.id_poll_response = '${idPollResponse}' AND
            poll.id_poll = '${idPoll}'`
        )

        const today = new Date(); 

        const startDate = moment(today).diff(pollResponse[0].startDate_poll, 'days')
        const endDate = moment(today).diff(pollResponse[0].endDate_poll, 'days')

        if(startDate < 0 || endDate > 0){
            throw new Error("Poll expired")
        }

        const [ userVote ] = await Connect.query(
            `SELECT * FROM user_vote
            WHERE id_user = '${user_id}' AND
            id_poll = '${idPoll}'`
        )

        if(userVote[0]){
            console.log("It's not possible, the user has already voted")

            const [ userHasVoted ] = await Connect.query(
                `SELECT poll_response FROM poll_response
                WHERE id_poll = '${idPoll}' AND
                id_poll_response = ${userVote[0].id_poll_response}`
            )

            throw new Error(userHasVoted[0].poll_response)
        }

        const newVote = pollResponse[0].vote_poll + 1 

        await Connect.query(
            `UPDATE poll_response
            SET vote_poll = '${newVote}'
            WHERE poll_response.id_poll = '${idPoll}' AND
            poll_response.id_poll_response = '${idPollResponse}'`
        );

        const infoNewVote = [
            user_id,
            idPoll,
            idPollResponse,
            today
        ]

        await Connect.query(
            `INSERT INTO user_vote(id_user, id_poll, id_poll_response, created_at)
            VALUES (?,?,?,?)`, 
            infoNewVote
        );
        
        const request = [
            newVote,
            pollResponse[0].poll_response
        ]

        return (request)
    }
}

export { VotePollService }