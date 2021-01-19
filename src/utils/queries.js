const { Client } = require('pg');

const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// HASHPASSWORD

export const hashPassword = async (password, res) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        resolve(hash);
      }
    });
  });
};

// GAMES

/*

const getGames = (request, response) => {
  client.query('SELECT * FROM game ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })

}

const getRandomGames = (request, response) => {
  client.query('SELECT * FROM game WHERE promo = true ORDER BY RANDOM() LIMIT 2', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const getGameImages = (request, response) => {
  const id = parseInt(request.params.id)
  client.query(`SELECT * FROM gameimage WHERE game_id = '${id}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
};

*/

// USERS

const getUser = async (request, response) => {
  let { email } = request.body;

  client.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
}

// CREATE USER

/* export const createUser = (request, response) => {

  client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
} */

// UPDATE USER

/* const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
} */

// DELETE USER

/* const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
} */

module.exports = {
  hashPassword,
  getUser,
  //createUser,
  //updateUser,
  //deleteUser

  // games
  // getGames,
  // getRandomGames,
  // getGameImages
}