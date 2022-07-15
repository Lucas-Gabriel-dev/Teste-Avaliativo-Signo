import { Request, Response } from "express";
import { CreatePollService } from "../services/CreatePollService";

class CreatePollController {
    async handle(request: Request, response: Response){
        const { user_id } = request
        const { titlePoll, startDate, endDate } = request.body;

        const createPollService = new CreatePollService();

        const infoPoll = await createPollService.execute({
            titlePoll,
            startDate,
            endDate,
            user_id
        });

        return response.json(infoPoll);
    }
}

export { CreatePollController }