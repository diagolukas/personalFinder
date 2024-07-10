import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "personal_finder", "root", "0902", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});