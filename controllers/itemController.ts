import {parseJSON, parseParams} from '../utils/bodyParser';
import { Items } from '../models/models';
class itemController {
    async getItem(req:any, res:any) {
        try {
            const allitems:any = await Items.findAll();
            res.end(JSON.stringify(allitems));
        }
        catch(e) {
            console.log(e);
        }

    }

    async createItem(req:any, res:any) {
        try {
            const requestParseBody = await parseJSON(req);

            const {name, price} = requestParseBody;

            const checkItem = await Items.findOne({where: {name}});
            if(checkItem) {
                res.end(`Error.Item with ${name} was already created`);
            }

            else {
                const newItem = new Items({name, price});
                await newItem.save();
                res.end(`Item with ${name} created`) ;
            }
        }
        catch(e) {
            console.log(e);
        }

    }


}

export default new itemController;