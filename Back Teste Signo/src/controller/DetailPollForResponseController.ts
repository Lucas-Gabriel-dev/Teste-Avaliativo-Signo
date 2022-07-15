import { Request, Response } from "express";
import { DetailPollForResponseService } from "../services/DetailPollForResponseService";

class DetailPollForResponseController {
    async handle(request: Request, response: Response){
        const { pollId } = request.body;

        const detailPollForResponseService = new DetailPollForResponseService();

        const infoPoll = await detailPollForResponseService.execute({
            pollId
        });

        return response.json(infoPoll);
    }
}

export { DetailPollForResponseController }