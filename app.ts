require('dotenv').config();
import Http from 'http';
import itemController from './controllers/itemController';
import sellController from './controllers/sellController';
import shiftController from './controllers/shiftController';
import userController from './controllers/userController';
const model = require ('./models/models');
import sequelize from './db';

const port = process.env.PORT || 3031;

const start = async ()=> {
try {
Http.createServer(async (req, res)=>{
    if(req.method == 'GET'){
        switch(req.url) {
            case '/items': 
                itemController.getItem(req, res);
                break;

            case '/lastShift':
                shiftController.getLastShift(req, res);
                break;

            default:
                page404(req, res);
                break;
        }
    }
    else {
        switch(req.url) {
            case '/createItem': 
                itemController.createItem(req, res);
                break;

            case '/startShift':
                shiftController.startShift(req, res);
                break;
            
            case '/finishShift':
                shiftController.finishShift(req, res);
                break;

            case '/createSell':
                sellController.createSell(req, res);
                break;
            
            case '/registration':
                userController.registartion(req, res);
                break;

            case '/login':
                userController.login(req, res);
                break;

            default:
                page404(req, res);
                break;
        }

    }


}).listen(port, ()=>{
    console.log(`Server is working on ${port}`);
})
}
catch(e) {
    console.log(e);
}

function page404 (req:any, res:any) {
    res.end('404, Not Found');
};

    await sequelize.authenticate();
    await sequelize.sync();

};

start();