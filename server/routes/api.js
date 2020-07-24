/* eslint-disable function-paren-newline */
const express = require('express');

const artController = require('../controllers/artController');
const userController = require('../controllers/userControllers');
const cookieController = require('../controllers/cookieControllers');

const router = express.Router();

router.get('/', userController.getUser, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals);
});

// router.get('/', (req, res) => {
//   // console.log('res.locals', res.locals);
//   res.status(200).json('OLD ROUTE');
// });

router.post(
  '/',
  userController.hashPassword,
  userController.createUser,
  cookieController.setCookie,
  (req, res) => {
    // console.log('res.locals', res.locals);
    res.status(201).json(res.locals);
  }
);

router.post('/auth', userController.authUser, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals);
});

router.post('/artwork', artController.getArt, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(200).json(res.locals.body);
});

router.delete('/art/:id', artController.deleteArt, (req, res) => {
  res.status(200).json('Delete Sucess');
});

router.post('/art', artController.addArt, (req, res) => {
  // console.log('res.locals', res.locals);
  res.status(201).json('ART POST SUCCESS');
});

// router.get('/art', artController.getArt, (req, res) => {
//   // console.log('res.locals', res.locals);
//   res.status(200).json(res.locals);
// });

module.exports = router;
