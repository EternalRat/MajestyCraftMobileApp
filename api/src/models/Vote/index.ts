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

export const Vote = sequelize.define(
	'cmw_votes',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			defaultValue: null,
		},
		pseudo: {
			type: DataTypes.CHAR(50),
			allowNull: false,
			defaultValue: null,
		},
		nbre_votes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: null,
		},
		site: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: null,
		},
		date_dernier: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: null,
		},
		ip: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			defaultValue: null,
		},
		isOld: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'cmw_votes',
	}
);

export const VoteReward = sequelize.define(
	'cmw_votes_temp',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			defaultValue: null,
		},
		pseudo: {
			type: DataTypes.CHAR(16),
			allowNull: false,
			defaultValue: null,
		},
		action: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		serveur: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: null,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'cmw_votes_temp',
	}
);
