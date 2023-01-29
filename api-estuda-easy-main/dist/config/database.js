"use strict";require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredALl: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    timeZone: 'America/Sao_Paulo',
  },
  timeZone: 'America/Sao_Paulo',
};
