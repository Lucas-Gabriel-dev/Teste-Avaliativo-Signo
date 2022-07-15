import { Request, Response } from "express";
import { DeletePollService } from "../services/DeletePollService";

class DeletePollController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { idPoll } = request.body;

        const deletePollService = new DeletePollService();

        const deletePoll = await deletePollService.execute({
            user_id,
            idPoll
        });

        return response.json(deletePoll);
    }
}

export { DeletePollController }