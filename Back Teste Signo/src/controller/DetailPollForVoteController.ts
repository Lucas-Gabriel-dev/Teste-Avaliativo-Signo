import { Request, Response } from "express";
import { DetailPollForVoteService } from "../services/DetailPollForVoteService";

class DetailPollForVoteController {
    async handle(request: Request, response: Response){
        const { pollId } = request.body;

        const detailPollForVoteService = new DetailPollForVoteService();

        const infoPoll = await detailPollForVoteService.execute({
            pollId
        });

        return response.json(infoPoll);
    }
}

export { DetailPollForVoteController }