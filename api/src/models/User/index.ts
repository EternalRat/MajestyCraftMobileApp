import { DataTypes } from 'sequelize';

import { Database } from '~/class/Database.class';

const sequelize = Database.getInstance().mysqlConnection;

export const User = sequelize.define('cmw_users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
