import { Request, Response } from "express";
import { VotePollService } from "../services/VotePollService";

class VotePollController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { idPoll, idPollResponse, voted } = request.body;

        const votePollService = new VotePollService();

        const infoPoll = await votePollService.execute({
            user_id,
            idPoll,
            idPollResponse,
            voted
        });

        return response.json(infoPoll);
    }
}

export { VotePollController }