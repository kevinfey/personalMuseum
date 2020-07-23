const db = require('../models/artModels');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userController = {};

userController.getUser = (req, res, next) => {
  const sqlRequest = `
   SELECT * from USERS WHERE username = '9'`;
  //const values = 'test';
  // set var to db.query()
  db.query(sqlRequest)
    .then((data) => {
      // c onsole.log(data)
      const { rows } = data;
      res.locals = rows;

      next();
    })
    .catch((err) => next(err));
};

userController.hashPassword = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  next();
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  const sqlRequest = `
   INSERT INTO users (username, hash)
   VALUES ($1, $2)`;

  const values = [username, password];
  db.query(sqlRequest, values)
    .then((data) => {
      // c onsole.log(data)
      console.log(data);
      next();
    })
    .catch((err) => next(err));
};

userController.authUser = (req, res, next) => {
  const { username, password } = req.body;

  const sqlRequest = `
  SELECT * FROM users WHERE username = $1 LIMIT 1
  `;
  const values = [username];

  db.query(sqlRequest, values)
    .then((data) => {
      // console.log('auth', data);
      const { rows } = data;

      res.locals.id = rows[0].user_id;

      bcrypt.compare(password, rows[0].hash).then((result) => {
        res.locals.match = result;
        return next();
      });
    })
    .catch((err) => next(err));
};

module.exports = userController;
