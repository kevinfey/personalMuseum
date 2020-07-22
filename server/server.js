/* eslint-disable */

// requirements
const path = require('path');
const express = require('express');

// initialize express
const app = express();
// declare port
const PORT = 3000;
// declare routes
const apiRouter = require('./routes/api');

// body parser
app.use(express.json());

// route handler
app.use('/api', apiRouter);

// send to index
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);

// error catch
app.use((req, res) => res.sendStatus(404));

// error handeling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);

  return res.status(500).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
