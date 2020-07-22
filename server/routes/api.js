/* eslint-disable function-paren-newline */
const express = require('express');

const artController = require('../controllers/artController');

const router = express.Router();

router.get('/', artController.getUser, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals);
});

router.post(
  '/',
  artController.hashPassword,
  artController.createUser,
  (req, res) => {
    // console.log('res.locals', res.locals);
    res.status(200).json('USER ADD SUCCESS');
  }
);

router.post('/auth', artController.authUser, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals.match);
});

router.post('/art', artController.addArt, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json('ART POST SUCCESS');
});

router.get('/art', artController.getArt, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals);
});

// router.get('/keyword', artController.getKeyword, (req, res) =>
//   res.status(200).json(res.locals.keyword)
// );

module.exports = router;
