import { Request, Response } from "express";
import { UserLoggedService } from "../services/UserLoggedService";

class UserLoggedController {
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const userLoggedService = new UserLoggedService();

        const infoAccount = await userLoggedService.execute(user_id);

        return response.json(infoAccount);
    }
}

export { UserLoggedController }