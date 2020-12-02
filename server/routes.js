const express = require('express');
const cors = require('cors');
const { findReview } = require('../database-mysql/index');
const dbfunc = require('../database-mysql/index');
const compression = require('compression');
const bodyParser = require('body-parser')

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.urlencoded());
app.use(express.json());

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

app.use(compression({ filter: shouldCompress, threshold: 0}));

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/api/reviews/:productID', (req, res) => {
  const query = req.params.productID;
  findReview(query, (err, result) => {
    if (err) {
      res.status(500);
      throw (err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/shop/:productID/:styleID', (req, res) => {
  const query = req.params.productID;
  findReview(query, (err, result) => {
    if (err) {
      res.status(500);
      throw (err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/shop/admin/create/:productID', async (req, res) => {
  const review = req.body.review;
  const createReview = await dbfunc.create(review);
  res.end('done');
});

app.get('/shop/admin/read/:productID', async (req, res) => {
  const query = req.params.productID;
  const readOne = await dbfunc.read(query);
  res.send('readOne');
});

app.post('/shop/admin/update/:productID', async (req, res) => {
  const query = req.params.productID;
  const update = req.body.update;
  const updateOne = await dbfunc.update(query, update);
  res.end('done');
});

app.get('/shop/admin/delete/:productID', async (req, res) => {
  const query = req.params.productID;
  const deleteOne = await dbfunc.deleteOne(query);
  res.end('done');
})

module.exports = app;