import { Request, Response } from "express";
import { AuthenticatorUserService } from "../services/AuthenticatorUserService";

class AuthenticatorUserController{
    async handle(request: Request, response: Response){
        const { email, password } = request.body;

        const authenticatorUserService = new AuthenticatorUserService();

        const token = await authenticatorUserService.execute({ 
            email, 
            password 
        })

        return response.json(token)
    }
}

export { AuthenticatorUserController }