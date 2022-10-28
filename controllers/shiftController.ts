import moment from 'moment';
import { shifts, Sells } from '../models/models';
class shiftController {
    async startShift (req:any, res:any) {
        try {

            const lastData:any = await shifts.findOne({
                where: {finishedAt: null}
            });

            if(lastData) {
                res.end('You need to Finish last Shift at first');
            }

            else {
                const startedAt = moment();
                const finishedAt = null;
                const newShift = new shifts({startedAt, finishedAt});
                await newShift.save();
                res.end(`New shift with ID: ${newShift.id} was created`);
            }
        }
        
        catch(e) {
            console.log(e);
        }
    }

    async finishShift (req:any, res:any) {
        try{
            const finishedAt = moment();
            const lastData:any = await shifts.findOne({
                
                    order: [ [ 'createdAt', 'DESC' ]],
                });
                lastData.finishedAt = finishedAt;
                await lastData.save({where:{id:lastData.id}});
                res.end(`FinishedAt to ID: ${lastData.id} was added`);
        }
        catch(e) {
            console.log(e);
        }
    }

    async getLastShift (req: any, res:any) {
        try {
            const lastData = await shifts.findOne ({
                order: [ [ 'createdAt', 'DESC' ]],
                });
            if(!lastData) {
                res.statusCode = 400;
                res.end('You need to create Shift at first');
            }
            else {
                const lastShift = await shifts.findOne({
                    order: [ [ 'createdAt', 'DESC' ]]
                });
                const lastSell = await Sells.findAll({
                    where: {shiftId:lastShift.id},
                    order: [ [ 'createdAt', 'DESC' ]]
                });
                res.end(JSON.stringify(lastSell));
        }
    }
        catch(e) {
            console.log(e);
        }
    }
}

export default new shiftController;