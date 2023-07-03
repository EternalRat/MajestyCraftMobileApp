import { DataTypes } from 'sequelize';

import { Database } from '../../class/Database.class';

const sequelize = Database.getInstance().mysqlConnection;

export const VoteConfigs = sequelize.define(
	'cmw_votes_config',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			defaultValue: null,
		},
		action: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		serveur: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: null,
		},
		lien: {
			type: DataTypes.CHAR,
			allowNull: false,
			defaultValue: null,
		},
		temps: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: null,
		},
		titre: {
			type: DataTypes.CHAR(60),
			allowNull: false,
			defaultValue: null,
		},
		idCustom: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: null,
		},
		enligne: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'cmw_votes_config',
	}
);
