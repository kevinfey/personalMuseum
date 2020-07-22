const db = require('../models/artModels');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const artController = {};

artController.getUser = (req, res, next) => {
  const sqlRequest = `
   SELECT * from USERS WHERE username = 'test'`;
  //const values = 'test';
  // set var to db.query()
  db.query(sqlRequest)
    .then((data) => {
      // c onsole.log(data)
      const { rows } = data;
      res.locals = rows;
      console.log(rows);

      next();
    })
    .catch((err) => next(err));
};

artController.hashPassword = (req, res, next) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  console.log(req.body);
  next();
};

artController.createUser = (req, res, next) => {
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

artController.authUser = (req, res, next) => {
  const { username, password } = req.body;

  const sqlRequest = `
  SELECT * FROM users WHERE username = $1 LIMIT 1
  `;
  const values = [username];

  db.query(sqlRequest, values)
    .then((data) => {
      console.log('auth', data);
      const { rows } = data;
      console.log('rows', rows[0].hash);
      bcrypt.compare(password, rows[0].hash).then((result) => {
        res.locals.match = result;
        return next();
      });
    })
    .catch((err) => next(err));
};

artController.addArt = (req, res, next) => {
  console.log('IN addArt Middleware', req.body.img);
  const { img } = req.body;
  console.log('img', img);
  const sqlRequest = `
   INSERT INTO art (img)
   VALUES ($1)`;

  const values = [img];
  db.query(sqlRequest, values)
    .then((data) => {
      // c onsole.log(data)
      console.log('in then', data);
      next();
    })
    .catch((err) => next(err));
};

artController.getArt = (req, res, next) => {
  console.log('get art middleware');

  const sqlRequest = `
   SELECT * FROM art`;
  //const values = 'test';
  // set var to db.query()
  db.query(sqlRequest)
    .then((data) => {
      // c onsole.log(data)
      const { rows } = data;
      res.locals = rows;
      console.log('Rows from .getArt', rows);

      next();
    })
    .catch((err) => next(err));
};

module.exports = artController;
