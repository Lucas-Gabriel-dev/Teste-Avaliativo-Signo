import { Request, Response } from "express";
import { ConsultAllPollService } from "../services/ConsultAllPollService";

class ConsultAllPollController {
    async handle(request: Request, response: Response){
        const consultAllPollService = new ConsultAllPollService();

        const infoAllPoll = await consultAllPollService.execute();

        return response.json(infoAllPoll);
    }
}

export { ConsultAllPollController }