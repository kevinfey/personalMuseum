const db = require('../models/artModels');

const artController = {};

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
