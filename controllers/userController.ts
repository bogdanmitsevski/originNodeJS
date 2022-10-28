import {parseJSON, parseParams} from '../utils/bodyParser';
import {users} from '../models/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const generateJwt = (id: any, email: any) => {
    return jwt.sign(
      {id, email}, 
        process.env.SECRET_KEY as string,
        {expiresIn: '24h'}
        );
}
class userController {
    async registartion (req:any, res:any) {
        try {
            const requestParseBody = await parseJSON(req);
            const {email, password} = requestParseBody;

            const checkUser = await users.findOne({
                where: {email:email}
            });

            if(checkUser) {
                res.statusCode = 400;
                res.end(`User with this email: ${email} was created`);
            }

            else {
                const hashPassword = await bcrypt.hash(password, 8);
                const newUser = await users.create({email, password:hashPassword});
                const token = generateJwt(newUser.id, newUser.email);
                await newUser.save();
                res.end(`New User with ${token} was created`);
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    async login (req:any, res:any) {
        try {
            const requestParseBody = await parseJSON(req);
            const {email, password} = requestParseBody;

            const isUserRegistered = await users.findOne({
                where: {email:email}
            });

            if(!isUserRegistered) {
                res.statusCode = 400;
                res.end(`User with this email: ${email} does not exist`);
            }

            else {
                let comparePassword = bcrypt.compareSync(password, isUserRegistered.password);
                if(!comparePassword) {
                    res.statusCode = 400;
                    res.end('Password was incorrect. Try again');
                }

                else {
                    const token = generateJwt(isUserRegistered.id, isUserRegistered.password);
                    res.end(`User was successfully logined with TOKEN: ${token}`);
                }
            }


        }
        catch(e) {
            console.log(e);
        }
    }
}

export default new userController;