import { Pool } from "pg";

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

/**
 * Insert query
 * @param {string} request
 * @param {array} values
 * @param {function} callback
 */

export const insert = (request, values, callback) => {
  pool.connect(function (err, client, done) {
    client.query(request, values, function (err, result) {
      done();
      callback(result, err);
    });
  });
};

/**
 * Other query's (select, update, delete)
 * @param {string} text
 * @param {array} params
 * @param {function} callback
 */
export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};
