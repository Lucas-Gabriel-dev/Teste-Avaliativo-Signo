import { connect } from "../database/db";
import { v4 as uuid } from "uuid";
import moment from "moment"

interface ICreatePollRequest{
    titlePoll: string;
    startDate: Date;
    endDate: Date;
    user_id: string;
}

class CreatePollService{
    id: string;
    async execute({ titlePoll, startDate, endDate, user_id }: ICreatePollRequest){
        const Connect = await connect()

        if(!titlePoll || !startDate || !endDate){
            throw new Error("Fields are not filled")
        }

        if(!user_id){
            throw new Error("User not logged!")
        }
        
        const createdAt = new Date(); 

        const diffStartDate = moment(createdAt).diff(startDate, 'days')
        const diffEndDate = moment(createdAt).diff(endDate, 'days')

        if(diffStartDate > 0){
            throw new Error("Invalid start data")
        }

        if(diffEndDate > 0){
            throw new Error("Invalid end data")
        }

        if(!this.id){
            this.id = uuid()
        }

        const user = [
            this.id,
            titlePoll,
            startDate,
            endDate,
            createdAt,
            user_id
        ];

        const sql = `INSERT INTO poll(id_poll, title_poll, startDate_poll, endDate_poll, createdAt_poll, id_user_created) 
        VALUES(?,?,?,?,?,?);`;
        
        await Connect.query(sql, user);
        
        return (user)
    }
}

export { CreatePollService }