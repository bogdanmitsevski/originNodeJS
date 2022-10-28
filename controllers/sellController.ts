import {parseJSON, parseParams} from '../utils/bodyParser';
import {Items, shifts, Sells} from '../models/models';
class sellController {
    async createSell (req: any, res:any) {
        try {
            const SellActiveShift = await shifts.findOne ({
                where: {finishedAt: null},
                order: [ [ 'createdAt', 'DESC' ]],
            });

            const ItemActiveSell = await Items.findOne ({
                order: [ [ 'createdAt', 'DESC' ]],
            });

            const ItemsNumber = await Items.count();

            if(!SellActiveShift) {
                res.statusCode = 400;
                res.end('You need to create new Shift at first');
            }
            else if(!ItemActiveSell){
                res.statusCode = 400;
                res.end('You need to create new Item at first');
            }
            else if(ItemsNumber==1){
            
                const shiftId = SellActiveShift.id;
                const itemId = ItemActiveSell.id
                const price = ItemActiveSell.price;

                
                const newSell = new Sells({shiftId, itemId, price});
                await newSell.save();
                res.end('newSell was created from last ItemId automatically, because Item is ONLY one. If you want add item manually, use post method body with itemId, price');
            }

            else if(ItemsNumber>1) {
                const requestParseBody = await parseJSON(req);

                let {price, itemId} = requestParseBody;
                const checkItem = await Items.findOne({
                    where: {id:itemId}
                });
                


                if(!checkItem) {
                    res.statusCode = 400;
                    res.end('Please, add correct itemId, price IS NOT REQUIRED');
                }
                

                else {
                    price = checkItem.price;
                    const shiftId = SellActiveShift.id;
                    const newSell = new Sells({shiftId, itemId, price});
                    await newSell.save();
                    res.end('newSell was created');
                }
            }
        }
    
        catch(e) {
            console.log(e);
        }
    }
}

export default new sellController();