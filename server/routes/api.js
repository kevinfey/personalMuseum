/* eslint-disable function-paren-newline */
const express = require('express');

const artController = require('../controllers/artController');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/', userController.getUser, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals);
});

router.post(
  '/',
  userController.hashPassword,
  userController.createUser,
  (req, res) => {
    // console.log('res.locals', res.locals);
    res.status(200).json('USER ADD SUCCESS');
  }
);

router.post('/auth', userController.authUser, (req, res) => {
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

module.exports = router;
