// @ts-ignore
import * as Password from 'node-php-password';
import { DataTypes } from 'sequelize';

import { Database } from '../../class/Database.class';

const sequelize = Database.getInstance().mysqlConnection;

export const User = sequelize.define(
	'cmw_users',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		pseudo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mdp: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		anciennete: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		newsletter: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		rang: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		tokens: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		age: { type: DataTypes.INTEGER, allowNull: false },
		resettoken: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		ip: { type: DataTypes.STRING, allowNull: false },
		CleUnique: { type: DataTypes.STRING, allowNull: false },
		ValidationMail: { type: DataTypes.INTEGER, allowNull: false },
		img_extension: { type: DataTypes.STRING, allowNull: false },
		show_email: { type: DataTypes.INTEGER, allowNull: false },
		signature: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		achats: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
		UUID: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
		UUIDF: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
		token: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
	},
	{
		timestamps: false,
	}
);

User.beforeCreate(user => {
	const hashedPassword = Password.hash(user.get('password') as string);
	user.set('password', hashedPassword);
});

User.beforeUpdate(user => {
	const hashedPassword = Password.hash(user.get('password') as string);
	user.set('password', hashedPassword);
});
