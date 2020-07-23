const db = require('../models/artModels');

const artController = {};

artController.addArt = (req, res, next) => {
  const { img, id } = req.body;
  console.log('img', img, 'id', id);
  const sqlRequest = `
   INSERT INTO art (img, user_id)
   VALUES ($1, $2)`;

  const values = [img, id];
  db.query(sqlRequest, values)
    .then((data) => {
      // c onsole.log(data)
      console.log('in then', data);
      next();
    })
    .catch((err) => next(err));
};

artController.getArt = (req, res, next) => {
  console.log('get art from art/user', req.body);

  const sqlRequest = `
  SELECT * FROM ART WHERE user_id = $1`;

  let values;
  if (req.body.id === '') {
    values = [1];
  } else {
    values = [req.body.id];
  }
  db.query(sqlRequest, values)
    .then((data) => {
      // c onsole.log(data)
      const { rows } = data;
      res.locals.body = rows;
      console.log('Rows from .getArt', rows);

      next();
    })
    .catch((err) => next(err));
};

module.exports = artController;
