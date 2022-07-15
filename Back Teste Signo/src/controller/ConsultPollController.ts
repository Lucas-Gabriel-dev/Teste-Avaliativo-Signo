import { Request, Response } from "express";
import { ConsultPollService } from "../services/ConsultPollService";

class ConsultPollController {
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const consultPollService = new ConsultPollService();

        const infoPoll = await consultPollService.execute({
            user_id
        });

        return response.json(infoPoll);
    }
}

export { ConsultPollController }