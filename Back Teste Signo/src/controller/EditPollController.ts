import { Request, Response } from "express";
import { EditPollService } from "../services/EditPollService";

class EditPollController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { idPoll, pollResponse, idResponsePoll } = request.body;

        const editPollService = new EditPollService();

        const infoPoll = await editPollService.execute({
            user_id,
            idPoll,
            pollResponse,
            idResponsePoll
        });

        return response.json(infoPoll);
    }
}

export { EditPollController }