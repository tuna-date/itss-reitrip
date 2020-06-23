import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const sqliteConfig = {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../database/database.sqlite3'),
};

export const mysqlConfig = {
  database: process.env.DB_NAME || 'reitrip',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
};
