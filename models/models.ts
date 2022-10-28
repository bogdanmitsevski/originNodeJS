import sequelize from '../db';

import { DataTypes } from 'sequelize';

const users = sequelize.define('users',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const shifts = sequelize.define('shifts',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    startedAt: {type: DataTypes.DATE},
    finishedAt: {type: DataTypes.DATE}
});

const Items = sequelize.define('items',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER}
});

const Sells = sequelize.define('sells',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shiftId:{type: DataTypes.INTEGER },
    itemId:{type: DataTypes.INTEGER },
    price: {type: DataTypes.INTEGER}
});

users.hasMany(shifts);
shifts.belongsTo(users);

shifts.hasMany(Sells);
Sells.belongsTo(shifts);

Sells.hasMany(Items);
Items.belongsTo(Sells);

export {
    users,
    shifts,
    Items,
    Sells
}