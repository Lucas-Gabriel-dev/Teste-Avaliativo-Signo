import { connect } from "../database/db";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";

interface IUserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    id: string;
    async execute({ name, email, password }: IUserRequest){
        const Connect = await connect();
        
        if(!email){
            throw new Error("Email incorrect"); 
        }

        const [ rows ] = await Connect.query(`SELECT email_user FROM user WHERE email_user = '${email}'`);
        
        if(rows[0] !== undefined){
            console.log(rows[0])
            throw new Error("Email exists")
        }
        
        if(!this.id){
            this.id = uuid()
        }
        
        const passwordHash = await hash(password, 8)

        const user = [
            name, 
            email, 
            password = passwordHash
        ];

        
        const sql = `INSERT INTO user(id_user, name_user, email_user, password_user) 
        VALUES ('${this.id}',?,?,?);`;
        
        await Connect.query(sql, user);

        const [ newUser ]  = await Connect.query(
            `SELECT id_user, name_user, email_user, password_user
            FROM user
            WHERE email_user = '${email}'`
        );

        const token = sign(
            {
                email: newUser[0].email_user
            },
            "d52ad414321b29c436c538ecf1766225",
            {
                subject: newUser[0].id_user,
                expiresIn: "1d"
            }
        )

        return (token);
    }
}

export { CreateUserService };