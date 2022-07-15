import { connect } from "../database/db";

class UserLoggedService{
    async execute(user_id: string){
        const Connect = await connect()

        const [ infoAccount ] = await Connect.query(
            `SELECT name_user FROM user where id_user = '${user_id}'`
        )

        return infoAccount[0]
    }
}

export { UserLoggedService }