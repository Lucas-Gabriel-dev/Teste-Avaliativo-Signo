import { Request, Response } from "express";
import { CreateResponseService } from "../services/CreateResponseService";

class CreateResponseController {
    async handle(request: Request, response: Response){
        const { user_id } = request
        const { idPoll, pollResponse } = request.body;

        const createResponseService = new CreateResponseService();

        const infoPoll = await createResponseService.execute({
            user_id,
            idPoll,
            pollResponse
        });

        return response.json(infoPoll);
    }
}

export { CreateResponseController }