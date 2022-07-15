import { connect } from "../database/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserRequest{
    email: string;
    password: string;
}

class AuthenticatorUserService{
    async execute({ email, password }: IAuthenticateUserRequest){
        const Connect = await connect()

        const [ user ]  = await Connect.query(
            `SELECT id_user, name_user, email_user, password_user 
            FROM user
            WHERE email_user = '${email}'`
        );

        if(user[0] === undefined){
            throw new Error("Email or password incorrect"); 
        }

        const passwordMatchUser = await compare(password, user[0].password_user)
       
        if(passwordMatchUser){
            const token = sign(
                {
                    email: user[0].email_user
                },
                "d52ad414321b29c436c538ecf1766225",
                {
                    subject: user[0].id_user,
                    expiresIn: "1d"
                }
            )

            return (token);
        } 
    
        throw new Error("Email or password incorrect")
    }
}

export { AuthenticatorUserService };